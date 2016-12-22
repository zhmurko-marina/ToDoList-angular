var app = angular.module('TaskManager', ['ui.sortable']);

app.controller('taskController', function ($scope) {
    $scope.popup = false;
    $scope.taskItem = localStorage.getItem('taskItems')? JSON.parse(localStorage.getItem('taskItems')) : [];

    $scope.save = function () {
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    $scope.addNew = function () {
        if ($scope.newTask != '' && $scope.newTask)
            $scope.taskItem.push({
                description: $scope.newTask,
                complete: false
            });
        $scope.newTask = '';
        $scope.save();
    };

    $scope.deleteTask = function () {
        $scope.taskItem.splice(this.$index, 1);
        $scope.save();
    };

    $scope.editTask = function () {
        $scope.popup = true;
        var taskIndex = this.$index;
        $scope.editCurrentTask = $scope.taskItem[taskIndex].description;
        $scope.saveEdit = function () {
            $scope.taskItem[taskIndex].description = $scope.editCurrentTask;
            $scope.save();
            $scope.popup = false;
        };
        $scope.cancel = function () {
            $scope.popup = false;
        };
    };

    $scope.dragStart = function (e, ui) {
        ui.item.data('start', ui.item.index());
    };

    $scope.dragEnd = function (e, ui) {
        var start = ui.item.data('start'),
            end = ui.item.index();

        $scope.taskItem.splice(end, 0, $scope.taskItem.splice(start, 1)[0]);
        $scope.save();
    };

    $scope.sortableOptions = {
        start: $scope.dragStart,
        stop: $scope.dragEnd
    };
});