## judge

| api    | 作用                  |
|--------|-----------------------|
| /judge | 发送测试数据,请求评测 |


发送的数据:

json

```
pid: 题目的id
#uid:根据jwt得到
model: normal,person-low,评测模式
lang:c cpp
code:
```
