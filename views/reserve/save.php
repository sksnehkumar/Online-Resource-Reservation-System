<?php
  require_once '../../login.php';
  $conn = new mysqli($hn, $un, $pw, $db);
  if ($conn->connect_error) die($conn->connect_error);
  
  $data = json_decode(file_get_contents("php://input"));
  $startdate = mysqli_real_escape_string($conn, $data->startdate);
  $enddate = mysqli_real_escape_string($conn, $data->enddate);
  $starttime = mysqli_real_escape_string($conn, $data->starttime);
  $endtime = mysqli_real_escape_string($conn, $data->endtime);
  $pno = mysqli_real_escape_string($conn, $data->pno);
  $purpose = mysqli_real_escape_string($conn, $data->purpose);
  $strength = mysqli_real_escape_string($conn, $data->strength);
  $resource = mysqli_real_escape_string($conn, $data->resource);
  
  $query = "insert into reservations values ('$startdate', '$enddate', '$starttime', '$endtime', '$pno', '$purpose', null,'$strength', '$resource') ";
  $res = mysqli_query($conn, $query);
  
  if(!$res)
	  echo "failed";
?>