<?php
  require_once("../database/Database.php");
  require_once("../includes/functions.php");

  session_start();

  if(!empty($_POST["username"]) && !empty($_POST["password1"]) &&
    !empty($_POST["password2"]) && !empty($_POST["email"])){
      $username = $database->escape_value($_POST["username"]);
      $password = password_hash($_POST["password1"], PASSWORD_DEFAULT);
      $email = $database->escape_value($connection, $_POST["email"]);
      $query = "INSERT INTO users (username, password, email) VALUES ('{$username}', '{$password}', '{$email}')";
      $result = $database->query($query);

      if($result != 1){
        $denied = "<p id='error'>I'm sorry but your user name is already used, please pick a different one</p>";
        redirect("../views/register_form?go=$denied");
      }else{
        $_SESSION["id"] = $database->last_insert_id();
        redirect("../pianoapp/index.html");
      }

      $database->close_connection();

  }else{
    $database->close_connection();
    $denied = "<p id='error'>ERROR</p>";
    redirect("../views/register_form.php?go=$denied");
}
?>
