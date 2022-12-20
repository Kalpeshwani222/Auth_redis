const redis = require('redis');

const client = redis.createClient({
     PORT: 6379,
    host : "127.0.0.1",
    legacyMode: true,
});

client.connect();


client.on('connect', () =>{
    console.log('client connected to redis');
});


client.on('ready', () =>{
    console.log('client connected to redis and ready to use');
});


client.on('error', (err)=>{
    console.log("error" + err.message);
})

 

client.on('end', ()=>{
    console.log('client disconnected to redis');
})


process.on('SIGINT', ()=>{
    client.quit();
})


module.exports = client;