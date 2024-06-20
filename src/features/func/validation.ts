export const validationName = (value: string) => {
    const namePattern = /^^[а-яА-ЯёЁa-zA-Z]+$/
    let require;
    let validName;

    if(!value) {
        require = 'Обязательное поле'
    }

    if(!namePattern.test(value)) {
        validName = 'Введено неккоректное имя'
    }

    return {
        require,
        validName
    }
}

export const validationDate = (date: string) => {
    let regEx = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    if(!date.match(regEx)) return false;
    
    let d = new Date(date);
    let dNum = d.getTime();
    if(!dNum && dNum !== 0) return false;
   
    return d.toISOString().slice(0,10) === date;
  }