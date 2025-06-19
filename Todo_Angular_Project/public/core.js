var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.todos = [];
  $scope.completedTodos = []; // Liste des todos terminés
  $scope.allTodos = []; // Liste combinée
  $scope.cos = "Project 2";

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data.filter(todo => !todo.done); // Non terminés
      $scope.completedTodos = data.filter(todo => todo.done); // Terminés
      $scope.allTodos = data; // Tous
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        document.getElementById("newTodo").value = "";
        $scope.todos = data.filter(todo => !todo.done);
        $scope.completedTodos = data.filter(todo => todo.done);
        $scope.allTodos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(todo) {
    console.log("URL de la requête PUT :", "/api/todos/" + todo._id);
    console.log("Données envoyées :", todo);

    $http.put('/api/todos/' + todo._id, todo)
      .success(function(data) {
        console.log("Réponse du serveur :", data);
        $scope.todos = data.filter(todo => !todo.done);
        $scope.completedTodos = data.filter(todo => todo.done);
        $scope.allTodos = data;
      })
      .error(function(data) {
        console.log("Erreur :", data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data.filter(todo => !todo.done);
        $scope.completedTodos = data.filter(todo => todo.done);
        $scope.allTodos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
}
