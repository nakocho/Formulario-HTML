

function validationRowData(row){
    console.log('------- inicio de validación de datos de fila -------');
    console.log(row);

    const fieldsRequired = getRequiredFields(row);
    let a = fieldsRequired.get("dni")
    console.log("a",a);
    console.log("ojo",fieldsRequired);
    console.log('-----------------------------------------------------');
    
}

function getRequiredFields(row) {
    const elementHtml = getElementHtml(row);
    if (!elementHtml) return;
    const requiredFields = $(elementHtml).find('[required]');
    if (requiredFields.length > 0) {
        return requiredFields.map((index, field) => {
            const fieldName = $(field).attr('name');
            const fieldValue = $(field).val();
            return { fieldName, fieldValue };
        }).get();
    }
}

function getElementHtml(row){
    const idRow = $(row).attr("id");
    if (!idRow) return;
    const elementHtml = $(`#${idRow}`).html();
    return elementHtml;

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



