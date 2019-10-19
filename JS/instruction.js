// this script contains all functions for the instruction run through

var contents = document.getElementsByClassName('instruction-content');
var instructionIndex = 0;


//initialise the instruction
//set all instruction steps hidden 
//initialise the functionalities of each button
function instructionInit() {
    for (var i = 1; i < contents.length; i++) {
        hideElement(contents[i]);
    }
    instrcutionBtn();
    document.addEventListener("keypress", press);
}

/*
Show the selected element
*/
function showElement(c) {
    if(c.style.display == "none") {
        c.style.display = '';
    }
}

/*
Hide the selected element
*/
function hideElement(c) {
    c.style.display = 'none';
}

/*
Assign conclick function for each button in the instruction
*/
function instrcutionBtn() {
    var next_btns = document.getElementsByClassName('instruction-next'); 

    var back_btns = document.getElementsByClassName('instruction-back');

    
    for (var i = 0; i < next_btns.length; i++) {
        next_btns[i].setAttribute("onclick", "nextInstruction()")
    }
    for (var i = 0; i < back_btns.length; i++) {
        back_btns[i].setAttribute("onclick", "previousInstruction()")
    }
}

/*
Event handler for user to guide them pressing the key they are asked to
*/
function press(e) {
    var char = String.fromCharCode(e.which);
    var id = contents[instructionIndex].id;
    
    if (id == 'left-button-instruction') {
        if (char == 'v' || char == 'V') {
            nextInstruction();
        }
    }
    if (id == 'right-button-instruction') {
        if (char == 'b' || char == 'B') {
            nextInstruction();
        }
    }
    
}
/*
show next instruction section
*/
function nextInstruction() {
    hideElement(contents[instructionIndex]);
    instructionIndex++;
    showElement(contents[instructionIndex]);
}
/*
show the previous intrcution section
*/
function previousInstruction() {
    hideElement(contents[instructionIndex]);
    instructionIndex--;
    showElement(contents[instructionIndex]);
}


