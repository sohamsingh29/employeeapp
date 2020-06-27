const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')
app.use(bodyParser.json())

const password ='LLx6awGWU6TExr6P'

const mongoUri = 'mongodb+srv://cnq:LLx6awGWU6TExr6P@cluster0-kv5pq.mongodb.net/test?retryWrites=true&w=majority'
const Employee =  mongoose.model('employee')

mongoose.connect(mongoUri , {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.connection.on('connected' , ()=> {
    console.log('yeah connected awesome!!')
});
mongoose.connection.on('error' , (err)=> {
    console.log('sheet!', err)
});


app.get('/', (req,res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Employee.find({})
    .then(data => res.send(data))
    .catch(err => console.log(err))

})

app.post('/send-data',(req,res)=> {
    const person = new Employee({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        salary : req.body.salary,
        position : req.body.position,
        image : req.body.image
    })
    person.save().then(data=> {
        console.log(data)
        res.send(data)
    })
    .catch(err=> {
        console.log(err)
    })
})

app.post('/delete' , (req,res)=> {
    Employee.findByIdAndRemove(req.body.id)
    .then(data=> {
        console.log(data)
        res.send(data)
    })
    .catch(err => console.log(err))
})

app.post('/update' , (req , res)=> {
    Employee.findByIdAndUpdate(req.body.id, {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        salary : req.body.salary,
        position : req.body.position,
        image : req.body.image
    })
    .then(data => {
        console.log(data)
        res.send('updated')
    })
    .catch(err => console.log(err))
})

app.listen('3000', ()=> {
    console.log('server is running')
})

