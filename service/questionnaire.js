var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var logger = require('../components/logger');


router.post('/update_cohort_basic/:id', function(req, res){
    let body = JSON.stringify(req.body)
    let proc = 'update_cohort_basic'
    let params = []
    params.push(req.params.id)
    params.push(body)
    //logger.debug(params)
    
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
        results[0][0].requireNone = results[0][0].requireNone === '1'
        results[0][0].requireCollab = results[0][0].requireCollab === '1'
        results[0][0].requireIrb = results[0][0].requireIrb === '1'
        results[0][0].requireData = results[0][0].requireData === '1'
        results[0][0].restrictGenoInfo = results[0][0].restrictGenoInfo === '1'
        results[0][0].restrictOtherDb = results[0][0].restrictOtherDb === '1'
        results[0][0].restrictCommercial = results[0][0].restrictCommercial === '1'
        results[0][0].restrictOther = results[0][0].restrictOther === '1'
        const basic_info = {}
        basic_info.investigators = []
        basic_info.cohort = results[0][0]
        basic_info.completer = results[1][0]
        basic_info.contacter = results[2][0]
        results[3].map((item) => {
            if(item.investigatorName){
               let temp = {}
                temp.piName = item.investigatorName
                temp.piInstitution = item.investigatorInstitution
                temp.piEmail = item.investigatorEmail
                basic_info.investigators.push(item)
            }
        })
        basic_info.collaborator = results[4][0]
        res.json({status:200, data: basic_info})
    })
})

router.post('/upsert_enrollment_counts/:id', function(req, res){
    let body = JSON.stringify(req.body)
    let proc = 'upsertEnrollment_count'
    let params = []
    params.push(req.params.id)
    params.push(body)
    logger.debug(params)
    
    mysql.callJsonProcedure(proc, params, function(result){
        if(result && result[0] && result[0][0].rowsAffacted > 0)
            res.json({status:200, message:'update successful'})
        else
            res.json({status:500, message:'update failed'})
    })
    
})

module.exports = router