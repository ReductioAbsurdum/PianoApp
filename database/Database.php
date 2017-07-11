<?php
  require_once("config_develop.php");

  class mySQLDatabase{
    private $connection;

    function __construct() {
        $this->open_connection();
      }

    public function open_connection(){
        $this->connection = mysqli_connect(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
        if(mysqli_connect_errno()) {
          die("Database connection failed: " .
               mysqli_connect_error() .
               " (" . mysqli_connect_errno() . ")"
          );
      }
    }

    public function close_connection(){
      if(isset($this->connection)) {
        mysqli_close($this->connection);
        unset($this->connection);
      }
    }

    public function query($sql){
      $result = mysqli_query($this->connection, $sql);
      return $this->confirm_query($result);
    }

    private function confirm_query($result){
      if (!$result) {
    	  return "";
    	}else{
        return $result;
      }
    }

    //database setup for neutral functions
    public function fetch_array($result_set){
      return mysqli_fetch_array($result_set);
    }

    public function fetch_assoc_array($result){
      return mysqli_fetch_assoc($result);
    }

    public function escape_value($string){
      $escaped_string = mysqli_real_escape_string($this->connection, $string);
      return $escaped_string;
    }

    public function num_rows($result_set){
      return mysqli_num_rows($result_set);
    }

    public function last_insert_id() {
      return mysqli_insert_id($this->connection);
    }

    public function affected_rows() {
      return mysqli_affected_rows($this->connection);
    }

}//class close

  $database = new mySQLDatabase();

 ?>
