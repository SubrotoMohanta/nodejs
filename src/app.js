const express = require('express')
const path = require('path')
const hbs=require('hbs')
const app = express()
const port=process.env.PORT||3000
const geocode= require('./Utils/geocode.js')
const forecast= require('./Utils/forecast.js')

const publicdirectory=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicdirectory))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather Title',
        Application:'Weather Application'
    }
    )

})
app.get('/about',(req,res)=>{

    res.render('about',{
        title:'About',
        Created:'Subroto'
    }
    )

})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help',
        Content:'The content of help page'
    }
    )

})

app.get('/weather',  (req, res)=> {
    if(!req.query.address){

        return res.send({
            error:'You must provide a search term'})

      }
      console.log(req.query.address)
      const address=req.query.address
      geocode(address,(error,{lattitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
       
         forecast(lattitude, longitude, (error, forecadtdata) => {
           if(error){
            return res.send(error)
           }

           return res.send({
            forecast:forecadtdata,
            location:location
               })
          
           
         })
       })
     }
  )
  app.get('/products',  (req, res)=> {
      if(!req.query.search){

        return res.send({
            error:'You must provide a search term'})

      }
      console.log(req.query.search)
    res.send(
        [{
           products:[]
            
        }]
    )
  }
  )

  app.get('*',  (req, res)=> {
    res.render('404',{
        title:'404',
        Created:'Subroto'
    }
    )
  }
  )

app.listen(3000) 