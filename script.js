//console.log(operate(1,0,'/'));
const y = document.getElementById("display");
const btn = document.querySelectorAll('.calc-button, .calc-r1');
btn.forEach((button) => {
    button.addEventListener('click', () => {
        display(button.value);
        
        //console.log(button.value);
    });
});

function display (value) {
    document.getElementById("display").innerHTML = value;
}


function operate (num,num2,op){
    switch(op){
        case '+': 
            return num+num2;
        case '-': 
            return num-num2;
        case '*':
            return num*num2;
        case '/': {
            if (num2 === 0)
                return "UNDEFINED";
            else 
                return num/num2;
        }
   }
}
