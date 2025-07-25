const express=require("express")
const path=require("path")
const hbs=require("hbs")

require("./db/conn");
const register=require("./models/userregister");

const app=express();
const port= 80;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set('view engine','hbs')
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/about',(req,res)=>{
    res.render("about")
})
app.get('/contact',(req,res)=>{
    res.render("contact")
})

app.get('/login',(req,res)=>{
    res.render("login")
})

app.get('/menu',(req,res)=>{
    res.render("menu&pricing")
})

app.post('/register',async (req,res)=>{
    try {
        const password= req.body.password;
        const cpassword= req.body.confirmpassword;
        if(password===cpassword){
            const registerCustomer=new register({
                Name:req.body.Name,
                email:req.body.email,
                phone:req.body.phone,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword
            })
            const registered=await registerCustomer.save();
            res.status(200).render("login");
        }else{
            res.send("passwords not matching")
        }
    } 
    catch (error) {
        res.status(404).send(error)
    }
})

app.post('/login',async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const useremail=await register.findOne({email:email});
        
        if (useremail.password===password) {
            res.status(200).render("index")
        }else{
            res.send("invalid username or password")
        }
    } catch (error) {
        res.status(400).send("passwords not matching"+error)
    }
})

app.listen(port,()=>{
    console.log("listening....")
})