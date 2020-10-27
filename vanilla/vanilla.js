/* Функция формирования UUID */
function uuid(buttonClassName, elementClassName) {
    const value = () => ([1e7] + -1e3 + -1e3 + -1e3 + -1e11).replace(/[01]/g, () => (crypto.getRandomValues(new Uint8Array(1))[0] & 15).toString(16));
    document.querySelector("." + buttonClassName).addEventListener("click", () => {
        document.querySelector("." + elementClassName).textContent = value();
    });
}

/* Проверка наличия класса HTML элемента */
function checkClass(element, className) {
    let classNames = " " + element.className + " ";
    className = " " + className + " ";
    classNames.replace(/[\r\n\t\f]+/g, " ").indexOf(className) > -1
        ? console.log(true)
        : console.log(false);
} // window.addEventListener("click", (e) => { checkClass(e.target, "className") });

/* Простая структура данных дерева */
class createTree {
    constructor(name) {
        this.name = name;
        this.treeChilds = [];
    }
}

const root = new createTree("Root");
const parent = new createTree("Parent");
const child_1 = new createTree("Child 1");
const child_2 = new createTree("Child 2");
const child_3 = new createTree("Child 3");

root.treeChilds.push(parent);
parent.treeChilds.push(child_1, child_2, child_3);
// console.log(root);

/* Массив случайных значений */
function getRandomValueArray(number) {
    const random = Array.from({ length: number }, () => Math.floor(Math.random() * 2));
    // console.log(random);
}

/* Быстрый поиск */
function fastSearch(inputId, contentClass) {

    // Подсветка поискового запроса
    function addMark(s, p, l) {
        return s.slice(0, p) + '<mark>' + s.slice(p, p + l) + '</mark>' + s.slice(p + l);
    }

    document.querySelector("#" + inputId).addEventListener("input", (e) => {
        let elements = Array.prototype.slice.call(document.querySelectorAll("." + contentClass));
        let value = e.target.value.trim();

        if (value != '') {
            elements.forEach((element) => {
                (element.innerText.search(RegExp(value, 'gi')) == -1) ? element.innerHTML = element.innerText : element.innerHTML = addMark(element.innerText, element.innerText.search(RegExp(value, 'gi')), value.length);
            });

        } else {
            elements.forEach((element) => {
                element.innerHTML = element.innerText;
            });
        }
    });
}