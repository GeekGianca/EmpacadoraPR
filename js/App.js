$(document).ready(function () {
    console.log('Jquery Works!');
    let edita = false;
    obtenerdatos();
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
                });
                $('#datoslote').html(template);
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
});