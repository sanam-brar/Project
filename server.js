var express=require("express");
var mysql2=require("mysql2");
var fileuploader=require("express-fileupload");
var nodemailer=require("nodemailer");


let app=express();

app.listen(2005,function()
{
    console.log("Project Server started");
})

app.use(fileuploader());
app.use(express.static("public"));
app.use(express.urlencoded("true"));

let mailTransporter=nodemailer.createTransport(
    {
        service : 'gmail',
        auth:{
            user:"sanambrar2005@gmail.com",
            pass : 'czbv sonj hkft bene'
        }

        
    }
)

let config={
    host:"bhvjlwtkwwz2ognidfh7-mysql.services.clever-cloud.com",
    user:"uoxwwahkrsyzmod1",
    password:"uuPE645fcVSETpjgkBv7",
    database:"bhvjlwtkwwz2ognidfh7",
    dateStrings:true,
    keepAliveInitialDelay:10000,
    enableKeepAlive:true
}

var mysql=mysql2.createConnection(config);

mysql.connect(function(err){
    if(err)
        console.log(err.message);
    else 
        console.log("Connection successful");
})

app.get("/",function(req,resp){
    let path=__dirname+"/public/index.html";
    resp.sendFile(path);
})

app.post("/signup-process",function(req,resp)
{
    var email=req.body.txtEmail;
    var pwd=req.body.txtPwd;
    var account=req.body.accs;
    var status=1;

    mysql.query("insert into users values(?,?,?,?)",[email,pwd,account,status],function(err){
        if(err)
            {
                resp.send(err);
            }
            else 
            {
                resp.send("SignUp successful");
                console.log("successful");
            }
    })

})

app.post("/login-process",function(req,resp)
{
    var email=req.body.txtEmaill;
    var pwd=req.body.txtPwdd;

    mysql.query("Select * from users where email=? and pwd=?",[email,pwd],function(err,resultt)
{
    if(err!=null)
    {
        // resp.send(err.message);
        console.log(err.message);
        return;
    }
        resp.send(resultt);
        // console.log(resultt);
})
})

app.get("/inf",function(req,resp)
{
    let path=__dirname+"/public/inf-dash.html";
    resp.sendFile(path);
})

app.get("/admin",function(req,resp)
{
    let path=__dirname+"/public/admin-dash.html";
    resp.sendFile(path);
})

app.get("/inf-con",function(req,resp)
{
    let path=__dirname+"/public/inf-con.html";
    resp.sendFile(path);
})

app.get("/client-con",function(req,resp)
{
    let path=__dirname+"/public/client-con.html";
    resp.sendFile(path);
})

app.get("/iprofile-dash",function(req,resp)
{
    let path=__dirname+"/public/iprofile.html";
    resp.sendFile(path);
})
app.get("/cprofile-dash",function(req,resp)
{
    let path=__dirname+"/public/cprofile.html";
    resp.sendFile(path);
})

app.post("/iprofile",function(req,resp){

    inputField=req.body.inputField;
    let str="";
    if(Array.isArray(inputField))
        {
            for(i=0;i<inputField.length;i++)
                {
                    str+=inputField[i]+",";
                }
                str=str.substring(0,str.length-1);
        }
        else
        {
            str=inputField;
        }

    let fileName="";
    if(req.files!=null)
    {
        fileName=req.files.ppic.name;
        let path=__dirname+"/public/uploads/"+fileName;
        req.files.ppic.mv(path);
    }
    else 
    {
        fileName="NoPic.jpg";  
    }
   
    

    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.inputEmail,req.body.fname,req.body.lname,req.body.inputGender,req.body.inputDate,req.body.inputPhone,req.body.inputAddress,req.body.inputCity,req.body.inputState,req.body.inputZip,str,req.body.insta,req.body.fb,req.body.x,req.body.txt,fileName],function(err)
{
    if(err)
        {
            resp.send(err.message);

        }
        else 
        {
            resp.redirect("iprofile.html");

        }
})

})

app.post("/cprofile",function(req,resp){

    

    mysql.query("insert into cprofile values(?,?,?,?,?,?,?,?)",[req.body.inputEmail,req.body.name,req.body.inputType,req.body.inputPhone,req.body.inputAddress,req.body.inputCity,req.body.inputState,req.body.inputZip],function(err)
{
    if(err)
        {
            resp.send(err.message);

        }
        else 
        {
            resp.redirect("cprofile.html");

        }
})

})

