export async function loadJSON(jsonFile) {
    let parsed
    const file = await fetch(jsonFile);
    if (file.ok == true && file.status == 200); {
        parsed = await file.json();
    };
    return parsed;
}

export const gradeForms = [
    1.00,
    1.25,
    1.50,
    1.75,
    2.00,
    2.25,
    2.50,
    2.75,
    3.00,
    4.00,
    5.00
]

export function waitForElement(id, timeout = 5000) {
    return new Promise((resolve) => {
        const found = document.getElementById(id);
        if (found) return resolve(found);

        const observer = new MutationObserver(() => {
            const el = document.getElementById(id);
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}