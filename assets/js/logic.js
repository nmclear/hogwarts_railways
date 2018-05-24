//DOCUMENT READY
$(document).ready(function() {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC3IOq8n0FDNK-1UzfXRFdJAQuE3u7YT6k",
        authDomain: "train-scheduler-9f39f.firebaseapp.com",
        databaseURL: "https://train-scheduler-9f39f.firebaseio.com",
        projectId: "train-scheduler-9f39f",
        storageBucket: "train-scheduler-9f39f.appspot.com",
        messagingSenderId: "993610104438"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    //on click of adding train button
    $('#addTrainBtn').on('click', function(){
        event.preventDefault();


    //store user input about trains
    var name = $("#trainNameInput").val().trim();
    var destination = $("#trainDestinationInput").val().trim();
    var time = moment($("#trainTimeInput").val().trim(), "HH/mm").startOf('hour');
    var frequency = $("#trainFrequencyInput").val().trim();

    










    });









});