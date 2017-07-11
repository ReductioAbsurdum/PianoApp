<?php
//1. Create a database connection
require_once("../database/Database.php");
require("../includes/config.php");
?>

<?php
global $database;
$time = $database->escape_value($_POST['time']);
$correct = $database->escape_value($_POST['correct']);
$id = $database->escape_value($_SESSION["id"]);

$query1 = "INSERT INTO piano_times (user_id, correct, time) VALUES ({$id},{$correct},'{$time}');";
$result1 = $database->query($query1);
if($result1 != 1){
	die("Failed To Save Score");
}

$query2 = "SELECT * FROM piano_times INNER JOIN users ON piano_times.user_id=users.id ORDER BY correct DESC, time ASC LIMIT 25";
$scores = $database->query($query2);

if(!$scores)
{
	die("Could not retrieve highscores");
}
?>

<html>
<head>
<title>Results</title>

</head>

<body>
<?php $count = 0; ?>

<table id="php">
<tr><th>Place</th><th>Name</th><th>Correct</th><th>Time</th></tr>
<?php foreach($scores as $val): ?>
	<tr>
	<td><?= ++$count ?></td>
	<td><?= $val['username'] ?></td>
	<td><?= $val['correct'] ?>/34</td>
	<td><?= substr($val['time'], 3) ?></td>
	</tr>
<?php endforeach ?>

</table>
<p><i>We have just emailed you your personal top scores!<i></p>
</body>
</html>

<?php //Email form ---------------------------------------
	$query4 = "SELECT email, username FROM users WHERE id = {$id}";
	$emailResult = $database->query($query4);
	if(!$emailResult){
		die("Failed to send email scores");
	}

	$emailassoc = $database->fetch_assoc_array($emailResult);

	$username = $emailassoc['username'];
	$email = $emailassoc['email'];
	$subject = "Top Piano Scores for {$username}";
	$header = "From: Piano App \r\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= "Content-Type: text/html; charset=UTF-8\r\n";

	$query5 = "SELECT * FROM piano_times WHERE user_id = {$id} ORDER BY correct DESC, time ASC LIMIT 25;";
	$scoreResults = $database->query($query5);
	if(!$scoreResults){
		die("Failed to send email scores");
	}

	$count = 0;

	$message = "<html><body>";
	$message .= "<table style=\"margin='auto'; cellpadding='10'\">";
	$message .= "<tr><th>Place</th><th>Name</th><th>Correct</th><th>Time</th></tr>";

	 foreach($scoreResults as $val){

		 $time = substr($val["time"], 3);
		 ++$count;

		$message .= "<tr>";
		$message .= "<td>{$count}</td>";
		$message .= "<td>{$username}</td>";
		$message .= "<td>{$val['correct']}/34</td>";
		$message .= "<td>{$time}</td>";
		$message .= "</tr>";
	}

	$message .= "</table>";
	$message .= "</body></html>";

	mail($email, $subject, $message, $header);
?>

<?php
//5. Close database connection
$database->close_connection();
?>
