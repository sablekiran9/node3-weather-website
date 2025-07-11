const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXluYW1laXNrayIsImEiOiJja2RmZWQycGkxdjFyMnptaGRrbmlrbzZjIn0.ZiU0k0Kq5Vtfidqh79kZ1Q&limit=1'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect location Services')
        }
        else if(body.features.length===0)
        {
            callback('Unable to find location, Location is not valid')
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode


