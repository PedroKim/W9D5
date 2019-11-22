const DOMNodeCollection = require('./dom_node_collection');

window.$l = function (arg) {
  // debugger;
  let nodeArr;
  // if (typeof arg === "string") { 
  //   // arg is a CSS selector
  //   nodeList = document.querySelectorAll(arg);
  //   nodeArr = Array.from(nodeList);
  // } else if (arg instanceof HTMLElement){
  //   // arg is an HTMLElement
  //   // console.log(arg);
  //   nodeArr = [arg];
  // } else if (arg instanceof Array){
  //   nodeArr = arg;
  // } else if (arg instanceof Node && !(arg instanceof HTMLElement)){
  //   nodeArr = [arg];
  // } else if (arg instanceof Function) {
  //   // arg is a callback to be invoked when document is ready.
  //   if (document.readyState === "complete") {
  //     arg();
  //   } else {
  //     document.addEventListener("DOMContentLoaded", arg);
  //   }
  // }
  // return new DOMNodeCollection(nodeArr);

  if (arg instanceof Function) {
    nodeArr = [document];
    return new DOMNodeCollection(nodeArr, arg);
  } else {
    if (typeof arg === "string") {
      // arg is a CSS selector
      nodeList = document.querySelectorAll(arg);
      nodeArr = Array.from(nodeList);
    } else if (arg instanceof HTMLElement) {
      // arg is an HTMLElement
      nodeArr = [arg];
    } else if (arg instanceof Array) {
      nodeArr = arg;
    } else if (arg instanceof Node && !(arg instanceof HTMLElement)) {
      nodeArr = [arg];
    }
    return new DOMNodeCollection(nodeArr);
  }
};

$l.extend = function(obj1, ...restObjs) {
  restObjs.forEach(obj => {
    let entries = Object.entries(obj);
    entries.forEach(entry => {
      obj1[entry[0]] = entry[1];
    });
  });

  return obj1;
}

$l.ajax = function(addOptions) {
  const options = {
    success:,
    error: ,
    url: ,
    method: ,
    data: null,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  $l.extend(options, addOptions);
}




