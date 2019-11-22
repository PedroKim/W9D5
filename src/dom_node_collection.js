// Methods to create.
// empty, remove, attr, addClass, removeClass, html, find, children, and parent
class DOMNodeCollection {
  constructor(nodeArr, fn) {
    this.nodeArr = nodeArr;

    if (fn) {
      if (document.readyState === "complete"){
        fn();
      } else {
        this.on("DOMContentLoaded", fn);
      }
    }
  }

  empty() {
    this.nodeArr.forEach(node =>{
      // $l(node).html(""); // This would be O(n) time, create new instance per node
      node.innerHTML = "";
    });
    return this;
  }

  remove(){
    this.nodeArr.forEach(node =>{
      node.remove();
    });
    this.prevObject = $l(document);
    return this;
  }

  attr(attributeName, value){ //will take two args
    if (!value){
      if (attributeName instanceof Object){
        this.nodeArr.forEach(node => {
          Object.entries(attributeName).forEach(entry =>{
            node.setAttribute(entry[0], entry[1]);
          });
        });
      } else {
        return this.nodeArr[0].getAttribute(attributeName);
      }
    } else {
      this.nodeArr.forEach(node => {
        node.setAttribute(attributeName, value);
      });
    }
    return this;
  }

  addClass(classNames){
    this.nodeArr.forEach(node => {
      classNames.trim().split(" ").forEach(className => {
        node.classList.add(className);
      });
    });
    return this;
  }

  removeClass(classNames){
    this.nodeArr.forEach(node => {
      classNames.trim().split(" ").forEach(className => {
        node.classList.remove(className);
      });
    });
    return this;
  }

  html(htmlString){ //optionally accepts a string
    if (typeof htmlString === 'string'){
      this.nodeArr.forEach(node => {
        node.innerHTML = htmlString;
      });
      return this;
    } else {
      return this.nodeArr[0].innerHTML;
    }
  }

  find(selector){ //find('p')
    let collection = [];
    this.nodeArr.forEach(node => {
      let foundSubNodeList = node.querySelectorAll(selector);
      let foundSubArr = Array.from(foundSubNodeList);
      collection = collection.concat(foundSubArr);
    });
    const $lFoundCollection = $l(collection);
    $lFoundCollection.prevObject = this;
    return $lFoundCollection;
  }

  children(){
    const nodes = [];
    this.nodeArr.forEach(node => {
      Array.from(node.children).forEach(childNode => {
        nodes.push(childNode);
      });
    });
    const $lChildNodes = $l(nodes);
    $lChildNodes.prevObject = this;
    return $lChildNodes;
  }

  parent(){
    const nodes = [];
    this.nodeArr.forEach(node =>{
      if (!nodes.includes(node.parentNode)) nodes.push(node.parentNode);
    });
    const $lParentNodes = $l(nodes);
    $lParentNodes.prevObject = this;
    return $lParentNodes;
  }

  append(arg){ //takes jQuery lite wrapped obj, HTML el, or a string
    if (arg instanceof HTMLElement){
      this.nodeArr.forEach(node => {
        node.innerHTML += arg.outerHTML;
      });
    } else if (typeof arg === 'string'){
      this.nodeArr.forEach(node => {
        node.innerHTML += arg;
      });
    } else {
      arg.nodeArr.forEach(argNode =>{
        this.nodeArr.forEach(node =>{
          node.innerHTML += argNode.outerHTML;
        });
      });
    }
    return this;
  }

  on(eventName, eventHandler){ //eventHandler will be a callback, eventName e.g 'click'
    this.nodeArr.forEach(node =>{
      node.addEventListener(eventName, eventHandler);
      node[`${eventName}Handler`] = eventHandler;
    });
    return this;
  }

  off(eventName){
    this.nodeArr.forEach(node =>{
      node.removeEventListener(eventName, node[`${eventName}Handler`]);
      delete node[`${eventName}Handler`];
    });
    return this;
  }
}

module.exports = DOMNodeCollection;