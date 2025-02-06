<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-60035027-1');
</script>
<nav>
    <ul class="footer" id="navbar">
        <li><a href="#" title="Stop Talking" class="TheXButton" onclick="speechSynthesis.cancel();">x</a></li>
        <li><a href="#" title="Play/Pause" class="ThePlayButton" id="PlayPauseButton" onclick="PlayPause()">></a></li>
        <li><a href="#" title="Autoplay [Unfinished]" class="TheSkipButton">>></a></li>
        <li><a href="#" title="Open the Menu" class="TheMenuButton" onclick="OpenOptionsMenu()" >&#9776;</a> <!-- Menu icon --> 
        </li>
    </ul>
</nav>

<div class="optionsMenu" id="optionsMenu"> <div id="page-wrapper">
	<p id="TTSmsg"></p>

  	<div class="option">
		<label for="voice">Voice</label>
		<select onchange="TheXButton()" name="voice" id="voice"></select>
	</div>
	<div class="option">
		<label for="volume">Volume</label>
		<input type="range" min="0" max="1" step="0.1" name="volume" id="volume" value="1">
	</div>
	<div class="option">
		<label for="rate">Rate</label>
		<input type="range" min="0.1" max="10" step="0.1" name="rate" id="rate" value="1">
	</div>
	<div class="option">
		<label for="pitch">Pitch</label>
		<input type="range" min="0" max="2" step="0.1" name="pitch" id="pitch" value="1">
	</div>
</div>
</div>