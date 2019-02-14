<?php
include('database.php');
if (isset($_POST['cproducto'])) {
    $cproducto = $_POST['cproducto'];
    $nproducto = $_POST['nproducto'];
    $clitros = $_POST['cantidad'];
    $clitrosu = $_POST['cantidadlu'];
    $clote = $_POST['clote'];

    $query = "INSERT INTO `PRODUCTO`(`codigoproducto`, `nombreproducto`, `cantidadlitros`, `cantidadlitrosporunidad`, `LOTE_idlote`) VALUES ('$cproducto','$nproducto','$clitros','$clitrosu','$clote');";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Fallo!');
    }
    echo "Lote registrado exitosamente!";
}