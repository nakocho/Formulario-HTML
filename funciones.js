

function validationRowData(row){
    console.log('------- inicio de validación de datos de fila -------');
    console.log(row);
    const isRequiredComplited =  validationRequiredFields(row);
    const isPatternValid = validationPaternFields(row);
    if (isRequiredComplited && isPatternValid) {
        console.log('Los datos de la fila son válidos.');
        return true;
    }
    else{
        console.log('Los datos de la fila no son válidos.');
        return false;
    }
}

function validationRequiredFields(row){
    const fieldsRequired = getRequiredFields(row);
    const elementHtml = getElementHtml(row);

    //limpiar clase input.no-validation:invalid
    $(elementHtml).find('input.no-validation').removeClass("no-validation");
    let requiredComplited = fieldsRequired.every((field) => field.fieldValue);
    if (requiredComplited) {
        console.log('Todos los campos requeridos están completos.');
        $(elementHtml).find('[required]').removeClass("is-invalid");
        return true;
    }

    console.log('Faltan campos requeridos por completar.');
    $(elementHtml).find('[required]').removeClass("is-invalid");

    fieldsRequired.map((field) => {
        const { fieldName, fieldValue } = field;
        if (!fieldValue) {
            console.log(`El campo "${fieldName}" es requerido.`);
            $(elementHtml).find(`[name="${fieldName}"]`).addClass("is-invalid");
            requiredComplited = false;
        }
        else{
            $(elementHtml).find(`[name="${fieldName}"]`).removeClass("is-invalid");
        }
    });
    return requiredComplited;
}

function validationPaternFields(row){
    const elementHtml = getElementHtml(row);
    const elementosConPatternInvalidos = $(elementHtml).find('input[pattern]:invalid');
    if (elementosConPatternInvalidos.length > 0) {
        elementosConPatternInvalidos.addClass("is-invalid");
        console.log('Hay campos con patrones inválidos.');
        return false;
    }
    return true;
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
    const elementHtml = $(`#${idRow}`); // Devuelve el elemento DOM en lugar de su HTML
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
    $('.is-invalid').removeClass('is-invalid');
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



/*
expresion regular para validar dni en españa ^\d{8}(-?[A-Za-z])?$" acepta 8 digitos seguidos de un guion opcional y una letra mayuscula o minuscula al final

TODO : 
    - controlar si hay que validar algún tipo de documento de identidad diferente a DNI
    - añadir al clonar los estilos no-validation para los campos que tengan required o pattern para que no salgan de primeras con estilos rojos de errror
    - controlar que los select tienen selected el valor por defecto
*/
