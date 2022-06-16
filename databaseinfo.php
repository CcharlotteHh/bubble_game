<?php
if(isset($_REQUEST['n']) && isset($_REQUEST['s'])) {

  $servername = "localhost";
  $username = "root";
  $password = "";

  $conn = new mysqli($servername, $username, $password, 'highscore');
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  $name = mysqli_real_escape_string($conn, $_REQUEST['n']);
  $score = $_REQUEST['s'];
  $playerID = 0;

  $sql = "SELECT id, `name` FROM player WHERE `name` = '$name'";
  $result = $conn->query($sql);
  if ($result->num_rows == 0) {
    // player bestaat ngo niet -> toevoegen
    $sql = "INSERT INTO player (`name`, `register_date`) VALUES ('$name', NOW())";

    if ($conn->query($sql) === TRUE) {
      $playerID = $conn->insert_id;
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
      http_response_code(400);
    }
  } else {
    // player bestaat al -> id ophalen
    while ($row = $result->fetch_assoc()) {
      $playerID = $row['id'];
    }
  }

  $sql = "INSERT INTO score (`player_id`, `score`, `playdate`) VALUES ('$playerID', $score, NOW())";
  if ($conn->query($sql) === TRUE) {
    $sql = "SELECT score, playdate, `name` FROM score INNER JOIN player ON player.id = score.player_id 
    ORDER BY score DESC LIMIT 5";
  
    $result = $conn->query($sql);
    $return_array = array();

    while ($row = mysqli_fetch_array($result)) {
        $return_array[] = array(
          'score' => $row['score'],
          'playdate' => $row['playdate'],
          'name' => $row['name'],
        );
    }
    echo json_encode($return_array);
    http_response_code(200);
  } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
      http_response_code(400);
  }
  $conn->close();
 } else {
    http_response_code(400);
 }

?>
