

## 用户设计


### 用户db-model

```
用户名:string
真实姓名:string
密码:md5-string
avatar:string
注册时间:Date
分数:Number
通过的题目编号:Object
{
    -key-:-id-
}
introduction(个人介绍,短语):string
hidden: false 是否可用

虚拟属性:
    通过的题目数量
```

### invite-model设计

```
_id
exp:Date 时间
used:Boolean
```
### 用户API

| API         | 作用                          |
|-------------|-------------------------------|
| /user/login | 登录                          |
| /user/reg   | 注册                          |
| /user/info  | 用户信息,通过的题目,分值,头像 |


## 普通题目

## model设计

```
_id:Number
title:题目名称
content:Markdown
passed:通过的题目数量
posted:提交的题目数据
score:分值
hidden:是否显示
```

### API

| API           | 方法 | 作用         |
|---------------|------|--------------|
| /pid/id       | get  | 发送题目数据 |
| /pid/judge/id | post | 提交测试     |

## 比赛题目

同上

| API            | 方法 | 作用         |
|----------------|------|--------------|
| /cpid/id       | get  | 发送题目数据 |
| /cpid/judge/id | post | 提交测试     |

## 普通题目提交/测试信息

## db-modle


```
_id:Number
posterID: 提交用户的id
pid:题目的id
lang:'c',"cpp","pas",提交的语言
code: 提交的代码
post_time:提交的日期
info:Number , 相关信息,0,还没有测试好, -1 compile_error,result里存的是ce信息, 1 评测结束
result:array, 结果,如果是
time:   s ,总用时
memroy: kb,总内存
```


## API

| API           | 方法 | 作用         |
|---------------|------|--------------|
| pj/           | post | 提交测试信息 |
| pj/id         | get  | 轮循得到信息 |
| pj/?uid=&pid= | get  | 得到信息     |


## Admin用户

### API

| API                     | 方法                      | 作用             |
|-------------------------|---------------------------|------------------|
| admin/invitecode/       | post                      | 创建邀请码       |
| admin/post/prolem       | post                      | 创建题目         |
| admin/post/problem/id   | post  multipart/form-data | 上传题目数据     |
| amdin/post/contest      | post                      | 创建比赛         |
| admin/post/cprolem      | post                      | 创建题目         |
| admin/post/cproblem/id  | post  multipart/form-data | 上传题目数据     |
| admin/user/all/?start=1 | get                       | 得到批量用户信息 |
| admin/user/uid/:id      | get                       | 得到个人用户信息 |
| admin/user/del/         | post                      | 批量删除用户     |
| admin/user/change/      | post                      | 修改用户信息     |
