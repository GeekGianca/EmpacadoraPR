$(document).ready(function () {

    console.log('Jquery Works!');

    let edita = false;

    obtenerdatos();

    obtenerproductos();

    $('#resultado').hide();

    $('#search').keyup(function (e) {
        if ($('#search').val()) {
            let search = $('#search').val();
            $.ajax({
                url: 'php/lote-buscar.php',
                type: 'POST',
                data: {search},
                success: function (response) {
                    let datos = JSON.parse(response);
                    let template = '';
                    datos.forEach(dato => {
                        template += `<li>${dato.tipolote}</li>`
                    });
                    $('#container').html(template);
                    $('#resultado').show();
                }
            });
        } else {
            $('#resultado').hide();
        }
    });
    //End Search
    $('#lote-form').submit(function (e) {
        console.log("sending...");
        const posDatos = {
            idlote: $('#idlote').val(),
            tipolote: $('#tipolote').val(),
            cantidad: $('#cantidad').val()
        };
        let url = edita == false ? 'php/insertarlote.php' : 'php/actualizalote.php';
        console.log(url);
        $.post(url, posDatos, function (response) {
            console.log(response);
            obtenerdatos();
            $('#lote-form').trigger('reset');
            edita = false;
        });
        e.preventDefault();
    });

    //End Save
    function obtenerdatos() {
        $.ajax({
            url: 'php/listalotes.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let template = '';
                let tempselect = '';
                datos.forEach(dato => {
                    template += `
                    <tr idlotedato="${dato.idlote}">
                        <td>${dato.idlote}</td>
                        <td>
                            <a href="#" class="dato-cod">${dato.codigolote}</a>
                        </td>
                        <td>${dato.tipolote}</td>
                        <td>${dato.cantidadproducto}</td>
                        <td>
                            <button class="dato-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>
                `;
                    tempselect += `<option>${dato.idlote}</option>`;
                });
                $('#datoslote').html(template);
                $('#clote').html(tempselect);
            }
        });
    }

    $(document).on('click', '.dato-eliminar', function () {
        if (confirm('Estas seguro de eliminar el lote?')) {
            let element = $(this)[0].parentElement.parentElement;
            let datoid = $(element).attr('idlotedato');
            $.post('php/eliminarlote.php', {datoid}, function (response) {
                obtenerdatos();
            });
        }
    });

    $(document).on('click', '.dato-cod', function () {
        let element = $(this)[0].parentElement.parentElement;
        let codigo = $(element).attr('idlotedato');
        $.post('php/uniquelote.php', {codigo}, function (response) {
            const dato = JSON.parse(response);
            $('#idlote').val(dato.idlote);
            $('#tipolote').val(dato.tipolote);
            $('#cantidad').val(dato.cantidadproducto);
            $('loteid').val(dato.idlote);
            edita = true;
        });

    });

    function obtenerproductos() {
        $.ajax({
            url: 'php/listaproductos.php',
            type: 'GET',
            success: function (response) {
                let datos = JSON.parse(response);
                let template = '';
                console.log(datos);
                datos.forEach(dato => {
                    template += `
                    <tr cproducto="${dato.codigoproducto}" class="text-center">
                        <td>${dato.codigoproducto}</td>
                        <td>
                            <a href="#" class="p-nombre">${dato.nombreproducto}</a>
                        </td>
                        <td>${dato.cantidadlitros}</td>
                        <td>${dato.cantidadlitrosporunidad}</td>
                        <td>${dato.LOTE_idlote}</td>
                        <td>
                            <button class="p-eliminar btn btn-danger btn-sm">
                                ELIMINAR
                            </button>
                        </td>
                    </tr>
                `;
                });
                $('#datosproductos').html(template);
            }
        });
    }

    $('#producto-form').submit(function (e) {
        console.log("sending...");
        let select = document.getElementById("clote");
        let val = select.options[select.selectedIndex].value;
        const posDatos = {
            cproducto: $('#cproducto').val(),
            nproducto: $('#nproducto').val(),
            cantidad: $('#cantidad').val(),
            cantidadlu: $('#cantidadlu').val(),
            clote: val
        };
        let url = edita == false ? 'php/insertarproducto.php' : 'php/actualizaproducto.php';
        console.log(url);
        $.post(url, posDatos, function (response) {
            console.log(response);
            obtenerproductos();
            $('#producto-form').trigger('reset');
            edita = false;
        });
        e.preventDefault();
    });

    $(document).on('click', '.p-nombre', function () {
        let element = $(this)[0].parentElement.parentElement;
        let codigo = $(element).attr('cproducto');
        $.post('php/uniqueproducto.php', {codigo}, function (response) {
            const dato = JSON.parse(response);
            $('#cproducto').val(dato.codigoproducto);
            $('#nproducto').val(dato.nombreproducto);
            $('#cantidad').val(dato.cantidadlitros);
            $('#cantidadlu').val(dato.cantidadlitrosporunidad);
            $('#clote').val(dato.LOTE_idlote);
            edita = true;
        });

    });
});