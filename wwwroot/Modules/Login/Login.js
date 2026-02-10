$(document).ready(function () {

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        var formData = {
            UserID: parseInt($("#userID").val()) || 0,
            UserName: $("#userName").val().trim(),
            Password: $("#password").val().trim(),
            UserType: $("#userType").val()  
        };

        $.ajax({
            url: "/Login/CheckLogin",
            type: "POST",
            data: formData,
            success: function (response) {
                if (response.success) {
                    // You can store userID or userType in localStorage if needed
                    window.location.href = "/Home/Index";
                } else {
                    $("#loginError").text("Invalid username or password");
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Login Error",
                    text: "Something went wrong while logging in!",
                });
            }
        });

    });

});
