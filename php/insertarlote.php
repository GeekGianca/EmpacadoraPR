<?php
    include ('database.php');
    if (isset($_POST['idlote'])){
        $idlot = $_POST['idlote'];
        $tipo = $_POST['tipolote'];
        $cant =$_POST['cantidad'];
        $query = "INSERT INTO LOTE(idlote, codigolote, tipolote, cantidadproducto) VALUES ('$idlot', (SELECT NOW()+0), '$tipo', '$cant');";
        $result = mysqli_query($connection, $query);
        if (!$result){
            die('Query Fallo!');
        }
        echo "Lote registrado exitosamente!";
    }