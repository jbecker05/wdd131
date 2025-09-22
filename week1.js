const PI = 3.14;
let radius = 3;

console.log("PI:", PI);
console.log("radius:", radius);

const one = 1;
const two = '2';

console.log("one + two =", one + two); 
console.log("one + Number(two) =", one + Number(two)); 

let course = "CSE131"; 
if (true) {
    let student = "John";
    console.log("inside block -> course:", course);  
    console.log("inside block -> student:", student); 
}

console.log("outside block -> course:", course); 
