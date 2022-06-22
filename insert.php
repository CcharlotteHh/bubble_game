<?php
include_once 'databaseinfo.php';

$sql = 'INSERT INTO score (score, player_id) VALUES (rand(), 2)';

if (isset($_POST['savescore'])) {
  if ($conn->query($sql) === TRUE) {
    header('Location: index.php');
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();