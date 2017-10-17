## 说明

judge模块的作用:

 - 和judge_server 通信
 - 模块分为以下几种模式:
   - normal     普通题目的测评,即时评测
   - person-normal 个人比赛-普通模式,多次提交,定时评测
   - person-low    个人比赛-低模式,即时评测,定时评测
   - person-strict 个人比赛-严格模式,一次提交,定时评测

### judge的设计图

setInvert定时


interval-格式:
cid, pid ,uid
```
{
  'cid-pid-uid':{
    time:
    sids:
  }
}
```

## judge模块的属性,方法


方法:


 - post 和judge_server通信,发送judge数据
 - 定时功能,定时post一组评测数据,需要csubmisson的id


