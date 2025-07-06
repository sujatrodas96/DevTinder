const validator = require("validator");

const validatesignupdata = (req) => {
    
    const { firstname, lastname, email, password, gender} = req.body;
    if(!firstname || !lastname){
        throw new Error("Please Enter the FirstName Lastname");
    }else if(firstname.length < 3 || firstname.length > 10){
        throw new Error("Name is not Valid");
    }else if(!validator.isEmail(email)){
        throw new Error("Email is not Valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong password");
    }else if(!gender){
        throw new Error("Please Enter the Gender");
    }
}

module.exports = {validatesignupdata};