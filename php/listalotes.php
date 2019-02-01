<?php
    include ('database.php');
    $query = "SELECT * FROM LOTE;";
    $result = mysqli_query($connection, $query);
    if (!$result){
        die('Query error!'.mysqli_error($connection));
    }
    $response = array();
    while($row = mysqli_fetch_array($result)){
        $response[] = array(
            'idlote' => $row['idlote'],
            'codigolote' => $row['codigolote'],
            'tipolote' => $row['tipolote'],
            'cantidadproducto' => $row['cantidadproducto']
        );
    }
    $jsonstring = json_encode($response);
    echo $jsonstring;