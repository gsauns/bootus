<?php
$mysqli = new mysqli("localhost", "meganmeg_admin", "q3PKVtAMm6WXre", "meganmeg_wedding");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$sql = "SELECT * FROM rsvp";

$results = $mysqli->query($sql);

print '<table border="1">';
print '<tr><td>Name</td><td>Attending</td><td>Guests</td><td>Song Request</td><td>Notes</td></tr>';
while($row = $results->fetch_array()) {
    print '<tr>';
    print '<td>'.$row["name"].'</td>';
    print '<td>'.$row["attending"].'</td>';
    print '<td>'.$row["num_guests"].'</td>';
    print '<td>'.$row["song_request"].'</td>';
    print '<td>'.$row["notes"].'</td>';
    print '</tr>';
}

print '</table>';

$results->free();

$mysqli->close();

?>
