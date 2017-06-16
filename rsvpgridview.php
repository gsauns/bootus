<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
	<link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css">
    <style>
        .Yes { color: "#228B22" }
        .NO { color: "#800000" }
    </style>
</head>

<body>

<?php
$mysqli = new mysqli("localhost", "meganmeg_admin", "q3PKVtAMm6WXre", "meganmeg_wedding");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$sql = "SELECT name, CASE WHEN attending = 1 THEN 'Yes' ELSE 'NO' END AS attending, CASE WHEN attending = 0 THEN null ELSE num_guests END AS num_guests, song_request, notes FROM rsvp ORDER BY created desc";

$results = $mysqli->query($sql);

print '<table class="table table-striped">';
print '<thead><tr><th>Name</th><th>Attending</th><th>Guests</th><th>Song Request</th><th style="width:50%;">Notes</th></tr><tbody>';

$total_guests = 0;
$yess = 0;
$nos = 0;

while($row = $results->fetch_array()) {
    print '<tr>';
    print '<td>'.$row["name"].'</td>';
    print '<td class="'.$row["attending"].'">'.$row["attending"].'</td>';
    print '<td>'.$row["num_guests"].'</td>';
    print '<td>'.$row["song_request"].'</td>';
    print '<td>'.$row["notes"].'</td>';
    print '</tr>';

    if ($row["attending"] == "Yes") {
        $yess += 1;
    }
    else {
        $nos += 1;
    }

    if (!is_null($row["num_guests"])) {
        $total_guests += $row["num_guests"];
    }
}

print '<tfoot><tr style="font-weight:bold;"><td>TOTALS</td><td></td><td>'.$total_guests.'</td><td>'.$yess.' yes, '.$nos.' no</td><td></td></tfoot>';
print '</tbody></table>';

$results->free();

$mysqli->close();

?>

</body>
</html>