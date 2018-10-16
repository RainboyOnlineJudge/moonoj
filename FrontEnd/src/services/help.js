import api from './index.js'

export var help = function(){
  return api.get('help')
}


