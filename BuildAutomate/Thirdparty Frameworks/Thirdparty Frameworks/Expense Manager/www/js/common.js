var mobile_device_id = "";
var els = new EncryptedLocalStorage('secret'); 
els.set("device_id",mobile_device_id);

 
function setDeviceUUID(deviceUUID){
    mobile_device_id = deviceUUID;
}

function setSessionID(sessionID) {
    els.set("sessionID", sessionID);
}

/***************  common layout handling scripts *********************/
$(".shownav").click(function(e) {
        e.preventDefault();
        $("#appwrapper").toggleClass("mnuactive");
        if($("#appwrapper").hasClass("mnuactive")){
            $(".subnav").after("<div class='subnav-overlay'></div>");
        }else {
            $(".subnav-overlay").remove();
        }
    });
/************** on click on the submenu hide the panel in portrait mode *************/

    $("body").on("click",".subnav li a,.subnav li .btn,.subnav-overlay",function(){
        if($("#appwrapper").hasClass("mnuactive")){
            $("#appwrapper").toggleClass("mnuactive");
            $(".subnav-overlay").remove();
        }
    });
  /***************************cursor movement block for alphanumeric check*****************/
    function checkCharNum(o){
    	var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 "; 
    	var orignalValue=o;
    		for (var i=0;i<orignalValue.length;i++){
    			var atchar = orignalValue[i];
    	 		if(allowedTest.indexOf(atchar) != -1){	
    	 			orignalValue=o.replace(/([^0-9A-Za-z])/g,"");
    	 		}else{
    	 			var changeTest =orignalValue.substr(0,i);
    	 			orignalValue=changeTest;
    	 		}
    	 	}
    		return orignalValue;
    	}
/***************************cursor movement block for alphabets check*****************/
    /*function checkChar(o){
    	var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "; 
    	var orignalValue=o;
    		for (var i=0;i<orignalValue.length;i++){
    			var atchar = orignalValue[i];
    	 		if(allowedTest.indexOf(atchar) != -1){	
    	 			orignalValue=o.replace(/([^0-9A-Za-z])/g,"");
    	 		}else{
    	 			var changeTest =orignalValue.substr(0,i);
    	 			orignalValue=changeTest;
    	 		}
    	 	}
    		return orignalValue;
    	}*/
/***************************cursor movement block for number check*****************/
    function checkNum(o){
    	var allowedTest ="1234567890"; 
    	var orignalValue=o;
    		for (var i=0;i<orignalValue.length;i++){
    			var atchar = orignalValue[i];
    	 		if(allowedTest.indexOf(atchar) != -1){	
    	 			orignalValue=o.replace(/([^0-9A-Za-z])/g,"");
    	 		}else{
    	 			var changeTest =orignalValue.substr(0,i);
    	 			orignalValue=changeTest;
    	 		}
    	 	}
    		return orignalValue;
    }
/***************************cursor movement block for email check*****************/
/*    function checkEmail(o){
      var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@._-"; 
    	var orignalValue=o;
    		for (var i=0;i<orignalValue.length;i++){
    			var atchar = orignalValue[i];
    	 		if(allowedTest.indexOf(atchar) != -1){	
    	 			orignalValue=o.replace(/([^0-9A-Za-z])/g,"");
    	 		}else{
    	 			var changeTest =orignalValue.substr(0,i);
    	 			orignalValue=changeTest;
    	 		}
    	 	}
    		return orignalValue;
    }*/


  /*   **************  common layout handling scripts ********************
 	$("body").on("click","#mnutoggle,.subnav-overlay",function(e) {
    	console.log("Toggg");
        e.preventDefault();
        $("#appwrapper").toggleClass("mnuactive");
        if($("#appwrapper").hasClass("mnuactive")){
        	console.log("Toggg IF");
            $(".subnav").after("<div class='subnav-overlay'></div>");
        }else {
        	console.log("Toggg ELSE");
            $(".subnav-overlay").remove();
        }
        console.log("Toggg END");
       $("#mnutoggle").delegateEvents();
    });
*/


/***************************decimal <sup>*******************/
$(".decim").each(function(){
     var inner = $(this).html();
     var firstPart = inner.substring(0, (inner.length-2));
     var secondPart = inner.substring((inner.length-2), inner.length);
     $(this).html(firstPart);
     $("<sup/>").css("font-size", "17px").html(secondPart).appendTo($(this));
});

/**********************tab*****************************/
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
});


/* ******************** Checkbox  **********************/

$(".check-hidden:checked").parents(".checkinput").addClass("active");
     $("body").on("click",".check-hidden",function(e){
            e.stopPropagation();
      	if($(this).is(':checked'))
      		{
            $(this).parents(".checkinput").addClass("active");
      		}
        else{
             $(this).parents(".checkinput").removeClass("active");
            }
      });

    
    
/***************  Check Cordova App *********************/

function isCordovaApp(){
   	var isCordovaApp = !!window.cordova;
   	return isCordovaApp;
}
/************************** Show and Hide Spinner**************************************************/
function showSpinner()
{
	$('.spinner').show();
}
function hideSpinner(){
	$('.spinner').hide();
}

/************************** input lenth manager**************************************************/

(function ($){
    $.fn.inputlength=function(){
      // options=$.extend({},$.fn.inputlenght.add,options); // Setting default height for the component
       return this.each(function(){
         var makelength=$(this).attr("maxlength");
         $(this).on('keyup',function(e){
            if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
              var values=$(this).val();
              values=values.substring(0, values.length - 1);
               $(this).val(values).focus();
              e.preventDefault();
            }
         })

       });
    };
}(jQuery));
$('.lenthcontrol').inputlength();


/************************** Mask Password**************************************************/

(function ($){
    $.fn.masknumpwd=function(){
       return this.each(function(){
         var that=$(this);
          var makelength=that.attr("maxlength");
         var maskPassword = that.attr("placeholder");

         if(!that.parent("div").hasClass("numpass")){
              var odiv='<div class="numpass"></div>'
               that.wrap(odiv);
               that.parent(".numpass")/*.css({"width":that.outerWidth(),"height":that.outerHeight()})*/.on("click",function(){
               that.focus();
               })
         }
         that.parents(".numpass").attr("data-content",maskPassword)// intially showing placeholder text
         if(that.parents(".numpass").attr("data-content") ==that.attr("placeholder")){
            that.parents(".numpass").css({"color":"#ccc"});
         }else{
             that.parents(".numpass").css({"color":"#555"});
         }
         that.parents("form").on('reset',function(){
            that.parents(".numpass").attr("data-content","");
        })

        that.on("focus",function(){
        if(that.parents(".numpass").attr("data-content") ==that.attr("placeholder")){
              that.parents(".numpass").attr("data-content","");

         }
        })
        that.on('blur',function(){
           if(that.parents(".numpass").attr("data-content") ==""){
             that.parents(".numpass").attr("data-content",that.attr("placeholder"));
              that.parents(".numpass").css({"color":"#ccc"});
             }
        })

        that.on("keyup",function(e){
            var ln="<span> &bull; </span>";
            that.parents(".numpass").attr("data-content",
                 function(){
                    var i = 0;
                     maskPassword="";
                     //alert(e.keyCode);
                      while (i < that.val().length) {
                        if(that.val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
                            var values=that.val();
                            values=values.substring(0, values.length - 1);
                             that.val(values).focus();
                            e.preventDefault();
                          }else{
                             maskPassword += $(ln).html();
                            i++;
                            that.parents(".numpass").css({"color":"#555"})
                          }
                      }
                      return maskPassword
                  }
                );
            });

       });
    };
}(jQuery));
$(".masknumpwd").masknumpwd();


