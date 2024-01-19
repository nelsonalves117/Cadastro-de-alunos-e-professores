const COMPLETE_TEACHER_URL = "teacher";

window.onload = function () {
    readAll();
}

function createCard(teacher) {
    var str = "<article>";
    str += "<h1>" + teacher.name + "</h1>";
    str += "<p>TIA:" + teacher.tia + "</p>";
    str += "<p>Carga horária: " + teacher.workload + "</p>";
    str += "<p>Titulação: " + teacher.titration + "</p>";
    str += "<button onclick='deleteTeacher(" + teacher.tia + ")'>Remove</button>";
    str += "<button onclick='findTeacher(" + teacher.tia + ")'>Edit</button>";
    str += "</article>";
    return str;
}

function readAll() {
    const url = BASE_URL + COMPLETE_TEACHER_URL;
    callAPI(url, 'GET', function (status, response) {
        if (status === 200 || status === 201) {
            var content = document.getElementById('content');
            content.innerHTML = "";
            for (var i = 0; i < response.length; i++) {
                var str = createCard(response[i]);
                content.innerHTML += str;
            }
        } else {
            alert("Erro ao conectar ao servicor. Tente novamente mais tarde!");
        }
    });
}

function insertTeacher() {
    event.preventDefault();
    var teacher = {
        name: document.getElementById('name').value.toUpperCase(),
        tia: document.getElementById('tia').value.toUpperCase(),
        workload: document.getElementById('workload').value.toUpperCase(),
        titration: document.getElementById('titration').value.toUpperCase()
    }

    const url = BASE_URL + COMPLETE_TEACHER_URL;

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();
        } else {
            alert("Erro ao inserir professor:" + status);
        }
    }, teacher);
}

function clear() {
    document.getElementById('name').value = "";
    document.getElementById('tia').value = "";
    document.getElementById('workload').value = "";
    document.getElementById('titration').value = "";
    document.getElementById('tia').removeAttribute('disabled');
}

function deleteTeacher(tia) {
    const resp = confirm("Deseja realmente apagar o professor com tia: " + tia + "?");
    if (resp) {
        const url = BASE_URL + COMPLETE_TEACHER_URL + "/" + tia;
        callAPI(url, "DELETE", () => {
            readAll();
        });
    }
}

function findTeacher(tia) {
    const url = BASE_URL + COMPLETE_TEACHER_URL + "/" + tia;
    console.log(url)
    callAPI(url, "GET", (status, response) => {
        if (status === 200 || status === 201) {
            console.log(response)
            document.getElementById('name').value = response.name;
            document.getElementById('tia').value = response.tia;
            document.getElementById('tia').disabled = true;
            document.getElementById('workload').value = response.workload;
            document.getElementById('titration').value = response.titration;
            document.getElementById('button').innerHTML = "Atualizar";
            document.getElementById('button').onclick = updateTeacher;
        } else {
            alert("Erro: " + status);
        }
    })
}

function updateTeacher() {
    event.preventDefault();
    var teacher = {
        name: document.getElementById('name').value.toUpperCase(),
        tia: document.getElementById('tia').value.toUpperCase(),
        workload: document.getElementById('workload').value.toUpperCase(),
        titration: document.getElementById('titration').value.toUpperCase()
    }


    const url = BASE_URL + COMPLETE_TEACHER_URL + "/";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();

            document.getElementById('button').innerHTML = "Inserir";
            document.getElementById('button').onclick = insertStudent;
        } else {
            alert("Erro ao atualizar professor:" + status);
        }
    }, teacher);
}