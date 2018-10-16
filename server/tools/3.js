var a = []


for(let i = 1 ;i <10;i++) 
{
  let x = parseInt( Math.random()*100 );
  a.push({
    name:'rainboy'+x,
    count:x
  })
}

console.log(a)

a.sort(function(a,b){
  return a.count - b.count;
})
console.log(a)
