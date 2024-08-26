import Choices from 'choices.js'

export const choices = (element, className, options) => {
    if(element && className && options) {
        const choices = new Choices(element, options);

        let ariaLabel = element.getAttribute('aria-label')
        element.closest('.choices').setAttribute('aria-label', ariaLabel)

        return choices
    } else {
        return {
            errorMessage: 'Ошибка, отсутствуют параметры'
        }
    }
}