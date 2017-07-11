<?php

function logout(){
  session_start();
  $_SESSION['id'] = [];
  if(!empty($_COOKIE[session_name()])){
    setcookie(session_name(), null, time() - 36000);
  }
  session_destroy();
}


  function redirect($location){
    header("Location: {$location}");
    exit;
  }
?>
