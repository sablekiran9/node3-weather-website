const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const port = process.env.PORT || 3000
const app =express()
//Define path for express config
const publicDirectoryPath=(path.join(__dirname,'../public'))
const viewsDirectoryPath=(path.join(__dirname,'../templates/views'))
const partialPath = path.join(__dirname,'../templates/partials')

//setup handler enginee and location
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialPath)

//setup static directory 
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kiran'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Kiran'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help',
        name:'Kiran'

    })
})                
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send(
        {
            product:[]
        }
        
    )
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send(
            {
                error:'Address must be provided'
            }
        )
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>
    {
        if(error)
        {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            res.send(
                {
                    forecast:forecastData,
                    location,
                    address:req.query.address
                }
            )
          })
         
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',
        {
            title:'404',
            name:'Kiran',
            errorMessage:'Help Article not found'
        }
    )
})
app.get('*',(req,res)=>{
    res.render('404',
    {
        title:'404',
        name:'Kiran',
        errorMessage:'Page not found'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})