/************************** Mask Password OTP**************************************************/

(function ($){
    $.fn.masknumpwdotp=function(){
        return this.each(function(){
     	   console.log("=***=");
          var that=$(this);
           var makelength=that.attr("maxlength");
          var maskPassword = that.attr("placeholder");

          if(!that.parent("div").hasClass("numpass")){
               var odiv='<div class="numpass"></div>'
                that.wrap(odiv);
                that.parent(".numpass")/*.css({"width":that.outerWidth(),"height":that.outerHeight()})*/.on("click",function(){
                that.focus();
                })
          }
          that.parents(".numpass").attr("data-content",maskPassword)// intially showing placeholder text
          if(that.parents(".numpass").attr("data-content") ==that.attr("placeholder")){
             that.parents(".numpass").css({"color":"#ccc"});
          }else{
              that.parents(".numpass").css({"color":"#555"});
          }
          that.parents("form").on('reset',function(){
             that.parents(".numpass").attr("data-content","");
         })

         that.on("focus",function(){
         if(that.parents(".numpass").attr("data-content") ==that.attr("placeholder")){
               that.parents(".numpass").attr("data-content","");

          }
         })
         that.on('blur',function(){
            if(that.parents(".numpass").attr("data-content") ==""){
              that.parents(".numpass").attr("data-content",that.attr("placeholder"));
               that.parents(".numpass").css({"color":"#ccc"});
              }
         })

         that.on("keyup",function(e){
             var ln="<span> &bull; </span>";
             that.parents(".numpass").attr("data-content",
                  function(){
                     var i = 0;
                      maskPassword="";
                      //alert(e.keyCode);
                       while (i < that.val().length) {
                         if(that.val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
                             var values=that.val();
                             values=values.substring(0, values.length - 1);
                              that.val(values).focus();
                             e.preventDefault();
                           }else{
                              maskPassword += $(ln).html();
                             i++;
                             that.parents(".numpass").css({"color":"#555"})
                           }
                       }
                       return maskPassword
                   }
                 );
             });

        });
     };
}(jQuery));
$(".masknumpwdotp").masknumpwdotp();


/************************ fix for login button alignment ***************/
$( document ).ready(function(){
     $(window).on("resize",function(){
       return aligner();
     });
})
  function aligner(){
  var containerWidth=$(window).width();
  var containerHeight=$(window).height();
  var quickLinkContainerWidth=$(".quickLinks").width();
  var quickLinkContainerHeight=$(".quickLinks").height();
  $( ".loginbg .unlock" ).css({top: quickLinkContainerHeight/2-32.5, left: quickLinkContainerWidth/2-32.5}).show();
  $( ".loginbg .loginButton" ).css({ top: containerHeight/2-40, left:containerWidth/2-40}).show();
 }
/*********************** scroll page on input focus ***************/
(function ($){
   $.fn.focusscroll=function(){
      var container = $('.content') //container element to be scrolled, contains input
      return this.each(function(){
        var that=$(this);
        that.on("click",function(){
               scrollTo = that;
               setTimeout(function() {
                   container.animate({scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()-container.height()/2+50})
               },500);
        });
      });
   };
}(jQuery));
$(':input[type="text"], :input[type="number"], :input[type="password"]').focusscroll();

/*********************** To get number of days in a month***************/
function numberOfDays(year, month) {
    var d = new Date(year, month, 0);
    //console.log(" return",d.getDate());
    return d.getDate();
}
/*********************** To get number of days in a month ***************/

/*********************** set Date - source date format - yyyymmdd ***************/
function setTxnDate(dateparam){
	var yr = parseInt(dateparam.substring(0,4));
	var mn = parseInt(dateparam.substring(4,6)-1);
	var dt = parseInt(dateparam.substring(6,8));
	/*var dte = new Date();
	console.log("dte000 ",dte);
	dte.setDate(dt);
	dte.setMonth(mn);
	dte.setYear(yr);
	console.log("dte",dte);*/
	if (yr < 100) {
        yr += 2000;
    }
	var dte = new Date(yr,mn,dt);
	//console.log("dte",dte);
	return dte;
}

/*********************** get Month name ***************/
function getMonthNameShrt(mon,type){
	var dtMonth ="";
	mon = mon+"";
	switch(mon)
	{
	    case '1':
	    case '01':
	        dtMonth = (type=='F') ? 'January' : 'Jan';
	        break;
	    case '2':
	    case '02':
	        dtMonth = (type=='F') ? 'February' : 'Feb';
	        break;
	    case '3':
	    case '03':
	        dtMonth = (type=='F') ? 'March' : 'Mar';
	        break;
	    case '4':
	    case '04':
	        dtMonth = (type=='F') ? 'April' : 'Apr';
	        break;
	    case '5':
	    case '05':
	        dtMonth = (type=='F') ? 'May' : 'May';
	        break;
	    case '6':
	    case '06':
	        dtMonth = (type=='F') ? 'June' : 'Jun';
	        break;
	    case '7':
	    case '07':
	        dtMonth = (type=='F') ? 'July' : 'Jul';
	        break;
	    case '8':
	    case '08':
	        dtMonth = (type=='F') ? 'August' : 'Aug';
	        break;
	    case '9':
	    case '09':
	        dtMonth = (type=='F') ? 'September' : 'Sep';
	        break;
	    case '10':
	        dtMonth = (type=='F') ? 'October' : 'Oct';
	        break;
	    case '11':
	        dtMonth = (type=='F') ? 'November' : 'Nov';
	        break;
	    case '12':
	        dtMonth = (type=='F') ? 'December' : 'Dec';
	        break;
	}
	return dtMonth;
}
/*********************** get Month Numer ***************/
function getMonthNumber(mon){
	var dtMonth ="";
	mon = mon.toUpperCase();
	switch(mon)
	{
	    case 'JAN':
	        dtMonth = "1";
	        break;
	    case 'FEB':
	        dtMonth = "2";
	        break;
	    case 'MAR':
	        dtMonth = "3";
	        break;
	    case 'APR':
	        dtMonth = "4";
	        break;
	    case 'MAY':
	        dtMonth = "5";
	        break;
	    case 'JUN':
	        dtMonth = "6";
	        break;
	    case 'JUL':
	        dtMonth = "7";
	        break;
	    case 'AUG':
	        dtMonth = "8";
	        break;
	    case 'SEP':
	        dtMonth = "9";
	        break;
	    case 'OCT':
	        dtMonth = "10";
	        break;
	    case 'NOV':
	        dtMonth = "11";
	        break;
	    case 'DEC':
	        dtMonth = "12";
	        break;
	}
	return dtMonth;
}
/**********************************Getting Contact *******************************************/
function getContact(){
	navigator.contacts.pickContact(function(contact){
				console.log('The following contact has been selected:' + JSON.stringify(contact));
				var phoneNo="39745092";//contact.phoneNumbers[0].value;
				alert(phoneNo);
				els.set("contactNo",phoneNo);
				return phoneNo;
				
			},function(err){
				console.log('Error: ' + err);
			});
		return phoneNo;
}

