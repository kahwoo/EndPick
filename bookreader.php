<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="scripts/allmy.css">
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
<script src="http://code.jquery.com/jquery-latest.js"></script>

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
<title>Books Utter My Selections</title
<!-- <?php include_once("/scripts/analytics.php") ?> -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-60035027-1');
</script>
</head>
<body>
<div id="thisone">Loading</div>

<a href="#" class="MainMenuButtons" onclick="showhide('BookTitle');">Go back to Start</a>
<a href="./../index.php" class="MainMenuButtons" id="gotomenu" onclick="TheXButton();">Go to Menu</a>

</br></br>

<span id="ss-unsupported" class="api-support hidden">Google Speech Synthesis API is not supported in this browser</span>
</br></br></br></br>
<div class="fullscreenButton"> <div><a href="#" title="Toggle Fullscreen" onclick="toggleFullScreen();"><i class="icon-fullscreen icon-4x"></i></a></div>
</div>
<?php include_once("navigation.php"); ?>

</body>
<script src="/scripts/loadbook.js"></script> <!-- If you're seeing this, no book is loaded, go back to the main menu and try again --> 
</html>