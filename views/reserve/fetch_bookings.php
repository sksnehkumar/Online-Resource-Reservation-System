<?php
require_once '../../login.php';
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);

$data = json_decode(file_get_contents("php://input"));

$query = "select * from reservations ";
$res = mysqli_query($conn, $query);
$rows = mysqli_num_rows($res);
$bookings = array();
for ($j = 0 ; $j < $rows ; ++$j)
{
$res->data_seek($j);
$row = $res->fetch_array(MYSQLI_ASSOC);
$bookings[] = $row;
}

print_r(json_encode($bookings));
?>