window.onload = function(){
	
	var loading_bar = document.getElementById("loading_bar");
	subscribe("resourceLoaded",function(){
		loading_bar.style.width = Math.floor((_resourcesLoaded/_resourcePromises.length)*100)+"%";
	});

	Q.all(_resourcePromises).then(function(){
		setTimeout(function(){
			document.getElementById("game").setAttribute("screen","blank");
		},1000);
		setTimeout(function(){
			document.getElementById("game").setAttribute("screen","game");

			//The program keeps track of the number of dialogues displayed.
			//When the browser is closed or relaoded, the program will write the 
			// count to localStorage with name "dialogueCount". 
			//If the user prefers to start from where he left,
			//the program will write  "dialogueCount" messages to screen
			replayCount = localStorage.getItem("dialogueCount"); //Reads the "dialogueCount" from localStorage
			replayCount = parseInt(replayCount, 10);
			
			
			if (replayCount) {
				//There were some chats last time.
				//Give an option to the user to start from where he left or
				//to start from the beginning.
				addSelection = false;//Set a flag to indicate that this choice not to be saved for future session replays.
				Choose({
					"[start from last position]": function(message){
						//User opted to start from where he left
						replay = true;//switch on the replay flag. Other functions will check this flag.

						//Read the choices made in the last session.
						//It is available in the localStorage
						var choicesSavedString = localStorage.getItem("choices");
						if (choicesSavedString) {
							choicesSaved = JSON.parse(choicesSavedString);
						}
						Start();
					},
					"[All new session]": function(message){
						//User opted to start fresh
						replay = false;//Keep replay flag off.
						Start();
					},
				});
			}
			else {
				//No previous chats available. Start fresh.
				Start();
			}
		},1500);
	});

};


////////////////////////////////
//////////// TEST //////////////
////////////////////////////////

/*
window.onload2 = function(){

	// TEST PLAYTHROUGH
	$ = {

	    "main_menu_convo_1": 2,
	    "main_menu_convo_2": 3,
	    
	    "inception_answer": "dream",
	    "hippies": true,
	    "coming_out_readiness": "no",
	    
	    "what_you_called_out": "Hello, anybody?",
	    "waiting_action": "wait",
	    "studying_subject": "Computer Science",
	    "relationship": "friend",
	    "lying_about_hanging_out": true,
	    "studying_subject_2": "Computer Science",
	    
	    "crying": "sympathy",
	    "what_are_you": "son",
	    "top_or_bottom": "versatile",
	    "promise_silence": "yes",
	    "grounded": 2,

	    "tried_talking_about_it": true,
	    "father_oblivious": false,
	    "punched":true,
	    
	    "told_jack": "texts",
	    "blame": "parents",
	    "breaking_up_soon": true,

	    /*"coming_out_stories_left": 0,
	    "order_of_stories": [
	        "truth",
	        "lie",
	        "half-truth"
	    ],
	    "told_story_truth": true,
	    "outro_convo_truth": 3,
	    "told_story_lie": true,
	    "outro_convo_lie": 3,
	    "told_story_half_truth": true,
	    "outro_convo_half_truth": 3

	};

	Q.all(_resourcePromises).then(function(){
		//Start_Jack_1();
		//Start_Dinner_1();

		/*Show("background","dinner");
		Show("clock","clock_ticking",{x:155,y:294});
		Show("clock_time","clock_1855",{x:155+5,y:294+37});
		Show("nicky","dinner_nicky_sit",{x:0,y:300});
		Show("dad",null,{x:0,y:300});
		Show("mom","mom_sit",{x:0,y:300});
		Show("table","dinner_table_2",{x:0,y:420});
		PlaySound("clock","dinner_ticking",{loop:-1});
		Start_Dinner_5();

		Start_Outro();

	});

};*/