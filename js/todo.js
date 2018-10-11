const STATUS = { COMPLETE: 'complete', INCOMPLETE: 'incomplete' };

class ToDoItem {
    constructor(obj) {
        this.id_task = obj.id_task;
        this.task = obj.task;
        this.isComplete = obj.isComplete ? obj.isComplete : STATUS.INCOMPLETE;
    }
    setId(ID) {
        this.id_task = ID;
    }
    getId() { return this.id_task; }
    setTaskName(task) {
        this.task = task;
    }
    getTaskName() { return this.task; }
    setIsComplete(isComplete) { this.isComplete = isComplete; }
    getIsComplete() { return this.isComplete; }
    generateTaskHtml(task, index) {
        return `
            <li class="list-group-item checkbox">
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="checkTodoStatus" type="checkbox" value="" onChange="toDoList.checkTodoStatus(${index})" class="" ${this.isComplete === STATUS.COMPLETE ? 'checked' : ''}></label>
                </div>
                <div ondblclick="toDoList.sukien()" class="col-md-9 col-xs-9 col-lg-9 col-sm-9 task-text ${this.isComplete === STATUS.COMPLETE ? 'complete' : ''}">
                        <p id="x2">${this.task}</p>
                        <input  id="xxx" class="hung" type="text" value="${this.task}"></input>
                        <button id="xxx2" class="btn btn-success hung2" onClick="toDoList.edittask(${index})"></button>
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="" href="" onClick="toDoList.deleteTaskTodoList(event, ${index})" ><i id="deleteTaskTodoList" data-id="${index}" class="delete-icon glyphicon glyphicon-trash"></i></a>
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
               
                </div>
            </div>
            </li>
        `;
    }

}

class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASK_ID'));
        if (!this.tasks) {
            this.tasks = [];
        }

        // Convert todo items to TodoItem class
        this.tasks = this.tasks.map(todoItem => new ToDoItem(todoItem));

        this.loadToDoList();
        this.addEventListener();

    }

    sukien(xxx) {

        document.getElementById("xxx").style.display = "block";
        document.getElementById("xxx2").style.display = "block";
        document.getElementById("x2").style.display = "none";
    }

    edittask(index) {
        //var name1 = document.getElementsByTagName('p')[0].innerHTML;
        var name = document.getElementById("xxx").value;
        this.tasks.splice(index, 1);
        console.log(this.tasks.length);


        let todoItem1 = new ToDoItem({
            id_task: Math.random(),
            task: name,
            isComplete: STATUS.INCOMPLETE
        });

        this.tasks.push(todoItem1);

        this.loadToDoList();

    }

    addEventListener() {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode == 13) {
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });

    }
    //check: checkbox status--
    //index: The position of each line in the array task_value 
    checkTodoStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadToDoList();
    }
    
    deleteTaskTodoList(event, taskIndex) {
        event.preventDefault();
        this.tasks.splice(taskIndex, 1);

        this.loadToDoList();
    }
    addTaskClick() {
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }

    addTask(task) {
        /*  const newTask = {
             task,
             isComplete: false,
         }; */

        //parent div is simply uses to add the effects around the insert label if there is a text or not
        let parentDiv = document.getElementById('addTask').parentElement;
        if (task === '') {
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            parentDiv.classList.add('has-success')

            //add first: unshift()  
            //add last: push()
            const todoItem = new ToDoItem({
                id_task: Math.random(),
                task, isComplete: STATUS.INCOMPLETE
            });

            this.tasks.push(todoItem);
            this.loadToDoList();
        }
    }

    //display all task
    addTaskAllClick() {
        this.loadToDoList();
    }

    //display task don't active
    addTaskActiveClick() {
        // Filter active tasks
        const list = this.tasks.filter(item => item.isComplete === STATUS.INCOMPLETE);
        this.load_gen(list);

    }

    //task: completed 
    addTaskCompletedClick() {
        const list_complete = this.tasks.filter(item => item.isComplete === STATUS.COMPLETE);
        this.load_gen(list_complete);
    }

    //load all task
    loadToDoList() {
        //var tasks= {task: "Review code", isComplete: false}
        //JSON.stringify: convert to string

        localStorage.setItem('TASK_ID', JSON.stringify(this.tasks));
        let total_task = "Total: " + this.tasks.length + " tasks";
        document.getElementById('total_task').innerHTML = total_task;
        let taskHtml = this.tasks.reduce((html, task, index) => html += task.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
    }

    //load active, completed
    load_gen(list) {
        localStorage.setItem('TASK_ID', JSON.stringify(this.tasks));
        let taskHtml2 = list.reduce((html, task, index) => html += task.generateTaskHtml(task, index), '');
        document.getElementById('taskList').innerHTML = taskHtml2;
    }
   
}

let toDoList;
window.addEventListener("load", () => {
    toDoList = new ToDoClass();
})

//check localstorage
// if (typeof (Storage) !== 'undefined') {


//     //var data=localStorage.length;         //total key
//     //localStorage.removeItem('TASK_ID');  //remove key
//     //localStorage.clear();              //delete all item in local storage

//     alert("Browser is support LocalStorage");
// } else {
//     alert("Browser isn't support LocalStorage");
// }