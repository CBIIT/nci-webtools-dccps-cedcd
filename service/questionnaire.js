var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var logger = require('../components/logger');
var cache = require('../components/cache');
var fs = require('fs')

router.post('/upload/:id/:category', async function (req, res, next) {
    let cohortFile = req.files.cohortFile
    //logger.debug(cohortFile.name)
    fs.access(`FileBank/CohortID_${req.params.id}`, (err) => {
        if (err) {
            fs.mkdirSync(`FileBank/CohortID_${req.params.id}`, { recursive: true }, (err) => {
                if (err) res.json({ status: 500 })
            });
            cohortFile.mv(`FileBank/CohortID_${req.params.id}/${cohortFile.name}`)
        }
        else
            cohortFile.mv(`FileBank/CohortID_${req.params.id}/${cohortFile.name}`)
    })
    let proc = 'add_file_attachment'
    let params = []
    params.push(req.params.id)
    params.push(req.params.category)
    params.push(cohortFile.name)
    mysql.callProcedure(proc, params, function (result) { })
    res.json({ status: 200 })
})

router.post('/update_cohort_basic/:id', function (req, res) {
    logger.debug(req.body)
    req.body.cohort_description = req.body.cohort_description.replace(/\n/g, '\\n')
    let body = JSON.stringify(req.body)
    let proc = 'update_cohort_basic'
    let params = []
    params.push(req.params.id)
    params.push(body)

    mysql.callJsonProcedure(proc, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0)
            res.json({ status: 200, message: 'update successful' })
        else
            res.json({ status: 500, message: 'update failed' })
    })

})

router.post('/cohort_basic_info/:id', function (req, res) {
    let id = req.params.id
    let func = 'get_cohort_basic_info'
    let params = [id]
    mysql.callProcedure(func, params, function (results) {
        //logger.debug(results)
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

        res.json({ status: 200, data: basic_info })
    })
})

router.post('/upload/files', function (req, res) {

})

router.post('/upsert_enrollment_counts/:id', function (req, res) {
    let body = JSON.stringify(req.body)
    let proc = 'upsert_enrollment_count'
    let params = []
    params.push(req.params.id)
    params.push(body)

    mysql.callJsonProcedure(proc, params, function (result) {
        if (result && result[0] && result[0][0].rowsAffacted > 0)
            res.json({ status: 200, message: 'update successful' })
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
        if (result && result[0] && result[0][0].rowAffacted > 0)
            res.json({ status: 200, message: 'update successful' })
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
        mortality.completion = result[1]

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
        if (result && result[0] && result[0][0].rowAffacted > 0)
            res.json({ status: 200, message: 'update successful' })
        else
            res.json({ status: 500, message: 'update failed' })
    })
});

router.get('/cancer_count', async (request, response) => {
    const { mysql } = request.app.locals;
    try {
        const records = await mysql.query(
            `SELECT * FROM cancer_count WHERE cohort_id = ?`,
            request.query.cohort_id
        );
        response.json(records);
    }
    catch (e) {
        logger.error(e);
        response.status(500).json({ message: 'could not fetch cancer_info' })
    }
});

router.post('/cancer_count', async (request, response) => {
    const columns = [
        'cohort_id',
        'cancer_id',
        'gender_id',
        'case_type_id',
        'cancer_counts',
    ];

    try {
        for (const record of request.body)
            await mysql.upsert({ table: 'cancer_count', columns, record });
        response.json({ status: 200, message: 'update successful' });
    } catch (e) {
        logger.error(e);
        response.json({ status: 500, message: 'update failed' });
    }
});

router.get('/cancer_info', async (request, response) => {
    const { mysql } = request.app.locals;
    try {
        const records = await mysql.query(
            `SELECT * FROM cancer_info WHERE cohort_id = ?`,
            request.query.cohort_id
        );
        response.json(records.length ? records[0] : null);
    }
    catch (e) {
        logger.error(e);
        response.status(500).json({ message: 'could not fetch cancer_info' })
    }
});

router.post('/cancer_info', async (request, response) => {
    const columns = [
        'cohort_id',
        'ci_confirmed_cancer_year',
        'ci_ascertained_self_reporting',
        'ci_ascertained_tumor_registry',
        'ci_ascertained_medical_records',
        'ci_ascertained_other',
        'ci_ascertained_other_specify',
        'ci_cancer_recurrence',
        'ci_second_primary_diagnosis',
        'ci_cancer_treatment_data',
        'ci_treatment_data_surgery',
        'ci_treatment_data_radiation',
        'ci_treatment_data_chemotherapy',
        'ci_treatment_data_hormonal_therapy',
        'ci_treatment_data_bone_stem_cell',
        'ci_treatment_data_other',
        'ci_treatment_data_other_specify',
        'ci_data_source_admin_claims',
        'ci_data_source_electronic_records',
        'ci_data_source_chart_abstraction',
        'ci_data_source_patient_reported',
        'ci_data_source_other',
        'ci_data_source_other_specify',
        'ci_collect_other_information',
        'ci_cancer_staging_data',
        'ci_tumor_grade_data',
        'ci_tumor_genetic_markers_data',
        'ci_tumor_genetic_markers_data_describe',
        'ci_histologically_confirmed',
        'ci_cancer_subtype_histological',
        'ci_cancer_subtype_molecular',
        'mdc_acute_treatment_toxicity',
        'mdc_late_effects_of_treatment',
        'mdc_symptoms_management',
        'mdc_other_cancer_condition',
        'mdc_other_cancer_condition_specify',
    ];

    try {
        await mysql.upsert({ table: 'cancer_info', columns, record: request.body });
        response.json({ status: 200, message: 'update successful' });
    } catch (e) {
        logger.error(e);
        response.json({ status: 500, message: 'update failed' });
    }
});

router.get('/lookup', async (request, response) => {
    let { locals } = request.app;
    let { lookup, mysql } = locals;

    if (!lookup) {
        locals.lookup = lookup = {
            cancer: await mysql.query(`SELECT id as value, icd9, icd10, cancer FROM lu_cancer ORDER BY icd9 = ''`),
            case_type: await mysql.query(`SELECT id as value, case_type as label FROM lu_case_type`),
            category: await mysql.query(`SELECT id as value, category as label FROM lu_person_category`),
            cohort_status: await mysql.query(`SELECT id as value, cohortstatus as label FROM lu_cohort_status`),
            data_collected_category: await mysql.query(`SELECT id as value, category, sub_category FROM lu_data_category`),
            ethnicity: await mysql.query(`SELECT id as value, ethnicity as label FROM lu_ethnicity`),
            gender: await mysql.query(`SELECT id as value, gender as label FROM lu_gender`),
            race: await mysql.query(`SELECT id as value, race as label FROM lu_race`),
            specimen: await mysql.query(`SELECT id as value, specimen as label, sub_category FROM lu_specimen`),
        }
    }

    response.json(lookup);
});

module.exports = router