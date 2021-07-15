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

/* Парсинг сайта Proxy CORS */
fetch("https://cors-anywhere.herokuapp.com/https://delonghi.ru/product/528")
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    var parser = new DOMParser();
    var data = parser.parseFromString(html, "text/html");
    var price = data.querySelector(".price").innerHTML.replace(/[^0-9\s]/gi, '').replace(/\s/g, '');
    console.log(price);
  })
  .catch(function (err) {
    console.warn("Внимание! Нет доступа - ", err);
  });

const url = "https://opendata.mkrf.ru/v2";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY":
      "2eab170305422727794e31093297e42365464f47d5927a38ee7f9815598e5032",
    //Authorization: "2eab170305422727794e31093297e42365464f47d5927a38ee7f9815598e5032"
  },
  mode: "cors",
};

fetch(url, options)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log(response.status + " " + response.statusText);
    }
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });
