const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
//const _ = require("lodash");

const app = express();
app.set('view-engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/projectDB");

const customerSchema = {
    id:Number,
    fname : String,
    lname : String,
    acc_num : String,
    email : String,
    addr : String,
    currBal:Number
};

const Customer = mongoose.model("Customer", customerSchema);

const cust1 = new Customer({
    id:0,
    fname: "Rupali",
    lname: "Pandey",
    acc_num : "2001330100XXX",
    email : "abcd@gmail.com",
    addr : "Kanpur, India",
    currBal: 50000
})

const cust2 = new Customer({
    id:1,
    fname: "Taylor",
    lname: "Swift",
    acc_num : "201330100XXX",
    email : "taylor@gmail.com",
    addr : "California",
    currBal:50000
})

const cust3 = new Customer({
    id:2,
    fname: "Selena",
    lname: "Gomez",
    acc_num : "200130100XXX",
    email : "sel@gmail.com",
    addr : "Lucknow, India",
    currBal:50000
})

const cust4 = new Customer({
    id:3,
    fname: "Akshay",
    lname: "Pandey",
    acc_num : "200133010XXX",
    email : "akshay@gmail.com",
    addr : "Kanpur, India",
    currBal:50000
})

const cust5 = new Customer({
    id:4,
    fname: "Arjun",
    lname: "Kanungo",
    acc_num : "200133000XXX",
    email : "arjunkanungo@gmail.com",
    addr : "Delhi, India",
    currBal:50000
})

const cust6 = new Customer({
    id:5,
    fname: "Arjit",
    lname: "Singh",
    acc_num : "200133000XXX",
    email:  "arjit@gmail.com",
    addr : "Mumbai, India",
    currBal:50000
})

const cust7 = new Customer({
    id:6,
    fname: "Farhan",
    lname: "Sayeed",
    acc_num : "200133000XXX",
    email : "farhan@gmail.com",
    addr : "Lahore, Pakistan",
    currBal:50000
})

const cust8 = new Customer({
    id:7,
    fname: "Zayn",
    lname: "Malik",
    acc_num : "200133000XXX",
    email : "zayn@gmail.com",
    addr : "Bradford, England",
    currBal:50000
})

const cust9 = new Customer({
    id:8,
    fname: "Fiza",
    lname: "Zain",
    acc_num : "200133000XXX",
    email : "fiza@gmail.com",
    addr : "Kanpur, India",
    currBal:50000
})

const cust10 = new Customer({
    id:9,
    fname: "Aryan",
    lname: "Singh",
    acc_num : "200133000XXX",
    email : "aryan@gmail.com",
    addr : "Meerut, India",
    currBal:50000
})



const defaultCust = [cust1, cust2, cust3, cust4, cust5,cust6,cust7,cust8,cust9,cust10];



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req,res){
    res.render("home.ejs");
});




Customer.insertMany(defaultCust, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Default Items added successfully!");
    }
});




app.get("/home", function(req,res){
    res.render("home.ejs");
})




app.get("/allCustomers", function(req, res){
    res.render("allCustomers.ejs", {details : defaultCust});
});




app.get("/moneyTransfer", function(req, res){
    res.render("moneyTransfer.ejs")
});




const historySchema = {
    sname : String,
    sAccount : String,
    rName: String,
    rAccount : String,
    amount : Number
};


const Balance = mongoose.model("Balance", historySchema);


const histories = [];
app.post("/moneyTransfer", function(req,res){
    const senderName = req.body.senderName;
    const senderAccount = req.body.senderAccount;
    const recieverName = req.body.recieverName;
    const recieverAccount = req.body.recieverAccount;
    const tamount = req.body.Tammount;
    
   

    const dynoc = new Balance({
        sname : senderName,
        sAccount : senderAccount,
        rName : recieverName,
        rAccount : recieverAccount,
        amount : tamount

    });

    
   
    Balance.insertMany(dynoc, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Successfully updated the balance history!");
            histories.push(dynoc);
            console.log(histories);
            res.render("list.ejs",{historyList:histories});
           
        }
    });

});




app.get("/list",function(req,res){
    res.render("list.ejs",{historyList:histories});

})




app.get("/oneCoustomer",function(req,res){
    const value=req.body;
    console.log(value.value);
})




app.get("/OneCustomer",function(req,res){
    res.render("oneCustomer.ejs");
})



app.post("/Details",function(request,response){
    const id=request.body.id;
    Customer.findOne({id:id},function(err,res){
        if(err){
            console.log(err)
        }
        else{
           console.log("Deatils displayed succesfully!!!!!")
           response.render("Details.ejs",{individual:res})
        }
       
    })
  
})



app.listen(3000, function(){
    console.log("Server running on port 3000.");
});
