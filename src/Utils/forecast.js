var request = require('request')

const forecast=((lattitude,logititude,callback)=>{
    const url='https://api.darksky.net/forecast/f55bf8229721dd421bda9a13f9107390/'+logititude+','+lattitude
    
    request({url ,json:true}, (error,{body})=> { 
   
      if(error){
        callback("Unable to connect to weather service")
      }
      else if(body.error){
        callback("Unable to find location")
      }
      else{
      callback(undefined,{
        temperature:body.currently.temperature,
        precipProbability:body.currently.precipProbability 
       
    })
      }
    
  });
   })
  
   module.exports=forecast