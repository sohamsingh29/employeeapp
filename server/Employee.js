const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name : String,
    email : String,
    phone : String,
    salary : String,
    position : String,
    image : String
});

mongoose.model('employee' , employeeSchema)