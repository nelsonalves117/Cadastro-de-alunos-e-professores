const COMPLETE_STUDENT_URL = "student";

window.onload = function () {
    readAll();
}

function createCard(student) {
    var str = "<article>";
    str += "<h1>" + student.name + "</h1>";
    str += "<p>" + student.tia + "</p>";
    str += "<p>" + student.course + "</p>";
    str += "<button onclick='deleteStudent(" + student.tia + ")'>Remove</button>";
    str += "<button onclick='findStudent(" + student.tia + ")'>Edit</button>";
    str += "</article>";
    return str;
}

function readAll() {
    const url = BASE_URL + COMPLETE_STUDENT_URL;
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

function insertStudent() {
    event.preventDefault();
    var student = {
        name: document.getElementById('name').value.toUpperCase(),
        tia: document.getElementById('tia').value.toUpperCase(),
        course: document.getElementById('course').value.toUpperCase()
    }
    if (isNaN(student.tia)) {
        alert("TIA deve ser um número");
        return;
    }
    const url = BASE_URL + COMPLETE_STUDENT_URL;

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();
        } else {
            alert("Erro ao inserir estudante:" + status);
        }
    }, student);
}

function clear() {
    document.getElementById('name').value = "";
    document.getElementById('tia').value = "";
    document.getElementById('course').value = "";
    document.getElementById('tia').removeAttribute('disabled');
}

function deleteStudent(tia) {
    const resp = confirm("Deseja realmente apagar o aluno com tia: " + tia + "?");
    if (resp) {
        console.log(resp);
        const url = BASE_URL + COMPLETE_STUDENT_URL + "/" + tia;
        callAPI(url, "DELETE", () => {
            readAll();
        });
    }
}

function findStudent(tia) {
    const url = BASE_URL + COMPLETE_STUDENT_URL + "/" + tia;
    callAPI(url, "GET", (status, response) => {
        if (status === 200 || status === 201) {
            document.getElementById('name').value = response.name;
            document.getElementById('tia').value = response.tia;
            document.getElementById('tia').disabled = true;
            document.getElementById('course').value = response.course;
            document.getElementById('button').innerHTML = "Atualizar";
            document.getElementById('button').onclick = updateStudent;
        } else {
            alert("Erro: " + status);
        }
    })
}

function updateStudent() {
    event.preventDefault();
    var student = {
        name: document.getElementById('name').value.toUpperCase(),
        tia: document.getElementById('tia').value.toUpperCase(),
        course: document.getElementById('course').value.toUpperCase()
    }

    const url = BASE_URL + COMPLETE_STUDENT_URL + "/";

    callAPI(url, "PATCH", function (status, response) {
        if (status === 200 || status === 201) {
            readAll();
            clear();

            document.getElementById('button').innerHTML = "Inserir";
            document.getElementById('button').onclick = insertStudent;
        } else {
            alert("Erro ao atualizar estudante:" + status);
        }
    }, student);
}