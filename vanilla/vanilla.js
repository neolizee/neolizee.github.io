/* Функция формирования UUID */
function uuid(buttonClassName, elementClassName) {
    const value = () => ([1e7] + -1e3 + -1e3 + -1e3 + -1e11).replace(/[01]/g, () => (crypto.getRandomValues(new Uint8Array(1))[0] & 15).toString(16));
    document.querySelector("." + buttonClassName).addEventListener("click", () => {
        document.querySelector("." + elementClassName).textContent = value();
    });
}

/* Проверка наличия класса HTML элемента */
function hasClass(element, className) {
    let classNames = " " + element.className + " ";
    className = " " + className + " ";
    classNames.replace(/[\r\n\t\f]+/g, " ").indexOf(className) > -1
        ? console.log(true)
        : console.log(false);
} // window.addEventListener("click", (e) => { hasClass(e.target, "className") });

/* Простая структура данных дерева */
class TreeNode {
    constructor(name) {
        this.name = name;
        this.treeChilds = [];
    }
}

const root = new TreeNode("Root");
const parent = new TreeNode("Parent");
const child_1 = new TreeNode("Child 1");
const child_2 = new TreeNode("Child 2");
const child_3 = new TreeNode("Child 3");

root.treeChilds.push(parent);
parent.treeChilds.push(child_1, child_2, child_3);
// console.log(root);

/* Массив случайных значений */
function randomValueArray(number) {
    const random = Array.from({ length: number }, () => Math.floor(Math.random() * 2));
    // console.log(random);
  }