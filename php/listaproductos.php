<?php
include ('database.php');
$query = "SELECT * FROM PRODUCTO;";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Query error!'.mysqli_error($connection));
}
$response = array();
while($row = mysqli_fetch_array($result)){
    $response[] = array(
        'codigoproducto' => $row['codigoproducto'],
        'nombreproducto' => $row['nombreproducto'],
        'cantidadlitros' => $row['cantidadlitros'],
        'cantidadlitrosporunidad' => $row['cantidadlitrosporunidad'],
        'LOTE_idlote' => $row['LOTE_idlote']
    );
}
$jsonstring = json_encode($response);
echo $jsonstring;