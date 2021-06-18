const redis = require('redis');

// redis.createClient(port, hostname);
const client = redis.createClient(); // uses localhost and 6379 by default

client.on('connect',()=>{
    console.log('connected to redis')
})

// HANDLING BASIC KEY VALUE PAIR
const handleKeyValuePair = ()=>{
    client.set(1,'Kaushik');
    client.set([2, 'Roopkala'],(err,reply)=>{
        (err) ? console.log(`error: ${err}`) : console.log(reply);
    })
    
    client.get(1,(err,reply)=>{
        (err) ? console.log(`error: ${err}`) : console.log(`1 => ${reply}`);
    })
    client.get(3,(err,reply)=>{
        if(err) console.log(`error: ${err}`)
        else{
            if(reply === null)console.log('the key has no value')
            else console.log(`3 => ${reply}`)
        }
    })
    
}

// HANDLING OBJECTS
const handlingObjects = ()=>{
    const technology = {
        backend: `nodejs`,
        frontend: `angular`,
        css: `bootstrap`
    }

    client.hmset('technology',technology,(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })
    
    client.hgetall('technology',(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })
    
}

// HANDLING ARRAYS => works only in redis >2.4
const handleArray = ()=>{
    const key = `frontendFrameworks`;
    const values = [`react`, `angular`, `vue`];

    // client.lpush() can also be used
    client.rpush([key, ...values],(err,reply)=>{
        (err)? console.log(`error: ${err}`) : console.log(reply)
    })

    client.lrange(key,0,-1,(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })
}

// HANDLING SET (list without duplicates)
const handleSet = ()=>{
    const key = `frontendFrameworks`;
    const values = [`react`, `angular`, `vue`, 'vue'];
    client.sadd([key, ...values],(err,reply)=>{
        (err)? console.log(`error: ${err}`) : console.log(reply)
    })
    client.smembers(key, function(err, reply) {
        console.log(reply);
    });
}

// SOME USEFUL FUNCTIONS
const usefulFunctions = ()=>{
    const key = `frontendFrameworks`

    // check if a key exists or not
    client.exists(key,(err,reply)=>{
        if(err) console.log(err);
        else (reply === 1)?console.log(`key exists`):console.log(`key does not exist`);
    })

    // add expiry time to keys
    client.expire(key,30,(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })

    // delete a key
    client.del(key,(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })

    // increment, decrement 
    client.set('key',10)
    client.incr('key',(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })

    client.decr('key',(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })
    
    client.incrby('key',5,(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })
    
    client.decrby('key',3,(err,reply)=>{
        (err)?console.log(err):console.log(reply)
    })
}

handleKeyValuePair()
handlingObjects()
handleArray()
handleSet()
usefulFunctions()