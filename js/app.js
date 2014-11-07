$(document).ready(function() {
	$("body").on('click', ".item", function() {
		$(this).children(".desc").slideToggle("fast");
	});

	$("#addToDo").on('click', function() {
		$("#addForm").slideToggle("fast");
	});

	$("#btnAddToDo").on('click', function () {
        var title = $("#toDoTitle").val();
		var description = $("#toDoText").val();
        $("#itemList").prepend($("<div/>", {
            'class': "item highlight"
        }).append($("<div/>", {
            'class': "itemTitle",
        }).append($("<h1/>", {
            text: title
        }))).append($("<div/>", {
            'class': "smallMenu",
            text: "Edit Delete"
        })).append($("<hr>", {})).append($("<div/>", {
            'class': "desc",
            text: description
        })));

       $("#addForm").slideToggle("fast"); 
    });
});


function ToDoItem(title, text) {
    this.title = title;
    this.text = text;
    
}