/*********************** Get (Week) Day ***************/

function getWeekDay(dateparam)
{
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	var dte = setTxnDate(dateparam);
	return weekday[dte.getDay()];
}

/*********************** Get Day ***************/
function getTxnDay(dateparam){
	var day = setTxnDate(dateparam);
	day = parseInt(day.getDay());
	day =getWeekDay(day);
	return day;
}

/*********************** Get Date ***************/
function getTxnDate(dateparam){
	var dte = setTxnDate(dateparam);
	dte = parseInt(dte.getDate());
	return dte;
}
/*********************** Get Month ***************/
function getTxnMonth(dateparam){
	var mon = setTxnDate(dateparam);
	mon = parseInt(mon.getMonth())+1;
	
	var mont=mon+"";
	if(mon<10){
		mont="0"+mon;
	}
	
	return mont;
}
/*********************** Get month Name ***************/
function getTxnMonthName(dateparam,type){
	var mon = setTxnDate(dateparam);
	mon = parseInt(mon.getMonth())+1;
	mon = getMonthNameShrt(mon,type);
	return mon;
}


/*********************** Get Year  ***************/
function getTxnYear(dateparam,type){
	var yer = setTxnDate(dateparam);
	yer = parseInt(yer.getYear());
	return yer+1900;
}


/*********************** Get Today format -  yyyymmdd ***************/
function getToday(){
	var dte= new Date();
	var d = dte.getDate();
	var m = dte.getMonth();
	var y = dte.getYear();
	
	if(d<10)
		d = "0"+d;
	
	m=m+1;
	if(m<10)
		m = "0"+m;
	else
		m = m+"";
	
	y = y+1900;
	return y+""+m+""+d;
}


/*********************** Get Today format -  Mon dd, yyyy ***************/

function getDatelineToday(){
	var dte= new Date();
	var d = dte.getDate();
	var m = dte.getMonth();
	var y = dte.getYear();
	
	if(d<10)
		d = "0"+d;
	
	m=m+1;
	if(m<10)
		m = "0"+m;
	else
		m = m+"";
	
	y = y+1900;
	
	var mname = getMonthNameShrt(m);
	
	var formatdate = mname+" "+d+", "+y;
	return formatdate;
}


//--------------------------------File Download & Viewer Common Code ---------------- //

function fileDownLoadAndViewer(uri,params,type,access_token){
	// type =1 for pdf type=2 for xls
	var fs;
    var xhr = new XMLHttpRequest(),
	blob,
	fileReader = new FileReader(); 
	showSpinner();
	
    xhr.open("POST", uri, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("access_token", access_token);
    xhr.setRequestHeader("Content-length", params.length);
         // Set the responseType to arraybuffer. "blob" is an option too, rendering manual Blob creation unnecessary, but the support for "blob" is not widespread enough yet
   xhr.responseType = "arraybuffer";
    var fileName;
    xhr.onreadystatechange = function() {
		  if(this.readyState == 2) {
		    var text=xhr.getResponseHeader("Content-Disposition");
		     fileName =text.substr(text.indexOf("filename=")+10) ;
		  
		  }
		}  
    xhr.addEventListener("load", function () {	    	
	if (xhr.status === 200) {
        // Create a blob from the response
		var appType;
		if(type == 1) {
			appType ="application/pdf";
			fileName =fileName.substr(0,fileName.indexOf(".pdf")+4);
			//fileName ="Test.pdf";
		}
		else{
			appType ="application/vnd.ms-excel";
			fileName =fileName.substr(0,fileName.indexOf(".xls")+4);
			//fileName ="Test.xls";
		}
        try{
					
			blob = new Blob([xhr.response], {type: appType});
        }
        catch(e){
        		
        	var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        		
        	if (e.name == 'TypeError' && BlobBuilder) {
        	    var bb = new BlobBuilder();
        	    bb.append(xhr.response);
        	    blob = bb.getBlob(appType);
        	           
        	}
        }
		
        var URL =window.URL || window.webkitURL;
			 
			// onload needed since Google Chrome doesn't support addEventListener for FileReader
		fileReader.onload = function (evt) {
			// Read out file contents as a Data URL
			var result = evt.target.result;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

			function gotFS(fileSystem) {
				fs=fileSystem;

				fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, fail);
			}
			function gotFileEntry(fileEntry) {
				fileEntry.createWriter(gotFileWriter, fail);
			}
			function gotFileWriter(writer) {
				writer.seek(0);
				writer.write(blob);
				writer.onwriteend = function(evt) {
					hideSpinner();
					cordova.plugins.fileOpener2.open(
						fs.root.toURL() +"/"+fileName, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Download/starwars.pdf
						appType, //mime type
						{ 
						error : function(e) { 
							console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
						},
						success : function () {
							console.log('file opened successfully'); 
						}
						}
					);
				}
			}
			function fail(error) {
				hideSpinner();       
			}	          
        };
         // Load blob as Data URL
        fileReader.readAsDataURL(blob);
	}
	}, false);
		 
	xhr.addEventListener("load", function () {
		hideSpinner();
	}, false);
	// Send XHR
	xhr.send(params); 
         
   
}
//--------------------- -------------------//
require(['jquery','libs/aes/aes','libs/aes/pbkdf2','libs/aes/AesUtil'],
        function ($,aes,pbkdf2,aesutil) {
	Encrypt(this);
});


