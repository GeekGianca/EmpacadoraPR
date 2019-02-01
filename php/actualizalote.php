<?php
    include('database.php');
    $idlot = $_POST['idlote'];
    $tipo = $_POST['tipolote'];
    $cant = $_POST['cantidad'];

    $query = "UPDATE LOTE SET codigolote = (SELECT NOW()+0), tipolote = '$tipo', cantidadproducto = '$cant' WHERE idlote = '$idlot';";
    $result = mysqli_query($connection, $query);
    if (!$result){
        die('Actualizado error '.mysqli_error($connection));
    }
    echo "Actualizacion correcta";