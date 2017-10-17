var request = require('request-promise')
var Promise = require('bluebird')
var config = require('../config/index.js')
var fs = require('fs')
var path = require('path')
var post = require('./post.js')

/* 
 * info:题目相关信息
 *  cid:比赛id
 *  pid:题目id
 *  uid:用户id
 * post_data:
 *  max_memory: Number mb
 *  max_time:   1000  ms
 *  problem_id
 *  lang: cpp,pas,c
 *  r_url
 *  code: "#include <>"
 *  judger_indicator
 * 
 * */

function Judge(){
  this.judge_server_url = config.judge_server_url
  this.judge_server_token = config.judge_server_token
}


Judge.prototype.post= post

Judge.prototype.normal = require("./normal.js")

Judge.prototype.contest = require("./contest.js")


function createJudgeClass(){
    return new Judge()
}

module.exports = createJudgeClass

