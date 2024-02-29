const createTodoButton = document.querySelector(".createTodoButton")
const body = document.querySelector("body")
const main = document.querySelector("main")

let todoList = []

function createModal(content) {
  const greybackground = document.createElement("div")
  const modal = document.createElement("div")
  greybackground.classList.add("grey-background")
  greybackground.id = "greybackground"
  modal.classList.add("popUp")
  body.appendChild(greybackground)
  body.appendChild(modal)
  modal.insertAdjacentHTML("afterBegin", content)
  const titleInput = document.querySelector(".modalInput")

  return titleInput
}

function createTodo(event, taskTitleInput, taskDescriptionInput) {
  const taskTitle = taskTitleInput.value
  const taskDescription = taskDescriptionInput.value

  const newTask = {
    title: taskTitle,
    text: taskDescription,
    id: Date.now(),
    donestatus: false,
  }

  todoList.push(newTask)

  console.log(todoList)

  // const doneClass = newTask.done ? "checked" :

  const todoHTML = `
  <section class="section">
    <input type="checkbox" class="section-checkbox" data-id="section-checkbox" id="${newTask.id}" value="yes" />
    <label for="${newTask.id}">${taskTitle}</label>
    <button class="buttonMore" data-id="buttonMore" id="${newTask.id}">more</button>
  </section>
  `

  main.insertAdjacentHTML("afterbegin", todoHTML)

  taskTitleInput.value = ""
  taskDescriptionInput.value = ""

  greybackground.remove()
  const modal = document.querySelector(".popUp")
  modal.remove()
}

main.addEventListener("click", (event) => {
  if (event.target.dataset.id === "createTodoButton") {
    createModal(
      `
              <form action="/" method="post">
                <input class="modalInput" type="email" name="name" placeholder="Task Title" id="modalTitleInput"/>
              </form>
              <form action="/" method="post">
                <input class="modalInput" type="email" name="name" placeholder="Task descriotion" id="modalDescriptionInput"></input>
              </form>
              <button class="createTaskButton" data-id="createTaskButton">
                Create task
              </button>
              `
    )
  } else if (event.target.dataset.id === "buttonMore") {
    createModal(
      `
                <h3>Title</h3>
                <p>description</p>
              `
    )
  }
})

body.addEventListener("click", (event) => {
  if (event.target.dataset.id === "createTaskButton") {
    const taskTitleInput = document.getElementById("modalTitleInput")
    const taskDescriptionInput = document.getElementById("modalDescriptionInput")

    createTodo(event, taskTitleInput, taskDescriptionInput)

    return
  } else if (event.target.id === "greybackground") {
    greybackground.remove()
    const modal = document.querySelector(".popUp")
    modal.remove()
  }
})
