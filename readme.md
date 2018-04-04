# moon-oj

**Moon Online Judge**是一个为中学信息学设计的开源OJ平台,这里存放的是前后端代码,评测端代码在[这里](https://github.com/RainboyOnlineJudge/rjudge)

## 一.安装

### 1.1 FrontEnd(前端安装)

```bash
# clone 代码
git clone https://github.com/RainboyOnlineJudge/moonoj.git

# 进入目录
cd moonoj

# 安装相应的包
npm i 
# cnmp i

# 编译
npm run fb

# FrontEnd/dist 为编译出来的前端
```

### 1.2 配置 server 端

修改配置文件`server/config/index.js`

创建相应的目录:
todo

复制相应的头像
todo

安装相应的包

```bash
cd server
npm i
#cnpm i
```

启动mongodb数据库`mongod --dbpath = your_path`

