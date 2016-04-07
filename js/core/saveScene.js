var replayCount = 0;
var choicesSaved = [];
var replay = false;
var dialogueCount = 0;
var dialoguePublishCount = 0;
var choicesMade = [];
var choiceCounter  = 0;
var addSelection = true;
window.addEventListener("beforeunload", function (event) {
    console.log('window is getting closed');
    localStorage.setItem("dialogueCount", dialogueCount);
    localStorage.setItem("choices", JSON.stringify(choicesMade));
});
function initializeSaveSceneParms() {
    //choicesMade = [];
    //dialogueCount = 0;
}