function EncryptMPIN(plainText)
{
	var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
	var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";

	var keySize = 128;
	var deviceid;
	deviceid="3DD55C52-CEF7-45A0-ADD4-1A00AB0D2585";
	var iterationCount = 1024;
	var passPhrase = "";
	if(deviceid.length>=16){
		passPhrase=deviceid.substring(0, 16);
	}else{
		var len = deviceid.length;
		var paddingval = "";
		var balLen = 16 - len;
		for(var i=0;i<balLen;i++){
			paddingval += "0";
		}
		passPhrase = deviceid+paddingval;
	}
	passPhrase += "246809"; 
	var encrypt="";
	var aesUtil = new AesUtil(keySize, iterationCount);
	encrypt = aesUtil.encrypt(salt, iv, passPhrase, plainText);
	return encrypt;	    
}

function Encrypt(plainText)
{
	//var AesUtil = aesjsfile('libs/aes/aesutil',"AesUtil");
	
	//var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
	//var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
	var iv = "F27D5C9927726BCEFE7510B1BDD3D137";
	var salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";

	var keySize = 128;
	var deviceid;
	//deviceid= "2013123117066157344037699126280";
	deviceid=getDeviceId();
	//els.set('device_id',deviceid);
	//var keySize = deviceid;
	var iterationCount = 1024;
	//var passPhrase = "aesalgoisbestbes";
	var passPhrase = "";
	if(deviceid.length>=16){
		passPhrase=deviceid.substring(0, 16);
	}else{
		var len = deviceid.length;
		var paddingval = "";
		var balLen = 16 - len;
		for(var i=0;i<balLen;i++){
			paddingval += "0";
		}
		passPhrase = deviceid+paddingval;
	}
	var encrypt="";
	//passPhrase="AAAAAAAAAAAAAAAA";
	 var aesUtil = new AesUtil(keySize, iterationCount);
	 encrypt = aesUtil.encrypt(salt, iv, 'jfsformsubmission', plainText);
	 //"AAAAAAAAAAAAAAAA" has to be replaced with passPhrase
	console.log(encrypt);
	//alert(encrypt);
	return encrypt;	    
}
/********************** sha512 ***************/
require(['js/libs/security/crypto-js/sha512.js'],
        function (sha512) {
	SHAEncrypt(this);
});
function SHAEncrypt(plainText)
{
	var tenantId, groupId; 
	var	currentpin = els.get("currentpin");
	tenantId = '50000';
	groupId =  '40000';
	var cusId=els.get("customerID");
	salt = "${salt}";
		var plainText = cusId+plainText+tenantId+groupId;
		var hash = CryptoJS.SHA512(plainText);
		for (i = 1; i < 1024 ; i++){
			hash = CryptoJS.SHA512(hash);
		}
	 	localStorage.setItem('currentpin',hash);
	 	return hash;
}

/*********************** getDeviceId() ***************/

function getDeviceId(){
	var device_id="";
		device_id = mobile_device_id;
	return device_id;
}

/*********************** checkAmount() will check if amount does not starts with 0. ***************/

function checkAmount(value){
	console.log("val",value);
	var val = value.toString();
	console.log("val",val);

	var tempval = val.substring(0,1);	
	var tem=val.substring(1,2);	
	var temp=val.indexOf(".");
	console.log("temp",temp);

	if(temp!=-1){
		return val;
	}
	else{
		value=val+".00"
		return value;
	}
}
/***Instead of format number code **/
function numberWithCommas(x) {

    var parts = x.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");

}
function numberWithCommasstr(x) {
	if(isNaN(x)){
		return x;
	}
	x=x.toString();
	var afterPoint = '';
	if(x.indexOf('.') > 0)
	   afterPoint = x.substring(x.indexOf('.'),x.length);
	x = parseFloat(x);//Math.floor(x);
	x=x.toFixed(2);
	x=x.toString();
	var dtval = x.split(".");
	x=dtval[0];
	var lastThree = x.substring(x.length-3);
	var otherNumbers = x.substring(0,x.length-3);
	if(otherNumbers != '')
		lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree +"."+ dtval[1];


	if(afterPoint!=-1){
		return res;
	}
	else{
		//res=res+".00"
		return res;
	}
	return res;
}
function numberWithCommasWithoutZero(x) {
	if(isNaN(x)){
		return x;
	}
	x=x.toString();
	var afterPoint = '';
	if(x.indexOf('.') > 0)
	   afterPoint = x.substring(x.indexOf('.'),x.length);
	x = parseFloat(x);//Math.floor(x);
	x=x.toFixed(2);
	x=x.toString();
	var dtval = x.split(".");
	x=dtval[0];
	var lastThree = x.substring(x.length-3);
	var otherNumbers = x.substring(0,x.length-3);
	if(otherNumbers != '' && otherNumbers != '-')
		lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;// +"."+ dtval[1];


	if(afterPoint!=-1){
		return res;
	}
	else{
		//res=res+".00"
		return res;
	}
	return res;
}
function legentAmountFormat(x) {
	if(isNaN(x)){
		return x;
	}
	x=x.toString();
	var afterPoint = '';
	if(x.indexOf('.') > 0)
	   afterPoint = x.substring(x.indexOf('.'),x.length);
	x = parseFloat(x);//Math.floor(x);
	x=x.toFixed(2);
	x=x.toString();
	var dtval = x.split(".");
	x=dtval[0];
	var lastThree = x.substring(x.length-3);
	var otherNumbers = x.substring(0,x.length-3);
	if(otherNumbers != '')
		lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;// +"."+ dtval[1];


	if(afterPoint!=-1){
		return res;
	}
	else{
		//res=res+".00"
		return res;
	}
	return res;
}
/***Instead of format number code **/
/*=============== Callback function of geolocation error===================*/
function onGeoLocationError (error){
	hideSpinner();
	// check if the device is android/ios because in android phonegap geolocation
	//plugin not installed correctly.so it takes HTML5 geolocation
	var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
	var permissionDenied,positionUnavail,timout;
    if(iOS){ // check only for ios
		permissionDenied = PositionError.PERMISSION_DENIED;
		positionUnavail =  PositionError.POSITION_UNAVAILABLE;
		timout = PositionError.TIMEOUT;
	}else{
		permissionDenied = error.PERMISSION_DENIED;
		console.log(permissionDenied);
		positionUnavail =  error.POSITION_UNAVAILABLE;
		console.log(positionUnavail);
		timout = error.TIMEOUT;
		console.log(timout);
	}
	if(error.code == positionUnavail) {
			navigator.notification.alert(
				$.i18n.t("app.login.general.locationAccessMessage"),  // message
	            function(){
			var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
	                if(!iOS){ // check only for ios
	                	//navigator.notification.openSetting();
						navigator.notification.alert(
                			    "openSetting",
                	            function(){
								els.set("Locationenableproximity","TRUE");
								console.log("Call Back...");
               					},
                	            "",
                	            ""
                	    );
	                }
				},         // callback
	            $.i18n.t("app.login.general.locationAccessTitle"),            // title
	            $.i18n.t("app.login.general.okButton")                  // buttonName
	        );
	}else if(error.code == permissionDenied ){
		navigator.notification.alert(
			    "User denied the request for Geolocation.",// message
				$.i18n.t("app.login.general.okButton")                  // buttonName
        );
		//alert( "User denied the request for Geolocation.");
	}else  if(error.code == timout ){
		navigator.notification.alert(
				"The request to get user location timed out.", // message
				 $.i18n.t("app.login.general.okButton")                  // buttonName
        );
	//	alert("The request to get user location timed out.");
	}else{
		navigator.notification.alert(
		  		"An unknown error occurred."
		  );
		//alert("An unknown error occurred." );
	}
}

