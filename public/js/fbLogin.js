  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1092622624125137',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      if(window.location.pathname == "/homepage.html"){
          window.location="page2.html";  
      }
    });
  }

function processForm(e) {
   

    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}

function setAlert(){
    var etaValue = parseInt(document.getElementById("timeBox").value);
    var eta = new Date();
    eta = new Date(eta.getTime() + etaValue*3600000*24);
    var trackName = document.getElementById("title").innerHTML;
    msgType = 0;
    sendFbPostRequest(msgType, eta, trackName, etaValue);
}

function removeAlert(){
  msgType = 2;
  sendFbPostRequest(msgType);
  alert("Successfully checked out!");
  window.location = "homepage.html";
}

function sendFbPostRequest(msgType, eta, trackName, etaValue){
    var response = FB.getAuthResponse();
    if (response.accessToken != null) {
      var accessToken = response.accessToken;
      var fbPostObj = {
        "messageType" : msgType,
        "time" : eta,
        "token" : accessToken,
        "trackName" : trackName,
        "etaValue" : etaValue
      };
      $.post("/alert",fbPostObj, function(status){
        console.log(status);
      });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
}

var form = document.getElementById("myForm");
if(form)
form.addEventListener("submit", function(e){
  e.preventDefault();
  setAlert();
  window.location = "checkout.html";
});