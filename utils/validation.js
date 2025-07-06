const validator = require("validator");

const validatesignupdata = (req) => {
    
    const { firstname, lastname, email, password, age, gender} = req.body;
    if(!firstname || !lastname){
        throw new Error("Please Enter the FirstName Lastname");
    }else if(firstname.length < 3 || firstname.length > 10){
        throw new Error("Name is not Valid");
    }else if(!validator.isEmail(email)){
        throw new Error("Email is not Valid");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong password");
    }else if(!age){
        throw new Error("Please Enter the Age");
    }else if(age < 18){
        throw new Error("Age Should be 18 or 18+");
    }else if(!gender){
        throw new Error("Please Enter the Gender");
    }
}

const validateprofileeditdata = (req) => {
    
    const allowededitfields = [
        "firstname",
        "lastname",
        "email",
        "about",
        "age",
        "gender",
        "profile",
    ];
    const isEditAllowed = Object.keys(req.body).every(field => allowededitfields.includes(field));

    return isEditAllowed;
}

module.exports = {validatesignupdata,validateprofileeditdata};