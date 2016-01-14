$(document).ready(function() {
    $.get("/grav", {name:'michelle@michellefunk.com'}, function(gravatarUrl) {
        $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                crossDomain: true,
                url: gravatarUrl,
                complete: function() {
                    console.log("Ajax call complete")
                },
                success: function(data) {
                    var profile = data.entry[0];
                    console.log(data);
                    $(".gravatar").append("<a href='" + profile.profileUrl + "'> " +
                        "<img class='img-bordered img-responsive' src='" + profile.photos[0].value + "?s=150&d=identicon&r=G'></a>");
                    $(".gravatar").append("<h4 class='white'>" + profile.displayName + "<br></h5>");
                    $(".gravatar").append("<h5><em>" + profile.currentLocation + "<br></em></h5>");
                    $(".gravatar").append("<h5>" + profile.aboutMe + "</h5>");
                },
                error: function(xhr, status) {
                    console.log("Error : ", xhr, " ", status);
                }
        });
    });

    $.get("/assets/scripts/profile.html", function(data) {
        $(".textArea").html(data);
        setHeight();
    });

    $("#profile").on("click", function() {
        $.get("/assets/scripts/profile.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#employment").on("click", function() {
        $.get("/assets/scripts/employment.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#education").on("click", function() {
        $.get("/assets/scripts/education.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#community").on("click", function() {
        $.get("/assets/scripts/community.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });


});

function setHeight(){
    var eHeight = $(".textArea").innerHeight();
    $(".sidebar, .sidebar2").outerHeight(eHeight);
}

function displayGravatar() {
    console.log("Will run function")
}