app.post("/cprofile-update",function(req,resp){
    

    mysql.query("update cprofile set name=?,type=?,phone=?,address=?,city=?,state=?,zip=? where email=?",[req.body.name,req.body.inputType,req.body.inputPhone,req.body.inputAddress,req.body.inputCity,req.body.inputState,req.body.inputZip,req.body.inputEmail],function(err,result)
{
    if(err==null)
        {
            console.log(result);
            if(result.affectedRows>=1)
                // history.go();
            resp.redirect("cprofile.html");

            
            else
            resp.send("Email doesn't exist");
            
        }
        
        else 
        
        resp.send(err.message);
})
})


app.post("/iprofile-update",function(req,resp){

    inputField=req.body.inputField;
    let str="";
    if(Array.isArray(inputField))
        {
            for(i=0;i<inputField.length;i++)
                {
                    str+=inputField[i]+",";
                }
                str=str.substring(0,str.length-1);
        }
        else
        {
            str=inputField;
        }

        let fileName="";
        if(req.files!=null)
            {
         fileName=req.files.ppic.name;
        let path=__dirname+"/public/uploads/"+fileName;
        req.files.ppic.mv(path);
            }
            else 
            fileName=req.body.hdn;    

    mysql.query("update iprofile set fname=?,lname=?,gender=?,dob=?,phone=?,address=?,city=?,state=?,zip=?,ifields=?,insta=?,fb=?,x=?,txt=?,ImgPath=? where email=?",[req.body.fname,req.body.lname,req.body.inputGender,req.body.inputDate,req.body.inputPhone,req.body.inputAddress,req.body.inputCity,req.body.inputState,req.body.inputZip,str,req.body.insta,req.body.fb,req.body.x,req.body.txt,fileName,req.body.inputEmail],function(err,result)
{
    if(err==null)
        {
            console.log(result);
            if(result.affectedRows>=1)
            resp.redirect("iprofile.html");
            
            else
            resp.send("Email doesn't exist");
            
        }
        
        else 
        
        resp.send(err.message);
})
})

app.post("/find-user-details",function(req,resp){
    let email=req.body.txtEmail;
    // console.log(email);

    mysql.query("select * from iprofile where Email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        console.log(resultJsonAry);
        resp.send(resultJsonAry);
    })
})

app.post("/find-client-details",function(req,resp){
    let email=req.body.txtEmail;
    // console.log(email);

    mysql.query("select * from cprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        console.log(resultJsonAry);
        resp.send(resultJsonAry);
    })
})
app.post("/add-process",function(req,resp){

    mysql.query("insert into events values(?,?,?,?,?,?,?)",[null,req.body.inputEmail,req.body.inputTitle,req.body.inputDate,req.body.inputTime,req.body.inputCity,req.body.inputVenue],function(err){
        if(err)
            {
                resp.send(err.message);
            }
            else 
            {
                resp.send("Event added");
            }
    })

})

app.post("/change-process",function(req,resp){
    // console.log(req.body.txtEmails);

    mysql.query("select pwd from users where email=?",[req.body.txtEmails],function(err,res)
{
    if(err)
    {
        resp.send(err.message)
    }
    else if(res.length>0)
    {
        // console.log(res);
        if(res[0].pwd==req.body.txtPwdO)
        {
            if(req.body.txtPwdN==req.body.txtPwdC)
            {
                mysql.query("update users set pwd=? where email=?",[req.body.txtPwdN,req.body.txtEmails],function(err)
            {
                if(err)
                {
                    resp.send(err.message)
                }
                else
                {
                    resp.send("Password Changed");
                }
            })
            }
            else 
            {
                resp.send("Incorrect password");
            }
        }
        else
        {
            resp.send("Enter correct password");
        }
    }
})
})

app.post("/forgot-pass",function(req,resp)
{
    let recieveEmail=req.body.reciever;
    let sendEmail="sanambrar2005@gmail.com";
    let sub="Password forgotten request";

    if(recieveEmail!="")
    {

    mysql.query("select pwd from users where email=?",[recieveEmail],function(err,res){
        // console.log(res);

        if(res.length==0)
        {
            resp.send("Account does not exist");
            return;
        }
        
        if(err)
            {
                console.log(err.message);
            }
            else
            {
                let mailDetails={
                    from:sendEmail,
                    to:recieveEmail,
                    subject:sub,
                    text:"Your password : "+res[0].pwd
                }
                mailTransporter.sendMail(mailDetails,function(err,data){
                    if(err)
                        console.log(err.message);
                    else 
                    
                    resp.send("Email sent on your account");
                })
            }
        
        
    })}

    else
    {
        resp.send("Enter an email");
    }
    
})

