require.config({
    enforeDefine: true,
    paths:{
        // RequireJS plugin
        text:'libs/require/text',
        // RequireJS plugin
        domReady:'libs/require/domReady',
        // underscore library
        underscore:'libs/underscore/underscore.min',
        // Backbone.js library
        Backbone:'libs/backbone/backbone',
        
        Backboneext:'libs/backbone/backbone.validation.validator.ext',
        // jQuery
        jquery:'libs/jquery/jquery-1.10.2',
        //google maps api
		bootstrap:'libs/bootstrap/bootstrap.min',
       // gmap:'http://maps.google.com/maps/api/js?sensor=true&libraries=places&libraries=geometry',
        // jquery ui map
        jqmap:'libs/maps/jquery.ui.map',
        // jquery ui map services
        jqmapservice:'libs/maps/jquery.ui.map.services',
        // iscroll for smooth navigation
        //iscroll:'libs/jquery.mobile/iscroll',
        // iscroll extention for jqm
        //iscrollviews:'libs/jquery.mobile/jquery.mobile.iscrollview',           
        // TripleDes.js library
        tripledes:'js/libs/security/crypto-js/tripledes',        
        // Local storage
        encryptedlocalstorage:'libs/backbone/encrypted.localstorage',
         // jquery-i18next
        i18n:'libs/utility/i18next',
        // jquery-numberformatter
        numberformatter:'libs/utility/jquery.numberformatter-1.2.3.min',
        // jquery-hashtable
        jqhashtable:'libs/utility/jshashtable-2.1',
        // Backbone.Validation.js library
        backbonevalidation:'libs/backbone/backbone.validation',
        //Slider library
        slider:'libs/pollyfills/bootstrap-slider.min'
        
        //aes:'js/libs/security/crypto-js/aes',
        
        //AesUtil:'js/libs/security/crypto-js/AesUtil',
        
        //sha512:'js/libs/security/crypto-js/sha512'
        
    },
    shim:{
        Backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
        bootstrap:{
            deps:['jquery']
        },
        jqmapservice:{
        	deps:['jqmap', 'jquery']
        },
        tripledes:{
        },
        encryptedlocalstorage:{
        	deps:['underscore', 'jquery', 'Backbone'],
        	exports:'encryptedlocalstorage'
        },
        i18n:{
        	deps:['jquery'],
        	exports:'i18n'
        },       
        numberformatter:{
        	deps:['underscore', 'jquery', 'jqhashtable']
        },
        jqhashtable:{
        	deps:['underscore', 'jquery']
        },
        backbonevalidation:{
            deps:['underscore', 'jquery', 'Backbone']
        },
        slider:{
        	 deps:['jquery','bootstrap']
        },
        placeholder:{
       	 deps:['jquery']
       }/*,
       aes:{
    	   deps:['jquery']
       },
       AesUtil:{
    	   deps:['jquery']
       },
       sha512:{
    	   deps:['jquery']
       }*/
    }
});


