import { loadJSON, gradeForms, antiNumericForms, waitForElement } from "./global.js";
import { initCustomSelect } from "./select.js";

{
    function idList(gradeSystem) {
        const list = []; const altList = []
        for (const subject of gradeSystem.subjects) {
            list.push(subject[0])
        };
        return list;
    };

    async function init() {
        const gradeSystem = await loadJSON("test.json");
        const list = idList(gradeSystem);
        for (const subject of list) {
            const cell = await waitForElement(subject);
            if (!cell) {
                console.warn(`No id ${subject}`);
                continue;
            }
            const selectStyle = document.createElement('div')
            selectStyle.style.width = "30%";
            selectStyle.className = "custom-select";
            const selectElement = document.createElement('select');
            const match = gradeSystem.subjects.find(s => s[0] === subject);
            let grades;
            if (match?.[3] == true) {
                grades = antiNumericForms;
            } else {
                grades = gradeForms;
            };
            for (const grade of grades) {
                const option = document.createElement("option");
                option.value = grade;
                option.textContent = typeof grade === "number" ? grade.toFixed(2) : grade;
                selectElement.appendChild(option);
            }
            selectStyle.appendChild(selectElement);
            cell.appendChild(selectStyle)
        }
        initCustomSelect();
        document.dispatchEvent(new Event("selects-ready"));
    }

    init();
}