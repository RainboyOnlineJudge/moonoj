// 发送评测的模块

import io from 'socket.io-client';
import {g_config,judge_config} from '../config.js'  //引入全局变量
import store from '../vuex/index.js' //引用vuex

function post(self,_data_){

    let socket = io("http://localhost:3000/judge");

    //计时
    let timeOutId = setTimeout(function(){
      self.deal_function('connect-failed')
      socket.close()
    },g_config.judge_connecet_timeout)


    socket.on('connect', function(){
        clearTimeout(timeOutId)
        //连接成功
        console.log("连接sever评测io成功!")
        self.deal_function('connected')
        //发送数据
        _data_.token = store.getters.token
        socket.emit('post_judge',_data_)
    });
  
    //连接错误
    socket.on('error',function(val){
      self.deal_function('error',val)
    })

    //监听
    socket.on('judge_response',function(data){
      self.deal_function('normal',data)
      if( data.mid ==judge_config['END_JUDGE'] || data.status == -1){
        console.log("关闭连接")
        socket.close()
      }
    })
}
export default post
