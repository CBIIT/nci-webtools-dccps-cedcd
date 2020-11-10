var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var logger = require('../components/logger');
var fs = require('fs')

router.post('/upload/:id/:category', async function(req, res, next) {
    let cohortFile = req.files.cohortFile
    //logger.debug(cohortFile.name)
    fs.access(`FileBank/CohortID_${req.params.id}`, (err)=>{
        if(err){
            fs.mkdirSync(`FileBank/CohortID_${req.params.id}`, { recursive: true }, (err) => {
                if (err) res.json({status: 500})
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
    mysql.callProcedure(proc, params, function(result){})
    res.json({status: 200})
})

router.post('/update_cohort_basic/:id', function(req, res){
    logger.debug(req.body)
    req.body.description = req.body.description.replace(/\n/g, '\\n')
    let body = JSON.stringify(req.body)
    let proc = 'update_cohort_basic'
    let params = []
    params.push(req.params.id)
    params.push(body)
    
    mysql.callJsonProcedure(proc, params, function(result){
        if(result && result[0] && result[0][0].rowsAffacted > 0)
            res.json({status:200, message:'update successful'})
        else
            res.json({status:500, message:'update failed'})
    })
    
})

router.post('/cohort_basic_info/:id', function(req, res){
    let id = req.params.id
    let func = 'get_cohort_basic_info'
    let params = [id]
    mysql.callProcedure(func, params, function(results){
        logger.debug(results)
        const basic_info = {}
        basic_info.investigators = []
        basic_info.cohort = results[0][0]
        basic_info.completer = results[1][0]
        basic_info.contacter = results[2][0]
        results[3].map((item) => {
            if(item.name){
                basic_info.investigators.push(item)
            }
        })
        basic_info.collaborator = results[4][0]
        basic_info.sectionStatus = results[5]
        res.json({status:200, data: basic_info})
    })
})

router.post('/upload/files', function(req, res){
    
})

router.post('/upsert_enrollment_counts/:id', function(req, res){
    let body = JSON.stringify(req.body)
    let proc = 'upsert_enrollment_count'
    let params = []
    params.push(req.params.id)
    params.push(body)
    
    mysql.callJsonProcedure(proc, params, function(result){
        if(result && result[0] && result[0][0].rowsAffacted > 0)
            res.json({status:200, message:'update successful'})
        else
            res.json({status:500, message:'update failed'})
    })
    
})

router.post('/enrollment_counts/:id', function(req, res){
    let id = req.params.id
    let func = 'get_enrollment_counts'
    let params = []
    params.push(id)
    mysql.callProcedure(func, params, function(result){
        logger.debug(result)
        const enrollmentCounts = {}
        enrollmentCounts.details = result[0]
        enrollmentCounts.rowTotals = result[1]
        enrollmentCounts.colTotals = result[2]
        enrollmentCounts.grandTotal = result[3][0]
        enrollmentCounts.mostRecentDate = result[4][0]
        res.json({data: enrollmentCounts})
    })

})

module.exports = router