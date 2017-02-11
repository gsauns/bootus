<?php
$mysqli = new mysqli("localhost", "meganmeg_admin", "q3PKVtAMm6WXre", "meganmeg_wedding");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$name 			= $mysqli->real_escape_string($_POST['name']);
$email 			= $mysqli->real_escape_string($_POST['email']);
$attending		= $_POST['attending'];
$num_guests 	= $_POST['num_guests'];
$song_request 	= $mysqli->real_escape_string($_POST['song_request']);
$notes 			= $mysqli->real_escape_string($_POST['notes']);

if (strlen($num_guests) == 0) {
	$num_guests = 'NULL';
}

$sql = "INSERT INTO rsvp ".
		"(name, email, attending, num_guests, song_request, notes, created) ".
  		"VALUES ('$name', '$email', $attending, $num_guests, '$song_request', '$notes', NOW())";

/* this query will fail, cause we didn't escape $city */
if (!$mysqli->query($sql)) {
    printf("Error: %s\n", $mysqli->sqlstate);
}
else {
	printf("success");
}

$mysqli->close();

?>
