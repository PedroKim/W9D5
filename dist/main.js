/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Methods to create.\n// empty, remove, attr, addClass, removeClass, html, find, children, and parent\nclass DOMNodeCollection {\n  constructor(nodeArr, fn) {\n    this.nodeArr = nodeArr;\n\n    if (fn) {\n      if (document.readyState === \"complete\"){\n        setTimeout(function() {\n          fn();\n        },0);\n      } else {\n        this.on(\"DOMContentLoaded\", fn);\n      }\n    }\n  }\n\n  empty() {\n    this.nodeArr.forEach(node =>{\n      // $l(node).html(\"\"); // This would be O(n) time, create new instance per node\n      node.innerHTML = \"\";\n    });\n    return this;\n  }\n\n  remove(){\n    this.nodeArr.forEach(node =>{\n      node.remove();\n    });\n    this.prevObject = $l(document);\n    return this;\n  }\n\n  attr(attributeName, value){ //will take two args\n    if (!value){\n      if (attributeName instanceof Object){\n        this.nodeArr.forEach(node => {\n          Object.entries(attributeName).forEach(entry =>{\n            node.setAttribute(entry[0], entry[1]);\n          });\n        });\n      } else {\n        return this.nodeArr[0].getAttribute(attributeName);\n      }\n    } else {\n      this.nodeArr.forEach(node => {\n        node.setAttribute(attributeName, value);\n      });\n    }\n    return this;\n  }\n\n  addClass(classNames){\n    this.nodeArr.forEach(node => {\n      classNames.trim().split(\" \").forEach(className => {\n        node.classList.add(className);\n      });\n    });\n    return this;\n  }\n\n  removeClass(classNames){\n    this.nodeArr.forEach(node => {\n      classNames.trim().split(\" \").forEach(className => {\n        node.classList.remove(className);\n      });\n    });\n    return this;\n  }\n\n  html(htmlString){ //optionally accepts a string\n    if (typeof htmlString === 'string'){\n      this.nodeArr.forEach(node => {\n        node.innerHTML = htmlString;\n      });\n      return this;\n    } else {\n      return this.nodeArr[0].innerHTML;\n    }\n  }\n\n  find(selector){ //find('p')\n    let collection = [];\n    this.nodeArr.forEach(node => {\n      let foundSubNodeList = node.querySelectorAll(selector);\n      let foundSubArr = Array.from(foundSubNodeList);\n      collection = collection.concat(foundSubArr);\n    });\n    const $lFoundCollection = $l(collection);\n    $lFoundCollection.prevObject = this;\n    return $lFoundCollection;\n  }\n\n  children(){\n    const nodes = [];\n    this.nodeArr.forEach(node => {\n      Array.from(node.children).forEach(childNode => {\n        nodes.push(childNode);\n      });\n    });\n    const $lChildNodes = $l(nodes);\n    $lChildNodes.prevObject = this;\n    return $lChildNodes;\n  }\n\n  parent(){\n    const nodes = [];\n    this.nodeArr.forEach(node =>{\n      if (!nodes.includes(node.parentNode)) nodes.push(node.parentNode);\n    });\n    const $lParentNodes = $l(nodes);\n    $lParentNodes.prevObject = this;\n    return $lParentNodes;\n  }\n\n  append(arg){ //takes jQuery lite wrapped obj, HTML el, or a string\n    if (arg instanceof HTMLElement){\n      this.nodeArr.forEach(node => {\n        node.innerHTML += arg.outerHTML;\n      });\n    } else if (typeof arg === 'string'){\n      this.nodeArr.forEach(node => {\n        node.innerHTML += arg;\n      });\n    } else {\n      arg.nodeArr.forEach(argNode =>{\n        this.nodeArr.forEach(node =>{\n          node.innerHTML += argNode.outerHTML;\n        });\n      });\n    }\n    return this;\n  }\n\n  on(eventName, eventHandler){ //eventHandler will be a callback, eventName e.g 'click'\n    this.nodeArr.forEach(node =>{\n      node.addEventListener(eventName, eventHandler);\n      node[`${eventName}Handler`] = eventHandler;\n    });\n    return this;\n  }\n\n  off(eventName){\n    this.nodeArr.forEach(node =>{\n      node.removeEventListener(eventName, node[`${eventName}Handler`]);\n      delete node[`${eventName}Handler`];\n    });\n    return this;\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nwindow.$l = function (arg) {\n  // debugger;\n  let nodeArr;\n  // if (typeof arg === \"string\") { \n  //   // arg is a CSS selector\n  //   nodeList = document.querySelectorAll(arg);\n  //   nodeArr = Array.from(nodeList);\n  // } else if (arg instanceof HTMLElement){\n  //   // arg is an HTMLElement\n  //   // console.log(arg);\n  //   nodeArr = [arg];\n  // } else if (arg instanceof Array){\n  //   nodeArr = arg;\n  // } else if (arg instanceof Node && !(arg instanceof HTMLElement)){\n  //   nodeArr = [arg];\n  // } else if (arg instanceof Function) {\n  //   // arg is a callback to be invoked when document is ready.\n  //   if (document.readyState === \"complete\") {\n  //     arg();\n  //   } else {\n  //     document.addEventListener(\"DOMContentLoaded\", arg);\n  //   }\n  // }\n  // return new DOMNodeCollection(nodeArr);\n\n  if (arg instanceof Function) {\n    nodeArr = [document];\n    return new DOMNodeCollection(nodeArr, arg);\n  } else {\n    if (typeof arg === \"string\") {\n      // arg is a CSS selector\n      nodeList = document.querySelectorAll(arg);\n      nodeArr = Array.from(nodeList);\n    } else if (arg instanceof HTMLElement) {\n      // arg is an HTMLElement\n      nodeArr = [arg];\n    } else if (arg instanceof Array) {\n      nodeArr = arg;\n    } else if (arg instanceof Node && !(arg instanceof HTMLElement)) {\n      nodeArr = [arg];\n    }\n    return new DOMNodeCollection(nodeArr);\n  }\n};\n\n$l.extend = function(obj1, ...restObjs) {\n  restObjs.forEach(obj => {\n    let entries = Object.entries(obj);\n    entries.forEach(entry => {\n      obj1[entry[0]] = entry[1];\n    });\n  });\n\n  return obj1;\n}\n\n// $l.ajax = function(addOptions) {\n//   const options = {\n//     success:,\n//     error: ,\n//     url: ,\n//     method: ,\n//     data: null,\n//     contentType: 'application/x-www-form-urlencoded; charset=UTF-8'\n//   }\n//   $l.extend(options, addOptions);\n// }\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });