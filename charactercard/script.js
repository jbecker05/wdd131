/* Character Object */
const character = {
  name: "Hero",
  class: "Warrior",
  level: 1,
  health: 100,
  image: "images/character.png",

  attacked() {
    if (this.health > 0) {
      this.health -= 20;
      if (this.health <= 0) {
        this.health = 0;
        alert(`${this.name} has died.`);
      }
    }
    updateDisplay();
  },

  levelUp() {
    this.level += 1;
    updateDisplay();
  }
};

/* Update displayed stats */
function updateDisplay() {
  document.getElementById("class").textContent = character.class;
  document.getElementById("level").textContent = character.level;
  document.getElementById("health").textContent = character.health;
}

/* Button Events */
document.getElementById("attackBtn").addEventListener("click", () => {
  character.attacked();
});

document.getElementById("levelBtn").addEventListener("click", () => {
  character.levelUp();
});

/* Initialize page */
updateDisplay();
