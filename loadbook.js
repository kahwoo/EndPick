var LoadBook = location.href.split('#')[1];
var PauseState = ">";
var PlayState = "||";
var voiceSelect = document.getElementById('voice');
var volume = document.getElementById('volume');
//var voices = document.getElementById('voice');
var rate = document.getElementById('rate');
var pitch = document.getElementById('pitch');
var divState = {};
var browsersupportMsg = document.getElementById('TTSmsg');
var BookContents
var id


jQuery.get(LoadBook, function(BookContents) {

	BookContents = BookContents.replace(/'/g,'&#39;') //Replace  ' and " quotes with \&quot;
	BookContents = BookContents.replace(/"/g,'&#34;') //Replace  ' and " quotes with \&quot;
	//alert(BookContents)
	

function replaceTitleWithAnchorLinks(BookContents) {                        //Find --Title-- and first page
    var ParseTitle = /--[^-\n](.*)--/ig; 
    return BookContents.replace(ParseTitle,
        function (PgTitle) {
             return "<div id='BookTitle'><a name='" + PgTitle + "'>"+ PgTitle + "</a>"}); //Create First div [which will be closed below]
}  

function replacePageNamesWithAnchorLinks(BookContents) {                        //Find anything inside {{ }} and replace with an anchor tag 
	var PageNumbersOrNames = /\{\{[^{{}}(.*)]+\}\}/ig; 
    return BookContents.replace(PageNumbersOrNames,
        function (PgName) {
             return "</div><div id='" + PgName + "'><a name='" + PgName + "'>"+ PgName + "</a>"}); //Close previous Div
}  

function replaceButtonsWithLinksToAnchors(BookContents) {                        //Find anything inside [[ ]] and replace with an anchor tag 
    var PageLinks = /(?:\[\[)(.*)(?:\]\])/ig;
    return BookContents.replace(PageLinks,
        function (PgLink) {
            return "<a class='PgLinkButton' href='#" + PgLink + "' onclick='showhide(&quot;"+ PgLink +"&quot;);'>"+ PgLink + "</a>"});

//			<a href="#anchor">Link Text</a>
}  


BookContents = replaceTitleWithAnchorLinks(BookContents);
BookContents = replacePageNamesWithAnchorLinks(BookContents);
BookContents = replaceButtonsWithLinksToAnchors(BookContents);
BookContents = BookContents.replace(/(?:\r\n|\r|\n)/g, '<br />'); //Replace new lines with <br />
BookContents = BookContents.replace(/\{|\}|\[|\]/g, ''); //Replace {{}} and [[]] with nothing

//alert(BookContents); 
document.getElementById("thisone").innerHTML = BookContents; //Put new bookcontents into div on page
showhide('BookTitle');
});

//Show / hide divs so only one page at a time is seen
function showhide(id) {
	TheXButton()
	//speechSynthesis.cancel();
	//document.getElementById("PlayPauseButton").innerHTML = PauseState ;
    if (document.getElementById) {
        var divid = document.getElementById(id);
        divState[id] = (divState[id]) ? false : true;
		document.getElementById('BookTitle').style.display = 'none';
		//close others
        for (var div in divState){
            if (divState[div] && div != id){
                document.getElementById(div).style.display = 'none';
                divState[div] = false;
            }
        }
        divid.style.display = (divid.style.display == 'block' ? 'none' : 'block');
		var CurrentPage = document.getElementById(id).innerText
		UtterDiv(CurrentPage);
    }
};

//Speech options


//Speech synthesis 
function UtterDiv(CurrentPageContents) {
    //alert(CurrentPageContents);
	//window.speechSynthesis.cancel();	
	if (window.SpeechSynthesisUtterance === undefined) {
            document.getElementById('ss-unsupported').classList.remove('hidden');
	}else{
			var utterance = new SpeechSynthesisUtterance(CurrentPageContents);
utterance.rate = rate.value;
utterance.pitch = pitch.value;
utterance.volume = volume.value;
utterance.onstart = function() {document.getElementById("PlayPauseButton").innerHTML = PlayState;};
utterance.onresume = function() {document.getElementById("PlayPauseButton").innerHTML = PlayState;};
utterance.onpause = function() {document.getElementById("PlayPauseButton").innerHTML = PauseState;};
utterance.onerror = function() {document.getElementById("PlayPauseButton").innerHTML = PauseState;};
utterance.onend = function() {document.getElementById("PlayPauseButton").innerHTML = PauseState;}; //Speaker finished
				// If a voice has been selected, find the voice and set the utterance instance's voice attribute.
				if (voiceSelect.value) {
					utterance.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
				}
				setTimeout(function(){window.speechSynthesis.speak(utterance);},50); //need to find out why it doesnt work without a timeout
	}
};  
			
//Speech Options
/*
 * Check for browser support
 */
if ('speechSynthesis' in window) {
	browsersupportMsg.innerHTML = 'Speech synthesis options:';
} else {
	document.getElementById('ss-unsupported').classList.remove('hidden');
	//browsersupportMsg.innerHTML = 'Try <a href="http://www.google.com/chrome">Google Chrome</a> to have books read out loud.';
}

// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices.
	var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
	voices.forEach(function(voice, i) {
    // Create a new option element.
		var option = document.createElement('option');
    
    // Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;
		  
    // Add the option to the voice selector.
		voiceSelect.appendChild(option);
	});
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
  //alert("Voice changed");
};
			
// PlayPause button
function PlayPause(){
	//PauseState = ">";
	//StoppedState = ">";
	//PlayState = "||";
//var amISpeaking = speechSynthesis.speaking
//		alert(amISpeaking)
	//var amIPaused = speechSynthesis.paused;
	//if (amIPaused = true){
//		window.speechSynthesis.resume()
		//document.getElementById("PlayPauseButton").innerHTML = PlayState
	//}else 
	//alert(PauseState);	
	//alert(document.getElementById("PlayPauseButton").innerHTML);
		if ( document.getElementById("PlayPauseButton").innerHTML == PauseState || document.getElementById("PlayPauseButton").innerHTML == "&gt;") {
	    //alert("I was paused");
		window.speechSynthesis.resume();
		var CurrentPage = document.getElementById("thisone").innerText
		UtterDiv(CurrentPage);
        document.getElementById("PlayPauseButton").innerHTML = PlayState
          }
else if ( document.getElementById("PlayPauseButton").innerHTML == PlayState) {
	 window.speechSynthesis.pause();
          document.getElementById("PlayPauseButton").innerHTML = PauseState ;
          }
else { //StoppedState
        // to be on the safe side
		 //window.speechSynthesis.resume();
		 alert("Failsafe step");
		 var CurrentPage = document.getElementById("thisone").innerText
		 //alert(CurrentPage)
		 UtterDiv(CurrentPage);
        document.getElementById("PlayPauseButton").innerHTML = PlayState;
}
};
/* Not sure why this doesnt work
if (window.speechSynthesis.paused == false) {
	console.log(window.speechSynthesis.paused);
	window.speechSynthesis.pause();	
	}
else if (window.speechSynthesis.paused == true) {
	console.log(window.speechSynthesis.paused);
	window.speechSynthesis.resume();
}	else {	
	UtterDiv();
	console.log('other');
	document.getElementById("PlayPauseButton").innerHTML = PlayState;}	
};
*/

// Autoplay button
function Autoplay(){
//	//PauseState = ">";
//	//PlayState = "||";
//var amIPaused = speechSynthesisInstance.paused;
//	if (amIPaused == true ) {
//	    window.speechSynthesis.resume();
//		var CurrentPage = document.getElementById("thisone").innerText
//		UtterDiv(CurrentPage);
//        document.getElementById("PlayPauseButton").innerHTML = PlayState;
//          }
//else if ( document.getElementById("PlayPauseButton").innerHTML == PlayState) {
//	 window.speechSynthesis.pause();
//          document.getElementById("PlayPauseButton").innerHTML = PauseState ;
//          }
//else {
//        // to be on the safe side
//		 window.speechSynthesis.resume();
//        document.getElementById("PlayPauseButton").innerHTML = PlayState;
//}
};

//The Stop Talking Button
function TheXButton(){
	document.getElementById("PlayPauseButton").innerHTML = PauseState; //Fix playpause button
	//alert("XButton event");
	speechSynthesis.cancel();
	document.getElementById("PlayPauseButton").innerHTML = PauseState; //Fix playpause button
};


//Show/Hide Option menu
function OpenOptionsMenu(){
	var optionsMenu = document.getElementById ( "optionsMenu" ) ;

	if (optionsMenu.style.visibility == "hidden") {
		optionsMenu.style.visibility = "visible";
	}
	else if ( optionsMenu.style.visibility == "visible") {
				optionsMenu.style.visibility = "hidden" ;		
	}
else {
optionsMenu.style.visibility = "visible" ;	
}
};

//Fullscreen
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};