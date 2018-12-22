 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyApcdBQQCM30LbJh77E589eytlEnxWKWUQ",
    authDomain: "trainschedule-2762a.firebaseapp.com",
    databaseURL: "https://trainschedule-2762a.firebaseio.com",
    projectId: "trainschedule-2762a",
    storageBucket: "trainschedule-2762a.appspot.com",
    messagingSenderId: "713562601165"
  };
  firebase.initializeApp(config);

  var trainName; 
  var trainDestination;
  var trainFirsttime;
  var trainFreq;
  
  

  

  //Submit button event listner
  $("#add-train-btn").on("click"), function(event){

    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    trainFirsttime = $("#first-train-time").val().trim();
    trainFreq = $("#frequency-input").val().trim();


    console.log("traininName is" + trainName);
    console.log(" trainin desitnation is:" + trainDestination);
    console.log("First train time is: " + trainFirsttime);
    console.log("train frequency is: " + trainFreq);



  }