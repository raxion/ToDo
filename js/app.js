$(document).ready(function() {
    loadToDos();
    $("body").on('click', ".item", function() {
        $(this).children(".desc").slideToggle("fast");
    });

    $("body").on('click', ".removeToDo", function() {
        var id = $(this).parent().parent().attr("id");
        $(this).parent().parent().hide();
        removeToDoFromFiBa(id);
    });

    $("body").on('click', ".editToDo", function() {
        var id = $(this).parent().parent().attr("id");
    });

    $("#addToDo").on('click', function() {
        $("#toDoTitle").val("");
        $("#toDoText").val("");
        $("#addForm").slideToggle("fast");
    });

    $("#btnAddToDo").on('click', function () {
        var todo = {
            "title": $("#toDoTitle").val(),
            "description": $("#toDoText").val()
        };
        addToDoToFiBa(todo);
        $("#addForm").slideToggle("fast");
    });
});

function loadToDos() {
    var myFirebaseRef = new Firebase("https://raxtodo.firebaseio.com/todos");
    myFirebaseRef.on("child_added", function(snapshot) {
        var id = snapshot.key();
        var todo = snapshot.val();
        createItem(id, todo);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function addToDoToFiBa(todo) {
    var myFirebaseRef = new Firebase("https://raxtodo.firebaseio.com/todos");
    myFirebaseRef.push({
        title: todo.title,
        description: todo.description
    });
}

function removeToDoFromFiBa(id) {
    var ref = new Firebase("https://raxtodo.firebaseio.com/todos/" + id);
    ref.remove();
    //ref.child(id).remove();
}

function createItem(id, todo) {
    $("#itemList").prepend($("<div/>", {
        id: id,
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