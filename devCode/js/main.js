window.$ = window.jQuery = require('jquery');
var sayHello = require('./say_hello');
sayHello();
$(function(){ //Short hand for document ready
  console.log("testing jquery");
});
