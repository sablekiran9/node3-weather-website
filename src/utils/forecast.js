const request=require('request')

const forecast=(lat,long,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=5b861a23a326a0aed749d9f7cf7d9fff&query='+lat+','+long
    request({url:url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather service')
        }
        else if(body.error)
        {
            callback('Unable to find location')
        }
        else
        {
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature +' degree out,It feels like '+body.current.feelslike +' degress out. Humidity is '+ body.current.humidity +'%')
        }
    })
}
module.exports=forecast