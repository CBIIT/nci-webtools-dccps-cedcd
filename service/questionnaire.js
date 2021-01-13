var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var logger = require('../components/logger');
var cache = require('../components/cache');
var fs = require('fs');
var ejs = require('ejs');
var config = require('../config');
var mail = require('../components/mail');
const { getCohort, saveCohort } = require('./models/cohort');
const { ifError } = require('assert');

router.use((request, response, next) => {
    const { session } = request;
    if (!session.user || !/CohortAdmin|SystemAdmin/.test(session.user.role)) {
        response.status(400).json('Unauthorized').end();
    } else {
        next();
    }
});


router.post('/sendEmail', async function (req, res, next) {
    try {
        await mail.sendMail(config.mail.from, req.body.email, req.body.topic, req.body.message, "");
        res.json({ status: 200, data: 'sent' });
    } catch (e) {
        res.json({ status: 200, data: 'failed' });
    }
})

router.post('/select_owners_from_id', async function (req, res){ 

    let params = [req.body.id];
    let proc = 'select_owners_from_id'

    mysql.callProcedure(proc, params, function (result) {
        logger.debug(result)
        logger.debug(result[0][0])

        if(result && result[0][0])
            res.json({ status: 200, data: result[0]})
        else  
            res.json({ status: 400 })
    })
})

router.post('/get_updated_cohortID', function (req, res) {
    let proc = 'select_unpublished_cohort_id'
    mysql.callProcedure(proc, [req.body.oldID, req.body.newID], function (result) {
        if (result && result[0])
            res.json({ status: 200, data: result[0][0].new_id })
        else
            res.json({ status: 500 })
    })

})

router.post('/upload/:id/:category', function (req, res, next) {
    let cohortFiles = req.files.cohortFile.length > 1 ? Array.from(req.files.cohortFile) : req.files.cohortFile
    //logger.debug('uplaod to here: '+config.file_path)
    let uploadedFiles = {filenames: []} 
    if(cohortFiles.length > 1)
        //Array.from(cohortFiles).forEach(f => uploadedFiles.filenames.push(f.name)) 
        cohortFiles.forEach(f => uploadedFiles.filenames.push(f.name))
    else
        uploadedFiles.filenames.push(cohortFiles.name)
    let proc = 'add_file_attachment'
        let params = []
        params.push(req.params.id)
        params.push(req.params.category)
        params.push(JSON.stringify(uploadedFiles))
        //logger.debug(uploadedFiles)

        mysql.callJsonProcedure(proc, params, function (result) {
            if(result && result[0] && result[0][0].rowsAffacted > 0){
                const returnedData = {}
                //logger.debug(result[2])
                returnedData.new_ID = result[1][0].new_id
                returnedData.files = result[2]
                fs.access(`${config.file_path}/CohortID_${returnedData.new_ID}`, (err) => {
                    if (err) {
                        fs.mkdirSync(`${config.file_path}/CohortID_${returnedData.new_ID}`, { recursive: true }, (err) => {
                            logger.debug(err.message)
                            if (err) res.json({ status: 500 })
                        });
                    }
                    if (Array.isArray(cohortFiles)) cohortFiles.forEach(f => {f.mv(`${config.file_path}/CohortID_${returnedData.new_ID}/${f.name}`)})  
                    else cohortFiles.mv(`${config.file_path}/CohortID_${returnedData.new_ID}/${cohortFiles.name}`) 
                }) 
                res.json({ status: 200, data: returnedData})
            }        
            else
                res.json({status: 500})
         }) 
         
        //res.json({status: 200})
})

router.post('/deleteFile', function (req, res) {
    let proc = 'delete_cohort_file'
    let currentFile = req.body.filename
    let cohort_ID = req.body.cohortId
    mysql.callProcedure(proc, [req.body.id, cohort_ID], function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0) {
            if (Array.isArray(result[1])){
                fs.unlink(`${config.file_path}/CohortID_${cohort_ID}/${currentFile}`, (err => { 
                    if (err) console.log(err);}))
                res.json({ status: 200, data: result[1][0].new_id })
            }
            else
                res.json({ status: 200 })
        }
        else
            res.json({ status: 500 })
    })
})

