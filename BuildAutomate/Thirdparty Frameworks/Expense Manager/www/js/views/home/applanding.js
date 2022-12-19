define(['jquery', 'underscore', 'Backbone','text!views/home/applanding.tpl'],
    function ($, _, Backbone, applandingTemplate) {
	var els = new EncryptedLocalStorage('secret'); 
	 
	var applanding = Backbone.View.extend({
	 		el:'#container',
	 		e2:'#preloginmobcontent',
	 		e3:'#preloginfooter',
			events:{
				/*"click #ChangeLogin":"ChangeLogin",
				"click #ChangeLogin1":"ChangeLogin1",
				"click #changelangA":"changelangA",
				"click #changelangE":"changelangE"*/
            },
            initialize : function(){ 
            	 //this.router= new approuter();
    		},
            render:function()
			{
			    var devicePlatform = els.get("device.platform");
				if(devicePlatform == "Android"){   	
					//stopSMSListening();
				}else{
				}
				
				
				
					var InternetAccess = els.get("internetAccessFlag");
					var notConfrim =	els.get("allowOnConfirmAppAccessFlag");
					var allowAccess=	els.get("allowAppAccessFlag");
					var allowAccess1=els.get("allowAppAccessFlag1");
			    
				if(InternetAccess=="true" && allowAccess == "true" && notConfrim == "false"){
				console.log("App Landing....................");
				els.set("isAppLoaded",true);
    			var deviceName = els.get("device.name");
    		    var devicePlatform = els.get("device.platform");
    		    var deviceCordovaVersion = els.get("device.cordova");
    		    var deviceUuid = els.get("mob_device_uuid");
    		    var deviceModel = els.get("device.model");
    		    var deviceVersion = els.get("device.version");
    		    els.set('app.respone.mode', 'server-dynamic-response');
    		    hideSpinner();
    		    this.$el.html(_.template(applandingTemplate,{deviceName:deviceName,devicePlatform:devicePlatform,deviceUuid:deviceUuid,deviceModel:deviceModel,deviceVersion:deviceVersion,deviceCordovaVersion:deviceCordovaVersion})).i18n();
    		    console.log("App Landing....................1");
    		    var mpin=els.get("newMPIN");
    		    console.log("newMPIN",mpin);
    		    var google_api_url = els.get("google_api_url");
                if(google_api_url=="" || google_api_url==null){
                	//loadjscssfile("http://maps.google.com/maps/api/js?v=3&sensor=true&libraries=places&libraries=geometry&key=AIzaSyClcJ64g6dAYswYuR9ERyaExnzGGvrTSns","js");
                	//loadjscssfile("https://maps.googleapis.com/maps/api/js?key=AIzaSyB_MeZW1U7D6UtVCAnnPZArKnlasqxotSg&sensor=true","js");
		   	 	}
                //AIzaSyBhN3ZgXDPqfFAxMazXPpBZNveWDXg854U - JFS
                
                //loadjscssfile("https://c.la10.salesforceliveagent.com/content/g/js/37.0/deployment.js","js");
				//loadjscssfile("https://c.la2c1cs.salesforceliveagent.com/content/g/js/39.0/deployment.js","js");

                
                els.set("google_api_url","SET");
    		    var regDev=els.get("registerdDevice");
    		    //Backbone.history.navigate("#/newregistration");
    		    Backbone.history.navigate("#/login");
    		   // var newRegis=els.get("newReg");
    		   /* console.log("regDev",regDev);
		    		if(regDev == 'N')
        			{
    				els.set("SuccessMsg","Y");
    				Backbone.history.navigate("#/newregistration");
            			
        			}
    			else if(regDev == 'Y'){
    				els.set("SuccessMsg","N");
    				Backbone.history.navigate("#/login");
        			}*/
    		    console.log("App Landing....................2");
    		    //Backbone.history.navigate("#/newregistrationfooter");
    		    console.log("App Landing....................3");
    		    }else if(allowAccess1 == "known" ){
					console.log("elsefailurew0");
					this.$el.html(_.template(applandingTemplate,{deviceName:deviceName,devicePlatform:devicePlatform,deviceUuid:deviceUuid,deviceModel:deviceModel,deviceVersion:deviceVersion,deviceCordovaVersion:deviceCordovaVersion})).i18n();
    				Backbone.history.navigate("#/ServerConnectionexception");
            	}else if(allowAccess1 == "unknown" ){
					console.log("elsefailurew1");
					this.$el.html(_.template(applandingTemplate,{deviceName:deviceName,devicePlatform:devicePlatform,deviceUuid:deviceUuid,deviceModel:deviceModel,deviceVersion:deviceVersion,deviceCordovaVersion:deviceCordovaVersion})).i18n();
    				Backbone.history.navigate("#/InternetException");
            	}else{
					console.log("elsefailurew2");
					this.$el.html(_.template(applandingTemplate,{deviceName:deviceName,devicePlatform:devicePlatform,deviceUuid:deviceUuid,deviceModel:deviceModel,deviceVersion:deviceVersion,deviceCordovaVersion:deviceCordovaVersion})).i18n();
    				Backbone.history.navigate("#/InternetException");
				}
    		    return this;
            },
            errorresponse: function(){
            	hideSpinner();
            	Backbone.history.navigate("#/exception");
            }
        });
        return applanding;
    });