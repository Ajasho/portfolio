'use strict';function getCookie(a){a=("; "+document.cookie).split("; "+a+"\x3d");if(2==a.length)return a.pop().split(";").shift()}function createCookie(a,d,b){if(b){var c=new Date;c.setTime(c.getTime()+864E5*b);b="; expires\x3d"+c.toGMTString()}else b="";document.cookie=a+"\x3d"+d+b+"; path\x3d/"}
(function(a){$(document).ready(function(){$('.logout-form input[name\x3d"_csrf"]').val(getCookie("XSRF-TOKEN"));a.userInfoLoader.done(function(a){var b=a.login?a.login:"anonymous",b=b+(a.domain?"@"+a.domain:"");$(".logged-user-name").text(b)}).fail(function(a){console.warn(a);$(".logged-user-name").text("---")})})})(window.onlinehelp=window.onlinehelp||{});