// The API routes for Cohort admin functions (protected for logged in Cohort owners only)
import express  from "express";
import Router from "express-promise-router";
import * as mysql  from "../components/mysql.js";
import logger  from "../components/logger.js";
import * as cache  from "../components/cache.js";
import fs  from "fs";
import ejs  from "ejs";
import config  from "../config/index.js";
import * as mail from "../components/mail.js";
import { getCohort, saveCohort }  from "../service/models/cohort.js";
/*const { ifError } = require('assert');
const { send } = require('process');
const { lang } = require('moment'); */
const router = Router();

router.use((request, response, next) => {
    const { user } = request;
    //console.log(" session user ", user);
    if ( !user || !/CohortAdmin|SystemAdmin/.test(user.role)) {
        response.status(401).json('Unauthorized').end();
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

router.post('/select_owners_from_id', async function (req, res) {

    let params = [req.body.id];
    let proc = 'select_owners_from_id'

    mysql.callProcedure(proc, params, function (result) {

        if (result && result[0][0])
            res.json({ status: 200, data: result[0] })
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
            res.json({ status: 400 })
    })

})

router.post('/select_admin_info', async function (req, res) {
    let params = [req.body.id];
    let proc = 'select_admin_info'

    mysql.callProcedure(proc, params, function (result) {
        if (result && result[0][0])
            res.json({ status: 200, data: result[0] })
        else
            res.json({ status: 400 })
    })
})

/* router.post('/upload/:id/:category', function (req, res, next) {
    let cohortFiles = req.files.cohortFile.length > 1 ? Array.from(req.files.cohortFile) : req.files.cohortFile
    let idIn = req.params.id
    let uploadedFiles = { filenames: [] }
    if (cohortFiles.length > 1)
        //Array.from(cohortFiles).forEach(f => uploadedFiles.filenames.push(f.name)) 
        cohortFiles.forEach(f => uploadedFiles.filenames.push(f.name))
    else
        uploadedFiles.filenames.push(cohortFiles.name)
    let proc = 'add_file_attachment'
    let params = []
    params.push(idIn)
    params.push(req.params.category)
    params.push(JSON.stringify(uploadedFiles))
    //logger.debug(uploadedFiles)

    mysql.callJsonProcedure(proc, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0) {
            const returnedData = {}
            returnedData.new_ID = result[1][0].new_id
            returnedData.files = result[2]
            if (returnedData.new_ID !== idIn) returnedData.updatedStatus = result[3]
            fs.access(`${config.file_path}`, (err) => {
                if (err) {
                    fs.mkdirSync(`${config.file_path}`, { recursive: true }, (err) => {
                        logger.debug(err.message)
                        if (err) res.json({ status: 500 })
                    });
                }
                if (Array.isArray(cohortFiles)) cohortFiles.forEach(f => { f.mv(`${config.file_path}/${f.name}`) })
                else cohortFiles.mv(`${config.file_path}/${cohortFiles.name}`)
            })
            res.json({ status: 200, data: returnedData })
        }
        else
            res.json({ status: 500 })
    }) 

    //res.json({status: 200})
}) */

router.post('/upload/:id/:category', function (req, res, next) {
    let cohortFiles = req.files.cohortFile.length > 1 ? Array.from(req.files.cohortFile) : req.files.cohortFile
    fs.access(`${config.file_path}`, (err) => {
        if (err) {
            fs.mkdirSync(`${config.file_path}`, { recursive: true }, (err) => {
                logger.debug(err.message)
                if (err) res.json({ status: 500 })
            });
        }
        if (Array.isArray(cohortFiles)) cohortFiles.forEach(f => { f.mv(`${config.file_path}/${f.name}`) })
        else cohortFiles.mv(`${config.file_path}/${cohortFiles.name}`)
    })
    res.json({ status: 200})
}) 

router.post('/deleteFile', function (req, res) {
    let proc = 'delete_cohort_file'
    let currentFile = req.body.filename
    let cohort_ID = req.body.cohortId

    mysql.callProcedure(proc, [req.body.id, cohort_ID], function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0) {
            if (Array.isArray(result[1])) {

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
    let keys = ['cohort_description', 'cohort_web_site', 'completerName', 'completerPosition', 'completerEmail', 'contacterName', 'contacterPosition', 'contacterEmail', 'collaboratorName', 'collaboratorPosition', 'collaboratorEmail', 'eligible_disease_cancer_specify', 'eligible_disease_other_specify', 'time_interval', 'data_collected_other_specify', 'restrictions_other_specify', 'strategy_other_specify']
    keys.forEach(k => req.body[k] = req.body[k] ? req.body[k].replace(/\n/g, '\\n') : '')

    for (let i in req.body.investigators) {
        req.body.investigators[i].name = req.body.investigators[i].name ? req.body.investigators[i].name.replace(/\n/g, '\\n') : '';
        req.body.investigators[i].institution = req.body.investigators[i].institution ? req.body.investigators[i].institution.replace(/\n/g, '\\n') : '';
        req.body.investigators[i].email = req.body.investigators[i].email ? req.body.investigators[i].email.replace(/\n/g, '\\n') : '';
    }

    let body = { ...req.body }
    if (body.clarification_contact === 1) {
        body.contacterName = body.completerName
        body.contacterPosition = body.completerPosition
        body.contacterCountry = body.completerCountry
        body.contacterPhone = body.completerPhone
        body.contacterEmail = body.completerEmail
    }

    if (body.sameAsSomeone === 0) {
        body.collaboratorName = body.completerName
        body.collaboratorPosition = body.completerPosition
        body.collaboratorCountry = body.completerCountry
        body.collaboratorPhone = body.completerPhone
        body.collaboratorEmail = body.completerEmail
    } else if (body.sameAsSomeone === 1) {
        body.collaboratorName = body.contacterName
        body.collaboratorPosition = body.contacterPosition
        body.collaboratorCountry = body.contacterCountry
        body.collaboratorPhone = body.contacterPhone
        body.collaboratorEmail = body.contacterEmail
    }
    let fileToUpload = [];
    ['questionnaireFileName', 'mainFileName', 'dataFileName', 'specimenFileName', 'publicationFileName'].forEach(k => {
        if(body[k].length > 0){
            body[k].forEach(f => {fileToUpload.push(f.filename)})
            body[k] = [...fileToUpload]
            fileToUpload = []
        }
    })
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
            if (result[4]) updatedCohortInfo.sectionStatusList = result[4]
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
        const basic_info = {}
        const cohort_errors = {}
        Object.assign(basic_info, {...results[0][0]}) //basic info

        Object.keys(basic_info).forEach(k => {
            if(!['cohort_description', 'cohort_web_site', 'clarification_contact', 'eligible_disease',  'sameAsSomeone', 'eligible_disease_cancer_specify', 'eligible_disease_other_specify','data_collected_in_person','data_collected_phone', 'data_collected_paper', 'data_collected_web', 'data_collected_other', 'enrollment_ongoing', 'enrollment_target', 'enrollment_year_complete', 'enrollment_year_end', 'data_collected_other_specify', 'requireNone', 'requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther', 'strategy_routine', 'strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_other', 'restrictions_other_specify', 'strategy_other_specify'].includes(k)){if(!basic_info[k]) cohort_errors[k] = "Required field"}
            else{
                switch(k){
                    case 'clarification_contact':
                    case 'enrollment_ongoing':
                        if(![0,1].includes(basic_info[k])) cohort_errors[k]='Required field'
                        break;
                    case 'enrollment_target':
                    case 'enrollment_year_complete':
                        if(basic_info.enrollment_ongoing || basic_info.enrollment_ongoing !== 0)
                            if(!basic_info[k]) cohort_errors[k] = 'Required field'
                            else if(basic_info[k] < 0) cohort_errors[k] = 'Invalid value'
                            else if(k === 'enrollment_year_complete' && basic_info[k] < (new Date()).getFullYear())
                                cohort_errors[k] = 'Enrollment should not complete in the past'
                        break;
                    case 'enrollment_year_end':
                        if(!basic_info.enrollment_ongoing && !basic_info[k])
                            cohort_errors[k] = 'Required field'
                        break;
                    case 'data_collected_other_specify':
                        if(basic_info.data_collected_other && !basic_info[k]) cohort_errors[k]='Required field'
                        break;
                    case 'restrictions_other_specify':
                        if(basic_info.restrictOther && !basic_info[k]) cohort_errors[k]='Required field'
                        break;
                    case 'strategy_other_specify': 
                        if(basic_info.strategy_other && !basic_info[k]) cohort_errors[k]='Required field'
                        break;
                    default: 
                        break;
                }
            }})
        if(!['data_collected_in_person','data_collected_phone', 'data_collected_paper', 'data_collected_web', 'data_collected_other'].some(k => basic_info[k] === 1)) cohort_errors.dataCollection = 'Required field'
        if(!['requireNone', 'requireCollab', 'requireIrb', 'requireData', 'restrictGenoInfo', 'restrictOtherDb', 'restrictCommercial', 'restrictOther'].some(k => basic_info[k] === 1)) cohort_errors.requirements = 'Required field'
        if(!['strategy_routine', 'strategy_mailing', 'strategy_aggregate_study', 'strategy_individual_study', 'strategy_committees', 'strategy_invitation', 'strategy_participant_input', 'strategy_other'].some(k => basic_info[k] === 1)) cohort_errors.strategy = 'Required field'
        basic_info.cohort_description = basic_info.cohort_description ? basic_info.cohort_description.replace(/\\n/g, '\n') : ''
        basic_info.investigators = []
        if(results[1][0] && Object.keys(results[1][0]).length > 0){
            Object.assign(basic_info, results[1][0])//completer
            if(!results[1][0].completerName) cohort_errors.completerName = 'Required field'
            if(!results[1][0].completerEmail) cohort_errors.completerEmail = 'Required field'
            if(!results[1][0].completerPosition) cohort_errors.completerPosition = 'Required field'   
        }
        else{
            basic_info.completerName = ''
            basic_info.completerEmail = ''
            basic_info.completerPosition = ''
            basic_info.completerPhone = ''
            basic_info.completerCountry = '+1'
            cohort_errors.completerName = 'Required field'
            cohort_errors.completerEmail = 'Required field'
            cohort_errors.completerPosition = 'Required field'            
        }
        if(results[2][0] && Object.keys(results[2][0]).length > 0){
            Object.assign(basic_info, results[2][0])//contacter
            if(!basic_info.clarification_contact){
                if(!results[2][0].contacterName) cohort_errors.contacterName = 'Required field'
                if(!results[2][0].contacterEmail) cohort_errors.contacterEmail = 'Required field'
                if(!results[2][0].contacterPosition) cohort_errors.contacterPosition = 'Required field'
            }   
        }
        else{
            basic_info.contacterName = ''
            basic_info.contacterEmail = ''
            basic_info.contacterPosition = ''
            basic_info.contacterPhone = ''
            basic_info.contacterCountry = '+1'
            if(!basic_info.clarification_contact){
                cohort_errors.contacterName = 'Required field'
                cohort_errors.contacterEmail = 'Required field'
                cohort_errors.contacterPosition = 'Required field'
            }
        }
        if(results[3].length === 0){
            basic_info.investigators.push({
                personId: 0,
                name: '',
                institution: '',
                email: ''
            })
            cohort_errors.investigator_name_0 = 'Required field'
            cohort_errors.investigator_inst_0 = 'Required field'
            cohort_errors.investigator_email_0 = 'Required field'
        }else{
            results[3].map((item, idx) => {
                if (item.name) basic_info.investigators.push(item)
                else {
                    let adjustedIdx = (idx+1).toString()
                    if(!item.name) cohort_errors['investigator_name_'+adjustedIdx] = 'Required field'
                    if(!item.institution) cohort_errors['investigator_inst_'+adjustedIdx] = 'Required field'
                    if(!item.email) cohort_errors['investigator_email_'+adjustedIdx] = 'Required field'
                }
        })}
        if(results[4][0] && Object.keys(results[4][0]).length > 0){
            Object.assign(basic_info, results[4][0])
            if(![0,1].includes(basic_info.sameAsSomeone)){
                if(!results[4][0].collaboratorName) cohort_errors.collaboratorName = 'Required field'
                if(!results[4][0].collaboratorEmail) cohort_errors.collaboratorEmail = 'Required field'
                if(!results[4][0].collaboratorPosition) cohort_errors.collaboratorPosition = 'Required field' 
            }  
        }
        else{
            basic_info.collaboratorName = ''
            basic_info.collaboratorEmail = ''
            basic_info.collaboratorPosition = ''
            basic_info.collaboratorPhone = ''
            basic_info.collaboratorCountry = '+1'
            if(![0,1].includes(basic_info.sameAsSomeone)){
                cohort_errors.collaboratorName = 'Required field'
                cohort_errors.collaboratorEmail = 'Required field'
                cohort_errors.collaboratorPosition = 'Required field'
            }
        }
        basic_info.sectionStatus = results[5]
        basic_info.cohortStatus = results[6][0].cohort_status      

        if (results[7] && Array.isArray(results[7])) {
            basic_info.questionnaireFileName = []
            basic_info.mainFileName = []
            basic_info.dataFileName = []
            basic_info.specimenFileName = []
            basic_info.publicationFileName = []
            for (let a of results[7]) {
                switch (a.fileCategory) {
                    case 0:
                        basic_info.questionnaireFileName.push(a)
                        break;
                    case 1:
                        basic_info.mainFileName.push(a)
                        break;
               
                /*     case 2:
                        basic_info.dataFileName.push(a)
                        break;
                    case 3:
                        basic_info.specimenFileName.push(a)
                        break;
                */                   
                    case 4:
                        basic_info.publicationFileName.push(a)
                        break;
                    default:
                        break;
                }
            }
        }

        if (results[8] && Array.isArray(results[8])) {
            basic_info.questionnaire_url = []
            basic_info.main_cohort_url = []
            basic_info.data_url = []
            basic_info.specimen_url = []
            basic_info.publication_url = []
            
            for (let a of results[8]) {

                switch (a.urlCategory) {
                    case 0:
                        basic_info.questionnaire_url.push(a.website)
                        break;
                    case 1:
                        basic_info.main_cohort_url.push(a.website)
                        break;
                /*
                    case 2:
                        basic_info.data_url.push(a.website)
                        break;
                    case 3:
                        basic_info.specimen_url.push(a.website)
                        break;
                */
                    case 4:
                        basic_info.publication_url.push(a.website)
                        break;
                    default: break;
                }
            }
        }
        res.json({ status: 200, data: basic_info, error: cohort_errors })
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
                if (result[3]) updatedCounts.sectionStatusList = result[3]
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
        let enrollmentCounts = {}
        for(let i = 0; i < result[0].length; i++)
            enrollmentCounts[result[0][i].cellId] = result[0][i].cellCount
        for(let i = 0; i < result[1].length; i++)
            enrollmentCounts[result[1][i].rowId.toString()+ '41'] = result[1][i].rowTotal
        for(let i = 0; i < result[2].length; i++)
            enrollmentCounts['8'+result[2][i].colId.toString()] = result[2][i].colTotal
        enrollmentCounts['841'] = result[3][0].grandTotal;
        enrollmentCounts.mostRecentDate = result[4][0].mostRecentDate ? result[4][0].mostRecentDate : ''
        res.json({ data: {...enrollmentCounts} })
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
    let keys = ['noncigarBaseLineSpecify', 'noncigarFollowUpSpecify', 'cancerOtherSpecify']
    keys.forEach(k => req.body[k] = req.body[k] ? req.body[k].replace(/\n/g, '\\n') : req.body[k])
    let body = JSON.stringify(req.body)
    let params = []
    params.push(req.params.id)
    params.push(body)
   

    mysql.callJsonProcedure(func, params, function (result) {
        
        if (result && result[0] && result[0][0].rowAffacted > 0) {
            if (Array.isArray(result[1])) {
                const updatedInfo = {}
                updatedInfo.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedInfo.status = result[2][0].status
                if (result[3]) updatedInfo.sectionStatusList = result[3]
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
    let keys = ['otherDeathSpecify', 'otherCodeSpecify']
    keys.forEach(k => req.body[k] = req.body[k] ? req.body[k].replace(/\n/g, '\\n') : req.body[k])
    let body = JSON.stringify(req.body)
    let params = []
    params.push(req.params.id)
    params.push(body)

    mysql.callJsonProcedure(func, params, function (result) {

        if (result && result[0] && result[0][0].rowAffacted > 0) {
            if (Array.isArray(result[1])) {
                const updatedMortality = {}
                updatedMortality.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedMortality.status = result[2][0].status
                if (result[3]) updatedMortality.sectionStatusList = result[3]
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
        const dlh = {}
        dlh.info = result[0]
        dlh.completion = result[1]
        dlh.files = result[2]
        dlh.website = result[3][0] ? result[3][0].website : ''
        logger.debug(dlh)
        if (Object.entries(dlh).length > 0)
            res.json({ status: 200, data: dlh })
        else
            res.json({ status: 500, message: 'failed to load data' })
    })
});

router.post('/update_dlh/:id', function (req, res) {
    let func = 'update_dlh'
    let body = {...req.body}
    let keys = ['dataOnlineURL', 'haveHarmonizationSpecify', 'haveDataLinkSpecify', 'createdRepoSpecify']
    keys.forEach(k => body[k] = body[k] ? body[k].replace(/\n/g, '\\n') : body[k])
    body.dataFileName = !body.dataFileName || body.dataFileName.status !== 1 ? '' : body.dataFileName.filename  
    let bodyJson = JSON.stringify(body)
    let params = []
    params.push(req.params.id)
    params.push(bodyJson)
   

    mysql.callJsonProcedure(func, params, function (result) {
        
        if (result && result[0] && result[0][0].rowAffacted > 0) {
            if (Array.isArray(result[1])) {

                const updatedDlh = {}
                updatedDlh.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedDlh.status = result[2][0].status
                if (result[3]) updatedDlh.sectionStatusList = result[3]
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
        const [result, result1] = await mysql.query('CALL update_cancer_info(?, ?)', [id, JSON.stringify(body)]);

        if (result && result[0] && result[0].success === 1) {
            if (result[0].duplicated_cohort_id) {
                res.json({ status: 200, message: 'update successful', data: { duplicated_cohort_id: result[0].duplicated_cohort_id, status: result[0].status, sectionStatusList: result1 } })
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
    let keys = ['bioOtherBaselineSpecify', 'bioOtherOtherTimeSpecify', 'bioMetaOutcomesOtherStudySpecify', 'bioLabsUsedForAnalysis', 'bioAnalyticalPlatform', 'bioSeparationPlatform']
    keys.forEach(k => req.body[k] = req.body[k] ? req.body[k].replace(/\n/g, '\\n') : req.body[k])
    let body = req.body
    for (let k of Object.keys(body.counts)) { if (body.counts[k] === '') body.counts[k] = 0 }
    body = JSON.stringify(body)
    let params = []
    params.push(req.params.id)
    params.push(body)
    //logger.debug(body)

    mysql.callJsonProcedure(func, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0)
            if (Array.isArray(result[1])) {
                const updatedSpecimen = {}
                updatedSpecimen.duplicated_cohort_id = result[1][0].duplicated_cohort_id
                if (result[2]) updatedSpecimen.status = result[2][0].status
                if (result[3]) updatedSpecimen.sectionStatusList = result[3]
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
    const { app, params, body, user } = request;
    const { mysql } = app.locals;
    let id = params ? params.id : undefined; // can be undefined (for new cohorts)

    try {
        response.json(await saveCohort(mysql, body, id, user));
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
                cancer: await mysql.query(`SELECT id, icd9, icd10, cancer FROM lu_cancer  ORDER BY icd9 = '', icd9`),
                case_type: await mysql.query(`SELECT id, case_type FROM lu_case_type`),
                cohort_status: await mysql.query(`SELECT id, cohortstatus FROM lu_cohort_status`),
                data_category: await mysql.query(`SELECT id, category, sub_category FROM lu_data_category`),
                ethnicity: await mysql.query(`SELECT id, ethnicity FROM lu_ethnicity`),
                gender: await mysql.query(`SELECT id, gender FROM lu_gender`),
                person_category: await mysql.query(`SELECT id, category FROM lu_person_category`),
                race: await mysql.query(`SELECT id, race FROM lu_race`),
                specimen: await mysql.query(`SELECT id, specimen, sub_category FROM lu_specimen`),
                allcohortlist: await mysql.query(`select distinct name,acronym as id, acronym from cohort`),
                admin: await mysql.query(`select first_name,last_name,email from user where access_level='SystemAdmin'`)
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
                    if (e.email) temp.push(e.email)
                specimenData.emails = temp.join(',')
            }

            for (let k of result[0])
                specimenData.counts[k.cellId] = k.counts
            res.json({ status: 200, data: specimenData })
        } else
            res.json({ status: 500, message: 'failed to retrieve data' })
    })

})

router.post('/reset_cohort_status/:id/:status/:uid?', function (req, res) {
    let func = 'reset_cohort_status'
    let params = []
    params.push(req.params.id, req.params.status, req.params.uid || 1)
    mysql.callProcedure(func, params, function (result) {
        if (result && result[0] && result[0][0].rowAffacted > 0)
            res.json({ status: 200, message: 'update was successful' })
        else
            res.json({ status: 500, message: 'update failed' })
    })
})

router.post('/approve/:id', async function (request, response) {
    const { app, params, body, user } = request;
    const { mysql } = app.locals;
    const id = params ? params.id : undefined; // can be undefined (for new cohorts)
    const userId = user.id;

    if (!/SystemAdmin/.test(user.role)) {
        return response.status(401).json('Unauthorized').end();
    }

    const { acronym } = (await mysql.query(`SELECT acronym from cohort where id = ?`, id))[0];
    await mysql.query(
        `update cohort
            set status = 'archived', update_time = now()
            where 
                acronym = ? and 
                status = 'published'`,
        acronym
    );

    const updates = {
        status: 'published',
        publish_by: userId,
        publish_time: new Date(),
        cohort_activity_log: [{
            user_id: userId,
            activity: 'published',
        }]
    }

    await saveCohort(mysql, updates, id, user);
    response.json(true);
})

router.post('/reject/:id', function (request, response) {
    const { app, params, body, user } = request;
    const id = params ? params.id : undefined; // can be undefined (for new cohorts)
    const userId = user.id;

    if (!/SystemAdmin/.test(user.role)) {
        return response.status(401).json('Unauthorized').end();
    }
    const { notes } = body;
    // const updates = {
    //     status: 'rejected',
    //     cohort_activity_log: [{
    //         user_id: userId,
    //         activity: 'rejected',
    //         notes,
    //     }]
    // }

    // await saveCohort(mysql, updates, id, session.user);
    // response.json(true);

    let func = 'reject_cohort_status'
    let params1 = []
    params1.push(id, userId, notes)
    mysql.callProcedure(func, params1, function (result) {
        if (result && result[0] && result[0][0].rowAffacted > 0)
            response.json(true)
        else
            response.json(false)
    });
    
})

export default router;