$(document).ready(function() {
    $.get("/assets/templates/start.html", function(data) {
        $(".textArea").html(data);
        setHeight();
    });

    $("#home").on("click", function() {
      console.log("Home");
      $.get("/assets/templates/start.html", function(data) {
          $(".textArea").html(data);
          setHeight();
      });
    })

    $("#create-device").on("click", function() {
      console.log("Create Device");
        $.get("/assets/templates/create-device.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#create-datasource").on("click", function() {
      console.log("Create Datasource");
        $.get("/assets/templates/create-datasource.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#write-data").on("click", function() {
      console.log("Write Data");
        $.get("/assets/templates/write-data.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });

    $("#create-script").on("click", function() {
      console.log("Create Script");
        $.get("/assets/scripts/script.html", function(data){
            $(".textArea").html(data);
            setHeight();
        });
    });


});

function setHeight(){
    console.log("setHeight()")
    var greatest = 0;
    var height = [];

    height.push($(".textArea").innerHeight());
    height.push($(".sidebar").innerHeight());
    height.push($(".sidebar2").innerHeight());
    console.log(height);

    for (var i=0; i < 3; i++) {
      if (height[i] > greatest) {
        greatest = height[i];
      }
    }
    console.log(greatest);
    $(".sidebar, .sidebar2, .textArea").outerHeight(greatest);
}

function displayGravatar() {
    console.log("Will run function")
}
