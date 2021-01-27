<?php

$_POST = json_decode(file_get_contents("php://input"), true);  // для получения json формата
echo var_dump($_POST);

?>