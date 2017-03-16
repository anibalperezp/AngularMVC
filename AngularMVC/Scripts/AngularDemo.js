// Defining angularjs module
var app = angular.module('demoModule', []);

// Defining angularjs Controller and injecting Service
app.controller('demoCtrl', function ($scope, $http, BooksService) {

    $scope.booksData = null;
    // Fetching records from the factory created at the bottom of the script file
    BooksService.GetAll().then(function (d) {
        $scope.booksData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    // Calculate Total of Price After Initialization
    $scope.total = function () {
        var total = 0;
        angular.forEach($scope.booksData, function (item) {
            total += item.Price;
        })
        return total;
    }

    $scope.Book = {
        Id: '',
        Name: '',
        Price: '',
        Category: ''
    };

    $scope.clear = function () {
        $scope.Book.Id = '';
        $scope.Book.Name = '';
        $scope.Book.Price = '';
        $scope.Book.Category = '';
    }

    //Add New Item
    $scope.save = function () {
        if ($scope.Book.Name != "" &&
       $scope.Book.Price != "" && $scope.Book.Category != "") {
            $http({
                method: 'POST',
                url: 'api/Book/Post/',
                data: $scope.Book
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.booksData.push(response.data);
                $scope.clear();
                alert("Book added successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    $scope.edit = function (data) {
        $scope.Book = { Id: data.Id, Name: data.Name, Price: data.Price, Category: data.Category };
    }

    $scope.cancel = function () {
        $scope.clear();
    }

    $scope.update = function () {
        if ($scope.Book.Name != "" &&
       $scope.Book.Price != "" && $scope.Book.Category != "") {
            $http({
                method: 'PUT',
                url: 'api/Book/Put/' + $scope.Book.Id,
                data: $scope.Book
            }).then(function successCallback(response) {
                $scope.booksData = response.data;
                $scope.clear();
                alert("Book updated successfully.");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };

    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'api/Book/Delete/' + $scope.booksData[index].Id,
        }).then(function successCallback(response) {
            $scope.booksData.splice(index, 1);
            alert("Book deleted duccessfully.");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };

});

// Here I have created a factory which is a populer way to create and configure services. You may also create the factories in another script file which is best practice.
// You can also write above codes for POST,PUT,DELETE in this factory instead of controller, so that our controller will look clean and exhibits proper Separation of Concern.
app.factory('BooksService', function ($http) {
    var fac = {};
    fac.GetAll = function () {
        return $http.get('api/Book/GetAllBooks');
    }
    return fac;
});