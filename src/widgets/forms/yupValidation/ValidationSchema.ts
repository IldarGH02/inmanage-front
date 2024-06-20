import * as yup from 'yup';

declare module 'yup' {
    interface StringSchema<TType, TContext, TDefault, TFlags> {
        lengthNumbersValidator(msg: string): this;
    }
    interface StringSchema<TType, TContext, TDefault, TFlags> {
        lengthMonthsValidator(number: number, msg: string): this;
    }
    interface StringSchema<TType, TContext, TDefault, TFlags> {
        lengthDaysValidator(number: number, msg: string): this;
    }
}

export function addYupMethods() {
    yup.addMethod(yup.string, "lengthNumbersValidator", function (this, message: string) {
        return this.test("length-numbers-validator", message, function(value: string | undefined) {
          // Здесь мы можем реализовать любую логику валидатора
          if(value) {
            if (Number(value.replace(/ /g,''))===0) {
                return false;
            }
            return true;
          }
        });
    });

    yup.addMethod(yup.string, "lengthMonthsValidator", function (this, maxVal: number, message: string) {
        return this.test("length-months-validator", message, function(value: string | undefined) {
          // Здесь мы можем реализовать любую логику валидатора
          if(value && maxVal) {
            if (Number(value.replace(/ /g,''))>maxVal || Number(value.replace(/ /g,''))===0) {
                return false;
            }
            return true;
          }
        });
    }); 

    yup.addMethod(yup.string, "lengthDaysValidator", function (this, maxVal: number, message: string) {
        return this.test("length-days-validator", message, function(value: string | undefined) {
          // Здесь мы можем реализовать любую логику валидатора
          if(value && maxVal) {
            if (Number(value.replace(/ /g,''))>maxVal || Number(value.replace(/ /g,''))===0) {
                return false;
            }
            return true;
          }
        });
    }); 
}