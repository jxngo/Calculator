class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }
     
    pop() {
        if (this.items.length === 0)
            return "Underflow";
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length-1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printStack() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i];
        console.log(str);
        return str; 
    }
}
var op1 = null,op2 = null,operator = null;
var inStack = new Stack();

const btn = document.querySelectorAll('.calc-button, .calc-etc, .calc-operator').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.value === '÷' || button.value === 'x' || button.value === '-' || button.value === '+'){
            operator = button.value;
            inStack.push(operator);
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
            // if no number/op were entered but presses =
            if(op1 === null || op2 === null || operator === null) {
                // if only op1 and op was entered
                if (op2 === null && operator !== null){
                    op2 = op1;
                    operate(op1,op2,operator); 
                }
                // if only op1 was entered 
                else if (op1 !== null )
                    display(op1);
                else 
                    display(0);
            }
            else {
                operate(op1,op2,operator);
                var str = inStack.printStack();
                // Reason why its "underflow" because the expression hasnt been converted to postfix yet
                console.log(evalPostfix(str));
            }
            return;
        }
        else {
            display(button.value);   
            if (op1 === null) {
                op1 = button.value;
                inStack.push(button.value);
            }
            else {
                op2 = button.value;
                inStack.push(button.value);
            }
        }
    });
});


function reset() {
    document.getElementById("display").innerHTML = 0;
    op1 = null;
    op2 = null;
    operator = null;
    while(!inStack.isEmpty){
        inStack.pop();
    }
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
function evalPostfix(exp) 
{ 
    var inStack = new Stack(); 
    for (var i = 0; i < exp.length; i++) { 
        var c = exp[i]; 
        if (!isNaN(c)) 
            inStack.push(c - '0'); 
        else { 
            var val1 = inStack.pop(); 
            var val2 = inStack.pop(); 
            if (val1 == "Underflow" || val2 == "Underflow") 
                return "Can't perform postfix evaluation"; 
            switch (c) { 
            case '+': 
                inStack.push(val2 + val1); 
                break; 
  
            case '-': 
                inStack.push(val2 - val1); 
                break; 
  
            case '÷': 
                inStack.push(val2 / val1); 
                break; 
  
            case 'x': 
                inStack.push(val2 * val1); 
                break; 
            } 
        } 
    } 
  
    return inStack.pop(); 
} 
function convertToPostfix (exp) {

}
