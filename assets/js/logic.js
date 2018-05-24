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
    var trainFirstTime = childSnapshot.val().time;

    //Calculate next arrival time using first train time and frequency
                // (TEST 1)
                // First Train of the Day is 6:00pm
                // Assume Train comes every 20 minutes.
                // Assume the current time is 7:23 PM....
                // What time would the next train be...?
                    //  It would be 7:40 -- 17 minutes away

                // (TEST 1 MATH)
                    // time away from even hour
                        // 23 - 00 = 23
                    // remainder of current time of frequency
                        // 23 % 20 = 3
                    // difference between remainder and frequency to determine time left before next train
                        // 20 - 3 = 17
                    // add current time to time before next train
                        // 7:23pm + 17 minutes = 7:40pm
                

    // Calculate minutes away time using current time and next schedule departure
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConv = moment(trainFirstTime, "HH:mm").subtract(1, "years");
        // Current Time
        var currentTime = moment();
        // Difference between trainFirstTime and currentTime
        var diffTime = moment().diff(moment(firstTimeConv), "minutes");
        //Modulus for remaining time
        var minRemainder = diffTime % trainFrequency;
        // Difference between frequency and remaining time before train
        var timeAwayNext = trainFrequency - minRemainder;


    //Calculate next arrival time using first train time and frequency
        var trainTime = moment().add(timeAwayNext, "minutes");
        var trainNextTime = trainTime.format("hh:mm A");

  

    // Update train table data from database and new calculated values

    $('#trainTable').append("<tr><td>" +
        trainName + "</td><td>" +
        trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" +
        trainNextTime + "</td><td>" +
        timeAwayNext + "</td></tr>");

    });







});