router.post('/update_cohort_basic/:id', function (req, res) {
    logger.debug(req.body)
    req.body.cohort_description = req.body.cohort_description ? req.body.cohort_description.replace(/\n/g, '\\n') : req.body.cohort_description
    let body = {...req.body}
    if(body.clarification_contact === 1) {
        body.contacterName = body.completerName
        body.contacterPosition = body.completerPosition
        body.contacterCountry = body.completerCountry
        body.contacterPhone = body.completerPhone
        body.contacterEmail = body.completerEmail
    }

    if(body.sameAsSomeone === 0){
        body.collaboratorName = body.completerName
        body.collaboratorPosition = body.completerPosition
        body.collaboratorCountry = body.completerCountry
        body.collaboratorPhone = body.completerPhone
        body.collaboratorEmail = body.completerEmail
    }else if(body.sameAsSomeone === 1){
        body.collaboratorName = body.contacterName
        body.collaboratorPosition = body.contacterPosition
        body.collaboratorCountry = body.contacterCountry
        body.collaboratorPhone = body.contacterPhone
        body.collaboratorEmail = body.contacterEmail
    }
    
    let updatedBody = JSON.stringify(body)
    let proc = 'update_cohort_basic'
    let params = []
    params.push(req.params.id)
    params.push(updatedBody)

    mysql.callJsonProcedure(proc, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0) {
            const updatedCohortInfo = {}
            if (Array.isArray(result[1])) {
                updatedCohortInfo.investigators = []
                result[1].map((item) => {
                    updatedCohortInfo.investigators.push(item)
                })
            }
            if (result[2]) updatedCohortInfo.newCohortID = result[2][0].duplicated_cohort_id
            if (result[3]) updatedCohortInfo.status = result[3][0].status
            res.json({ status: 200, message: 'update successful', newCohortInfo: updatedCohortInfo })
        }
        else
            res.json({ status: 500, message: 'update failed' })
    })

})

router.post('/cohort_basic_info/:id', function (req, res) {
    let id = req.params.id
    let func = 'get_cohort_basic_info'
    let params = [id]
    mysql.callProcedure(func, params, function (results) {
        logger.debug(results)
        const basic_info = {}
        basic_info.investigators = []
        basic_info.cohort = results[0][0]
        basic_info.completer = results[1][0]
        basic_info.contacter = results[2][0]
        results[3].map((item) => {
            if (item.name) {
                basic_info.investigators.push(item)
            }
        })
        basic_info.collaborator = results[4][0]
        basic_info.sectionStatus = results[5]
        basic_info.cohortStatus = results[6][0].cohort_status


        if (results[7] && Array.isArray(results[7])) {
            basic_info.cohort.questionnaireFileName = []
            basic_info.cohort.mainFileName = []
            basic_info.cohort.dataFileName = []
            basic_info.cohort.specimenFileName = []
            basic_info.cohort.publicationFileName = []

            for (let a of results[7]) {
                switch (a.fileCategory) {
                    case 0:
                        basic_info.cohort.questionnaireFileName.push(a)
                        break;
                    case 1:
                        basic_info.cohort.mainFileName.push(a)
                        break;
                    case 2:
                        basic_info.cohort.dataFileName.push(a)
                        break;
                    case 3:
                        basic_info.cohort.specimenFileName.push(a)
                        break;
                    default:
                        basic_info.cohort.publicationFileName.push(a)
                        break;
                }
            }
        }

        res.json({ status: 200, data: basic_info })
    })
})

router.post('/upsert_enrollment_counts/:id', function (req, res) {
    let body = JSON.stringify(req.body)
    let proc = 'update_enrollment_count'
    let params = []
    params.push(req.params.id)
    params.push(body)

    mysql.callJsonProcedure(proc, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0) {
            
            if (Array.isArray(result[1])) { 
                const updatedCounts = {}
                updatedCounts.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedCounts.status = result[2][0].status
                res.json({ status: 200, message: 'update successful', data: updatedCounts })
            }
             else
                res.json({ status: 200, message: 'update successful' })
        }
        else
            res.json({ status: 500, message: 'update failed' })
    })

})

router.post('/enrollment_counts/:id', function (req, res) {
    let id = req.params.id
    let func = 'get_enrollment_counts'
    let params = []
    params.push(id)
    mysql.callProcedure(func, params, function (result) {
        logger.debug(typeof result[4][0].mostRecentDate)
        const enrollmentCounts = {}
        enrollmentCounts.details = result[0]
        enrollmentCounts.rowTotals = result[1]
        enrollmentCounts.colTotals = result[2]
        enrollmentCounts.grandTotal = result[3][0]
        enrollmentCounts.mostRecentDate = result[4][0]
        res.json({ data: enrollmentCounts })
    })

})

router.post('/major_content/:id', function (req, res) {
    let id = req.params.id
    let func = 'get_major_content'
    let params = []
    params.push(id)
    mysql.callProcedure(func, params, function (result) {
        //logger.debug(result)
        const majorContent = {}
        majorContent.counts = result[0]
        majorContent.cancerInfo = result[1][0]
        if (majorContent)
            res.json({ status: 200, data: majorContent })
        else
            res.json({ status: 500, message: 'failed to load data' })
    })
})

