<?php
    include ('database.php');
    $search = $_POST['search'];
    if (!empty($search)){
        $select = "SELECT * FROM LOTE WHERE idlote LIKE '$search%'";
        $result = mysqli_query($connection, $select);
        if (!$result){
            die('Error de busqueda'. mysqli_error($connection));
        }
        $resp = array();
        while ($row = mysqli_fetch_array($result)) {
            $resp[] = array(
                'idlote' => $row['idlote'],
                'codigolote' => $row['codigolote'],
                'tipolote' => $row['tipolote'],
                'cantidadproductos' => $row['cantidadproductos']
            );
        }
        $respstring = json_encode($resp);
        echo $respstring;
    }