var theData = {
    users: [
        {text:'Loz',value:'1'},
        {text:'Ed',value:'2'},
        {text:'Sadie',value:'3'},
        {text:'Andy',value:'4'},
        {text:'Eve',value:'5'},
        {text:'Harry',value:'6'}
    ],
    projects: [
        {text:'Plau',value:'1'},
        {text:'Substance',value:'2'},
        {text:'Planet',value:'3'},
        {text:'Sustrans',value:'4'},
        {text:'Plan.Do',value:'5'},
        {text:'Scriberia',value:'6'}
    ],
    title: 'overview',
    tasks: [
      {
        id: 1,
        done: true,
        project: "Substance",
        date: "1429126037",
        subtasks: [
            { task: "Stop using planet as my personal to-do list."},
            { task: "Stop using planet as my personal to-do list. No.2"}
        ],
        team: ["1","2","4"],
        content: 'Do a flip!'
      },
      {
        id: 2,
        done: false,
        project: "Substance",
        date: "1429177944",
        subtasks: [
            { task: "Stop using planet as my personal to-do list."},
            { task: "Stop using planet as my personal to-do list. No.2"}
        ],
        team: ["1","2","3"],
        content: 'Such textArea.\n\nMuch auto-expand.\n\nMany bugs.\n'
      }
    ]
}

// Set up moment formatting.

moment.locale('en', {
    calendar : {
        lastDay : '[Yesterday,] LT',
        sameDay : '[Today,] LT',
        nextDay : '[Tomorrow,] LT',
        lastWeek : '[last] dddd [,] LT',
        nextWeek : 'dddd [,] LT',
        sameElse : 'L'
    }
});

// Initalise the vue data binding.

Vue.directive('selectize', {
  twoWay: true,
    bind: function (value) {
        var self = this;

        this.vm.$once('hook:ready', function() {
            self.selectize = $(self.el).selectize({
                options: self.vm.users,
                valueField  : 'value',
                labelField  : 'text',
                sortField   : 'text',
                searchField : 'text'
            })[0].selectize;

            self.selectize.setValue(self.vm.team);

            self.selectize.on('change', function(value) {
                console.log(value);
                self.set(value);
            });
        });

    },

    update: function(values) {
        var self = this;

        if (self.selectize) {
            values.forEach(function(item) {
                self.selectize.addItem(item);
            });
        }
    },

    unbind: function() {
        this.selectize.destroy();
    }
})

Vue.directive('autosize', {
  bind: function () {
    var self = this;

    this.vm.$once('hook:ready', function(){
        autosize($(self.el));
    });

  }
})


var projects = new Vue({
  el: 'html',
  data: theData,

  filters: {
    formatDate: function (v) {
      return moment.unix(v).calendar();
    }
  },

  methods: {
    addSubTask: function (self, e) {
      self.subtasks.push({task: e.target.value});
      e.target.value = '';
    },
    removeSubTask: function(self, e) {
      if (e.target.value == '') {
        e.preventDefault();
        self.subtasks.$remove(self.$data);
      }
    },
    removeTask: function(self, e) {
        e.preventDefault();
        e.stopPropagation();
        self.tasks.$remove(self.$data);
    },
    changeProject: function(self, e) {
        e.preventDefault();
        // We can change the api url based on the current project id setting.
        alert(self.value);
    }
  }

});







// Api Data

var apiSource = "http://planet-api.dev.192.168.0.3.xip.io/tasks.json";
var postTarget = "http://planet-api.dev.192.168.0.3.xip.io/tasks/add/";
var deleteTarget = "http://planet-api.dev.192.168.0.3.xip.io/tasks/delete/";

// var taskListData = [];
// console.log(taskListData);

function getTasks(){
    $.get( apiSource, function( data ) {

        taskListData = $.map(data.tasks, function(el) { return el; })

        var maxId = getMax(taskListData, "id");
        availableId = Math.floor(maxId.id) + 1;

        postTarget = "http://planet-api.dev/tasks/add/" + availableId + ".json";

        console.log(taskListData);
    });
}

function pushTask(taskInfo){

    // $.ajax({
    //     type: "POST",
    //     data :JSON.stringify(taskInfo),
    //     url: postTarget,
    //     contentType: "application/json"
    // }).done(function(){
    //     getTasks();
    // });
    
    projects._data.tasks.push(taskInfo);

}

function removeTask(taskInfo,urlId){

    $.ajax({
        type: "POST",
        data :JSON.stringify(taskInfo),
        url: deleteTarget + urlId + ".json",
        contentType: "application/json"
    });

}

function getMax(taskListData, prop) {
    var max;
    for (var i=0 ; i<taskListData.length ; i++) {
        if (!max || parseInt(taskListData[i][prop]) > parseInt(max[prop]))
            max = taskListData[i];
    }
    return max;
}