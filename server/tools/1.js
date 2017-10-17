db.getCollection('csubmission').aggregate(
  {"$sort":{ctime:-1}},
  {"$group":{"_id":{"uid":"$uid","pid":"$pid"},"ctime":{"$max":"$ctime"},"score":{"$first":"$score"}}}
)
