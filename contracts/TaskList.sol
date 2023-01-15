pragma solidity ^0.8.0;


//  mapping(address => mapping(uint => Task)) public tasks; => Task tasks = tasks[0XFAD312][0];
//  mapping(address => uint) public tasksCount; => uint taskCount = taskCount[msg.sender]; msg.sender is an address



contract TaskList {
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    event TaskCreated (
        uint id,
        string content,
        bool completed
    );

    event TaskFinished (
        uint id,
        bool completed
    );

    
    mapping(address => mapping(uint => Task)) public tasks;
    mapping(address => uint) public tasksCount;


    constructor(){
        createTask("Workout");
    }

    function createTask(string memory _content) public {
        uint taskCount = tasksCount[msg.sender];
        tasks[msg.sender][taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
        tasksCount[msg.sender]++; // increasing taskCount by 1
    }

    function toggleCompleted(uint _id) public {
        Task memory task = tasks[msg.sender][_id];
        task.completed = !task.completed;
        tasks[msg.sender][_id] = task;
        emit TaskFinished(_id, task.completed);
    }

}

