const express = require("express");
const dotEnv = require("dotenv");
 const mongoose = require("mongoose");
 const vendorRoutes = require('./routes/vendorRoutes');
 const bodyPraser = require('body-parser');
 const firmRoutes = require('./routes/firmRoutes');
 const productRoutes= require('./routes/productRoutes');

const app = express()

const PORT = 4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch((error) => console.log(error))  

app.use(bodyPraser.json());
app.use('/vendor' ,vendorRoutes);
app.use('/firm',firmRoutes); 
app.use('/product',productRoutes);

app.listen(PORT , ()=>{
    console.log(`server started at   ${PORT}`);
});

app.use('/home',(req,res) => {
    res.send("<h2>Welcome home</h2>")
})