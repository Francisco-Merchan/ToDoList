const form = document.querySelector(".form");
const inputForm = document.querySelector("input");
const listaTareas = document.querySelector("#lista_tareas");
let tareas = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputForm.value !== "") {
    let tarea = inputForm.value.toUpperCase();
    createObjects(tarea);
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarEnDOM();
});

function createObjects(tarea) {
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
    const id = e.target.parentElement.parentElement.id;
    borrarStorage(id);
  }
  if (e.target.classList.contains("bi-arrow-repeat")) {
    const id = e.target.parentElement.parentElement.id;
    cambiarStatus(id);
  }
});

function borrarStorage(id) {
  tareas = tareas.filter((tarea) => tarea.id != id);
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarEnDOM();
}

function cambiarStatus(id) {
  let posicion = tareas.findIndex((tarea) => tarea.id == id);
  if ((tareas[posicion].status = "PENDIENTE")) {
    tareas[posicion].status = "REALIZADA";
  } else if ((tareas[posicion].status = "REALIZADA")) {
    tareas[posicion].status = "REALIZADA";
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarEnDOM();
}
