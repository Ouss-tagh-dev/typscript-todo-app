function createTaskElement(taskText: string): HTMLLIElement {
  const li = document.createElement("li");
  li.setAttribute("draggable", "true"); // Permet de glisser l'élément

  li.addEventListener("dragstart", handleDragStart);
  li.addEventListener("dragover", handleDragOver);
  li.addEventListener("drop", handleDrop);
  li.addEventListener("dragend", handleDragEnd);

  const taskTextElement = document.createElement("span");
  taskTextElement.setAttribute("class", "task-text");
  taskTextElement.innerText = taskText;

  const buttons = document.createElement("span");

  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", "edit-btn");
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", taskText);
    if (newText !== null) {
      taskTextElement.innerText = newText;
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "remove-btn");
  deleteBtn.innerText = "Remove";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(taskTextElement);
  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);
  li.appendChild(buttons);

  return li;
}

let draggedItem: HTMLLIElement | null = null;

function handleDragStart(event: DragEvent) {
  draggedItem = event.target as HTMLLIElement;
  setTimeout(() => {
    draggedItem?.classList.add("hidden");
  }, 0);
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  const tasksList = document.querySelector(".tasks-list") as HTMLUListElement;

  const target = event.target as HTMLLIElement;
  if (target && draggedItem && target !== draggedItem) {
    const bounding = target.getBoundingClientRect();
    const offset = event.clientY - bounding.top;

    if (offset > bounding.height / 2) {
      tasksList.insertBefore(draggedItem, target.nextSibling);
    } else {
      tasksList.insertBefore(draggedItem, target);
    }
  }
}

function handleDragEnd() {
  draggedItem?.classList.remove("hidden");
  draggedItem = null;
}

function addTask() {
  const taskInput = document.getElementById("taskinput") as HTMLInputElement;
  const taskText = taskInput.value.trim();

  if (taskInput.value === "") {
    return;
  }

  const taskElement = createTaskElement(taskText);
  const tasksList = document.querySelector(".tasks-list") as HTMLUListElement;
  tasksList.appendChild(taskElement);
  taskInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addbtn");
  if (addBtn) {
    addBtn.addEventListener("click", addTask);
  }
});
