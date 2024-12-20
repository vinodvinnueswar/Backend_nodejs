
const Vendor = require('../modles/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');

dotEnv.config();

const secretKey = process.env.WhatIsYourName 


const vendorRegister = async (req,res) =>{
    const {username,email,password} = req.body; 

    try {
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json('Email already taken');
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const newVendor = new Vendor({
            username,
            email,
            password : hashedPassword
        });

        await newVendor.save();

        res.status(201).json({message: "vendor registered successfully"} );
        console.log("registered");
         
        
    } catch (error) {

        console.error(error); 
        return res.status(500).json({error: "internal server error"})
        
    }

}

const vendorLogin = async(req,res) => {
    const{email,password} = req.body;
  
  try {
    const vendor = await Vendor.findOne({email}) ;

    if(!vendor || !(await  bcrypt.compare(password , vendor.password))){
        return res.status(401).json({error: "Invaild username or password"});
    } 
    const token = jwt.sign({vendorId : vendor._id}, secretKey, {expiresIn:"1h"}  )

    res.status(200).json({success:"Login succesful",token})
    console.log(email,"this is a token",token); 
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:"Internal server error "});
  }

}


const getAllVendors = async(req,res) => {

   try {
      const vendors = await Vendor.find().populate('firm');
      res.json ({vendors})
   } catch (error) {
    console.error()
    res.status(500).json({error:"Internal server error "});
    
   }

}

const getSingleVendor = async(req,res) =>{
   
    const vendorId = req.params.id;

    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
      if(!vendor){
        return res.status(404).json({error:"Vendor not found"});
      }
      res.status(200).json({vendor})


    } catch (error) {

        console.log(error);
        res.status(500).json({error:"Internal server error"});
        
    }

}


module.exports = {vendorRegister , vendorLogin , getAllVendors , getSingleVendor}