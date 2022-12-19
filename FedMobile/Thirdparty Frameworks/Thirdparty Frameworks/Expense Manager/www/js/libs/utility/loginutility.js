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

function removejscssfile(filename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
 }
}
/*
if($.i18n.lng() == 'en-US'){
	//removejscssfile("css/rtl.jquery.mobile-1.3.2.css", "css");
	//removejscssfile("css/rtl.main.css", "css");
	
	loadjscssfile("js/libs/utility/serialize-object.js", "js");
	loadjscssfile("js/libs/backbone/backbone.validation.bootstrap.ext.js", "js");
	loadjscssfile("js/libs/backbone/backbone.validation.validator.ext.js", "js");	
	//loadjscssfile("css/ltr.jquery.mobile-1.3.2.css", "css");
	//loadjscssfile("css/ltr.main.css", "css");

}else if($.i18n.lng() == 'en-AR'){
	//removejscssfile("css/ltr.jquery.mobile-1.3.2.css", "css");
	//removejscssfile("css/ltr.main.css", "css");
	
	loadjscssfile("js/libs/utility/serialize-object.js", "js");
	loadjscssfile("js/libs/backbone/backbone.validation.bootstrap.ext.js", "js");
	loadjscssfile("js/libs/backbone/backbone.validation.validator.ext.js", "js");
	//loadjscssfile("css/rtl.jquery.mobile-1.3.2.css", "css");
	//loadjscssfile("css/rtl.main.css", "css");
}
*/
      			     			