<?php
    include ('database.php');
    if (isset($_POST['datoid'])){
        $idlote = $_POST['datoid'];
        $query = "DELETE FROM LOTE WHERE idlote='$idlote'";
        $result = mysqli_query($connection, $query);
        if (!$result){
            die('Query Eliminar Error '.mysqli_error($connection));
        }
        echo "Lote eliminado correctamente!";
    }
