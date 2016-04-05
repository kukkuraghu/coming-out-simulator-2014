var currentScene = "";
var replay = false;
var dialogueCount = 0;
var dialoguePublishCount = 0;
var choicesMade = [];
var choiceCounter  = 0;
window.addEventListener("beforeunload", function (event) {
    console.log('window is getting closed');
    var dialogues = dialogueDOM.querySelectorAll("div");
    var last3Dialogues = [];
    for (var i = 0; i < 3 && i < dialogues.length ; i++) {
        last3Dialogues[i] = dialogues[dialogues.length > 2 ? dialogues.length + i - 3 : i]
    }
    var last3DialoguesText = [], i = 0;
    last3Dialogues.forEach(function(dialogue) {
        last3DialoguesText[i] = dialogue.innerHTML;
        i++;
    });
    console.log(last3DialoguesText);
    localStorage.setItem("currentScene", currentScene);
    localStorage.setItem("dialogueCount", dialogueCount);
    localStorage.setItem("choices", JSON.stringify(choicesMade));
});
function initializeSaveSceneParms() {
    //choicesMade = [];
    //dialogueCount = 0;
}