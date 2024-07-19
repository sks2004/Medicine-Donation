// async and await
// login ki click pe alert
const { urlencoded } = require("express");
var expressKuch=require("express");
var fileuploader=require("express-fileupload");
var mysql=require("mysql");
var path=require("path");
const { report } = require("process");
var app=expressKuch();

app.use(expressKuch.static("public"));

app.listen(2022,function(){
    console.log("Server Started");
})

var dbConfiguration = {
    host:"localhost",
    user:"root",
    password:"",
    database:"users"
}

var refDB=mysql.createConnection(dbConfiguration);
refDB.connect(function(errkuch){
    if(errkuch)
        console.log(errkuch);
    else    
        console.log("Connected to Server.....");
})

app.get("/signup",function(req,resp)
{

   var dataAry=[req.query.txtemail,req.query.pwd,req.query.usertype,1];
   console.log(dataAry);
   refDB.query("insert into users values(?,?,?,?)",dataAry,function(err,result){
            if(err)
               {
                console.log(err);
               }
            else{
                console.log("saved...");
                resp.send("Inserted Successfully");
            }
   })
})

app.get("/login",function(req,resp)
{
    //console.log(req.query);

   var dataAry=[req.query.txtemail,req.query.pwd];
   console.log(dataAry);
   refDB.query("select * from users where email=? and pwd=? and status=1",dataAry,function(err,result){
    console.log(result);
            if(err)
                resp.send(err);
            else
                resp.send(result);
   })
})

app.get("/update",function(req,resp)
{
    // console.log(req.query);
   var dataAry=[req.query.txtemailnew,req.query.pwdold,req.query.passnew];
   var dataAry2=[req.query.passnew,req.query.txtemailnew];
//    console.log(dataAry);
   refDB.query("select * from users where email=? and pwd=?",dataAry,function(err,result){
    // console.log(result);
            if(err)
                resp.send(err);
            else if(result.length==1)
            {
                refDB.query("update users set pwd = ? where email=?",dataAry2,function(err,result){
                    if(err)
                    {
                        resp.send(err);
                    }
                    else{
                        resp.send("Password Updated Succesfully!!");
                    }
                })
            }
            else{
                resp.send("Invalid old password");
            }
   })
})

//==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=========---=-=-=-=-=-=-=-=-

app.use(expressKuch.urlencoded('extended:true'));
app.use(fileuploader());

app.post("/donor-save",function(req,resp){

    console.log(req.files.profilePic.name);

 var fname=req.body.txtemail+"-"+req.files.profilePic.name;
 var des=process.cwd()+"/public/uploads/"+fname;
 req.files.profilePic.mv(des,function(err){
         if(err)
             console.log(err);
         else
             console.log("Badhaiiiiiiii");
 })
 console.log(req.files.idfile.name);


 var fname2=req.body.txtemail+"-"+req.files.idfile.name;
 var des=process.cwd()+"/public/uploads/"+fname2;
 req.files.idfile.mv(des,function(err){
         if(err)
             console.log(err);
         else
             console.log("Badhaiiiiiiii");
 })
 var pary=[req.body.txtemail,req.body.txtname,req.body.txtmobile,req.body.txtaddr,req.body.txtcity,req.body.txtid,req.body.txttime,fname,fname2];
 refDB.query("insert into dprofile values(?,?,?,?,?,?,?,?,?)",pary,function(err,result){
     if(err)
     resp.send(err);
     else{
     resp.send("inserted successfully");
     console.log("Saved..");
     }
 })
})

app.post("/needy-save",function(req,resp){

    // console.log(req.files.profilePic.name);

 var fname=req.body.txtemail+"-"+req.files.profilePic.name;
 var des=process.cwd()+"/public/uploads/"+fname;
 req.files.profilePic.mv(des,function(err){
         if(err)
             console.log(err);
         else
             console.log("Badhaiiiiiiii");
 })
//  console.log(req.files.idfile.name);


 var fname2=req.body.txtemail+"-"+req.files.idfile.name;
 var des=process.cwd()+"/public/uploads/"+fname2;
 req.files.idfile.mv(des,function(err){
         if(err)
             console.log(err);
         else
             console.log("Badhaiiiiiiii");
 })
 var pary=[req.body.txtemail,req.body.txtname,req.body.txtmobile,req.body.txtaddr,req.body.txtcity,req.body.txtid,fname,fname2];
 refDB.query("insert into nprofile values(?,?,?,?,?,?,?,?)",pary,function(err,result){
     if(err)
     resp.send(err);
     else{
     resp.send("inserted successfully");
    //  console.log("Saved..");
     }
 })
})

