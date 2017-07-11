<?php
if(!empty($_GET['go'])){
  echo "{$_GET['go']}";
}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Register for Piano App</title>
    <link href="css/php.css" type="text/css" rel="stylesheet"/>
  </head>
  <body>
    <div id="form-layout">

    <form id="register" action="../controller/register.php" method="post">
      <p>Username: </p><input type="text" name="username" value="" required>
      <p>Password: </p><input type="password" name="password1" value="" required>
      <p>Type Password Again: </p><input type="password" name="password2" value="" required>
      <p>Email Address: </p><input type="email" name="email" value="" required>
      <input type="submit" name="submit" value="submit">
    </form>

  </div>
  </body>
</html>
