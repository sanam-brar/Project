
$(document).ready(function(){

    

    $("#btnSignup").prop("disabled", true); 

    $("#txtEmail").blur(function(){
        const regex = /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var email = $("#txtEmail").val();
        if (regex.test(email)) {
            $("#txtEmail").removeClass("is-invalid").addClass("is-valid");
            $("#btnSignup").prop("disabled", false);
        } else {
            $("#txtEmail").removeClass("is-valid").addClass("is-invalid");
            $("#btnSignup").prop("disabled", true);
        }
    });

    $("#txtPwd").blur(function(){
        var pwd=$("#txtPwd").val();
        if(/^[A-Za-z0-9\d=!\-@._*]*$/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd) && /[A-Z]/.test(pwd))
        {
            $("#txtPwd").removeClass("is-invalid").addClass("is-valid");
            $("#btnSignup").prop("disabled", false);
        }
        else
        {
            $("#txtPwd").removeClass("is-valid").addClass("is-invalid");
            $("#btnSignup").prop("disabled", true);
        }
    })

    $("#conPwd").blur(function(){
        var conPwd=$("#conPwd").val();
        if(conPwd==$("#txtPwd").val())
        {
            $("#conPwd").removeClass("is-invalid").addClass("is-valid");
            $("#btnSignup").prop("disabled", false);
        }
        else
        {
            $("#conPwd").removeClass("is-valid").addClass("is-invalid");
            $("#btnSignup").prop("disabled", true);
        }
    })

    // $("#txtEmaill").blur(function(){
    //     const regex = /^([a-zA-Z0-9_\.\-\+])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    //     var email = $("#txtEmaill").val();
    //     if (regex.test(email)) {
    //         $("#txtEmaill").removeClass("is-invalid").addClass("is-valid");
    //         $("#btnLogin").prop("disabled", false);
    //     } else {
    //         $("#txtEmaill").removeClass("is-valid").addClass("is-invalid");
    //         $("#btnLogin").prop("disabled", true);
    //     }
    // });

    // $("#txtPwdd").blur(function(){
    //     var pwd=$("#txtPwdd").val();
    //     if(/^[A-Za-z0-9\d=!\-@._*]*$/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd) && /[A-Z]/.test(pwd))
    //     {
    //         $("#txtPwdd").removeClass("is-invalid").addClass("is-valid");
    //         $("#btnLogin").prop("disabled", false);
    //     }
    //     else
    //     {
    //         $("#txtPwdd").removeClass("is-valid").addClass("is-invalid");
    //         $("#btnLogin").prop("disabled", true);
    //     }
    // })


    $("#btnSignup").click(function()
    {
        let obj={
            type:"post",
            url:"/signup-process",
            data:{
                txtEmail:$("#txtEmail").val(),
                txtPwd:$("#txtPwd").val(),
                accs:$('[name=acc]:checked').val()
            }
        }

        $.ajax(obj).done(function(resp){
            
            $("#result").html(resp);
        }).fail(function(err){
            alert(err.statusText);
        })
    
    })

    $("#btnLogin").click(function()
    {
        let obj={
            type:"post",
            url:"/login-process",
            data:{
                txtEmaill:$("#txtEmaill").val(),
                txtPwdd:$("#txtPwdd").val()
            }
        }
        $.ajax(obj).done(function(resp)
        {
            
            if(resp.length==0)
            {
                $("#result2").html("Invalid credentials");
                $("#txtPwdd").removeClass("is-valid").addClass("is-invalid");
                return;
            }
            else if(resp.length==1 && resp[0].status==1)
            {
                $("#result2").html("Logged in as "+resp[0].utype);
                $("#txtPwdd").removeClass("is-invalid").addClass("is-valid");

                if(resp[0].utype==="Influencer")
                    {
                        location.href="inf-dash.html";
                        localStorage.setItem("activeuser",$("#txtEmaill").val());
                    }
                    else if(resp[0].utype==="Clientel")
                    {
                        location.href="clientel-dash.html";
                        localStorage.setItem("activeuser",$("#txtEmaill").val());
                    }

            }
            else if(resp.length==1 && resp[0].status==0)
            {
                $("#result2").html("Blocked");
            }
           
        }).fail(function(err){
            alert(err.statusText);
        })

    })

    $("#forgot").click(function(){

        $(document).ajaxStart(function(){
            $("#wait").css("display","block");
            $("#forgot").css("display","none");
        })
        $(document).ajaxStop(function(){
            $("#wait").css("display","none");
            $("#forgot").css("display","block");
        })
        
        let obj={
            type:"post",
            url:"/forgot-pass",
            data:{
                reciever:$("#txtEmaill").val(),
            }
        }
        $.ajax(obj).done(function(resp){
            $("#result2").html(resp);
        }).fail(function(err){
            alert(err.statusText);
        })
    })  

})
