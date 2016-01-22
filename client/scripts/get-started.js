$(document).ready(function() {
    //TODO: get existing values for auth and CIK and drop them in the text boxes. =Call a function=
    updateAuthFields();
    $('#cikInput').keypress(function (e) {
      if (e.which == 13) {
        $('#submitCik').click();
        return false;    //<---- Add this line
      }
    });

    //TODO: on("click")s for submit buttons for CIK and Uauth entrie ids submitCik and submitUauth
    $('#submitCik').on("click", function(){
      console.log("submitCik");
      var cik = $("#cikInput").val();
      console.log("cik: ", cik);
      setCik(cik);
    });

    $('#submitUauth').on("click", function(){
      console.log("submitUauth");
      var uauthArray = $('#uauthForm').serializeArray();
      console.log("uAuthArray: ", uauthArray);
      var url = uauthArray[0]["value"];
      var username = uauthArray[1]["value"];
      var password = uauthArray[2]["value"];
      console.log("url, username, pw", url, username, password);

      setUauth(url, username, password);
    });


    //TODO: on("click")s for clear buttons for CIK and Uauth (and all) clearCik and clearUauth
    $('#clearUauth, #clearCik').on("click", function(){
      $("#cikStatus").html("<em>Enter a valid CIK to begin.</em>");
      $("#cikInput").val("");
      clearAuth();
    });

  function setUauth(url, username, password){
    //update User/PW auth
    var userPasswordString = username + ":" + password;
    var uauth = btoa(userPasswordString);
    console.log("Auth", uauth);

    $.ajax({
      type: 'POST',
      url: '/auth/uauth',
      data: {
        "url":url,
        "uauth":uauth
      },
      complete: function(){
        console.log("post call complete");

      },
      success: function(post){
        console.log("post call success: ", post);
        //TODO: Use this information to update auth fields
        //data.cik, data.uauth, data.url, data.authType
        updateAuthFields();
      },
      error: function(xhr, err){
        console.log("post error: ", err);
      }
    });
  }

  function setCik(cik){
    $.ajax({
      type: 'POST',
      url: '/auth/cik',
      data: {
        "cik":cik
      },
      complete: function(){
        console.log("CIK post call complete");
      },
      success: function(post){
        console.log("CIK post call success: ", post);
        //TODO: Use this information to update auth fields
        //data.cik, data.uauth, data.url, data.authType
        updateAuthFields();
      },
      error: function(xhr, err){
        console.log("CIK post error: ", err);
      }
    });
  }

  function clearAuth() {
    $.ajax({
      type: 'DELETE',
      url: '/auth',
      complete: function(){
        console.log("delete call complete");
      },
      success: function(post){
        console.log("Delete successful: ", post);
      },
      error: function(xhr, err){
        console.log("delete error: ", err);
      }
    });
  }

  function updateAuthFields(){
    //update text fields to current uAuth and CIK settings
    $.ajax({
      type: 'GET',
      url: '/auth',
      complete: function(){
        console.log("get call complete");
      },
      success: function(data){
        console.log("get call success: ", data);
        //TODO: Use this information to update auth fields
        //data.cik, data.uauth, data.url, data.authType
        if (data.cik) {
          $("#cikInput").val(data.cik);
          displayCikInfo();
        }
        if (data.portalName) {
          $("#cikStatus").html("Portal accessed: " + data.portalName);
        }
      },
      error: function(xhr, err){
        console.log("get error: ", err);
      }
    });
  }

  function displayCikInfo(){
    $.ajax({
      type: 'GET',
      url: '/rpc/info',
      complete: function(){
        console.log("get call complete");
      },
      success: function(data){
        console.log("get call success: ", data);
        //TODO: Use this information to update auth fields
        //data.cik, data.uauth, data.url, data.authType
        if (data.description) {
          var portalName = data.description.name;
          $("#cikStatus").html("Portal accessed: " + portalName);
        } else {
          $("#cikStatus").html("<span class='warn-text'>Your CIK is not valid. Please correct and try again.</span>");
          clearAuth();
        };
      },
      error: function(xhr, err){
        //Note: the RPC does not return an error for auth errors.
        //It it returns success with the error code in it.
        console.log("/rpc/info get call error: ", err)

      }
    });
  }
});
