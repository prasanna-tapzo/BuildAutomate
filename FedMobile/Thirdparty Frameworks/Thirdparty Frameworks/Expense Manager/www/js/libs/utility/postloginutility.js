function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

if($.i18n.lng() == 'en-US'){
	loadjscssfile("js/libs/jquery.mobile/ltr.jquery.mobile-1.3.2.js", "js");
	loadjscssfile("js/libs/utility/serialize-object.js", "js");
	loadjscssfile("js/libs/backbone/backbone.validation.bootstrap.ext.js", "js");
	loadjscssfile("css/ltr.jquery.mobile-1.3.2.css", "css");
	loadjscssfile("css/ltr.main.css", "css");

}else if($.i18n.lng() == 'en-AR'){
	loadjscssfile("js/libs/jquery.mobile/rtl.jquery.mobile-1.3.2.js", "js");
	loadjscssfile("js/libs/utility/serialize-object.js", "js");
	loadjscssfile("js/libs/backbone/backbone.validation.bootstrap.ext.js", "js");
	loadjscssfile("css/rtl.jquery.mobile-1.3.2.css", "css");
	loadjscssfile("css/rtl.main.css", "css");
}

      			     			