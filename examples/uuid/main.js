document.querySelector("#update").addEventListener("click", () => {
    document.querySelector("#uuid").textContent = uuid();
});

const uuid = () => ([1e7] + -1e3 + -1e3 + -1e3 + -1e11).replace(/[01]/g, () => (crypto.getRandomValues(new Uint8Array(1))[0] & 15).toString(16));