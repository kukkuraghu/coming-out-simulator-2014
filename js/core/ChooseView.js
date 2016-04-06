window.onclick = function(){
	if(choicesDOM.innerHTML==""){
		skipStep();
	}
}

var gameDOM = document.getElementById("game");
var dialogueDOM = document.getElementById("dialogue");
var dialogueDOMOffset = 20;
var choicesDOM = document.getElementById("choices1");
var choiceInputDOM = document.getElementById("choice_input");
var backgroundDOM = document.getElementById("background");

subscribe("say", function(character, message){
	//Keeps a count on the number of dialogues
	//Used i replay
	dialogueCount++;



	// Add dialogue bubble
	var dom = document.createElement("div");
	dom.setAttribute("class",character.align);
	dom.style.color = character.color || "#000";
	dom.style.background = character.background || "#FFF";
	dom.style.borderLeftColor = dom.style.borderRightColor = character.background || "#FFF";
	dom.innerHTML = message;
	dialogueDOM.appendChild(dom);

	if (!replay) {
		// Play sounds
		createjs.Sound.play(character.sound);

		// Fade in
		setTimeout(function(){
			dom.style.opacity = 1;
		},1);	
	}
	else {
		dom.style.opacity = 1;
	}
	if (replay && dialogueCount >= replayCount) {
		replay = false;
	}
	

	// If dialogue bubbles are too big, scroll it.
	var maxDialogueSpace = game.clientHeight-(260+120); // Game height - (image height + choice height)
	if(dialogueDOM.clientHeight+dialogueDOMOffset > maxDialogueSpace){
		dialogueDOMOffset = maxDialogueSpace - dialogueDOM.clientHeight;
		dialogueDOM.style.top = dialogueDOMOffset+"px";
	}

});

subscribe("choose", function(choices){

	// Choice labels
	var labels = Object.keys(choices);
	var actionChoice = false;
	console.log(labels[0][0]);
	if (labels[0][0] === "[") {
		actionChoice = true;
	}
	var currentChoice = choicesSaved[choiceCounter];
	choiceCounter++;

	if (replay) {
		console.log("current choice : ", currentChoice);
		choicesMade.push(currentChoice);
		choices[labels[labels.indexOf(currentChoice)]](currentChoice);
	}
	else {
		if (!actionChoice) {
			choiceInputDOM.style.display = "inline-block";	
		}
		
		// Create choices
		for(var i=0;i<labels.length;i++){

			var label = labels[i];
			var button = document.createElement("div");
			button.innerHTML = label;
			button.onclick = (function(cb,message){
				return function(){
					console.log(message);
					choicesMade.push(message);
					if (!actionChoice) {
						jQuery("#choice_input").removeData("typed");
						jQuery("#choice_input").typed({
	        				strings: [message],
	        				typeSpeed: 0,
	        				callback: function() {
	        					choiceInputDOM.value = "";
								choiceInputDOM.style.display = "none";
								choicesDOM.innerHTML = "";
								cb(message);
	        				}
	      				});
	      			}
	      			else {
						choicesDOM.innerHTML = "";
						cb(message);
	      			}
					
				};
			})(choices[label], label);

			choicesDOM.appendChild(button);

			(function(button){
				setTimeout(function(){
					button.setAttribute("shown","true");
				},100*i);
			})(button);

		}

		// Choice padding, for 1-3 choices
		var height = (labels.length*30);
		var padding = (120-height)/2;
		choicesDOM.style.height = height+"px";
		choicesDOM.style.padding = padding+"px 0";
		
	}

	
});

function ClearDialogue(){
	dialogueDOM.innerHTML = "";
	dialogueDOM.style.top = "20px";
	dialogueDOMOffset = 20;
	choicesDOM.innerHTML = "";
}

function ClearScene(){
	createjs.Sound.stop();
	_sceneItems = {};
	_soundItems = {};
	backgroundDOM.innerHTML = "";
	ClearDialogue();
}

subscribe("clear",ClearScene);

var _sceneItems = {};
subscribe("show", function(label, artLabel, position){

	// Scene Item exists
	var item = _sceneItems[label];

	// Art resource exists
	var image;
	if(artLabel){
		image = _stills[artLabel] || _sprites[artLabel];
	}

	// Does the scene item already exist?
	var dom;
	if(item){
		dom = item.dom;
	}else{
		dom = document.createElement("div");
		backgroundDOM.appendChild(dom);
		item = {
			dom: dom
		};
		_sceneItems[label] = item;
	}

	// Fixing that DOM's style...
	if(image){
		dom.style.backgroundImage = "url("+image.src+")";
		dom.style.width = image.width+"px";
		dom.style.height = image.height+"px";
	}
	if(position){
		dom.style.left = position.x+"px";
		dom.style.top = position.y+"px";
	}
	if(!artLabel){ // blank image...
		dom.style.backgroundImage = "none";
	}

	// If it's a sprite, some extra logic...
	if(image && _sprites[artLabel]){
		
		if(item.handle){
			unsubscribe(item.handle);
		}else{
			item.frame = 0;
		}

		(function(dom,item,image){

			var ticksPerFrame = Math.ceil(60/image.fps);
			var ticks = 0;
			item.handle = subscribe("tick",function(){
				ticks = (ticks+1) % ticksPerFrame;
				if(ticks==0){
					item.frame = (item.frame+1) % image.frames;
					var bgX = -item.frame*image.width;
					var bgY = 0;
					dom.style.backgroundPosition = bgX+"px "+bgY+"px";
				}
			});

		})(dom,item,image);

	}

});

var _soundItems = {};
subscribe("play", function(label, soundLabel, options){
	if(_soundItems[label]){
		_soundItems[label].stop();
	}
	_soundItems[label] = createjs.Sound.play(soundLabel,options);
});
subscribe("stop", function(label){
	if(_soundItems[label]){
		_soundItems[label].stop();
	}
});

