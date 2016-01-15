$(document).ready(function() {
    $.get("/assets/templates/start.html", function(data) {
        $(".textArea").html(data);
        setHeight();
    });

    $("#create-device").on("click", function() {
        $.get("/assets/templates/create-device.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#create-datasource").on("click", function() {
        $.get("/assets/templates/create-datasource.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#write-data").on("click", function() {
        $.get("/assets/templates/write-data.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#create-script").on("click", function() {
        $.get("/assets/scripts/script.html", function(data){
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
