/* eslint max-classes-per-file: ["error", 6] */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["result"] }] */

let table1 = null;
let table2 = null;
let table3 = null;
let answerObj = null;


// Функцияотображения распаршенных данных
function displayDataInTableBody(data, targetTble) {
    const tbody = document.createElement('tbody');

    let tr = null;
    let th = null;
    let td1 = null;
    let td2 = null;
    let td3 = null;
    let td4 = null;
    const countItem = data.length;

    let datatime = null;
    let timestamp = null;

    for (let i = 0; i < countItem; i++) {
        timestamp = data[i][0];
        datatime = moment.unix(timestamp);

        tr = document.createElement('tr');
        th = document.createElement('th');
        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td3 = document.createElement('td');
        td4 = document.createElement('td');

        th.appendChild(document.createTextNode(i));
        td1.appendChild(document.createTextNode(data[i][0]));
        td2.appendChild(document.createTextNode(data[i][1]));
        td3.appendChild(document.createTextNode(datatime.format("YYYY-MM-DD HH:mm:ss")));
        td4.appendChild(document.createTextNode(datatime.add(3, 'hours').format("YYYY-MM-DD HH:mm:ss")));

        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }

    targetTble.tBodies[0].innerHTML = tbody.innerHTML;
}


// состояние передачи от сервера к клиенту (загрузка)
function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
        const percentComplete = oEvent.loaded / oEvent.total;
        console.log(`${percentComplete*100  }%`);
    } else {
        console.log("inf");
    }
}


// Функция обработки ошибки загрузки
function transferFailed(evt) {
    alert("При загрузке файла произошла ошибка.");
}


// Функция обработки отмены загрузки
function transferCanceled(evt) {
    alert("Пользователь отменил загрузку.");
}


// Функция обработки успешной загрузки
function transferComplete(evt) {
    console.dir(evt);
    const response = evt.target;
    if (response.status == 200) {
        console.log("Ответ получен полностью");
        console.log(`status code = ${  response.status}`);
        answerObj = JSON.parse(response.responseText);
        console.dir(answerObj);
        displayDataInTableBody(answerObj, table1);
        const mathProc = new CProcessor(answerObj);
        displayDataInTableBody(mathProc.data, table2);

        const dataNow = new Date();
        const dateCurrent = new Date(answerObj[answerObj.length - 1][0] * 1000);
        dateCurrent.setHours(dataNow.getHours(), dataNow.getMinutes(), dataNow.getSeconds(), 0);
        const date12Back = new Date(dateCurrent);
        date12Back.setHours(dateCurrent.getHours() - 12);

        const data12hours = mathProc.wrapOut(900 * 4, "Sum", date12Back.getTime() / 1000, dateCurrent.getTime() / 1000);
        displayDataInTableBody(data12hours, table3);
    } else {
        console.log("Ошибка! Что-то пошло не так...");
        console.log(`status code = ${  response.status}`);
        if (this.responseText) {
            answerObj = JSON.parse(response.responseText);
            console.dir(answerObj);
        }
    }
}

// Функция загрузки данных с сайта
function requestTestData() {
    const currentUrl = "/test_request_data";
    const oReq = new XMLHttpRequest();

    oReq.addEventListener("progress", updateProgress, false);
    oReq.addEventListener("load", transferComplete, false);
    oReq.addEventListener("error", transferFailed, false);
    oReq.addEventListener("abort", transferCanceled, false);

    oReq.open("GET", currentUrl, true);
    oReq.setRequestHeader("accept", "application/json");
    oReq.send();
}


function autoLoadDataFromBackend() {
    requestTestData();
}


function firstFun() {
    table1 = document.querySelector("#table1");
    table2 = document.querySelector("#table2");
    table3 = document.querySelector("#table3");

    autoLoadDataFromBackend();
}


window.addEventListener('DOMContentLoaded', () => {
    firstFun();
});