/*===================================Stop SMS receiver================*/
//only for android mobile
function stopSMSListening(){
	var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
	if(!iOS){
		try{
			window.smsreceiver.stopListening(
					function(result) {     }, 
					function(error) {   }
			);
		}catch(e){
			
		}
		
	}	
}
/*===================================Stop SMS receiver================*/


/*===================================Disable copy paste option================*/
// as per the bank says enable copy paste option accross the application(karthika)
/*var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
if(iOS){*/
	$("input,textarea").on("cut copy paste",function(e){
	  e.preventDefault();
	});
/*}*/
/*===================================Disable copy paste option================*/

/*=============================set anf get value from local stroage===============*/

/* Set value into local storage  */
function setintoStorage(key,val){
	window.localStorage.setItem(key,val);
}


/* Get value from local storage  */
function getfromStorage(key){
	var value = window.localStorage.getItem(key);
	return value;
}
/*=============================set anf get value from local stroage===============*/


/*****Mahadeva Reddy 24-10-2016*****/ 
/* Get Num of Months for OpenDeposit  */
function getDays(){
	var monthDays = [];
	var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var days =  new Date(year,month+1, 0).getDate();

    for (var i = 0; i <= days; i++) {
    	if (i != 0 ) {
    		monthDays.push(i);
    	}
    }
    return monthDays;
}

/* Get calculate Months to Days for OpenDeposit  */
function calculateMonthDays(m){
	var totalDays=0;
    var now = new Date();
    var sixMonthsFromNow = new Date(now.setMonth(now.getMonth() + m));
    var d2 = sixMonthsFromNow.getDate();
	var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var date = new Date().getDate();
    var days =  new Date(year,month+1, 0).getDate();
    var d = days-date;
    var d3= d+d2;
    var dd=0;
	for(i=0;i<=m;i++){
	   var month1 = new Date().getMonth();
	   var year1 = new Date().getFullYear();
	   var days =  new Date(year1,month1+(i+1), 0).getDate();
	   dd = dd+days;
	}
    return t = dd-d3;
}

/* filterDate for Review final call for OpenDeposit  */
function filterDate(date){
	var year = date.substring(0,4);
	var month = date.substring(4,6);
	var Dt = date.substring(6,8);
	return Dt+"/"+month+"/"+year;
}


function fixFloatValues(amount){
	var amt = parseFloat(amount).toFixed();
    return amt.length;
}

/*function iosBackShow(){
	$("#iosBackButton").show();
}
function iosBackHide(){
	$("#iosBackButton").hide();
}*/

    /*function iosBackButton(event){
		   				 console.log("=========== IOS back button ===========",els.get("errback"));

		                
		                 if($("#appwrapper").hasClass("mnuactive")){
		                    console.log("Menu Active.......");
		                    $("#appwrapper").toggleClass("mnuactive");
		                    $(".subnav-overlay").remove();
		                 }else{
		                     console.log("=========else 2======");
		                var url = window.location.href;
		                var currentPage=els.get("currentPage");
		                if(url.lastIndexOf('#/login')!=-1 || url.lastIndexOf('#/newregistration')!=-1 || url.lastIndexOf('#/wealth')!=-1
		                        || url.lastIndexOf('#/gotoderegisterreview')!=-1 || url.lastIndexOf('#/loanpaymentsuccess')!=-1 
		                        || url.lastIndexOf('#/janaCardTransferSuccess')!=-1 || url.lastIndexOf('#/mobPayeeAccountTransferSuccess')!=-1 
		                        || url.lastIndexOf('#/otherAccountTransferSuccess')!=-1 || url.lastIndexOf('#/janaAcctTransferSuccess')!=-1 
		                        || url.lastIndexOf('#/ownaccttransfersuccess')!=-1|| url.lastIndexOf('#/transfer')!=-1|| url.lastIndexOf('#/services')!=-1 
		                        || url.lastIndexOf('#/rewards')!=-1|| url.lastIndexOf('#/settings')!=-1
		                        || url.lastIndexOf('#/stopchequerequestreview')!=-1|| url.lastIndexOf('#/rescheduleloanreview')!=-1
		                        || url.lastIndexOf('#/offersavingsreview')!=-1|| url.lastIndexOf('#/chequestatusreview')!=-1
		                        || url.lastIndexOf('#/kycchangesreview')!=-1|| url.lastIndexOf('#/changecardpinreview')!=-1
		                        || url.lastIndexOf('#/blockcardreview')!=-1|| url.lastIndexOf('#/generatemmidreview')!=-1
		                || url.lastIndexOf('#/standInstEditSuccess')!=-1 || url.lastIndexOf('#/standInstOwnAccSuccess')!=-1
		                || url.lastIndexOf('#/standInstJanaSuccess')!=-1 || url.lastIndexOf('#/standInstOtherBankSuccess')!=-1
		                || url.lastIndexOf('#/standInstChoose')!=-1 || url.lastIndexOf('#/openfixeddepositreview')!=-1 
		                || url.lastIndexOf('#/openrecurringdepositreview')!=-1 || url.lastIndexOf('#/closerdreview')!=-1 
		                 || url.lastIndexOf('#/closefixeddepositreview')!=-1 ){


							                 	if( url.lastIndexOf('#/gotoderegisterreview')!=-1  )
					                            {
					                                Backbone.history.navigate("#/expandico");
					                            }
					                            if( url.lastIndexOf('#/loanpaymentsuccess')!=-1 )
					                            {
					                              Backbone.history.navigate("#/wealth");
					                            }
					                            if( 
					                                url.lastIndexOf('#/janaCardTransferSuccess')!=-1 || 
					                                url.lastIndexOf('#/mobPayeeAccountTransferSuccess')!=-1 ||
					                                url.lastIndexOf('#/otherAccountTransferSuccess')!=-1 ||
					                                url.lastIndexOf('#/janaAcctTransferSuccess')!=-1 ||
					                                url.lastIndexOf('#/ownaccttransfersuccess')!=-1 ||
					                                url.lastIndexOf('#/standInstEditSuccess')!=-1 ||
					                                url.lastIndexOf('#/standInstOwnAccSuccess')!=-1 ||
					                                url.lastIndexOf('#/standInstJanaSuccess')!=-1 ||
					                                url.lastIndexOf('#/standInstOtherBankSuccess')!=-1 ||
					                                url.lastIndexOf('#/standInstChoose')!=-1
					                              )
					                            {
					                              Backbone.history.navigate("#/transfer");
					                            }

					                            if( 
					                                url.lastIndexOf('#/stopchequerequestreview')!=-1 ||
					                                url.lastIndexOf('#/rescheduleloanreview')!=-1 ||
					                                url.lastIndexOf('#/offersavingsreview')!=-1 ||
					                                url.lastIndexOf('#/chequestatusreview')!=-1 ||
					                                url.lastIndexOf('#/kycchangesreview')!=-1 ||
					                                url.lastIndexOf('#/changecardpinreview')!=-1 ||
					                                url.lastIndexOf('#/blockcardreview')!=-1 ||
					                                url.lastIndexOf('#/generatemmidreview')!=-1 
					                              )
					                            {
					                              Backbone.history.navigate("#/services");
					                            }

					                            if( 
					                                url.lastIndexOf('#/openfixeddepositreview')!=-1 ||
					                                url.lastIndexOf('#/openrecurringdepositreview')!=-1 ||
					                                url.lastIndexOf('#/closerdreview')!=-1 ||
					                                url.lastIndexOf('#/closefixeddepositreview')!=-1
					                              )
					                            {
					                              Backbone.history.navigate("#/depositoffers");
					                            }

		                    
		                }
		                // exit from the in home page
		                else if(url.lastIndexOf('#/backtohome')!= -1 || url.lastIndexOf('#')== -1 || url.lastIndexOf('#') == url.length-1){
		                    navigator.app.exitApp();
		                }
		                else{            
		                    event.preventDefault();

		                    console.log("page naigation stopped here =-=------------");

		                    if(currentPage != "transferConfirm" ){ 

		                    	console.log('*********************');
		                    	var iosNavigation = els.get("iosNavigation");
								Backbone.history.navigate("#/"+iosNavigation);
								//navigator.app.backHistory();
		                        console.log('*********************');

		                        url = window.location.href;
		                        if(url.lastIndexOf('#/registration') != -1 || url.lastIndexOf('#/offers') != -1 || url.lastIndexOf('#/tools') != -1 || url.lastIndexOf('#/contactus') != -1 || url.lastIndexOf('#/locator') != -1) {
		                            window.history.back();
		                        }
		                      }                   
		                    }
		                 }  
		            console.log("=========== IOS back button ===========",els.get("errback"));

    }*/




