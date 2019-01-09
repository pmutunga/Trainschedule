
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
 
 // FirebaseUI config.
 var uiConfig = {
  signInSuccessUrl: 'index.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: 'users.html',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('users.html');
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
