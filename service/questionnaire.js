var express = require('express');
var router = express.Router();
var mysql = require('../components/mysql');
var logger = require('../components/logger');

router.post('/update_cohort_basic/:id', function(req, res){
    let body = JSON.stringify(req.body)
    let proc = 'updateCohort_basic'
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

module.exports = router