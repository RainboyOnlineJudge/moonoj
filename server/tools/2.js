
db.getCollection('csubmission').group({
  "key":{"pid":true},
  "initial":{"ctime":0,"score":0},
  "$reduce":function(doc,prev){
    if(doc.ctime > prev.ctime){
      prev.ctime = doc.ctime;
      prev.score = doc.score;
    }
  },
  "condition":{"cid":1,"uid":"rainboy1"}
})
