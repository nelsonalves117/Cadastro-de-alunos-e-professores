const BASE_URL = "http://localhost:3000/";

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    }
    xhr.responseType = 'json';
    xhr.onload = () => {
        var status = xhr.status;
        if (status === 200 || status === 201) {
            console.log("Dados recebidos com sucesso!");
            callback(status, xhr.response);
        } else {
            console.log("Falha ai se conectar ao servidor! " + xhr.status);
        }
    }
    if (data) {
        console.log(JSON.stringify(data))
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}