// Temp Data

var theTeam = [
    {text:'Loz',value:'1'},
    {text:'Ed',value:'2'},
    {text:'Sadie',value:'3'},
    {text:'Andy',value:'4'},
    {text:'Eve',value:'5'},
    {text:'Harry',value:'6'}
];

var theProjects = [
    {text:'Plau',value:'Plau'},
    {text:'Substance Site',value:'Substance Site'},
    {text:'Planet',value:'Planet'},
    {text:'Sustrans',value:'Sustrans'},
    {text:'Plan.Do',value:'Plan.Do'},
    {text:'Scriberia',value:'Scriberia'}
];

var theData = {
    users: [
       { name: 'Harry', id: '1'},
       { name: 'Loz', id: '2'},
       { name: 'Eve', id: '3'},
       { name: 'Sadie', id: '4'},
       { name: 'Andy', id: '5'},
       { name: 'Ed', id: '6'}
    ],
    projects: [
       { name: 'Substance', id: '1'},
       { name: 'Plan.Do', id: '2'},
       { name: 'Planet', id: '3'},
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
        team: [
            { user: "Harry" },
            { user: "Loz" }
        ],
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
        team: [
            { user: "Harry" },
            { user: "Loz" }
        ],
        content: 'asfasfsa\ns\ns\ns\ns\ns\ns'
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

Vue.directive('names', {
  twoWay: true,
  bind: function () {
    this.handler = function () {
      // set data back to the vm.
      // If the directive is bound as v-example="a.b.c",
      // this will attempt to set `vm.a.b.c` with the
      // given value.
      this.set(this.el.value)
    }.bind(this)

    // console.log(this.el.value);

    // var thedata = [];
    // for (index = 0; index < this.el.value.length; ++index) {
    //     thedata.push(this.el.value[index].user);
    // }

    // console.log(theData);

    // this.$el.data("currentUsers",thedata);
    console.log($(this.el).find($('div.js-names-input')[1]));
    this.el.addEventListener('input', this.handler)
    // console.log(this);
  },
  unbind: function () {
    this.el.removeEventListener('input', this.handler)
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
    addSubTask: function (item, e) {
      item.subtasks.push({task: e.target.value});
      e.target.value = '';
    },
    removeSubTask: function(item, e) {
      if (e.target.value == '') {
        e.preventDefault();
        item.subtasks.$remove(item.$data);
      }
    },
    removeTask: function(item, e) {
        e.preventDefault();
        console.log(item.$data);
        item.tasks.$remove(item.$data);
    },
    changeProject: function(item, e) {
        e.preventDefault();
        // We can change the api url based on the current project id setting.
        alert(item.id);
    }
  }

});







// Api Data

var apiSource = "http://planet-api.dev.192.168.0.3.xip.io/tasks.json";
var postTarget = "http://planet-api.dev.192.168.0.3.xip.io/tasks/add/";
var deleteTarget = "http://planet-api.dev.192.168.0.3.xip.io/tasks/delete/";

var taskListData = [];
console.log(taskListData);

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