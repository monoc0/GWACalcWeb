import { loadJSON } from "./global.js";

let gradeSystem;

document.addEventListener("selects-ready", updateGWA);
document.addEventListener("change", (e) => {
    if (e.target.matches("select")) updateGWA();
})

gradeSystem = await loadJSON('test.json');
updateGWA();

function updateGWA () {
    if (!gradeSystem) return;

    let gwaPreDivide = 0.0;
    let gwaDivisor = 0.0;
    let incomplete = false;


    for (const subject of gradeSystem.subjects) {
        const element = document.getElementById(subject[0]);
        const select = element?.querySelector("select");
        if (!select) continue;

        if (select.value == "INC") {
            incomplete = true;
            continue;
        }

        const grade = parseFloat(select.value);
        if (Number.isNaN(grade)) continue;

        if (grade == 5.00) {
            incomplete = true;
            continue;
        }

        gwaPreDivide += grade*subject[2];
        gwaDivisor += subject[2];
    }
    
    const cell = document.getElementById("gwa");
    if (!cell) return;

    
    if (cell && gwaDivisor > 0) {
        let gwa;
        gwa = (gwaPreDivide/gwaDivisor).toFixed(2);
        cell.textContent = gwa;
        if (gwa >= 2.25) {
            incomplete = true;
        }
        cell.classList.toggle("bad", incomplete)
    }
}