var request = require('request-promise')
var Promise = require('bluebird')
var config = require('../config/index.js')
var fs = require('fs')
var path = require('path')

var client_io = require('socket.io-client')
var jwt = require("jsonwebtoken")
var objectId = require('mongoose').Types.ObjectId

/* 
 * info:题目相关信息
 *  cid:比赛id
 *  pid:题目id
 *  uid:用户id
 * post_data:
 *  max_memory: Number mb
 *  max_time:   1000  ms
 *  problem_id
 *  lang: cpp,c
 *  code: "#include <>"
 *  judger_indicator
 * 
 * */

function Judge(){
    this.judge_server_url = config.judge_server_url
    this.judge_server_token = config.judge_server_token

    //server 连接评测机 
    this.rjudge  = client_io.connect(this.judge_server_url)
    // rjudge 的监听
    
    let rjudge_deals = U.autoload(path.join(__dirname,'rjudge_deal_function') )

    for( key in rjudge_deals){
        debug("监听rjudge server:",key)
        this.rjudge.on(key,rjudge_deals[key])
    }


    this.NSP = NSP

    // web 连接server 的处理
    this.NSP.on('connect',this.post())

}


Judge.prototype.post= require("./webClient_deal_function/post_judge.js")
//Judge.prototype.normal = require("./normal.js")
//Judge.prototype.contest = require("./contest.js")


function createJudgeClass(){
    return new Judge()
}

module.exports = createJudgeClass

