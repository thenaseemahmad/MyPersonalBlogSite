const express = require("express");
const bodyParser = require("body-parser");
var _ = require('lodash');
const ejs = require("ejs");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
const journalsData = [];

const aboutUs = "jalkjdflkjakljf ajflk akf aklfj jas flkaj fja sfj fjla jf aslfj laj fklaj fljas fa";
const contactUs = "This is something serious and that is something can not afford"
app.get("/",function(homeReq,homeRes){
    homeRes.render("homePage",{newJournals:journalsData});
})

app.listen(3000,function(){
    console.log("App is running on 3000");
})

app.get("/about",function(aboutReq,aboutRes){
aboutRes.render("about",{aboutData:aboutUs});
})


app.get("/contact",function(aboutReq,aboutRes){
    aboutRes.render("contact",{contactData:contactUs});
    })

app.get("/compose",function(composeGetReq,composeGetRes){
    composeGetRes.render("compose",{})
})

app.post("/compose",function(composePostReq,composePostRes){
    const topic = composePostReq.body.journalTopic;
    const detail = composePostReq.body.journalDetail;
    journalsData.push({"journalTopic":topic,"journalDetail":detail});
    composePostRes.redirect("/");
})

app.get("/posts/:topic",function(req,res){
    const searchedTitle = req.params.topic;
    journalsData.forEach(function(item){
        if(_.lowerCase(searchedTitle) === _.lowerCase(item.journalTopic)){
            res.render("givenPost",{thisPostTitle:item.journalTopic,thisPostDetail:item.journalDetail});
        };
        
    })
})



