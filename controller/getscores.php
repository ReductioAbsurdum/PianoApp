<?php
  require("../includes/config.php");
  require_once("../database/Database.php");

  global $database;

  $id = $database->escape_value($_SESSION['id']);

  $query = "SELECT * FROM piano_times WHERE user_id = {$id} ORDER BY correct DESC, time ASC LIMIT 25";
  $results = $database->query($query);

?>

<?php
$query3 = "SELECT username FROM users WHERE id = {$id}";
$result3 = $database->query($query3);
$username = $database->fetch_assoc_array($result3);
?>

  <html>
  <head>
  <title>Personal Scores</title>

  </head>

  <body>
  <?php $count = 0; ?>

  <table id="php">
  <tr><th>Place</th><th>Name</th><th>Correct</th><th>Time</th></tr>
  <?php foreach($results as $val): ?>

  	<tr>
  	<td><?= ++$count ?></td>
  	<td><?= $username['username'] ?></td>
  	<td><?= $val['correct'] ?>/34</td>
  	<td><?= substr($val['time'], 3) ?></td>
  	</tr>
  <?php endforeach ?>

  </table>
  <p><i>When you submit your scores we email you your personal top 25 scores!<i></p>
  </body>
  </html>

  <?php
    $database->close_connection();
  ?>
