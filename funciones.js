

function validationRowData(row){
    console.log('------- inicio de validación de datos de fila -------');
    console.log(row);
    
    console.log('-----------------------------------------------------');
    
}

function registroActive(element){
    const idRow = $(element).closest(".row-template").attr("id");
    if (!idRow) return;
    return idRow;
}

function defaultRowData(){
    return {
        // dni: "22",
        // nombre: 'J.Philips',
        // apellidos: 'Fray',
        // email: 'lover@flower.com',
        'fecha-inicio': setDateTodayData(),
        'fecha-final': setDateTodayData(),
    }
}
function setDefaultRowData(row){
    const defaultData = defaultRowData();
    Object.keys(defaultData).forEach(key => {
        row.find('.'+key).val(defaultData[key]);
    });
    setFocusFirstField(row);
}
function setDefaultFirstRowData(){
    const firstDate= $(document).find('#idRegistroRow_1');
    setDefaultRowData(firstDate);
} 

function setDateTodayData(){
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 16);
    return formattedDate;
}

function setFocusFirstField(row){
    const dniField = row.find('.firstField');
    if (dniField.length > 0) {
        setTimeout(() => {
            dniField.trigger('focus'); // Dar foco al campo .dni
        }, 0);
    } else {
        console.warn('El campo .firstField no se encontró en la fila proporcionada.');
    }
}



