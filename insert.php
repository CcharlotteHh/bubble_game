<?php
include_once 'databaseinfo.php';

$scoreValue = $_POST['scoreValue'];
$playerName = $_POST['playerName'];

$sql = 'INSERT INTO score (score) VALUES ('.$scoreValue.')';

if (isset($_POST['savescore'])) {
  if ($conn->query($sql) === TRUE) {
    //header('Location: index.php');
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$sql = 'INSERT INTO player (name, register_date) VALUES ("'.$playerName.'", curdate())';

if (isset($_POST['savescore'])) {
  if ($conn->query($sql) === TRUE) {
    header('Location: index.php');
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();