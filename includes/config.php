<?php
require_once("functions.php");

  session_start();

  if(empty($_SESSION["id"])){
    $basename = basename($_SERVER['PHP_SELF']);
    if($basename == 'input.php' || $basename == 'getscores.php'){
      die("Please exit and create an account or log in to save and view scores");
    }
    redirect("../views/login_form.php");
  }
?>
