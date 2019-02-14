<?php
include ('database.php');
$id = $_POST['codigo'];
$query = "SELECT * FROM PRODUCTO WHERE codigoproducto = '$id';";
$result = mysqli_query($connection, $query);
if (!$result){
    die('Error de seleccion '.mysqli_error($connection));
}
$response = array();
while ($row = mysqli_fetch_array($result)){
    $response[] = array(
        'codigoproducto' => $row['codigoproducto'],
        'nombreproducto' => $row['nombreproducto'],
        'cantidadlitros' => $row['cantidadlitros'],
        'cantidadlitrosporunidad' => $row['cantidadlitrosporunidad'],
        'LOTE_idlote' => $row['LOTE_idlote']
    );
};
$respo = json_encode($response[0]);
echo $respo;