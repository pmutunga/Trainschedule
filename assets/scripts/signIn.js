
// Steps to complete:

// 1. Define variables
// 2. Initialize Firebase
// 3. Create click event listener in button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve train schedule info from the train schedule firebase database.
// 5. Create a way to calculate the next arrival time. Use difference between trainFirsttime and current time. Use moment.js to calculate and display nextArrival time in military time format and display in table.
// 6. Calculate minutes away and display in table.
// 7. Add authentication

$(document).ready(function(){

 
 //1. Define variables Initiatilize firebase
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

const auth = firebase.auth();

//++++++++++++++++++Add firebase authentication

// Get all DOM elements

const signIn = document.getElementById("sign-in");
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnSignOut = document.getElementById("btnSignOut");
const forgotpass = document.getElementById("forgot-password");

//Attach click event to login, sign-up, forgot-password and log-out

//Add Login event
btnLogin.addEventListener("click", e => {

    event.preventDefault();
  //get email and pass
    const email = txtEmail.value;
    console.log(email);
    const passWd = txtPassword.value;
    console.log(passWd);
 
 //sign in
 const promise = auth.signInWithEmailAndPassword(email, passWd); //returns a promise

promise.catch(e => console.log(e.message));

});

//Add Sign-Up

btnSignUp.addEventListener("click", function(){
console.log("you clicked sign up");

  //get email and pass
  const email = txtEmail.value;
  console.log(email);
  const passWd = txtPassword.value;
  console.log(passWd);

  //sign up
 const promise = auth.createUserWithEmailAndPassword(email, passWd); //returns a promise

 promise.catch(e => console.log(e.message));

});

//Add logout event listener
btnSignOut.addEventListener("click", e=>{
    firebase.auth().signOut();
    btnSignOut.classList.add("hide");
    signIn.classList.remove("hide");
});

//Forgot password: TO In Future

// forgotpass.addEventListener("click", e=>{
//     console.log("user forgot password");
//     auth.sendPasswordResetEmail(email).then(function() {
//         // Email sent.
//       }).catch(function(error) {
//         // An error happened.
//       });
// });

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser =>{
    if(firebaseUser){
        console.log(firebaseUser);
        btnSignOut.classList.remove("hide");
        signIn.classList.add("hide");
        $("#admin-signIn").classList.add("hide");
        } else{
        console.log("user is not logged in");
    }

}); 



  // The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
//+++++++++++++End of Firebase authentication
}); //end of document ready


    
