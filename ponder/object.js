// ================== Data Model ==================
export const aCourse = {
  code: "WDD 131",
  name: "Dynamic Web Fundamentals",
  sections: [
    { sectionNum: 1, roomNum: "STC 347", enrolled: 24, days: "MWF", instructor: "Smith", maxSize: 25 },
    { sectionNum: 2, roomNum: "STC 348", enrolled: 25, days: "TTh", instructor: "Jones", maxSize: 25 },
    { sectionNum: 3, roomNum: "Online",  enrolled: 18, days: "Async", instructor: "Nguyen", maxSize: 25 }
  ]
};

// ================== View Helpers ==================
function setCourseInfo(course) {
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

function renderSections(course) {
  const tbody = document.querySelector("#sections");
  tbody.innerHTML = "";

  course.sections.forEach((s) => {
    const tr = document.createElement("tr");

    const isFull = s.enrolled >= s.maxSize;

    tr.innerHTML = `
      <td>${s.sectionNum}</td>
      <td>${s.roomNum}</td>
      <td>${s.enrolled} / ${s.maxSize}${isFull ? " (Full)" : ""}</td>
      <td>${s.days}</td>
      <td>${s.instructor}</td>
    `;

    if (isFull) {
      // subtle emphasis if full
      tr.style.opacity = 0.75;
      tr.style.fontStyle = "italic";
    }

    tbody.appendChild(tr);
  });
}

// ================== Controller ==================
function findSection(course, sectionNumber) {
  return course.sections.find((s) => s.sectionNum === sectionNumber);
}

function enrollStudent(course, sectionNumber) {
  const section = findSection(course, sectionNumber);
  if (!section) return { ok: false, msg: "Section not found." };
  if (section.enrolled >= section.maxSize) return { ok: false, msg: "Section is already full." };
  section.enrolled += 1;
  return { ok: true };
}

function dropStudent(course, sectionNumber) {
  const section = findSection(course, sectionNumber);
  if (!section) return { ok: false, msg: "Section not found." };
  if (section.enrolled <= 0) return { ok: false, msg: "No students to drop." };
  section.enrolled -= 1;
  return { ok: true };
}

// ================== Wire up UI ==================
function attachHandlers(course) {
  const numberInput = document.querySelector("#sectionNumber");
  const enrollBtn = document.querySelector("#enrollStudent");
  const dropBtn = document.querySelector("#dropStudent");

  function parseSection() {
    const n = Number(numberInput.value);
    return Number.isInteger(n) ? n : NaN;
  }

  enrollBtn.addEventListener("click", () => {
    const n = parseSection();
    if (Number.isNaN(n)) {
      alert("Enter a valid section number.");
      return;
    }
    const result = enrollStudent(course, n);
    if (!result.ok) alert(result.msg);
    renderSections(course);
  });

  dropBtn.addEventListener("click", () => {
    const n = parseSection();
    if (Number.isNaN(n)) {
      alert("Enter a valid section number.");
      return;
    }
    const result = dropStudent(course, n);
    if (!result.ok) alert(result.msg);
    renderSections(course);
  });
}

// ================== Boot ==================
document.addEventListener("DOMContentLoaded", () => {
  setCourseInfo(aCourse);
  renderSections(aCourse);
  attachHandlers(aCourse);
});
