const form = document.querySelector(".form");
const inputForm = document.querySelector("input");
const listaTareas = document.querySelector("#lista_tareas");
const button = document.querySelector(".btn-info");
let tareas = [];
let idG;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (button.value === "EDITAR") {
    console.log("hola");
    let tareaNueva = inputForm.value;
    tareas = tareas.map((tarea) => {
      if (tarea.id == idG) {
        return {
          ...tarea,
          tarea: tareaNueva,
        };
      } else {
        return tarea;
      }
    });
  } else {
    if (inputForm.value !== "") {
      let tarea = inputForm.value.toUpperCase();
      createObjeto(tarea);
    }
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  button.value = "AGREGAR";
  form.reset();
  mostrarEnDOM();
});

function createObjeto(tarea) {
  const newTarea = {
    tarea,
    status: "PENDIENTE",
    id: Date.now(),
  };
  tareas.push(newTarea);
}

function mostrarEnDOM() {
  limpiarDOM();
  tareas = JSON.parse(localStorage.getItem("tareas"));
  if (tareas === null) {
    tareas = [];
  } else {
    if (tareas.length > 0) {
      tareas.forEach((tarea) => {
        if (tarea.status === "PENDIENTE") {
          listaTareas.innerHTML += `<li
              class="
                list-group-item
                mb-3
                font-weight-bold
                d-flex
                flex-wrap
                justify-content-between
              "
              id = "${tarea.id}"
            >
              <div>
                ${tarea.tarea} -
                <span class="text-danger">${tarea.status}</span>
              </div>
              <div class="iconos">
              <i class="bi bi-pencil-fill h5"></i>
              <i class="bi bi-trash-fill ml-2 h5"></i>
              <i class="bi bi-arrow-repeat ml-2 h5 text-danger"></i>
            </div>
            </li>`;
        } else {
          listaTareas.innerHTML += `<li
            class="
                list-group-item
                mb-3
                font-weight-bold
                d-flex
                justify-content-between
              "
              id = "${tarea.id}"
          >
            <div>
              ${tarea.tarea} -<span class="text-success">${tarea.status}</span>
            </div>
            <div class="iconos">
              <i class="bi bi-pencil-fill h5"></i>
              <i class="bi bi-trash-fill ml-2 h5"></i>
              <i class="bi bi-arrow-repeat ml-2 h5 text-danger"></i>
            </div>
          </li>`;
        }
      });
    }
  }
}

function limpiarDOM() {
  while (listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild);
  }
}

listaTareas.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("bi-trash-fill")) {
    idG = e.target.parentElement.parentElement.id;
    borrarStorage(idG);
  }
  if (e.target.classList.contains("bi-arrow-repeat")) {
    idG = e.target.parentElement.parentElement.id;
    cambiarStatus(idG);
  }
  if (e.target.classList.contains("bi-pencil-fill")) {
    idG = e.target.parentElement.parentElement.id;
    editarStorage(idG);
  }
});

function borrarStorage(id) {
  tareas = tareas.filter((tarea) => tarea.id != id);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarEnDOM();
}

function cambiarStatus(id) {
  let posicion = tareas.findIndex((tarea) => tarea.id == id);
  if (tareas[posicion].status === "REALIZADA") {
    tareas[posicion].status = "PENDIENTE";
  } else {
    tareas[posicion].status = "REALIZADA";
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarEnDOM();
}

function editarStorage(id) {
  const elemento = tareas.find((tarea) => tarea.id == id);
  inputForm.value = elemento.tarea;
  button.value = "EDITAR";
}

document.addEventListener("DOMContentLoaded", mostrarEnDOM);
