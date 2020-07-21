console.log(operate(1,2,'+'));




function operate (num,num2,op){
    switch(op){
        case '+': 
            return add(num,num2);
        case '-': 
            return sub(num,num2);
        case '*':
            return multiply(num,num2);
        case '/':
            return divide(num,num2);
    }
}

function add (num,num2) {
    return num+num2;
}
function sub (num,num2) {
    return num-num2;
}
function multiply (num,num2) {
    return num*num2;
}
function divide (num,num2) {
    if(num2 === 0){
        return "UNDEFINED";
    }
    return num/num2;
}