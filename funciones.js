function saludosTerrricolas(nombre){
    if (nombre){
        console.log('Hola terrícola ' + nombre + '!');
    }
    console.log('Hola terrícola!');
    alert('Hola terrícola!');
    debugger;
    const datos = localStorage.getItem('formularioSolicitudes');
    const filas = JSON.parse(datos);
    console.log(filas);
    console.log(datos);

}

function validationRowData(row){
    console.log(row);
    

    
    debugger;
}

function registroActive(element){
    const idRow = $(element).closest(".row-template").attr("id");
    if (!idRow) return;
    return idRow;
}


