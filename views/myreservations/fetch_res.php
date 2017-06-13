<?php
require_once '../../login.php';
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);

$query = "select * from resources";
$res = mysqli_query($conn, $query);
$rows = mysqli_num_rows($res);

for ($j = 0 ; $j < $rows ; ++$j)
{
$res->data_seek($j);
$row = $res->fetch_array(MYSQLI_ASSOC);
$resource[] = $row['rname'];
}

print_r(json_encode($resource));
?>