function onlyAlphabets(e,t) {
    try {
         if (window.event) {
             var charCode = window.event.keyCode;
         }
         else if (e) {
             var charCode = e.which;
         }
         else { return true; }
         if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)){
             return true;
            }else if (charCode==8 || charCode==0 || charCode==32) {
              return true;
            }else
             return false;
     }
     catch (err) {
         console.log(err.Description);
     }
}
function getPhoneNum(phoneNo){
	var contact = phoneNo.replace(/\s+/g, '');
    if(contact.match(/^(\+91-|\+91|\91|0)?\d{10}$/)){
	     var mobileNo;
	     if(contact.indexOf('+91') > -1)
	     {
	       mobileNo = contact.substring(3);
	       if(contact.indexOf('-') > -1){
	         mobileNo = mobileNo.substring(1);
	       }
	     }else if(contact.indexOf('91') > -1){
	       mobileNo = contact.substring(2);
	     }else if(contact.indexOf('0') > -1){
	       mobileNo = contact.substring(1);
	     }
	     return mobileNo;
	}
}

function openDepositDateFormat(date){
   var month = new Date().getMonth();
   var year = new Date().getFullYear();
   var date = new Date().getDate();
   var new_Month;
   var new_Date;
   if(month < 9){
   	 month = (parseInt(month)+1);
     new_Month = "0"+month;
   }else{
     new_Month = (parseInt(month)+1);
   }
   if(date < 10){
     new_Date = "0"+date;
   }else{
     new_Date = date;
   }
   return new_Date+"/"+new_Month+"/"+year;
}

/*====================*OpenDeposits Address Field Validation*===========================*/

(function ($){
    $.fn.inputlengthAddressValidate=function(){
      return this.each(function(){
          var makelength=$(this).attr("maxlength");
          $(this).on('keypress',function(e){
          //$(this).val($(this).val().replace(/([^A-Za-z\s])/g,""));
          var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890./#,- "; 
          //var allowedTest =/^[a-zA-Z0-9 ]*$/;
          var notallowed ="!@#$%^&*()_+=-{};:\"?><|\/,'[].";
          var notallowednumber ="0123456789";
          var orignalValue=$(this).val();

           for (var i=0;i< orignalValue.length;i++){
            var atchar = orignalValue[i];
            if(allowedTest.indexOf(atchar) != -1){  
            }else{
            var changeTest =orignalValue.substr(0,i);
              orignalValue=changeTest;
            }
          }

           $(this).val(orignalValue);
                 if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
                  var values=$(this).val();
            if(e.keyCode != '32') {
                    values=values.substring(0, values.length - 1);
                }
                  $(this).val(values).focus();
                    e.preventDefault();
                }
          });
        });
    };
  }(jQuery));

/*====================*OpenDeposits PhoneNumber Field Validation*======================*/
(function ($){
    $.fn.inputlengthPhoneNumber=function(){
      return this.each(function(){
          var makelength=$(this).attr("maxlength");
          $(this).on('keypress',function(e){
          var allowedTest ="0123456789+- "; 
          var notallowed ="!@#$%^&*()_+=-{};:\"?><|\/,'[].";
          var orignalValue=$(this).val();
           for (var i=0;i< orignalValue.length;i++){
            var atchar = orignalValue[i];
            if(allowedTest.indexOf(atchar) != -1){  
            }else{
            var changeTest =orignalValue.substr(0,i);
              orignalValue=changeTest;
            }
          }

           $(this).val(orignalValue);
                 if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
                  var values=$(this).val();
            if(e.keyCode != '32') {
                    values=values.substring(0, values.length - 1);
                }
                  $(this).val(values).focus();
                    e.preventDefault();
                }
          });
        });
    };
  }(jQuery));

/*====================*OpenDeposits Name,City,State Fields Validation*======================*/
(function ($){
    $.fn.inputlengthnameval=function(){
      return this.each(function(){
          var makelength=$(this).attr("maxlength");
          $(this).on('keypress',function(e){
          //$(this).val($(this).val().replace(/([^A-Za-z\s])/g,""));
                var allowedTest = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. ";
          //var allowedTest =/^[a-zA-Z0-9 ]*$/;
          var notallowed ="!@#$%^&*()_+=-{};:\"?><|\/,'[].";
          var notallowednumber ="0123456789";
          var orignalValue=$(this).val();

           for (var i=0;i< orignalValue.length;i++){
            var atchar = orignalValue[i];
            if(allowedTest.indexOf(atchar) != -1){  
            }else{
            var changeTest =orignalValue.substr(0,i);
              orignalValue=changeTest;
            }
          }

           $(this).val(orignalValue);
                 if($(this).val().length>makelength &&  e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32'){
                  var values=$(this).val();
            if(e.keyCode != '32') {
                    values=values.substring(0, values.length - 1);
                }
                  $(this).val(values).focus();
                    e.preventDefault();
                }
          });
        });
    };
}(jQuery));

