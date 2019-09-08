var request = require('request')
const geocode=((address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3Vicm90b21vaGFudGEiLCJhIjoiY2swN3lpcnBlMDBhZTNocGFid3Z0Y3I2ZSJ9.g5YFYcpkBbM0izaCs97JWw'
    request({url,json:true}, (error,{body})=> { 
   
      if(error){
        callback("Unable to connect to weather service")
      }
      else if(body.error){
        callback("Unable to find location")
      }
      else{
      callback(undefined,{
       lattitude:body.features[0].center[1],
      longitude:body.features[0].center[0] ,
       location:body.features[0].place_name
    })
      }
    
  });
   })
    
   module.exports=geocode