router.post('/update_major_content/:id', function (req, res) {
    let func = 'upsert_major_content'
    let body = JSON.stringify(req.body)
    let params = []
    params.push(req.params.id)
    params.push(body)
    logger.debug(body)

    mysql.callJsonProcedure(func, params, function (result) {
        logger.debug(result)
        if (result && result[0] && result[0][0].rowAffacted > 0) {
            if (Array.isArray(result[1])) {
                const updatedInfo = {}
                updatedInfo.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedInfo.status = result[2][0].status
                res.json({ status: 200, message: 'update successful', data: updatedInfo })
            } else
                res.json({ status: 200, message: 'update successful' })
        }
        else
            res.json({ status: 500, message: 'update failed' })
    })
})

router.post('/mortality/:id', function (req, res) {
    let id = req.params.id
    let func = 'select_mortality'
    let params = []
    params.push(id)
    mysql.callProcedure(func, params, function (result) {
        logger.debug(result)
        const mortality = {}
        mortality.info = result[0]

        if (mortality)
            res.json({ status: 200, data: mortality })
        else
            res.json({ status: 500, message: 'failed to load data' })
    })
})

router.post('/update_mortality/:id', function (req, res) {
    let func = 'update_mortality'
    let body = JSON.stringify(req.body)
    let params = []
    params.push(req.params.id)
    params.push(body)
    logger.debug(body)

    mysql.callJsonProcedure(func, params, function (result) {
        logger.debug(result)
        if (result && result[0] && result[0][0].rowAffacted > 0) {
            if (Array.isArray(result[1])) {
                const updatedMortality = {}
                updatedMortality.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedMortality.status = result[2][0].status
                res.json({ status: 200, message: 'update successful', data: updatedMortality })
            } else
                res.json({ status: 200, message: 'update successful' })
        }
        else
            res.json({ status: 500, message: 'update failed' })
    })
});

router.post('/dlh/:id', function (req, res) {
    let id = req.params.id
    let func = 'select_dlh'
    let params = []
    params.push(id)
    mysql.callProcedure(func, params, function (result) {
        logger.debug(result)
        const dlh = {}
        dlh.info = result[0]
        dlh.completion = result[1]

        if (dlh)
            res.json({ status: 200, data: dlh })
        else
            res.json({ status: 500, message: 'failed to load data' })
    })
});

router.post('/update_dlh/:id', function (req, res) {
    let func = 'update_dlh'
    let body = JSON.stringify(req.body)
    let params = []
    params.push(req.params.id)
    params.push(body)
    logger.debug(body)

    mysql.callJsonProcedure(func, params, function (result) {
        logger.debug(result)
        if (result && result[0] && result[0][0].rowAffacted > 0) {
            if (Array.isArray(result[1])) {

                const updatedDlh = {}
                updatedDlh.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedDlh.status = result[2][0].status
                res.json({ status: 200, message: 'update successful', data: updatedDlh })
            } else
                res.json({ status: 200, message: 'update successful' })
        }
        else
            res.json({ status: 500, message: 'update failed' })
    })
});

router.get('/cancer_count/:id', function (req, res) {
    let id = req.params.id
    let func = 'select_cancer_count'
    let params = []
    params.push(id)
    mysql.callProcedure(func, params, function (result) {
        if (result)
            res.json({ status: 200, data: result })
        else
            res.status(500).json({ status: 500, message: 'failed to load data' })
    })
});

router.get('/cancer_info/:id', function (req, res) {
    let func = 'select_cancer_info'
    let body = JSON.stringify(req.body)
    let params = []
    params.push(req.params.id)
    logger.debug(body)

    mysql.callJsonProcedure(func, params, function (result) {
        if (result)
            res.json({ status: 200, data: result })
        else
            res.status(500).json({ status: 500, message: 'failed to load data' })
    })
});

router.post('/update_cancer_count/:id', async function (req, res) {
    const { app, params, body } = req;
    const { mysql } = app.locals;
    const { id } = params;
    try {
        const [result] = await mysql.query(
            'CALL update_cancer_count(?, ?)',
            [id, JSON.stringify(body)]
        );

        if (result) {
            res.json({ status: 200, message: 'update successful', result })
        } else {
            throw new Error("SQL Exception");
        }
    } catch (e) {
        logger.debug(e);
        res.status(500).json({ status: 500, message: 'update failed' })
    }
});