/*====================*OpenDeposits City,State Fields Validation*======================*/
(function($) {
    $.fn.inputlengthcityStateval = function() {
        return this.each(function() {
            var makelength = $(this).attr("maxlength");
            $(this).on('keypress', function(e) {
                //$(this).val($(this).val().replace(/([^A-Za-z\s])/g,""));
                var allowedTest = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789& ";
                //var allowedTest =/^[a-zA-Z0-9 ]*$/;
                var notallowed = "!@#$%^&*()_+=-{};:\"?><|\/,'[].";
                var notallowednumber = "0123456789";
                var orignalValue = $(this).val();

                for (var i = 0; i < orignalValue.length; i++) {
                    var atchar = orignalValue[i];
                    if (allowedTest.indexOf(atchar) != -1) {} else {
                        var changeTest = orignalValue.substr(0, i);
                        orignalValue = changeTest;
                    }
                }

                $(this).val(orignalValue);
                if ($(this).val().length > makelength && e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32') {
                    var values = $(this).val();
                    if (e.keyCode != '32') {
                        values = values.substring(0, values.length - 1);
                    }
                    $(this).val(values).focus();
                    e.preventDefault();
                }
            });
        });
    };
}(jQuery));
$('.lenthcontrolcityStateval').inputlengthcityStateval();
/*====================*OpenDeposits URN Number Validation*======================*/

(function($) {
    $.fn.inputlengthNumber = function() {
        return this.each(function() {
            var makelength = $(this).attr("maxlength");
            $(this).on('keypress', function(e) {
                var allowedTest = "0123456789";
                var notallowed = "!@#$%^&*()_+=-{};:\"?><|\/,'[].";
                var orignalValue = $(this).val();
                for (var i = 0; i < orignalValue.length; i++) {
                    var atchar = orignalValue[i];
                    if (allowedTest.indexOf(atchar) != -1) {} else {
                        var changeTest = orignalValue.substr(0, i);
                        orignalValue = changeTest;
                    }
                }

                $(this).val(orignalValue);
                if ($(this).val().length > makelength && e.keyCode != '8' && e.keyCode != '46' || e.keyCode == '32') {
                    var values = $(this).val();
                    if (e.keyCode != '32') {
                        values = values.substring(0, values.length - 1);
                    }
                    $(this).val(values).focus();
                    e.preventDefault();
                }
            });
        });
    };
}(jQuery));
function iosBackButton(event) {
    console.log("=========== IOS back button ===========", els.get("errback"));


    if ($("#appwrapper").hasClass("mnuactive")) {
        console.log("Menu Active.......");
        $("#appwrapper").toggleClass("mnuactive");
        $(".subnav-overlay").remove();
    } else {
        console.log("=========else 2======");
        var url = window.location.href;
        var currentPage = els.get("currentPage");
        //|| url.lastIndexOf('#/transfer') != -1 || url.lastIndexOf('#/settings') != -1 || url.lastIndexOf('#/services') != -1 || url.lastIndexOf('#/rewards') != -1 

if (url.lastIndexOf('#/exception') != -1)
{	

	 var errBackPage= els.get("errback");
	 console.log("++++++++++++++++++++++++ exception ",errBackPage);
	 Backbone.history.navigate("#/"+errBackPage);
	 return false;
}

        if (url.lastIndexOf('#/login') != -1 || url.lastIndexOf('#/newregistration') != -1 || url.lastIndexOf('#/wealth') != -1 || url.lastIndexOf('#/gotoderegisterreview') != -1 || url.lastIndexOf('#/loanpaymentsuccess') != -1 || url.lastIndexOf('#/janaCardTransferSuccess') != -1 || url.lastIndexOf('#/mobPayeeAccountTransferSuccess') != -1 || url.lastIndexOf('#/otherAccountTransferSuccess') != -1 || url.lastIndexOf('#/janaAcctTransferSuccess') != -1 || url.lastIndexOf('#/ownaccttransfersuccess') != -1 || url.lastIndexOf('#/stopchequerequestreview') != -1 || url.lastIndexOf('#/rescheduleloanreview') != -1 || url.lastIndexOf('#/offersavingsreview') != -1 || url.lastIndexOf('#/chequestatusreview') != -1 || url.lastIndexOf('#/kycchangesreview') != -1 || url.lastIndexOf('#/changecardpinreview') != -1 || url.lastIndexOf('#/blockcardreview') != -1 || url.lastIndexOf('#/generatemmidreview') != -1 || url.lastIndexOf('#/standInstEditSuccess') != -1 || url.lastIndexOf('#/standInstOwnAccSuccess') != -1 || url.lastIndexOf('#/standInstJanaSuccess') != -1 || url.lastIndexOf('#/standInstOtherBankSuccess') != -1 || url.lastIndexOf('#/standInstChoose') != -1 || url.lastIndexOf('#/openfixeddepositreview') != -1 || url.lastIndexOf('#/openrecurringdepositreview') != -1 || url.lastIndexOf('#/closerdreview') != -1 || url.lastIndexOf('#/closefixeddepositreview') != -1 || url.lastIndexOf('#/telephonepaybillsuccess')!=-1 ) {
 
 

            if (url.lastIndexOf('#/gotoderegisterreview') != -1) {
                Backbone.history.navigate("#/expandico");
            }
            if (url.lastIndexOf('#/loanpaymentsuccess') != -1) {
                Backbone.history.navigate("#/wealth");
            }

            if( url.lastIndexOf('#/telephonepaybillsuccess')!=-1 )
            {
              Backbone.history.navigate("#/billpay");
            }
            if (
                url.lastIndexOf('#/janaCardTransferSuccess') != -1 ||
                url.lastIndexOf('#/mobPayeeAccountTransferSuccess') != -1 ||
                url.lastIndexOf('#/otherAccountTransferSuccess') != -1 ||
                url.lastIndexOf('#/janaAcctTransferSuccess') != -1 ||
                url.lastIndexOf('#/ownaccttransfersuccess') != -1 ||
                url.lastIndexOf('#/standInstEditSuccess') != -1 ||
                url.lastIndexOf('#/standInstOwnAccSuccess') != -1 ||
                url.lastIndexOf('#/standInstJanaSuccess') != -1 ||
                url.lastIndexOf('#/standInstOtherBankSuccess') != -1 ||
                url.lastIndexOf('#/standInstChoose') != -1
            ) {
                Backbone.history.navigate("#/transfer");
            }

            if (
                url.lastIndexOf('#/stopchequerequestreview') != -1 ||
                url.lastIndexOf('#/rescheduleloanreview') != -1 ||
                url.lastIndexOf('#/offersavingsreview') != -1 ||
                url.lastIndexOf('#/chequestatusreview') != -1 ||
                url.lastIndexOf('#/kycchangesreview') != -1 ||
                url.lastIndexOf('#/changecardpinreview') != -1 ||
                url.lastIndexOf('#/blockcardreview') != -1 ||
                url.lastIndexOf('#/generatemmidreview') != -1
            ) {
                Backbone.history.navigate("#/services");
            }

            if (url.lastIndexOf('#/openfixeddepositreview') != -1 
            	|| url.lastIndexOf('#/openrecurringdepositreview') != -1 
            	|| url.lastIndexOf('#/closerdreview') != -1 
            	|| url.lastIndexOf('#/closefixeddepositreview') != -1
            ) {
                Backbone.history.navigate("#/wealth");
                els.set("fixedDepositReq",'');
                els.set("recDepositReq",'');
            }


        }
        // exit from the in home page
        else if (url.lastIndexOf('#/backtohome') != -1 || url.lastIndexOf('#') == -1 || url.lastIndexOf('#') == url.length - 1) {
            navigator.app.exitApp();
        } else {
            event.preventDefault();

            console.log("page naigation stopped here =-=------------");

            if (currentPage != "transferConfirm") {
                console.log('*********************');
                var iosNavigation = els.get("iosNavigation");
                console.log(iosNavigation);
                if(iosNavigation == "budgetNavigation"){
                    window.history.back();
                }else{
                   Backbone.history.navigate("#/"+iosNavigation);
                }
                //navigator.app.backHistory();
                console.log('*********************');

                url = window.location.href;
                if (url.lastIndexOf('#/registration') != -1 || url.lastIndexOf('#/offers') != -1 || url.lastIndexOf('#/tools') != -1 || url.lastIndexOf('#/contactus') != -1 || url.lastIndexOf('#/locator') != -1) {
                    window.history.back();
                }
            }
        }
    }
    console.log("=========== IOS back button ===========", els.get("errback"));

}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());

    var gdate = ISOweekStart.getDate();
    if(gdate<10){
    	gdate = "0"+gdate;
    }
    var gmonth = getMonthNameShrt((ISOweekStart.getMonth()+1),'');
    gmonth = gmonth.toUpperCase();
    var weekstart = gdate + "-"+ gmonth;
    return weekstart;
}
/***************************cursor movement block for alphanumeric check*****************/
function checkCharNum(o){
var makelength=$(this).attr("maxlength");
	 var orignalValue = $(o).val();
	 var regex1=(/([^0-9A-Za-z ])/g);
	 var regex2 = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	
	 	 if(regex1.test(orignalValue) || (regex2.test(orignalValue)) ){ 
		 orignalValue=orignalValue.replace(/([^0-9A-Za-z ])/g,"");
		 console.log("ALEEEERT");
		 var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
		 orignalValue=orignalValue.replace(regex,'')
		 console.log("orignalValue",orignalValue);
		 $(o).val(orignalValue);
	 	 }else{
	 		return orignalValue;
	 	 }
	
		return orignalValue;
	}
