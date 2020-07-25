console.log(operate(1,0,'/'));




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
