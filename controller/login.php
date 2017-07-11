<?php
  require_once("../includes/functions.php");
  require_once("../database/Database.php");
  session_start();

  global $database;

    if(!empty($_POST["username"]) || !empty($_POST["password"])){
      $username = $database->escape_value($_POST["username"]);
      $password = $database->escape_value($_POST["password"]);
      $query = "SELECT * FROM users WHERE username = '{$username}';";
      $result = $database->query($query);
        if(count($result) == 1){
          $row = $database->fetch_assoc_array($result);
            if(password_verify($password, $row["password"])){
              $_SESSION["id"] = $row["id"];
              if(!empty($_SESSION["id"])){
                redirect("../pianoapp/index.html");
              }
            }
        }
    }
    redirect("../views/login_form.php?go=denied");
?>
<?php
    mysqli_close($connection);
?>
