//node index.js add title  body  
//node index.js edit id title  body
//node index.js remove     id
//node index.js checked    id
//node index.js unChecked  id
//node index.js list       (all , checked , unchecked)             /get all data

const helper = require("./helper"); //import helper file.

const myArgs = process.argv; //like as window.property
let a = 5 
let b= 7 
let arr= [a , b]
[b , a]= [a ,b]


let [, , ...data] = myArgs;
const action = data[0];

switch (action) {
  case "add":
    helper.addItem(data);
    break;
  case "remove":
    helper.removeItem(data);
    break;
  case "update":
    helper.updateItem(data);
    break;
  case "list":
    helper.listItem(data);
    break;
  case "checked":
    helper.checkedItem(data);
    break;
  case "unChecked":
    helper.unCheckedItem(data);
    break;
  default:
    break;
}