app.get("/getProfileObject",function(req,resp)
{
 //0/1 records
    refDB.query("select * from dprofile where emailid=?",[req.query.txtemail],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);
    })
})

app.get("/getProfileObject2",function(req,resp)
{
 //0/1 records
    refDB.query("select * from nprofile where emailid=?",[req.query.txtemail],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);
    })
})


app.post("/donor-update",function(req,resp){
 var fname;
 if(req.files!=null)
 {
  fname=req.body.txtemail+"-"+req.files.profilePic.name;
 var des=process.cwd()+"/public/uploads/"+fname;
 req.files.profilePic.mv(des,function(err){
         if(err)
             console.log(err);
         else
             console.log("Done");
 })
}
else if(req.files!=null)
{
    fname=req.body.hdn;
    var fname2;
 fname2=req.body.txtemail+"-"+req.files.idfile.name;
 var des=process.cwd()+"/public/uploads/"+fname2;
 req.files.idfile.mv(des,function(err){
     if(err)
             console.log(err);
         else
             console.log("Done");
 })

}
else
fname2=req.body.ndn;

 var pary=[req.body.txtname,req.body.txtmobile,req.body.txtaddr,req.body.txtcity,req.body.txtid,req.body.txttime,fname2,fname,req.body.txtemail];
refDB.query("update dprofile set name=?,mobile=?,address=?,city=?,prooftype=?,timings=?,proofpic=?,profilepic=? where emailid=?",pary,function(err,result){
 if(err)
             resp.send(err);
         else
             resp.send("Updated Successfully");
})
})

app.post("/needy-update",function(req,resp){
    var fname;
    if(req.files!=null)
    {
     fname=req.body.txtemail+"-"+req.files.profilePic.name;
    var des=process.cwd()+"/public/uploads/"+fname;
    req.files.profilePic.mv(des,function(err){
            if(err)
                console.log(err);
            else
                console.log("Done");
    })
   }
   else if(req.files!=null)
   {
       fname=req.body.hdn;
       var fname2;
    fname2=req.body.txtemail+"-"+req.files.idfile.name;
    var des=process.cwd()+"/public/uploads/"+fname2;
    req.files.idfile.mv(des,function(err){
        if(err)
                console.log(err);
            else
                console.log("Done");
    })
   
   }
   else
   fname2=req.body.ndn;
   
    var pary=[req.body.txtname,req.body.txtmobile,req.body.txtaddr,req.body.txtcity,req.body.txtid,fname2,fname,req.body.txtemail];
   refDB.query("update nprofile set name=?,mobile=?,address=?,city=?,prooftype=?,proofpic=?,profilepic=? where emailid=?",pary,function(err,result){
    if(err)
                resp.send(err);
            else
                resp.send("Updated Successfully");
   })
   })

//=-=-=-=-==-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-==-=-=-=-==-=-=-=-=-=-==-=-

app.post("/list-medicine",function(req,resp){

    console.log(req.files.medpic.name);

 var fname=req.body.txtemail+"-"+req.files.medpic.name;
 var des=process.cwd()+"/public/uploads/"+fname;
 req.files.medpic.mv(des,function(err){
         if(err)
             console.log(err);
         else
             console.log("Badhaii");
 })

 var pary=[req.body.txtemail,req.body.txtmedicine,req.body.txtpkg,req.body.txtqty,req.body.txtdate,req.body.txtcompany,fname,req.body.txtdes];
 refDB.query("insert into medecines values(?,?,?,?,?,?,?,?,current_date())",pary,function(err,result){
     if(err)
     resp.send(err);
     else{
     resp.send("inserted successfully");
     console.log("Saved..");
     }
 })
})

