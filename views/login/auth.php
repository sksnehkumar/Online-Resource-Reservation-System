<?php
require_once '../../login.php';
$conn = new mysqli($hn, $un, $pw, $db);
if ($conn->connect_error) die($conn->connect_error);

$data = json_decode(file_get_contents("php://input"));
$user = mysqli_real_escape_string($conn, $data->user);
$pass = hash('sha256',mysqli_real_escape_string($conn,$data->pass));

$query = "select pname from persons where pno='$user' and pwd = '$pass'";
$res = mysqli_query($conn, $query);
$count = mysqli_num_rows($res);
$name = '';

if($count == 1)
{
	$res->data_seek(0);
	$name = $res->fetch_assoc()['pname'];
	echo $name;
}
else
	echo '';

?>