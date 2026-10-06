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

    for (const subject of gradeSystem.subjects) {
        const element = document.getElementById(subject[0]);
        const select = element?.querySelector("select");
        if (!select) continue;

        const grade = parseFloat(select.value);
        if (Number.isNaN(grade)) continue;

        gwaPreDivide += grade*subject[2];
        gwaDivisor += subject[2];
    }

    const cell = document.getElementById("gwa");
    if (cell && gwaDivisor > 0) {
        cell.textContent = (gwaPreDivide/gwaDivisor).toFixed(2);
    }
}