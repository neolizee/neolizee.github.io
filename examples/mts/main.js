// Перебрать данные DB.JS, построить DOM, показать станции
function showStations() {

    window.stations.forEach((station, id) => {

        let div = document.createElement("div");
        div.classList.add("m");
        div.style.left = station.x + "px";
        div.style.top = station.y + "px";
        let a = document.createElement("a");
        a.setAttribute("id", id);
        a.classList.add("name");
        a.textContent = station.name;
        (station.link) ? a.classList.add("name-link") : a.classList.remove("name-link");
        div.append(a);
        document.querySelector("#markers").append(div);

    });
} showStations();


// Быстрый поиск станций по карте
let input_search = document.querySelector("#search");
input_search.addEventListener("input", (e) => {
    let links = Array.prototype.slice.call(document.querySelectorAll(".name"));
    let input_value = e.target.value.trim();

    if (input_value != '') {
        links.forEach((link) => {
            (link.innerText.search(RegExp(input_value, 'gi')) == -1) ? link.innerHTML = link.innerText : link.innerHTML = addMark(link.innerText, link.innerText.search(RegExp(input_value, 'gi')), input_value.length);
        });

    } else {
        links.forEach((link) => {
            link.innerHTML = link.innerText;
        });
    }

});


// Подсветка поискового запроса
function addMark(s, p, l) {
    return s.slice(0, p) + '<mark>' + s.slice(p, p + l) + '</mark>' + s.slice(p + l);
}

// Отключить ввод на поле поиска
input_search.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) { e.preventDefault() }
});


// Показать информацию о станции
const target = document.querySelectorAll(".name");

for (let i = 0; i < target.length; i++) {

    target[i].addEventListener("click", showInfoStation);
}

function showInfoStation() {

    if (window.stations[this.id].link) {

        document.querySelector("#address").textContent = window.stations[this.id].address;
        document.querySelector("#schedule").textContent = window.stations[this.id].schedule;
        document.querySelector("#info").textContent = window.stations[this.id].info;

        (window.stations[this.id].access) ? document.querySelector("#access").style.display = "" : document.querySelector("#access").style.display = "none";
        (window.stations[this.id].load) ? document.querySelector("#load").style.display = "" : document.querySelector("#load").style.display = "none";
        (window.stations[this.id].contract) ? document.querySelector("#contract").style.display = "" : document.querySelector("#contract").style.display = "none";
        (window.stations[this.id].battery) ? document.querySelector("#battery").style.display = "" : document.querySelector("#battery").style.display = "none";

        UIkit.modal('.modal-station').show();

    }
}


// Форма для редакторов
const list_stations = document.querySelector("#list-stations");
const input_datalist = document.querySelector("#input-datalist");
let button_delete = document.querySelector("#button-delete");

const showAdminForm = () => {

    button_delete.style.display = "none";
    UIkit.modal('.modal-admin').show();

}

document.querySelector("#admin").addEventListener("click", () => showAdminForm());

input_datalist.addEventListener("focusin", () => {

    window.stations.forEach((e, id) => {
        let option = new Option("", e.name, false, false);
        option.setAttribute("data-index", id);
        list_stations.append(option);
    });

});

input_datalist.addEventListener("focusout", () => { list_stations.innerHTML = ''; });


// Сбросить все поля в форме 
function clearAdminField() { document.querySelector("#admin-form").reset(); button_delete.style.display = "none"; }

document.querySelector("#clear-fields").addEventListener("click", clearAdminField);


// Удаление офиса
// Узнать выбранную станцию, индекс в списке
let change_index_station;
input_datalist.addEventListener("change", (e) => {

    for (let i = 0; i < list_stations.options.length; i++) {

        if (list_stations.options[i].value == e.target.value) {
            change_index_station = list_stations.options[i].getAttribute("data-index");
            button_delete.style.display = "";
            break;
        }
    }
});

input_datalist.addEventListener("input", (e) => { if (e.target.value == '') { button_delete.style.display = "none"; } });

button_delete.addEventListener("click", () => {

    try {
        window.stations[change_index_station].link = false;
        window.stations[change_index_station].address = "";
        window.stations[change_index_station].schedule = "";
        window.stations[change_index_station].info = "";
        window.stations[change_index_station].access = false;
        window.stations[change_index_station].load = false;
        window.stations[change_index_station].contract = false;
        window.stations[change_index_station].battery = false;

        UIkit.notification("Удалено! Важно помнить, что все изменения требуют сохранения базы данных на локальный диск.", { status: 'success', timeout: 5000 });

        UIkit.modal('.modal-admin').hide();

    } catch (err) { console.log("Найдена ошибка!"); } //Важно! Добавить обработку ошибок

});


// Отправка данных в DB.JS
function addDataDB() {

    try {
        window.stations[change_index_station].link = true;
        window.stations[change_index_station].address = document.querySelector("#i-address").value;
        window.stations[change_index_station].schedule = document.querySelector("#i-schedule").value;
        window.stations[change_index_station].info = document.querySelector("#i-info").value;
        window.stations[change_index_station].access = document.querySelector("#chk-access").checked;
        window.stations[change_index_station].load = document.querySelector("#chk-load").checked;
        window.stations[change_index_station].contract = document.querySelector("#chk-contract").checked;
        window.stations[change_index_station].battery = document.querySelector("#chk-battery").checked;

        UIkit.notification("Офис добавлен в базу данных! Важно помнить, что все изменения требуют сохранения базы данных на локальный диск.", { status: 'success', timeout: 5000 });

        clearAdminField();

        UIkit.modal('.modal-admin').hide();

    } catch (err) { UIkit.notification("Ошибка во время отправки информации в базу данных!", { status: 'success', timeout: 5000 }); } //Важно! Добавить обработку ошибок

}

document.querySelector("#button-add").addEventListener("click", addDataDB);


// Сохранение файла DB.JS
const button_save = document.querySelector("#save");

function saveDB() { button_save.href = URL.createObjectURL(new Blob(["window.stations = " + JSON.stringify(window.stations, null, 1)], { type: "text/plain" })); }

button_save.addEventListener("click", saveDB);