const fs = require("fs"); ////basic
const { title } = require("process");

function fetchArguments(data) {
    data = data.slice(1, 4);

    const dataObj = data.reduce((acc, el) => {
    const [key, value] = el.split("=");

    acc[key] = value;
    return acc;
    }, {});

    return dataObj;
}

function addItem(data) {
  const dataObj = fetchArguments(data);

  let todoItems = fs.readFileSync("./file.json");
  todoItems = JSON.parse(todoItems);

  let newItem = {};

  if (todoItems.length == 0) {
    newItem = {
      id: 0,
      title: dataObj.title,
      body: dataObj.body,
      checked: false,
    };
  } else {
    const lastItem = todoItems[todoItems.length - 1];

    newItem = {
      id: lastItem.id + 1,
      title: dataObj.title,
      body: dataObj.body,
      checked: false,
    };
  }

  todoItems.push(newItem);

  fs.writeFileSync("./file.json", JSON.stringify(todoItems));
}

function removeItem(data) {
  const dataObj = fetchArguments(data);
  let todoItems = fs.readFileSync("./file.json");
  todoItems = JSON.parse(todoItems);

  const newTodo = todoItems.filter((item) => item.id != dataObj.id);

  fs.writeFileSync("./file.json", JSON.stringify(newTodo));
}

function updateItem(data) {
  const dataObj = fetchArguments(data);
  let todoItems = fs.readFileSync("./file.json");
  todoItems = JSON.parse(todoItems);
  console.log(dataObj);

  todoItems.forEach((item) => {
    if (item.id == dataObj.id) {
      item.title = dataObj.title;
      item.body = dataObj.body;
    }
  });
  fs.writeFileSync("./file.json", JSON.stringify(todoItems));
}

function listItem(data) {
    data = data.slice(1,2)
    let todoItems = fs.readFileSync("./file.json");
    todoItems = JSON.parse(todoItems);

    if(data[0] == "all"){
        console.log(todoItems);
    }

    if(data[0] == "checked"){
        let checked = todoItems.filter((item)=>{
        return item.checked == true
        }) 
        console.log(checked);
    };

    if(data[0] == "unchecked"){
        let unChecked = todoItems.filter((item)=>{
            return item.checked == false 
        })
        console.log(unChecked);
    };
}

function checkedItem(data) {
    const dataObj = fetchArguments(data);
    let todoItems = fs.readFileSync("./file.json");
    todoItems = JSON.parse(todoItems);
    console.log(dataObj);

    todoItems.forEach((item) => {
        if (item.id == dataObj.id) {
            if (item.checked !== true) {
            item.checked = true; 
            }
        }
    });

    fs.writeFileSync("./file.json", JSON.stringify(todoItems));
}

function unCheckedItem(data) {
    const dataObj = fetchArguments(data);
    let todoItems = fs.readFileSync("./file.json");
    todoItems = JSON.parse(todoItems);
    console.log(dataObj);

    todoItems.forEach((item) => {
        if (item.id == dataObj.id) {
            if (item.checked == true) {
            item.checked = false; 
            }
        }
    });

    fs.writeFileSync("./file.json", JSON.stringify(todoItems));
}

module.exports = {
    removeItem,
    updateItem,
    checkedItem,
    addItem,
    unCheckedItem,
    listItem,
};
