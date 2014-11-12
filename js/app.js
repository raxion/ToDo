var highestToDo = 0;
$(document).ready(function() {
    highestToDo = loadToDos(highestToDo);
    $("body").on('click', ".item", function() {
        $(this).children(".desc").slideToggle("fast");
    });

    $("body").on('click', ".removeToDo", function() {
        var id = $(this).parent().parent().attr("id");
        $(this).parent().parent().hide();
        var data = JSON.parse(localStorage.getItem("todos"));

        for(i = 0;i < data.length;i++) {
            if(data[i].id == id) {
                data.splice(i,1);
            } else {

            }
            localStorage["todos"] = JSON.stringify(data);
        }
    });

    $("#addToDo").on('click', function() {
        $("#addForm").slideToggle("fast");
    });

    $("#btnAddToDo").on('click', function () {
        var todo = {
            "id": ++highestToDo,
            "title": $("#toDoTitle").val(),
            "description": $("#toDoText").val()
        };
        createItem(todo);
        addToDoToLocalStorage(todo);
        $("#addForm").slideToggle("fast");
    });
});

function loadToDos(highestToDo) {
    var todos = JSON.parse(localStorage.getItem("todos"));
    if(todos != null) {
        todos.forEach(function(key) {
            if(key.id > highestToDo) {
                highestToDo = key.id;
            }
            createItem(key);
        });
    }
    return highestToDo;
}

function addToDoToLocalStorage(todo) {
    var todos = localStorage.getItem("todos");
    var obj = [];
    if(todos) {
        obj = JSON.parse(todos);  
    }
    obj.push(todo);
    localStorage.setItem("todos",JSON.stringify(obj));   
}

function createItem(todo) {
    $("#itemList").prepend($("<div/>", {
        id: todo.id,
        'class': "item highlight"
    }).append($("<div/>", {
        'class': "itemTitle",
    }).append($("<h3/>", {
        text: todo.title
    }))).append($("<div/>", {
        'class': "smallMenu",
        html: "<span class='editToDo glyphicon glyphicon-edit'></span> <span class='removeToDo glyphicon glyphicon-remove'></span>"
    })).append($("<hr>", {})).append($("<div/>", {
        'class': "desc",
        text: todo.description
    }))); 
}