//-------------------------Angular APIS--------------------------------------------------
// app.get("/profile-delete-angualar",function(req,res)
// {                                //table col name
//     refDB.query("delete from profile where email=?",[req.query.emailidX],function(err,result){
//             if(err)
//                 res.send(err);
//             else
//             if(result.affectedRows==0)
//             res.send("Invalid Id");
//             else
//                 res.send("Record Deleted Successfulllllyyyyy.... Badhaiiiii");
//     })
// })


app.all("/fetchAllRecords",function(req,resp)
{
    refDB.query("select * from users ",function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

app.get("/profile-block",function(req,resp)
{
    refDB.query("update users set status=0 where email=?",[req.query.emailid],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

app.get("/profile-resume",function(req,resp)
{
    refDB.query("update users set status=1 where email=?",[req.query.emailid],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

app.get("/profile-delete",function(req,resp)
{
    refDB.query("delete from dprofile where emailid=?",[req.query.emailid],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else if(resultAryOfObjects==0)
             resp.send("Invalid Id");
            
        else
            resp.send("Record Deleted Successfully");
    })

})

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=

app.all("/fetchAllDonors",function(req,resp)
{
    refDB.query("select * from dprofile ",function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

//=-=-=-==-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-==-=-=-=-=-

app.get("/fetchAllcity",function(req,resp)
{
    refDB.query("select distinct city from dprofile ",function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else
             resp.send(resultAryOfObjects);;
    })

})

//=-=-=-=-=-==-==-=-=-==-=-===-=-=-=-=-=-==-=-=-=-=-=-==-=-=-=-=-==--==-=-=-=-

app.get("/fetchmed",function(req,resp)
{
    // console.log(req.query.city);
    refDB.query("select distinct medecine from medecines inner join dprofile on medecines.emailid=dprofile.emailid where dprofile.city=?",[req.query.city],function(err,resultAryOfObjects)
    {
         if(err){
        //  console.log("hellllllllooooo");
             resp.send(err);
         }
            
         else{
        //  console.log("huuuuuuuuuuuuuuuuuuu");
             resp.send(resultAryOfObjects);
         }
    })
})

//=-=-=-=-=-==-==-=-=-==-=-===-=-=-=-=-=-==-=-=-=-=-=-==-=-=-=-=-==--==-=-=-=-

app.get("/fetchdonors",function(req,resp)
{
    // console.log("hi");
    refDB.query("select * from medecines inner join dprofile on medecines.emailid=dprofile.emailid where dprofile.city=? and medecines.medecine=? ",[req.query.city,req.query.med],function(err,resultAryOfObjects)
    {
         if(err){
             resp.send(err);
            //  console.log("hello");
         }
            
         else
             resp.send(resultAryOfObjects);
    })
})

//==-====-=-=-=-=-==-=-=-==-=-=-=-=-==-=-=-=-=-==-=-=-=-=-=-==-=-=-=-=-==-=-

app.get("/fetchdetails",function(req,resp)
{
    // alert("In server");
    refDB.query("select * from dprofile where emailid=? ",[req.query.emailid],function(err,resultAryOfObjects)
    {
         if(err){
             resp.send(err);
             console.log("hello");
         }
            
         else
             resp.send(resultAryOfObjects);
    })
})

// =-=-=-=-=-==-=-=-=-=-==--==-=-=-=-=-==-=-=--=-==-=-=-=-==-=-=-=-==-=-=-

app.get("/fetchmedicine",function(req,resp)
{
    console.log("In server");
    refDB.query("select * from medecines where emailid=? ",[req.query.emailid],function(err,resultAryOfObjects)
    {
         if(err){
             resp.send(err);
            //  console.log("Hi");
         }
         else{
             resp.send(resultAryOfObjects);;
             console.log(resultAryOfObjects);
         }
    })

})

// =-=-=-=-=-=-=-=-=-=-==-=-=-==-=-=-=-=-=-==--=-==-=-=-=-=-=-==-=-=-=-=-=

app.get("/unlist",function(req,resp)
{
    refDB.query("delete from medecines where medecine=? and qty=?",[req.query.medecine,req.query.qty],function(err,resultAryOfObjects)
    {
         if(err)
             resp.send(err);
            
         else if(resultAryOfObjects==0)
             resp.send("Invalid Id");
            
        else
            resp.send("Record Deleted Successfully");
    })

})