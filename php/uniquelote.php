<?php
    include ('database.php');
    $id = $_POST['codigo'];
    $query = "SELECT * FROM LOTE WHERE idlote = '$id';";
    $result = mysqli_query($connection, $query);
    if (!$result){
        die('Error de seleccion '.mysqli_error($connection));
    }
    $response = array();
    while ($row = mysqli_fetch_array($result)){
        $response[] = array(
            'idlote' => $row['idlote'],
            'codigolote' => $row['codigolote'],
            'tipolote' => $row['tipolote'],
            'cantidadproducto' => $row['cantidadproducto']
        );
    };
    $respo = json_encode($response[0]);
    echo $respo;