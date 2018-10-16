## 配置


配置api地址

`config.js`里的`server_api`


## vuex 设计

user:

 - token
 - islogined

action:

 - checkIslogined




```

get window.localStroge.token


```


路由设计

```
user: 用户登录方面页面
/login
/reg
/info


header

题目
/problem/list/1
/problem/pid/1
/problem/submit/1 提交列表

比赛
/contest/list/1
/contest/1    哪个题目

/constest/1/info 这个比赛提交信息

/contest/pid/1/info 这个题目的提交信息

```

## index页面设计

 - 欢迎来到moon-oj:xxxx 
 - 积分排名表
 - 近期提交图表

```

 +----------------------------------------------------------+
 |  背景图                                                  |
 |                                                          |
 |        欢迎来到moon-oj                                   |
 |                  user-avatar                             |
 |                    name                                  |
 |                                                          |
 |                                                          |
 |                                                          |
 |                                                          |
 +----------------------------------------------------------+
```


## contest设计

 - contest 列表页面
 - contest 题目列表页面
 - contest 题目提交记录页面 / 考试结束后发送数据
 - contest 比赛结果排名
 - contest 参加选手提交

 - 题目页面
 - 题目提交记录
 - 题目排名
