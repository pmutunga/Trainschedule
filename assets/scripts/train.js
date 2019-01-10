
// Steps to complete:

// 1. Define variables
// 2. Initialize Firebase
// 3. Create click event listener in button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve train schedule info from the train schedule firebase database.
// 5. Create a way to calculate the next arrival time. Use difference between trainFirsttime and current time. Use moment.js to calculate and display nextArrival time in military time format and display in table.
// 6. Calculate minutes away and display in table.


//1. define variables

var trainName; 
var trainDestination;
var trainFirsttime;
var trainFreq;
var nextTrain;
var minutesAway;
var trainfirstTimeConverted;
var currentTime;
var diffTime; //Difference between trainFirsttime and current time
var tRemainder; // Time apart (remainder)
var trainEdit;
var trainDelete;
 
 //2. Initiatilize firebase
var config= {
  apiKey: "AIzaSyApcdBQQCM30LbJh77E589eytlEnxWKWUQ",
  authDomain: "trainschedule-2762a.firebaseapp.com",
  databaseURL: "https://trainschedule-2762a.firebaseio.com",
  projectId: "trainschedule-2762a",
  storageBucket: "trainschedule-2762a.appspot.com",
  messagingSenderId: "713562601165"
};

firebase.initializeApp(config);

var database = firebase.database();


//Run Time  

setInterval(function(startTime) {
  $("#time-now").html(moment().format('MMMM Do YYYY, h:mm:ss a'))
}, 1000);

$("#train-times").hide();
$("#addtrain").hide();
$("#loader").hide();



  //3. Add click event listener to submit button
  $("#add-train-btn").on("click", function(event){

      //prevent browser from reloading page after submit.
    event.preventDefault();
   
    // Grab user input

    var newtrainName = $("#train-name-input").val().trim();
    var newtrainDestination = $("#destination-input").val().trim();
    var newtrainFirsttime = $("#first-train-time").val().trim();
    var newtrainFreq = $("#frequency-input").val().trim();


    console.log("traininName is" + newtrainName);
    console.log(" trainin desitnation is:" + newtrainDestination);
    console.log("First train time is: " + newtrainFirsttime);
    console.log("train frequency is: " + newtrainFreq);

    // Create local "temporary" object for holding train data

    var newTrain = {
      name: newtrainName,
      destination: newtrainDestination,
      start: newtrainFirsttime,
      frequency: newtrainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    var newtrainFirsttimeMil = moment(newtrainFirsttime).format('hh:mm a');

    console.log("First train time is: " + newtrainFirsttimeMil);

  // Log everything to console for testing
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);
  console.log(newTrain.dateAdded);

    //Update firebase database with new values

      // Uploads train data to the database
  database.ref().push(newTrain);

 console.log("database updated");

 clearForm();

  });


// 3. Create Firebase event for adding train to the database
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Assign variables values from firebase database


  trainName = childSnapshot.val().name;
  trainDestination = childSnapshot.val().destination;
  trainFirsttime = childSnapshot.val().start;
  trainFreq = childSnapshot.val().frequency;
  

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirsttime);
  console.log(trainFreq);

 //Calculate Next arrival time and minutes away

  timeCalc();

  // Create the new row and append new train info to table
    updateSchedule();
});

  //Update table


function updateSchedule(){

  
  $("table > tbody").append(`
            <tr>
                <td>${trainName}</td>
                <td>${trainDestination}</td>
                <td>${trainFreq}</td>
                <td>${moment(nextArrival).format("hh:mm a")}</td>
                <td>${minutesAway}</td>
                <td><i class="far fa-edit" id="train-edit"></i> <i class="far fa-trash-alt" id="train-delete"></i> </td>
               
            </tr>    
            `);
}

//clear form after submit
function clearForm(){

  trainName = $("#train-name-input").val(" ");
  trainDestination = $("#destination-input").val(" ");
  trainFirsttime = $("#first-train-time").val(" ");
  trainFreq = $("#frequency-input").val(" ");

}

// Get data from firebase

function gettraindata(fb) {
  console.log(fb.val());

  // Assign variables values from firebase database


  trainName = fb.val().name;
  trainDestination = fbo.val().destination;
  trainFirsttime = fb.val().start;
  trainFreq = fb.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirsttime);
  console.log(trainFreq);

}

//calculate time 

function timeCalc(){
  // First Time (pushed back 1 year to make sure it comes before current time)
  trainfirstTimeConverted = moment(trainFirsttime, "HH:mm").subtract(1, "years");
  console.log(trainfirstTimeConverted);

// Current Time
  currentTime  = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  diffTime = moment().diff(moment(trainfirstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  tRemainder = diffTime % trainFreq;
  console.log(tRemainder);
  
  // Minutes away
  minutesAway = trainFreq - tRemainder;
  console.log("Minutes away: " + minutesAway);

 // Next Train
 nextArrival = moment().add(minutesAway, "minutes");
/* nexTrain = moment(nextArrival).format("hh:mm a"); //Why does this not work? console.log("nextTrain")*/
/* nexTrain = nextArrival !== undefined && moment(nextArrival); //Why does this not work? console.log("nextTrain")*/
 console.log("Next Train: " + moment(nextArrival).format("hh:mm a"));
 console.log("Next Train is " +  nextTrain);
}


//update "minutes to arrival" and "next train time" text once every minute. 

 
 //Add Firebase authentication


var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            var user = authResult.user;
            var credential = authResult.credential;
            var isNewUser = authResult.additionalUserInfo.isNewUser;
            var providerId = authResult.additionalUserInfo.providerId;
            var operationType = authResult.operationType;
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          signInFailure: function(error) {
            // Some unrecoverable error occurred during sign-in.
            // Return a promise when error handling is completed and FirebaseUI
            // will reset, clearing any UI. This commonly occurs for error code
            // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
            // occurs. Check below for more details on this.
            return handleUIError(error);
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById("loader").style.display = "none";
            document.getElementById("train-times").style.display = "visible";
            document.getElementById("addtrain").style.display = "visible";
            $("#train-times").show();
            $("#addtrain").show();
            $("#loader").hide();
            $("#firebaseui-auth-container").hide();
            $("#usernam").text(DisplayName);
          }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: "index.html",
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
                  {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Whether the display name should be displayed in the Sign Up page.
            requireDisplayName: true
          },
          
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        
      };

      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);

      //Edit and Delete event listeners
      $(document).on("click", ".fa-trash-alt", function(){
        $(this).closest("tr").remove();
        alert("delete button clicked");
      });