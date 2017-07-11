<?php

 if(!empty($_GET['go'])){
   echo "<p id='error'>Your username or password was incorrect!</p>";
 }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Login To Piano App</title>
    <link href="css/php.css" type="text/css" rel="stylesheet"/>
  </head>
  <body>
    <div id="login">
    <span>Sign In /
    <a href="register_form.php"><button>Register</button></a> / <a href="../pianoapp/index.html"><button>guest</button></a></span>
    <form class="register" action="../controller/login.php" method="post">
      <span>Username: </span><input type="text" name="username" value="">
      <span>Password: </span><input type="password" name="password" value="">
      <input type="submit" name="submit" value="submit">
    </form>
  </div>
  </body>
</html>
