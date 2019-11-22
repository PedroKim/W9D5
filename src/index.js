const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (arg) {
  console.log(typeof arg);
  // debugger;
  let nodeArr;
  if (typeof arg === "string") { 
    // arg is a CSS selector
    nodeList = document.querySelectorAll(arg);
    nodeArr = Array.from(nodeList);
  } else if (arg instanceof HTMLElement){
    // arg is an HTMLElement
    // console.log(arg);
    nodeArr = [arg];
  } else if (arg instanceof Array){
    nodeArr = arg;
  } else if (arg instanceof Node && !(arg instanceof HTMLElement)){
    nodeArr = [arg];
  }
  return new DOMNodeCollection(nodeArr);
};



