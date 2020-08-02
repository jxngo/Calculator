//console.log(operate(1,0,'/'));
var op1 = null,op2 = null,operator = null;

const btn = document.querySelectorAll('.calc-button, .calc-etc, .calc-operator').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.value === '÷' || button.value === 'x' || button.value === '-' || button.value === '+'){
            operator = button.value;
            return;
        }
        if (button.value === '%' || button.value === '.') {
            console.log("% .");
            return;
        }
        if (button.value === '+/-'){
            console.log("+/-");
            return;
        }
        if (button.value === 'AC') {
            reset();
            return;
        }

        if (button.value === '='){
            if(op1 === null || op2 === null || operator === null) {
                if (op2 === null && operator !== null){
                    op2 = op1;
                    operate(op1,op2,operator);
                }
                else
                display(op1);
            }
            else
                operate(op1,op2,operator);
            return;
        }
        else {
            display(button.value);   
            if (op1 === null)
                op1 = button.value;
            else 
                op2 = button.value;
        }
    });
});



function reset() {
    document.getElementById("display").innerHTML = 0;
    op1 = null;
    op2 = null;
    operator = null;
}
function display (value) {
    document.getElementById("display").innerHTML = value;
}
function operate (num,num2,op){
var value = 0;
    switch(op){
        case '+': 
            value = (parseInt(num)+ parseInt(num2));
            break;
        case '-': 
            value = (num-num2);
            break;
        case 'x':
            value = (num*num2);
            break;
        case '÷': {
            if (num2 === '0') 
                value = ("Error");
            else 
                value = (num/num2);
            break; 
        }
    }
    display(value);
}