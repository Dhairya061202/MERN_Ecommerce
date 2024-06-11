const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path');
const cors = require('cors');
const { type } = require('os');
const { error } = require('console');

app.use(express.json());
app.use(cors());


//Database Configuration
mongoose.connect("mongodb+srv://dhairyapandya00:Dp%40612%402@cluster0.hntmuui.mongodb.net/e-commerceGS")

// API Creation

app.get("/",(req,res)=>{
    res.send("heloooooo")
})

// Image Storage Engine
const storage =  multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cd)=>{
        return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


//schema for user
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// creating endpoint register
app.post('/signup', async(req,res)=>{
    try {
        let check = await Users.findOne({email:req.body.email});
        if(check){
            return res.status(400).json({
                sucess:false,
                error:"exiting user found with same email address"
            })
        }
        //created empty cart data
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i]=0;
        }
        
        const user = new Users({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        await user.save()
        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data,'secret_ecom')
        res.json({
            success:true, 
            token
        })   
    } catch (error) {
        console.log(error)
    }
})

// creating endpoint fro login
app.post('/login',async(req,res)=>{
    try {
        
        let user = await Users.findOne({email:req.body.email})
        if(user){
            const passCompare = req.body.password === user.password
            if(passCompare){
                const data={
                    user:{
                        id:user.id,
                    }
                }
                const token = jwt.sign(data,'secret_ecom');
                res.json({success:true,token})
            }
            else{
                res.json({success:false,error:"password is incorrect"})
            }
        }
        else{
            res.json({success:false,error:"Signup first"})
        }
        

    } catch (error) {
        console.log(error)
    }
})


// schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    new_price:{
        type:Number,
        required: true
    },
    old_price:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true
    },
})

app.post('/addproduct',async(req,res)=>{
    try {
        let products = await Product.find({})
        let id;
        if(products.length>0){
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id+1;
        }
        else{
            id=1;
        }
        const product = new Product({
            id:id,
            name:req.body.name,
            image:req.body.image,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price,
        });
        console.log(product);
        await product.save();
        console.log("saved")
        res.json({
            success:true,
            name:req.body.name,
        })


    } catch (error) {
        console.log(error)
    }
})


//create API for deleting Products
app.post('/removeproduct',async(req,res)=>{
    try {
        
        await Product.findOneAndDelete({id:req.body.id})
        console.log("removed")
        res.json({
            success:true,
            name:req.body.name
        })

    } catch (error) {
        console.log(error);
    }
})


//Creating API for getting all product
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched")
    res.send(products);
})

//creating endpoint for newcollection data
app.get('/newcollection', async(req,res)=>{
    try {
        let products = await Product.find({})
        let newcollection = products.slice(1).slice(-8)
        console.log("new collection fetched");
        res.send(newcollection)
    } catch (error) {
        console.log(error)
    }
})

//creating endpoint for popular data
app.get('/popularinwomen',async(req,res)=>{
    try {
        let products = await Product.find({category:"women"})
        let popular_in_women = products.slice(0,4);
        console.log("popular in women fetched")
        res.send(popular_in_women)
    } catch (error) {
        console.log(error)
    }
})

//creating middleware to fetch user
const fetch_user = async(req,res,bext)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch (error) {
            res.status(401).send({error:"please authenticate using a valid token"})
        }
    }
}

//creating endpoints for adding product in cartdata
app.post('/addtocart',fetch_user, async(req,res)=>{
    try {
        console.log(req.body,req.user);
    } catch (error) {
        console.log(error)
    }
})

app.listen(port,(error)=>{
    if(!error){
        console.log('Server Running on port '+port)
    }
    else{
        console.log("error :" +error)
    }
})