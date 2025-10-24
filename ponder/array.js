// ---------------------------
// Activity 1 – map + template
// ---------------------------
const steps = ["one", "two", "three"]; // starter array from the assignment

// returns an <li> for a single step string
const listTemplate = (step) => `<li>${step}</li>`; // template literal

// use map to convert strings → HTML list items, then join to a single string
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join("");

// ---------------------------
// Activity 2 – map (grades → points)
// ---------------------------
const grades = ['A', 'B', 'A'];

function gradeToPoints(letter) {
  // normalize to uppercase and map to standard 4.0 scale
  const g = String(letter).toUpperCase();
  if (g === 'A') return 4;
  if (g === 'B') return 3;
  if (g === 'C') return 2;
  if (g === 'D') return 1;
  return 0; // F or anything else
}

const gpaPoints = grades.map(gradeToPoints);
document.querySelector('#gradesIn').textContent = JSON.stringify(grades);
document.querySelector('#gradesOut').textContent = JSON.stringify(gpaPoints);

// ---------------------------
// Activity 3 – reduce (compute GPA)
// ---------------------------
const gpa = gpaPoints.reduce((sum, p) => sum + p, 0) / gpaPoints.length;
document.querySelector('#gpa').textContent = gpa.toFixed(2);

// ---------------------------
// Activity 4 – filter (short fruit names)
// ---------------------------
const fruits = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const shortFruits = fruits.filter((f) => f.length < 6);
document.querySelector('#fruitsIn').textContent = JSON.stringify(fruits);
document.querySelector('#fruitsOut').textContent = JSON.stringify(shortFruits);

// ---------------------------
// Activity 5 – indexOf (lucky number)
// ---------------------------
const numbers = [12, 34, 21, 54];
const luckyNumber = 21;
const luckyIdx = numbers.indexOf(luckyNumber);
document.querySelector('#numsIn').textContent = JSON.stringify(numbers);
document.querySelector('#lucky').textContent = luckyNumber;
document.querySelector('#luckyIndex').textContent = luckyIdx;

// Also mirror results to the console for easy verification
console.log({ steps, stepsHtml, grades, gpaPoints, gpa, fruits, shortFruits, numbers, luckyNumber, luckyIdx });