define(['domReady'
        ,'jquery'
        ,'routers/approuter'
        , 'libs/utility/i18next'
        , 'libs/backbone/encrypted.localstorage'
        , 'libs/security/crypto-js/tripledes'
        , 'libs/pollyfills/bootstrap-slider.min'
        , 'libs/utility/loginutility'
		,'libs/jquery/jquery.touchSwipe.min'
        , 'common'
        //, 'libs/security/crypto-js/sha512'
        
        ],
function (domReady
    		,$,approuter
    		,i18n
    		,encryptedlocalstorage
    		,tripledes
    		,slider
    		,loginutility
			,touchSwipe
    		,common
    		//,SHA512
    		) {
    
        var options = {
        ns: 'messages',
        lng: 'en-US',
        resGetPath: 'i18n/__ns__-__lng__.json',
        load: 'current',
        debug: true,
        useDataAttrOptions: true,
        getAsync: true,
        preload: ['en-US', 'en-AR']
    	};
    	var els = new EncryptedLocalStorage('secret');                
    	$.i18n.init(options, function(t) { 
    	
    	var pictureSource;   // picture source
    	var destinationType; // sets the format of returned value
		
		var envList = new Array();
		envList[0] = "SITOLD";
		envList[1] = "SITNEW";
		envList[2] = "UATOLD"; // UAT
		envList[3] = "UATNEW"; // UAT working
		envList[4] = "SOFTLAUNCH";
		envList[5] = "ARASULOCAL";
		envList[6] = "SURESHLOCAL";
		envList[7] = "MANILOCAL";
		envList[8] = "JOHNSONLOCAL";
		envList[9] = "ADMIN31LOCAL"; // 240 local
		envList[10]= "ADMIN31PUBLIC";
		envList[11]= "PROD";
		var env=envList[3]; // Should be 3 for UAT
		
		var appLoginContextPath="";
		var appContextPath="";
		var appStaticContextPath="";
		var appLocalContextPath="json/";
		
		switch(env){
		case "SITOLD":
				appLoginContextPath 	= $.i18n.t("env.url.sitold");
				appContextPath 			= $.i18n.t("env.url.sitoldservice");
				appStaticContextPath 	= $.i18n.t("env.url.sitoldjson");
		break;
		case "SITNEW":
				appLoginContextPath 	= $.i18n.t("env.url.sitnew");
				appContextPath 			= $.i18n.t("env.url.sitnewservice");
				appStaticContextPath 	= $.i18n.t("env.url.sitnewjson"); 
		break;
		case "UATOLD":
				appLoginContextPath 	= $.i18n.t("env.url.uatold");
				appContextPath 			= $.i18n.t("env.url.uatoldservice");
				appStaticContextPath 	= $.i18n.t("env.url.uatoldjson");
		break;
		case "UATNEW":
				appLoginContextPath 	= $.i18n.t("env.url.uatnew");
				appContextPath 			= $.i18n.t("env.url.uatnewservice");
				appStaticContextPath 	= $.i18n.t("env.url.uatnewjson");
		break;
		case "PROD":
				appLoginContextPath 	= $.i18n.t("env.url.prod");
				appContextPath 			= $.i18n.t("env.url.prodservice");
				appStaticContextPath 	= $.i18n.t("env.url.prodjson");
		break;
		case "SOFTLAUNCH":
				appLoginContextPath 	= $.i18n.t("env.url.softlaunch");
				appContextPath 			= $.i18n.t("env.url.softlaunchservice");
				appStaticContextPath 	= $.i18n.t("env.url.softlaunchjson");
		break;
		case "ARASULOCAL":
				appLoginContextPath 	= $.i18n.t("env.url.arasulocal");
				appContextPath 			= $.i18n.t("env.url.arasulocalservice");
				appStaticContextPath 	= $.i18n.t("env.url.arasulocaljson");
		break;
		case "SURESHLOCAL":
				appLoginContextPath 	= $.i18n.t("env.url.sureshlocal");
				appContextPath 			= $.i18n.t("env.url.sureshlocalservice");
				appStaticContextPath 	= $.i18n.t("env.url.sureshlocaljson");
		break;
		case "MANILOCAL":
				appLoginContextPath 	= $.i18n.t("env.url.Manilocal");
				appContextPath 			= $.i18n.t("env.url.Manilocalservice");
				appStaticContextPath 	= $.i18n.t("env.url.Manilocaljson");
		break;
		case "JOHNSONLOCAL":
				console.log("Local Url : ");
				appLoginContextPath 	= $.i18n.t("env.url.johnsonlocal");
				appContextPath 			= $.i18n.t("env.url.johnsonlocalservice");
				appStaticContextPath 	= $.i18n.t("env.url.johnsonlocaljson");
				console.log("Local Url : "+appLoginContextPath);
				console.log("Local Url : "+appContextPath);
		break;
		case "ADMIN31LOCAL":
				appLoginContextPath 	= $.i18n.t("env.url.admin31local");
				appContextPath 			= $.i18n.t("env.url.admin31localservice");
				appStaticContextPath 	= $.i18n.t("env.url.admin31localjson");
		break;
		case "ADMIN31PUBLIC":
				appLoginContextPath 	= $.i18n.t("env.url.admin31public");
				appContextPath 			= $.i18n.t("env.url.admin31publicservice");
				appStaticContextPath 	= $.i18n.t("env.url.admin31publicjson");
		break;
	}		
	console.log(appLoginContextPath);
	console.log(appContextPath);
	console.log(appStaticContextPath);

		els.set('app.login.context.path', appLoginContextPath);
   		els.set('app.context.path', appContextPath);
   		els.set('app.static.context.path', appStaticContextPath);
   		els.set('app.local.context.path', appLocalContextPath);
   		els.set('calltimeout','90000');
   		els.set('base_currency','SAR');
   		
   		els.set('mobilenumber','966-9200-13323');
   		els.set("google_api_url","");
   		//els.set('mobilenumber','tel.+966 9200 13323');
   		
   		//Added code to set language Id post kill the app
   		var assingedLangId=window.localStorage.getItem("setLanguageId");
   		
   		var assignedTheme = "";
   		try{
   			assignedTheme = getfromStorage("current_theme");
   		}catch(e){
   			assignedTheme = "DEF";
   		}
	
   		/*
   		if(assingedLangId!="" && assingedLangId!="null" && assingedLangId!=null){
   			if(assingedLangId=="en-US" ){
   				console.log("If loop for english.."+assingedLangId);
   				
   				if(assignedTheme == "DEF" || assignedTheme == null){
   					loadjscssfile("css/style.css", "css");
   					removejscssfile("css/style_en_light.css", "css");
   					removejscssfile("css/style_en_dark.css", "css");
   					
   					removejscssfile("css/style_ar.css", "css");
    				removejscssfile("css/style_ar_light.css", "css");
    				removejscssfile("css/style_ar_dark.css", "css");
   				}else if(assignedTheme == "LIT"){
   					loadjscssfile("css/style_en_light.css", "css");
   	   				removejscssfile("css/style.css", "css");
   					removejscssfile("css/style_en_dark.css", "css");
   					
   					removejscssfile("css/style_ar.css", "css");
    				removejscssfile("css/style_ar_light.css", "css");
    				removejscssfile("css/style_ar_dark.css", "css");
   				}else if(assignedTheme == "DRK"){
   	   				loadjscssfile("css/style_en_dark.css", "css");
   					removejscssfile("css/style_en_light.css", "css");
   	   				removejscssfile("css/style.css", "css");
   	   				
   					removejscssfile("css/style_ar.css", "css");
    				removejscssfile("css/style_ar_light.css", "css");
    				removejscssfile("css/style_ar_dark.css", "css");
   				}
   				$.i18n.init({ lng: "en-US" });
   			}else{
   				
   				if(assignedTheme == "DEF" || assignedTheme == null){
   					loadjscssfile("css/style_ar.css", "css");
    				removejscssfile("css/style_ar_light.css", "css");
    				removejscssfile("css/style_ar_dark.css", "css");
    				
   					removejscssfile("css/style.css", "css");
   					removejscssfile("css/style_en_light.css", "css");
   					removejscssfile("css/style_en_dark.css", "css");
   				}else if(assignedTheme == "LIT"){
   					loadjscssfile("css/style_ar_light.css", "css");
   					removejscssfile("css/style_ar.css", "css");
    				removejscssfile("css/style_ar_dark.css", "css");
    				
   					removejscssfile("css/style.css", "css");
   					removejscssfile("css/style_en_light.css", "css");
   					removejscssfile("css/style_en_dark.css", "css");
   				}else if(assignedTheme == "DRK"){
    				loadjscssfile("css/style_ar_dark.css", "css");
   					removejscssfile("css/style_ar.css", "css");
    				removejscssfile("css/style_ar_light.css", "css");
    				
   					removejscssfile("css/style.css", "css");
   					removejscssfile("css/style_en_light.css", "css");
   					removejscssfile("css/style_en_dark.css", "css");
   				}
   				$.i18n.init({ lng: "en-US" });
   			}
   		}else{
   			console.log("else common loop for arabic.."+assingedLangId);
   			loadjscssfile("css/style_ar.css", "css");
   			$.i18n.init({ lng: "en-US" });
   		}
   		loadjscssfile("css/swiper.css", "css");

   		*/
   		//removejscssfile("css/style.css", "css");
   		//removejscssfile("css/font-awesome.min.css", "css");
    	loadjscssfile("js/libs/utility/serialize-object.js", "js");
    	loadjscssfile("js/libs/bootstrap/bootstrap.min.js","js"); // to implement modal view for otp screen
    	
    	
    	loadjscssfile("js/libs/backbone/backbone.validation.bootstrap.ext.js", "js");
    	loadjscssfile("js/libs/backbone/backbone.validation.validator.ext.js", "js");
    	loadjscssfile("js/libs/security/crypto-js/md5.js", "js");
    	//loadjscssfile("js/libs/utility/jshashtable-2.1.js", "js");
    	loadjscssfile("js/common.js", "js");
    	
    	
    	loadjscssfile("js/libs/jqplot-master/jquery.jqplot.min.js", "js");
		
		setTimeout(function(){
			loadjscssfile("js/libs/jqplot-master/plugins/jqplot.barRenderer.min.js", "js");
			loadjscssfile("js/libs/jqplot-master/plugins/jqplot.categoryAxisRenderer.min.js", "js");
			loadjscssfile("js/libs/jqplot-master/plugins/jqplot.pointLabels.min.js", "js");
			loadjscssfile("js/libs/jqplot-master/plugins/jqplot.donutRenderer.min.js", "js");
    	},500);
    	
    	//loadjscssfile("js/libs/utility/jshashtable-2.1.js", "js");    	
    	//loadjscssfile("js/libs/utility/jquery.numberformatter-1.2.3.min.js", "js");
    	els.set("language_id", $.i18n.lng());

		
    	// domReady is RequireJS plugin that triggers when DOM is ready
        domReady(function () {
            function onDeviceReady(desktop) {
            	document.addEventListener("backbutton", onBackKeyDown, false);
            	
            /*	navigator.contacts.pickContact(function(contact){
                    console.log('The following contact has been selected:' + JSON.stringify(contact));
                },function(err){
                    console.log('Error: ' + err);
                });*/
                 //window.webkit.messageHandlers.interOp.postMessage("deviceUUID")             
		 els.set("isFirstTime","true");
				
				var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
                if(iOS){ // check only for ios
            	try{
                /* els.set("native_device_id",device.uuid);
                 cordova.exec(
                              
                              function success(uuid)
                              {
                              els.set("native_device_id",uuid);
                              console.log('Device ID'+uuid);
                              
                              },
                              function fail(err) {
                              alert('Error');
                              },
                              'UniqueDeviceID',
                              'get',
                              []
                              );*/

				}catch(e){
					
				}
				}
/*            	
            	//=============================Push Notification- Starts=================//
            	var isphone = /BlackBerry | IEMobile| Windows Phone | Win32NT | Android | iPad|iPhone|iPod/.test(navigator.userAgent);
            	if(isphone){
						var push = PushNotification.init({
							"android": {
								//"senderID": "291501299083",
								"senderID": "836763382837",
								"icon":"notify"
							},
							"ios": {"alert": "true", "badge": "false", "clearBadge" : "true", "sound": "true"},
							"windows": {}
						});        
						push.on('registration', function(data) {							
								console.log("registration event");
	            				els.set("data_registrationId",data.registrationId);
								checkConnection();
								console.log(JSON.stringify(data));
						});
						push.on('notification', function(data) {
							console.log("notification event");
							console.log(JSON.stringify(data));
							push.finish(function () {
								console.log('finish successfully called');
							});
						});
						push.on('error', function(e) {
							console.log("push error");
						});
                } else {
                    registrationId = "dYDm0u_832E:APA91bH5vWuQsP4NjPK6GBROWSER";
                	els.set("data_registrationId",registrationId);
                }
            	//=============================Push Notification- Ends=================//
*/
            	
                //alert("onDeviceReady 2");
            	//=============================Get the App Version=================//
            	/*try{
            		cordova.getAppVersion.getVersionCode(function (version) {
            			els.set("app.versionCode",version);
            		});	
            		
            	}catch(e){
            		els.set("app.versionCode","1");
            	}*/
            	//=============================Get the App Version=================//
            	
/*
              	//=============================Get the device network operator=================//
            	try{
            		window.plugins.sim.getSimInfo(function(networkInfo){
            			els.set("networkProvider",networkInfo.carrierName);
            		}, function(error){
            			els.set("networkProvider","");
            		});
            		
            	}catch(e){
            		els.set("networkProvider","");
            	}
            	//=============================Get the device network operator=================//
*/

             	//=============================Get the time zone=================//
            	/*try{
            	
            		navigator.globalization.getDatePattern(function (date) {
            				els.set("timeZone",date.timezone);
            				},
            			    function () {
            					els.set("timeZone","");
            				});

            		
            	}catch(e){
            		els.set("timeZone","");
            	}*/
            	//=============================Get the time zone=================//
                //show alert and then exit the app
               // onResumeMobile();
              //  document.addEventListener("resume", onResumeMobile, false);               	
                	
               
                this.router= new approuter();
                	
                //hiding splash screen after server avail call success
				/*if (desktop !== true){
				setTimeout(function(){
  				var hidesplashscreen=els.get("hidesplashscreen") ;
                if (hidesplashscreen=="Y"){
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);                    
					//navigator.splashscreen.hide();
				}
				},500);
				}*/
  			}	
            function onResumeMobile(){
            	var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
                if(!iOS){ // check only for ios
            	try{
            	//show alert box for a rooted device then exit from the app
            		jailbreakdetection.isJailbroken(function(data){
            			if(data){
            				navigator.notification.alert(
                				$.i18n.t("app.login.rootedDeviceMsg"),  // message
                	            function(){
							$('.spinner').hide();
                					els.set("ifdevicejailBroken","true");
                					Backbone.history.navigate("#/InternetException");	
                					//jailbreakdetection.isJailbroken(function(data){}, function(error){},'true');
                					},         // callback
                	            $.i18n.t("app.login.rootedDeviceTitle"),            // title
                	            $.i18n.t("app.login.rootedDeviceOkButton")                  // buttonName
                	        );
                                                                          
            			}    else {
            				els.set("ifdevicejailBroken","false");
            			}                                            
            		}, function(error){},'false');
            	}
            	catch(error){}
                }else {
                	els.set("ifdevicejailBroken","false");
					var url = window.location.href;
					url=url.substring(url.lastIndexOf('#/'),url.length);
                	var  locationPage=els.get('locationPage');
					if(url == locationPage)
					{
						if(locationPage.search("resume") != 1){
							locationPage =locationPage.substring(0,locationPage.search("resume"));
						}
					}
                	els.set('locationPage','');
                	if(locationPage != null && locationPage != undefined && locationPage!= ''){
                		Backbone.history.navigate(locationPage);                		
                	}
                }
            }
            (function ($){
                $.fn.formatamount=function(){
                   return this.each(function(){
                		
                	  var amtval=$.trim($(this).text());
                		var retval;
                	  	if(amtval=="0" ||  amtval=="0.0" || amtval=="0.00" || amtval==".0" || amtval==".00" || amtval=="" || typeof(amtval)=="undefined"){
                	  		retval="0.00";
                	  	}else{
                	  		retval=$.formatNumber(amtval, {format:"#,###.00", locale:"us"});
                	  	}
                	  	$(this).text(retval);
                	  	
                   });
                };
            }(jQuery));
            
            function checkAmount(val){
            	var tempval = val.substring(0,1);
            	if(tempval=="."){
            		return "0"+val;	
            	}else{
            		return val;
            	}
            }
            function onBackKeyDown(event) {
            	
var url = window.location.href;
if (url.lastIndexOf('#/smartBudget') != -1) { 
	navigator.app.exitApp();
}
if (url.lastIndexOf('#/exception') != -1)
{ 
		var errorCode=els.get("errorcode");
		console.log("++++++++++++++++++++++++"+errorCode);
 		var errBackPage= els.get("errback");
		console.log("++++++++++++++++++++++++ exception ",errBackPage);
			      if(errorCode=="8888"){
                              	   Backbone.history.navigate("#/");
			      }else{
				   Backbone.history.navigate("#/"+errBackPage);
			      }
 			      return false;
}
              
            	 if($("#appwrapper").hasClass("mnuactive")){
      	        	console.log("Menu Active.......");
      	            $("#appwrapper").toggleClass("mnuactive");
      	            $(".subnav-overlay").remove();
             	 }else{
             		 
            	var url = window.location.href;
            	var currentPage=els.get("currentPage");
            	if(url.lastIndexOf('#/login')!=-1 || url.lastIndexOf('#/newregistration')!=-1  ){
                	//navigator.notification.confirm("Are you sure you want to exit?", onConfirm, "JFS Mobile", "Yes,No"); 
            	}else if(url.lastIndexOf('#/wealth')!=-1
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
				 || url.lastIndexOf('#/closefixeddepositreview')!=-1 || url.lastIndexOf('#/telephonepaybillsuccess')!=-1 || url.lastIndexOf('#/gotobillpay')!=-1
         || url.lastIndexOf('#/electricityaddbillersuccess')!=-1 || url.lastIndexOf('#/rechargesuccess')!=-1 
         || url.lastIndexOf('#/deletebillersuccess')!=-1 || url.lastIndexOf('#/editbillersuccess')!=-1||
                                url.lastIndexOf('#/emailstatement')!=-1 ||
                                url.lastIndexOf('#/viewstatement')!=-1 ||
                                url.lastIndexOf('#/smartBudget')!=-1 ||
                                url.lastIndexOf('#/reports')!=-1 ||
                                url.lastIndexOf('#/accounts')!=-1 ||
                                url.lastIndexOf('#/budgets')!=-1 ||
                                url.lastIndexOf('#/splittrans')!=-1 ||
                                url.lastIndexOf('#/splittransedit')!=-1 ||
                                url.lastIndexOf('#/budgetedit')!=-1 ||
                                url.lastIndexOf('#/addnewbudget')!=-1 ||
                                url.lastIndexOf('#/categorize')!=-1 
				
				
				||url.lastIndexOf('#/stopchequerequest')!=-1 	
				||url.lastIndexOf('#/chequebookrequest')!=-1 
				||url.lastIndexOf('#/changecardpin')!=-1 
				||url.lastIndexOf('#/chequestatus')!=-1 
				||url.lastIndexOf('#/blockcard')!=-1 
				||url.lastIndexOf('#/newdebitcardrequest')!=-1 
				||url.lastIndexOf('#/rescheduleloan')!=-1
				||url.lastIndexOf('#/offersavings')!=-1 
				||url.lastIndexOf('#/kycchanges')!=-1 
				||url.lastIndexOf('#/updatemailid')!=-1 
				||url.lastIndexOf('#/generatemmid')!=-1 ||
				
                                url.lastIndexOf('#/statementfilter')!=-1 || url.lastIndexOf('#/statusinquiry')!=-1  ){
            		  
                
                               if(
                               
                                url.lastIndexOf('#/addnewbudget')!=-1 ||
                                url.lastIndexOf('#/budgetedit')!=-1 
                                ){
                                Backbone.history.navigate("#/budgets");
                               } 

                              if(
                                url.lastIndexOf('#/splittrans')!=-1 ||
                                url.lastIndexOf('#/splittransedit')!=-1 ||
                                url.lastIndexOf('#/categorize')!=-1 
                                )
                              {
                                Backbone.history.navigate("#/smartBudget");
                              }

                               if(
                                  url.lastIndexOf('#/smartBudget')!=-1 
                                ){
                              Backbone.history.navigate("#/wealth");

                               } 
                             if(
                                  url.lastIndexOf('#/reports')!=-1 
                                ){
                              Backbone.history.navigate("#/budgets");
                                
                               } 
                             if(
                                  url.lastIndexOf('#/budgets')!=-1 
                                ){
                              Backbone.history.navigate("#/accounts");
                                
                               }   
                             if(
                                  url.lastIndexOf('#/accounts')!=-1
                                ){
                              Backbone.history.navigate("#/smartBudget");
                                
                               } 
                             
                                

                
                            /*if(url.lastIndexOf('#/addnewbudget')!=-1 ||
                               url.lastIndexOf('#/budgetedit')!=-1 
                               )
                            {
                             
                                Backbone.history.navigate("#/budgets");
                            }
*/


                            if( url.lastIndexOf('#/gotoderegisterreview')!=-1  )
                            {
                                Backbone.history.navigate("#/expandico");
                            }
                            if( url.lastIndexOf('#/loanpaymentsuccess')!=-1 )
                            {
                              Backbone.history.navigate("#/wealth");
                            }
                            if( url.lastIndexOf('#/telephonepaybillsuccess')!=-1 || 
                                url.lastIndexOf('#/electricityaddbillersuccess')!=-1 ||
                                url.lastIndexOf('#/rechargesuccess')!=-1 ||
                                url.lastIndexOf('#/deletebillersuccess')!=-1 ||
                                url.lastIndexOf('#/editbillersuccess')!=-1

                              )
                            {
                              Backbone.history.navigate("#/billpay");
                            }
                            if( url.lastIndexOf('#/electaddbillersuccess')!=-1  || url.lastIndexOf('#/rechargeelectricityaddbillersuccess')!=-1 )
                            {
                              Backbone.history.navigate("#/gotobillpay");
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
                                url.lastIndexOf('#/standInstChoose')!=-1|| 
                                url.lastIndexOf('#/transferpayees')!=-1
                              )
                            {
                              Backbone.history.navigate("#/transfer");
                            }

                            if( 
				url.lastIndexOf('#/stopchequerequest')!=-1 	
				||url.lastIndexOf('#/chequebookrequest')!=-1 
				||url.lastIndexOf('#/changecardpin')!=-1 
				||url.lastIndexOf('#/chequestatus')!=-1 
				||url.lastIndexOf('#/blockcard')!=-1 
				||url.lastIndexOf('#/newdebitcardrequest')!=-1 
				||url.lastIndexOf('#/rescheduleloan')!=-1
				||url.lastIndexOf('#/offersavings')!=-1 
				||url.lastIndexOf('#/kycchanges')!=-1 
				||url.lastIndexOf('#/statusinquiry')!=-1
				||url.lastIndexOf('#/updatemailid')!=-1 
				||url.lastIndexOf('#/generatemmid')!=-1 ||
                            	url.lastIndexOf('#/statusinquiry')!=-1 ||
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
                                url.lastIndexOf('#/closefixeddepositreview')!=-1||
                                url.lastIndexOf('#/depositoffers')!=-1 ||
                                url.lastIndexOf('#/transfer')!=-1 ||
                                url.lastIndexOf('#/services')!=-1 ||
                                url.lastIndexOf('#/billpay')!=-1 ||
                                url.lastIndexOf('#/mail')!=-1 ||
                                url.lastIndexOf('#/faq')!=-1 ||
                                url.lastIndexOf('#/contactus')!=-1 ||
                                url.lastIndexOf('#/settings')!=-1 ||
                                url.lastIndexOf('#/tandc')!=-1 ||
                                url.lastIndexOf('#/aboutus')!=-1 ||
								url.lastIndexOf('#/viewstatement')!=-1 ||
								url.lastIndexOf('#/statementfilter')!=-1
                              )
                            {
							
                              Backbone.history.navigate("#/wealth");
                            }

                            /*if( 
                                url.lastIndexOf('#/smartBudget')!=-1 ||
                                url.lastIndexOf('#/reports')!=-1 ||
                                url.lastIndexOf('#/accounts')!=-1 ||
                                url.lastIndexOf('#/budgets')!=-1
                              )
                            {
                              Backbone.history.navigate("#/wealth");
                            }*/









            	}
            	// exit from the in home page
            	else if(url.lastIndexOf('#/backtohome')!= -1 || url.lastIndexOf('#')== -1 || url.lastIndexOf('#') == url.length-1){
            		//navigator.app.exitApp();
            	}
            	else{            
	            	event.preventDefault();
	            	if(currentPage != "transferConfirm" ){ 
	            	navigator.app.backHistory();
	            	url = window.location.href;
	            	if(url.lastIndexOf('#/registration') != -1 || url.lastIndexOf('#/offers') != -1 || url.lastIndexOf('#/tools') != -1 || url.lastIndexOf('#/contactus') != -1 || url.lastIndexOf('#/locator') != -1) {
						//window.history.back();
	            	}
	            	}            		
            		}
             	 }	
            }
            
            function onConfirm(button,event) {
                if(button==2){//If User selected No, then we just do nothing
                    return;
                }else{
                	//$.mobile.jqmNavigator.replaceAll(new confirmon());
                	navigator.app.exitApp();
                	//navigator.app.backHistory();
                }
            }
                 
            function checkConnection() {
            	els.set("deviceDimension",$(window).height()+"*"+$(window).width());
            	//els.set("connection",navigator.connection.type);
            	var regidid;
            	if(navigator.network==undefined) {
            		els.set("internetAccessFlag","false");
            		els.set("allowOnConfirmAppAccessFlag","false");
					els.set("allowAppAccessFlag","true");
            	} else {
	            	var networkState = navigator.connection.type;
	            	var states = {};
	            	states[Connection.UNKNOWN]  = 'Unknown connection';
	            	states[Connection.ETHERNET] = 'Ethernet connection';
	            	states[Connection.WIFI]     = 'WiFi connection';
	            	states[Connection.CELL_2G]  = 'Cell 2G connection';
	            	states[Connection.CELL_3G]  = 'Cell 3G connection';
		            states[Connection.CELL_4G]  = 'Cell 4G connection';
	            	states[Connection.NONE]     = 'No network connection';            
	            	//alert('Connection type: ' + states[networkState]);

	            	if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
	                	els.set("internetAccessFlag","false");
	                	els.set("allowOnConfirmAppAccessFlag","false");
						els.set("allowAppAccessFlag","true");
						els.set("allowAppAccessFlag1","unknown");						
						} else {
	                	els.set("internetAccessFlag","true");
	                	els.set("allowOnConfirmAppAccessFlag","false");
						els.set("allowAppAccessFlag","true");
						els.set("allowAppAccessFlag1","known");
						console.log("connectionknownnetwork");
	            	}
            	}
	            	
//check connectiviy with server starts
            	
            	
            	var MpinAvailable = "FALSE";
            	var pushNotify;
				var proximitypush ;
				var appurl=appContextPath+'prelogin/serveravail';
				console.log("appurl:   "+appurl);
				
				//var device_id = device.uuid;
				//var device_id = getDeviceId();
				//var device_id = "737780371361191685233112554466";	//no mpin
				//var device_id = "6464565768764568089066688123"; 	//mpin available
				var device_id = "646456576876456808906667887";
				//var device_id = "5d9ee8e0863b0fc";
				//els.set('device_id',device_id);
				//======================================================//
				// set time out used wait for some time to get app version code  
				//======================================================//
				
				els.set("newProxiURL","");
				els.set("isAppLoaded",false);
				regidid = els.get("data_registrationId");
				regidid="TestId";
				if(regidid != null){
				$('.spinner').show();
				setTimeout(function(){
					
					var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
					var platform;
                	if(iOS){ // check only for ios
                		platform ="IOSMOBILE";
                	}else{
                		platform="ANDROIDMOBILE";
                	}
					//var plainText=els.get("app.versionCode")+platform+els.get("device.version");
                	var plainText=platform+els.get("device.version")+els.get("app.versionCode");
					var hashing = CryptoJS.MD5(plainText);
					var appVersionHashing =hashing+"";
					els.set("appVersionHashing",appVersionHashing);
					
					
					var language=$.i18n.lng();
					els.set("language",language);
					console.log("notification event regidid before");
					
					console.log("notification event regidid : "+regidid);
					Backbone.history.start();
					//-------------------
					/*var proxinotiurl = window.location.href;
					var proxinotiurl1 = proxinotiurl.substring(proxinotiurl.indexOf("#/"+2),proxinotiurl.length);
					console.log("main.js proxinotiurl1 : "+proxinotiurl1);
					if(proxinotiurl1=="newoffers" || proxinotiurl1.indexOf("index.html#/newoffers")!=-1 ){
						console.log("main.js111 proxinotiurl1 : "+proxinotiurl1);
						els.set("newProxiURL","newnotiproxioffer");
					}*/
					//-------------------
					
					/*$.ajax({
					url: appurl,
					data: $.param({device_id:device_id,lang_id:language,platform :platform,osVersion :els.get("device.version"),deviceModel:els.get("device.model"),appVersion :els.get("app.versionCode"),appVersionHashing:appVersionHashing,regidid:regidid}),
					type: 'POST',
					dataType: 'json',
					timeout:parseInt(els.get('calltimeout')),
					success : function(data){
						
						if(data.ackStatus == "00000"){
							console.log("ACK0");
							els.set("hidesplashscreen","Y");
							els.set("internetAccessFlag","true");
							els.set("allowOnConfirmAppAccessFlag","false");
							els.set("allowAppAccessFlag","true");	
						}else{
							//els.set("mpincheck_server","userch");
							//els.set("pushNotifyFlag","N");
							//els.set("proximityPushFlag","N");
							//els.set("FileStorageFlag","N");
						}
						Backbone.history.start();
						
						
						var map_otp_code = new Object();
						map_otp_code["OWNACCTRNS"]="OWNACCTRNS";
						map_otp_code["TPTTRANS"]="TPTTRANS";
						map_otp_code["NEFT"]="NEFT";
						map_otp_code["RTGS"]="RTGS";
						map_otp_code["IMPSP2A"]="IMPSP2A";
						map_otp_code["IMPSP2P"]="IMPSP2P";
						map_otp_code["GENERATE_MMID"]="GENERATE_MMID";
						map_otp_code["STANDING_INS"]="STANDING_INS";
						map_otp_code["CUSTOMER_CHANGE_MPIN"]="CUSTOMER_CHANGE_MPIN";
						
						els.set("map_otp_code",map_otp_code);
						var responseget = data;
						console.log("responseget",responseget);
						
						var registerdDevice = data.registerdDevice;
						els.set("registerdDevice",registerdDevice);
						//els.set("registerdDevice","Y");
						els.set("newReg","Y");

						$('.spinner').hide();
						 var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );

					},
					error:function(){
						els.set("internetAccessFlag","false");
						els.set("allowOnConfirmAppAccessFlag","false");
						els.set("allowAppAccessFlag","true");
						$('.spinner').hide();
						Backbone.history.start();
					}
					
				});*/
					
					els.set("hidesplashscreen","Y");
					els.set("internetAccessFlag","true");
					els.set("allowOnConfirmAppAccessFlag","false");
					els.set("allowAppAccessFlag","true");
					
					//Backbone.history.start();
				},1000);  //end of set timeout
				}else{
					els.set("internetAccessFlag","false");
					els.set("allowOnConfirmAppAccessFlag","false");
					els.set("allowAppAccessFlag","true");
				}
		    	els.set("lang_id", $.i18n.lng());
            	/*
				var cordova_netConnection = els.get("internetAccessFlag");

				if(cordova_netConnection=="false"){

				}*/
//check connectiviy with server ends
    		}

            dataString = navigator.appVersion;
    		var index = dataString.indexOf('Android 4.0.4');
      if (navigator.userAgent.match(/(ipod|iPad|iPhone|Android)/)) {

                 
            els.set("device.name","device.name");
            els.set("device.cordova","device.cordova");
            els.set("device.platform","device.platform");
            els.set("mob_device_uuid","device.uuid");
            els.set("device.model","device.model");
            els.set("device.version","device.version");
            onDeviceReady(true);
                 
                 
  				//alert("In Navi");
                // This is running on a device so waiting for deviceready event
                 
                /*document.addEventListener('deviceready', onDeviceReady, false);
                document.addEventListener('deviceready', function() {
                deviceReady = true;
                //alert("deviceready function....");
                // sets the format of returned value 
                //pictureSource=navigator.camera.PictureSourceType;        
                //destinationType=navigator.camera.DestinationType;
                /*
                els.set("device.name",device.name);
                els.set("device.cordova",device.cordova);
                els.set("device.platform",device.platform);
                els.set("mob_device_uuid",device.uuid);
                els.set("device.model",device.model);
                els.set("device.version",device.version);
                //alert("Internet connection check");
                 */
				checkConnection();
                 //}, false);
            } else {
            	//alert("Else Navi");
                // On desktop don't have to wait for anything
            	els.set("device.version","4.3");
                onDeviceReady(true);
                checkConnection();
                //els.set("internetAccessFlag","true");
           }
    	
    	});         

    });   				

 });