/***************************cursor movement block for alphabets check*****************/
function checkChar(o){
/*var makelength=$(this).attr("maxlength");
	var allowedTest ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "; 
	var orignalValue=o;
		for (var i=0;i<orignalValue.length;i++){
			var atchar = orignalValue[i];
	 		if(allowedTest.indexOf(atchar) != -1){	
	 			//orignalValue=o.replace(/([^0-9A-Za-z])/g,"");
	 		}else{
	 			var changeTest =orignalValue.substr(0,i);
	 			orignalValue=changeTest;
	 		}
	 	}*/
	 var orignalValue = $(o).val();
	 var regex1=(/([^0-9A-Za-z ])/g);
	 var regex2 = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	
	 	 if(regex1.test(orignalValue) || (regex2.test(orignalValue)) ){ 
		 orignalValue=orignalValue.replace(/([^0-9A-Za-z ])/g,"");
		 var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
		 orignalValue=orignalValue.replace(regex,'')
		 console.log("orignalValue",orignalValue);
		 $(o).val(orignalValue);
	 	 }else{
	 		return orignalValue;
	 	 }	
	return orignalValue;
	}
/***************************cursor movement block for number check*****************/
function checkNum(o){
	/*var allowedTest ="1234567890"; 
	var orignalValue=o;
		for (var i=0;i<orignalValue.length;i++){
			var atchar = orignalValue[i];
	 		if(allowedTest.indexOf(atchar) != -1){	
	 			//orignalValue=o.replace(/([^0-9A-Za-z])/g,"");
	 		}else{
	 			var changeTest =orignalValue.substr(0,i);
	 			orignalValue=changeTest;
	 		}
	 	}*/
	console.log("o",o);
	 var orignalValue = $(o).val();
	 console.log("orignalValue",orignalValue);
	 var regex1=(/([^0-9.])/g);
	 console.log("rr",regex1.test(orignalValue));
	 var regex2 = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	
	 	 if(regex1.test(orignalValue) || (regex2.test(orignalValue)) ){ 
	 		console.log("orignalValue1",regex1.test(orignalValue));
	 		console.log("orignalValue2",regex2.test(orignalValue));
		 orignalValue=orignalValue.replace(/([^0-9.])/g,"");
		 var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
		 orignalValue=orignalValue.replace(regex,'')
		 console.log("orignalValue",orignalValue);
		 $(o).val(orignalValue);
	 	 }else{
	 		return orignalValue;
	 	 }
		return orignalValue;
	}
/********************************Email Check******************************************/
function checkEmail(o){
	var makelength=$(this).attr("maxlength");
	 var orignalValue = $(o).val();
	 var regex1=(/([^0-9A-Za-z@._ ])/g);
	 var regex2 = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
	
	 	 if(regex1.test(orignalValue) || (regex2.test(orignalValue)) ){ 
		 orignalValue=orignalValue.replace(/([^0-9A-Za-z@._ ])/g,"");
		 var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
		 orignalValue=orignalValue.replace(regex,'')
		 console.log("orignalValue",orignalValue);
		 $(o).val(orignalValue);
	 	 }else{
	 		return orignalValue;
	 	 }
	
		return orignalValue;
	}
/**********************************Remove Decimal Part from Number****************************/
function amountCheck(num){
	var number = $(num).val();
	console.log("number",number);
	var numVal=parseInt(number);
	$(num).val(numVal);
}
