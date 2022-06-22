<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fish</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <canvas id="canvas1">

    </canvas>
    <div id="overlay">
        <div id="scoreBoard"></div>
        <div id="highScore"></div>
        <div id="name"></div>
        <button id="restartButton">Restart</button>
        <form action="insert.php" method="post">
            <input type="submit" value="submit" name="savescore"/>save score</input>
        </form>
    </div>

    <script src="assets/js/script.js"></script>
</body>
</html>