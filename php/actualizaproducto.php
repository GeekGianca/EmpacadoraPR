<?php
include('database.php');
$cproducto = $_POST['cproducto'];
$nproducto = $_POST['nproducto'];
$clitros = $_POST['cantidad'];
$clitrosu = $_POST['cantidadlu'];
$clote = $_POST['clote'];

$query = "UPDATE `PRODUCTO` SET `nombreproducto`='$nproducto',`cantidadlitros`='$clitros',`cantidadlitrosporunidad`='$clitrosu',`LOTE_idlote`='$clote' WHERE `codigoproducto` = '$cproducto'";
$result = mysqli_query($connection, $query);
if (!$result) {
    die('Actualizado error ' . mysqli_error($connection));
}
echo "Actualizacion correcta";