var replayCount = 0;//Global varibale. Will have the count of replay dialogues. 
var choicesSaved = []; //In replay mode, it will have the choices made from the last session.
var replay = false; //Flag to indicate whether the replay mode is ON or OFF.
var dialogueCount = 0; //Global variable to track the number of dialogues displayed.
var dialoguePublishCount = 0; //Global variable to track the number of dialogues published.
var choicesMade = [];//Stores the choices made in a session. This will be saved to localStorage when the browser is closed.
var choiceCounter  = 0;//Counter used for choicesMade.
var addSelection = true; //Flag used to indicate whether the choice needs to be saved. 

//Register event handler for browser close and reload.
window.addEventListener("beforeunload", function (event) {
    localStorage.setItem("dialogueCount", dialogueCount);//Store the number of dialogues displayed.
    localStorage.setItem("choices", JSON.stringify(choicesMade));//Store the saved choices.
});
