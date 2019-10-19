/*
This script combile all functionalities together for the test.html page
Data would be collected and stored in a JSON object
Once the test is complete, the data would be passed to the database
The test is divided into 2 blocks, each block consist of 4 trails of simuation
Each trail last for 100 seconds and there would be 30 seconds break between 2 trails
There would be extra 2 miniutes break between 2 blocks
Data structure :
Data = {
    "user": string, //user name
    "age": int,
    "time": string, //data and time that the test is start
    result: [{
        "trail_num": int,
        "B": [],
        "V": [],
        "space", []},
        {
        data for the second trail
        }
        there would be 8 trails in total
        ]
}
*/

//variables for html element extraction
var time = document.getElementById('timer');
var test_animate = document.getElementById('test');
var start_test_btn = document.getElementById('start-test-btn');
//variables for test iteration
var trail = 4;
var block = 1; // variable to detect the current block of test

//variables for data storing
var b_presses = [];
var v_presses = [];
var space_presses = [];
var result = [];

// Variables for pausing test
var pauseTime = 60 * 15; // 15 mintues
var isPause = false;
 // flag for element that displayed on screen before pausing
var resumeElement = 0;
var breakTime = 0;


// Data for the whole test
var Data = {
    "user": null,
    "age": null,
    "result": null,
};

//get the test page ready
hideElement(test_animate);
instructionInit();
start_test_btn.setAttribute("onclick", "startTest()");


/*

To run the animation only, comment out the functions above and run the following functions:

hideElement(document.getElementById('instruction'); //hide the insctuctions contents
hideElement(time); //hide the timer
canvasInit();
attrInit();
addStripes();
createMask();
animate();
*/

/*
A conclick function for the start test button
Once the button is clicked, the introduction would be hidden and
the test would be loaded
*/
function startTest() {
    hideElement(contents[instructionIndex]);  
    document.removeEventListener("keypress", press);
    test();
}

/*
Fucntion for loading the Binocular Rivalry test
*/
function test() {
    document.addEventListener("keydown", keyPresses);
    showTimer(10);
    canvasInit();
    attrInit();
    addStripes();
    createMask();
    animate();
    pauseTest();

}

/*
Show the animation for 30 seconds
*/
function showAnimation() {
    resumeElement = 1;
    showElement(test_animate);
    var counter = 10; //each animation run 100 seconds
    var animate_timer = setInterval(animateCountDown, 1000);

    function animateCountDown() {
        if (counter < 0 ) {
          clearInterval(animate_timer);
          hideElement(test_animate);
          storeTrailData();
          if (trail > 1) {
            showTimer(30);
            trail--;
          }else {
            finishBlock();
          }
        }else {
            if (!isPause) {
                counter--;
            }
        }
    }

}
/*
show the timer for given time in seconds on screen
*/
function showTimer(sec) {
    
    resumeElement = 0;
    showElement(time);
    hideElement(test_animate);
    var timer = setInterval(countDown, 1000);
    function countDown() {
        if (sec < 1) {
            clearInterval(timer);
            hideElement(time);
            time.innerHTML = ' ';
            if(trail > 0) {
              showAnimation();
            }
        }else {
            if (!isPause) {
                sec--;
                breakTime = sec;
                time.innerHTML = sec.toString();
            }
        
        }
  }
} 

/*
function called when a block of simulations are finished

*/
function finishBlock() {
    if (block < 2) {
        block++;
        trail = 4;
        showTimer(2 * 60);
    }
}
/*
Event handler function for key presses
It records the actual real time when user press the key 'v', 'b', and
space.
The time would be stored in the correlated list
*/
function keyPresses(e) {
    var char = String.fromCharCode(e.which);
    var press_time = new Date();
    
    if(test_animate.style.display != "none") {
        if (char == 'v' || char == 'V') {
            v_presses.push(press_time);
        }
        if (char == 'b' || char == 'B') {
            b_presses.push(press_time);
        }
        //if input is a space 
        if (e.which == 32) {
            space_presses.push(press_time);
        }
    }

    // if input is escape 
    if (e.which == 27) {
        if (!isPause) {
            isPause = true;
            hideElement(time);
            hideElement(test_animate);
            time.innerHTML = ' ';
        }else {
            isPause = false;
            if (resumeElement == 0) {
                showElement(time);
                time.innerHTML = breakTime.toString();
            } else {
                hideElement(time);
                showElement(test_animate);
            }
        }
    }

}


function pauseTest() {

    var pause = setInterval(pauseTimer, 1000);
    function pauseTimer() {
        if (pauseTime > 0) {
            if (isPause) {
                pauseTime--;
                time.innerHTML = pauseTime.toString();
                showElement(time);
            }
            
        }else {
            clearInterval(pause);
            location.reload();
        }
    }
}

/*
clear the lists which store the key presses timestamps
*/
function clearData() {
    b_presses = [];
    v_presses = [];
    space_presses = [];
}
/*
Construct a Json Object to store date of one trail
*/
function storeTrailData(){
    //create a json object for storing data of one trail
    var trail_data = {
        "trail_num": null,
        "B": null,
        "V": null,
        "space": null}; 
    trail_data.trail_num =  (5 - trail) + (block - 1) * 4;
    trail_data.B = b_presses;
    trail_data.V = v_presses;
    trail_data.space = space_presses;
    result.push(trail_data);
    console.log(trail_data);
}