app.get("/admin-users",function(req,resp)
{
    let path=__dirname+"/public/admin-users.html";
    resp.sendFile(path);
})

app.get("/fetch-all",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/block",function(req,resp)
{
    mysql.query("update users set status=? where email=?",[0,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/unblock",function(req,resp)
{
    mysql.query("update users set status=? where email=?",[1,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/delete",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/fetch-all-influencers",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/fetch-all-clients",function(req,resp)
{
    mysql.query("select * from cprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/inf-finder",function(req,resp)
{
    let path=__dirname+"/public/inf-finder.html";
    resp.sendFile(path);
})

app.get("/fetch-all-cities",function(req,resp)
{
    mysql.query("select distinct city from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry)
    })

})

app.get("/show-selected",function(req,resp)
{
    let inputField=req.query.fields;
    let str="";
    if(Array.isArray(inputField))
        {
            for(i=0;i<inputField.length;i++)
                {
                    str+=inputField[i]+",";
                }
                str=str.substring(0,str.length-1);
        }
        else
        {
            str=inputField;
        }

    mysql.query("select distinct city from iprofile where ifields like ?",["%"+str+"%"],function(err,resultJsonAry)
{
    if(err!=null)
        {
            resp.send(err.message);
            return;

        }
   resp.send(resultJsonAry);
})
    
})

app.get("/fetch-all-data",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

})

app.get("/fetch-by-name",function(req,resp)
{
    let name=req.query.name;
    mysql.query("select * from iprofile where fname like ?",["%"+name+"%"],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
       console.log(resultJsonAry);
    })

})


app.get("/fetch-by-filter", function(req, resp) {
    let field = req.query.field;
    let city = req.query.city;
    console.log(city);
    console.log(field);
    

    if(field!="undefined" && city!="undefined")
    {
        
        // if(Array.isArray(city))
        // {
        //     for(i=0;i<city.length;i++)
        // }

        mysql.query("select * from iprofile where ifields like ? and city like ?", ["%"+field.toString()+"%","%"+city+"%"], function(err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(resultJsonAry); 
            console.log(resultJsonAry);
        });
    }
    else if(city=="undefined")
    {
        mysql.query("select * from iprofile where ifields like ?", ["%"+field+"%"], function(err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(resultJsonAry); 
            console.log(resultJsonAry);
        });
    }
    else if(field=="undefined")
    {
        mysql.query("select * from iprofile where city like ?", ["%"+city+"%"], function(err, resultJsonAry) {
            if (err != null) {
                resp.send(err.message);
                return;
            }
            resp.send(resultJsonAry); 
            console.log(resultJsonAry);
        });
    }
});

app.get("/remove-filter",function(req,resp){

    mysql.query("select * from iprofile ", function(err, resultJsonAry) {
        if (err != null) {
            resp.send(err.message);
            return;
        }
        resp.send(resultJsonAry); 
        console.log(resultJsonAry);
    });
    
})

app.get("/modal-data",function(req,resp)
{
    mysql.query("select * from iprofile where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })

})

app.get("/event-manager",function(req,resp)
{
    let path=__dirname+"/public/event-manager.html";
    resp.sendFile(path);
})

app.get("/fetch-all-events",function(req,resp)
{
    mysql.query("select * from events where email=? and dateOfEvent>=current_date()",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/delete-event",function(req,resp)
{
    mysql.query("delete from events where rid=?",[req.query.rid],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/find-save",function(req,resp)
{
    mysql.query("select * from iprofile where email=?",[req.query.txtEmail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/find-savec",function(req,resp)
{
    mysql.query("select * from cprofile where email=?",[req.query.txtEmail],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);
    })
})

app.get("/contact-email-process",function(req,resp)
{
    let recieveEmail=req.query.reciever;
    let company=req.query.comp;
    let sendEmail="sanambrar2005@gmail.com";
    let sub="Contact request";
  
    let mailDetails=
    {
        from:sendEmail,
        to:recieveEmail,
        subject:sub,
        text:"It is to infrom you that you would be liked to be contacted by a client for a sponsership deal. Kindly contact them on "+company+" email."
    }
                
    mailTransporter.sendMail(mailDetails,function(err,data)
    {
    if(err)
    resp.send(err.message);
    else 
    resp.send("Contact email sent.");
    })  
})



