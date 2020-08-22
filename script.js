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
class Queue  {
    constructor() {
    this.elements = [];
    }

    enqueue(element){
        this.elements.push(element);
    }
    dequeue(){
        if (this.isEmpty())
            return "Underflow";
        return this.elements.shift();
    }
    front(){
        if(this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    isEmpty(){
        return this.elements.length == 0;
    }
    printQueue(){
        var str = "";
        for(var i = 0; i < this.elements.length; i++) 
        str += this.elements[i]; 
            return str; 
    }
}

var op1 = 0,op2 = 0,operator = 0, value = "";

var inQ = new Queue();
var postQ = new Queue();

const btn = document.querySelectorAll('.calc-button, .calc-etc, .calc-operator').forEach((button) => {
    button.addEventListener('click', () => {
        switch(button.value){
            case "/":
            case "x":
            case "+":
            case "-": {
                if (inQ.isEmpty()){                 
                inQ.enqueue(value);
                value = "";
                }
                inQ.enqueue(button.value);
                break;
            }
            case "+/-":
                value = pos_to_neg(parseInt(value));
                display(value);
                toString(value);
                break;
            case "%":
                value = (parseFloat(value) / 100.0).toFixed(2);
                display(value);
                break;
            case "AC": {
                reset();
                break;
            }
            case "=": {
               //if (postQ.front() == "x" || postQ.front() == "/" || postQ.front() == "+" || postQ.front() == "-")
               // }
                inQ.enqueue(value);
                value = "";
                console.log(inQ.printQueue());
                convertToPostfix();
                postQ.printQueue();
                evalPostfix();
                break;
            }
            default: {
                value += button.value;
                display(value);
                break;
            }
        }
    
    });
});

function pos_to_neg(num) {
    return -Math.abs(num);
}


function resetQueue() {
    while(!postQ.isEmpty() || !inQ.isEmpty()){
        postQ.dequeue();
        inQ.dequeue();
    }
}
function reset() {
    document.getElementById("display").innerHTML = "0";
    value = "";
    op1 = 0;
    op2 = 0;
    operator = 0;

    resetQueue();
    
}
function display (value) {
    document.getElementById("display").innerHTML = value;
}


function evalPostfix() { 
    var i = 0;
    var newStack = new Stack(); 
    var num = 0;
    while (!postQ.isEmpty()) { 
        var c = postQ.dequeue(); 
        if (!isNaN(c)) 
            newStack.push(c - '0'); 
        else { 
            var val1 = newStack.pop(); 
            var val2 = newStack.pop(); 
            if (val1 == "Underflow" || val2 == "Underflow") 
                return "Can't perform postfix evaluation"; 
            switch (c) { 
            case '+': 
                newStack.push(val2 + val1); 
                break; 
  
            case '-': 
                newStack.push(val2 - val1); 
                break; 
  
            case '/': 
                newStack.push(val2 / val1);
                break; 
  
            case 'x': 
                /* num = val2*val1;
                if (!isNaN(parseFloat(num))){
                    num = toString(num.toFixed(2));
                    console.log(num);
                    
                } */
                newStack.push(val2*val1); 
                break; 
            
            } 
        } 
    } 

    var ans = newStack.pop();
    inQ.enqueue(ans);
    console.log(inQ.printQueue());
    display(ans); 
} 


function convertToPostfix () {
   var opStack = new Stack();

   var precedence = function(op){
        switch(op){
            case "x":
            case "/":
                return 2;
            case "+":
            case "-":
                return 1;
            default:
                return 0;
        }

    }

    while (!inQ.isEmpty()){  
        var c = inQ.dequeue();
        
        if (!isNaN(parseInt(c))) {
            postQ.enqueue(c);
        }
        else {
            while (!opStack.isEmpty() && (precedence(c) <= precedence(opStack.peek()))) {
                postQ.enqueue(opStack.pop());    
            }
                opStack.push(c);       
        }
    }
        /* while(!opStack.isEmpty()){
            pFixString += opStack.pop(); 
        } */
     while(!opStack.isEmpty()){
        postQ.enqueue(opStack.pop());
    } 
    
}
