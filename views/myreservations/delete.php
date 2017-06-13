<?php
require_once '../../login.php';
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);

$data = json_decode(file_get_contents("php://input"));
$startdate = mysqli_real_escape_string($conn, $data->startdate);
$enddate = mysqli_real_escape_string($conn, $data->enddate);
$starttime = mysqli_real_escape_string($conn, $data->starttime);
$endtime = mysqli_real_escape_string($conn, $data->endtime);
$resource = mysqli_real_escape_string($conn, $data->resource);

$query = "delete from reservations where startdate='$startdate' and enddate='$enddate' and starttime='$starttime' and endtime='$endtime' and resource = '$resource' ";
$res = mysqli_query($conn, $query);
  
  if(!$res)
	  echo "failed";
?>