router.post('/update_cancer_info/:id', async function (req, res) {
    const { app, params, body } = req;
    const { mysql } = app.locals;
    const { id } = params;
    try {
        const [result] = await mysql.query('CALL update_cancer_info(?, ?)', [id, JSON.stringify(body)]);
        
        if (result && result[0] && result[0].success === 1) {
            if (result[0].duplicated_cohort_id) {
                res.json({ status: 200, message: 'update successful', data: { duplicated_cohort_id: result[0].duplicated_cohort_id, status: result[0].status } })
            } else
                res.json({ status: 200, message: 'update successful' })
        } else {
            throw new Error("SQL Exception");
        }
    } catch (e) {
        logger.debug(e);
        res.status(500).json({ status: 500, message: 'update failed' })
    }
});

router.post('/update_specimen/:id', function (req, res) {
    let func = 'update_specimen_section_data'
    let body = req.body
    for (let k of Object.keys(body.counts)) { if (body.counts[k] === '') body.counts[k] = 0 }
    body = JSON.stringify(body)
    let params = []
    params.push(req.params.id)
    params.push(body)
    //logger.debug(body)

    mysql.callJsonProcedure(func, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0)
            if(Array.isArray(result[1])){
                const updatedSpecimen = {}
                updatedSpecimen.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedSpecimen.status = result[2][0].status
                res.json({ status: 200, message: 'update successful', data: updatedSpecimen })
            } else
                res.json({ status: 200, message: 'update successful' })
        else
            res.json({ status: 500, message: 'update failed' })
    })

});

router.get('/cohort/:id(\\d+)', async (request, response) => {
    const { app, params } = request;
    const { mysql } = app.locals;
    const { id } = params;
    try {
        response.json(await getCohort(mysql, id));
    } catch (e) {
        logger.error(e);
        response.status(500).json({ message: 'Could not fetch cohort' });
    }
});

router.post('/cohort(/:id(\\d+))?', async (request, response) => {
    const { app, params, body, session } = request;
    const { mysql } = app.locals;
    let id = params ? params.id : undefined; // can be undefined (for new cohorts)

    try {
        response.json(await saveCohort(mysql, body, id, session.user));
    } catch (e) {
        logger.error(e);
        response.status(500).json({ message: 'Could not update cohort' });
    }
});

router.get('/lookup', async (request, response) => {
    let { locals } = request.app;
    let { lookup, mysql } = locals;

    try {
        if (!lookup) {
            locals.lookup = lookup = {
                cancer: await mysql.query(`SELECT id, icd9, icd10, cancer FROM lu_cancer ORDER BY icd9 = '', icd9`),
                case_type: await mysql.query(`SELECT id, case_type FROM lu_case_type`),
                cohort_status: await mysql.query(`SELECT id, cohortstatus FROM lu_cohort_status`),
                data_category: await mysql.query(`SELECT id, category, sub_category FROM lu_data_category`),
                ethnicity: await mysql.query(`SELECT id, ethnicity FROM lu_ethnicity`),
                gender: await mysql.query(`SELECT id, gender FROM lu_gender`),
                person_category: await mysql.query(`SELECT id, category FROM lu_person_category`),
                race: await mysql.query(`SELECT id, race FROM lu_race`),
                specimen: await mysql.query(`SELECT id, specimen, sub_category FROM lu_specimen`),
                allcohortlist: await mysql.query(`select distinct name,acronym as id, acronym from cohort`),
            }
        }
        response.json(lookup);
    } catch (e) {
        logger.error(e);
        response.status(500).json({ message: 'Could not fetch lookup tables' });
    }
});


router.post('/get_specimen/:id', function (req, res) {
    let func = 'select_questionnaire_specimen_info'
    let params = []
    params.push(req.params.id)

    mysql.callProcedure(func, params, function (result) {
        if (result && result[0]) {
            const specimenData = {}
            let temp = []
            specimenData.info = result[1]
            specimenData.details = result[2][0]
            specimenData.counts = {}
            specimenData.emails = ''

            if (result[3].length > 0) {
                for (let e of result[3])
                    if(e.email) temp.push(e.email)
                specimenData.emails = temp.join(',')
            }

            for (let k of result[0])
                specimenData.counts[k.cellId] = k.counts
            res.json({ status: 200, data: specimenData })
        } else
            res.json({ status: 500, message: 'failed to retrieve data' })
    })

})

router.post('/reset_cohort_status/:id/:status', function (req, res) {
    let func = 'reset_cohort_status'
    let params = []
    params.push(req.params.id, req.params.status)
    mysql.callProcedure(func, params, function (result) {
        if (result && result[0] && result[0][0].rowAffacted > 0)
            res.json({ status: 200, message: 'update was successful' })
        else
            res.json({ status: 500, message: 'update failed' })
    })
})


module.exports = router