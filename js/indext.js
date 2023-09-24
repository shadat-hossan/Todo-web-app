
const taskForm= document.querySelector(".task-form");
const taskInput= document.querySelector(".taskInput");
const Button = document.querySelector(".Button");
const addCard = document.querySelector(".addcard");
const clearButton =document.querySelector(".clearButton");
const listItem = document.querySelector("ul"); 

const messagElement = document.querySelector(".massag");


// creating list--->
const creatTask = (taskId, taskValue)=>{
    const taskElement = document.createElement("li");
    taskElement.classList.add("listStyle");
    taskElement.id = taskId;
    taskElement.innerHTML=
    `<span>${taskValue}</span>
    <span class="buttons" id="deleteButton"><i class="fa-solid fa-xmark"></i></span>`;
    listItem.appendChild(taskElement);

    const deleteButtons = taskElement.querySelector("#deleteButton");
    deleteButtons.addEventListener("click", deletetask);
}


// deletetask--->
const deletetask = (event) =>{
    const selectTask = event.target.parentElement.parentElement;
    listItem.removeChild(selectTask);

    messags("task is Rrmove", "removMasssag");

    let deleLocTetask = getTasksFromLocalStorage();
    deleLocTetask = deleLocTetask.filter((dtask)=>dtask.taskId != selectTask.id);
    localStorage.setItem("mytasks", JSON.stringify(deleLocTetask));

    console.log(deleLocTetask);

}


// Show Massag--->
function messags(text, style){
    messagElement.textContent = text;
    messagElement.classList.add(`bg-${style}`);

    setTimeout(()=>{
        messagElement.textContent = "";
        messagElement.classList.remove(`bg-${style}`);
    }, 1000);
}


// getTaskFromLocalStorage--->

const getTasksFromLocalStorage = () => {
    return localStorage.getItem("mytasks")
      ? JSON.parse(localStorage.getItem("mytasks"))
      : [];
  };


// adding List task--->
const addTask=(event)=>{
    event.preventDefault();
    const taskValue = taskInput.value;
    const taskId = Date.now().toString();


    creatTask(taskId, taskValue);

    messags("add is task.", "addaMasssag");

    const localTasks = getTasksFromLocalStorage();
    localTasks.push({ taskId, taskValue });
    localStorage.setItem("mytasks", JSON.stringify(localTasks));

    taskInput.value = "";  
}

const lodeTask=()=>{
    const tasks = getTasksFromLocalStorage();
    tasks.map((task)=> creatTask(task.taskId, task.taskValue));
};

taskForm.addEventListener("submit", addTask);

window.addEventListener('DOMContentLoaded', lodeTask);
