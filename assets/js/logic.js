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
    $('#addTrainBtn').on('click', function(event){
        event.preventDefault();

        //store user input about trains
        var name = $("#trainNameInput").val().trim();
        var destination = $("#trainDestinationInput").val().trim();
        var frequency = $("#trainFrequencyInput").val().trim();
        var time = $("#trainTimeInput").val().trim();

        //create temp local newTrain object
        var newTrain = {
            name: name,
            destination: destination,
            time: time,
            frequency: frequency
        };

        //updates the newTrain information to the database
        database.ref().push(newTrain);
    });


    // Pull train info from database and update html content
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {


    // Store data into local variables using childSnapshot
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;

    //Calculate next arrival time using first train time and frequency


    // Calculate minutes away time using current time and next schedule departure


    // Update train table data from database and new calculated values

    $('#trainTable').append("<tr><td>" +
        trainName + "</td><td>" +
        trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" +
        trainTime + "</td></tr>");

    });







});