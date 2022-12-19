define(['jquery', 'underscore', 'Backbone',
        'text!views/prelogin/errors/ServerConnectionexception.tpl',
        'text!views/prelogin/errors/ServerConnectionexceptionFooter.tpl'],
    function ($, _, Backbone,
    		serverConnectionTemplate,
    		serverConnectionexceptionFooterTemplate) {
       var els = new EncryptedLocalStorage('secret');
       
		var serverConnectionException = Backbone.View.extend({
			el:'#preloginmobcontent',
			events:{
            },
            render:function () {
            	var errordesc = els.get("errordesc");
            	this.$el.html(_.template(serverConnectionTemplate)).i18n();
            	 var footer = new serverConnectionExceptionFooter();
      		    footer.render();
                 return this;
            },
            BacktoLogin:function(){
            	/*console.log("Inside BacktoLogin header..........");
	        	var that = this;
	  			var onDataHandler = function(collection) {  
	  				hideSpinner();
	  				Backbone.history.navigate("#/");
	  			}
	        	var onErrorHandler = function(collection) {that.errorresponse(); }
	        	that.collection= new serverAvailCollections();
	        	showSpinner();
	            that.collection.fetch({
	     			data: $.param({}),
	     			dataType: "json",
	     			type: 'POST',
	     			cache: false,
	     			success : function(data)
	     			{
	     				if(ackStatus == "00000")
	     				{
	     						onDataHandler(data);
	     				}else{
	     						onErrorHandler(data);
	     				}
	     			},
	     			error:onErrorHandler
	     		});				
			 
			    return this;*/
            	var appContextPath=els.get('app.context.path');
				var appurl=appContextPath+'prelogin/serveravail';
				console.log("appurl:   "+appurl);
				//var device_id = "D096A9DE-6DBD-4FE2-BC46-73EE77571A3C"; 	
				var device_id = getDeviceId();
				setTimeout(function(){
					
					var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
					var platform;
                	if(iOS){ // check only for ios
                		platform ="IOSMOBILE";
                	}else{
                		platform="ANDROIDMOBILE";
                	}
                	var plainText=platform+els.get("device.version")+els.get("app.versionCode");
					var hashing = CryptoJS.MD5(plainText);
					var appVersionHashing =hashing+"";
					els.set("appVersionHashing",appVersionHashing);
					
					
					var language=$.i18n.lng();
					els.set("language",language);
					console.log("notification event regidid before");
					
					$.ajax({
					url: appurl,
					data: $.param({device_id:device_id,lang_id:language,platform :platform,osVersion :els.get("device.version"),deviceModel:els.get("device.model"),appVersion :els.get("app.versionCode"),appVersionHashing:appVersionHashing}),
					type: 'POST',
					dataType: 'json',
					timeout:parseInt(els.get('calltimeout')),
					success : function(data){
						
						if(data.ackStatus == "00000"){
							console.log("ACK0");
							els.set("internetAccessFlag","true");
							els.set("allowOnConfirmAppAccessFlag","false");
							els.set("allowAppAccessFlag","true");
						}else{
							
						}
						Backbone.history.navigate("#/");
						
						var responseget = data;
						console.log("responseget",responseget);
						
						var registerdDevice = data.registerdDevice;
						els.set("registerdDevice",registerdDevice);
						els.set("newReg","Y");

						$('.spinner').hide();
						/* var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
			                if(iOS){ // check only for ios
			                    var google_api_url = els.get("google_api_url");
			                    if(google_api_url=="" || google_api_url==null){
			                    	//loadjscssfile("http://maps.google.com/maps/api/js?v=3&sensor=true&libraries=places&libraries=geometry&key=AIzaSyClcJ64g6dAYswYuR9ERyaExnzGGvrTSns","js");
			                    	loadjscssfile("https://maps.googleapis.com/maps/api/js?key=AIzaSyBhN3ZgXDPqfFAxMazXPpBZNveWDXg854U&sensor=SET_TO_TRUE_OR_FALSE","js");
			    		   	 	}
			                    els.set("google_api_url","SET");
			                }*/
					},
					error:function(){
						els.set("internetAccessFlag","false");
						els.set("allowOnConfirmAppAccessFlag","false");
						els.set("allowAppAccessFlag","true");
						$('.spinner').hide();
						Backbone.history.navigate("#/");
					}
					
				});
				},1000);  //end of set timeout
				
	        },
	        errorresponse: function(){
            	hideSpinner();
            	this.$el.html(_.template(serverConnectionTemplate)).i18n();
            }
	       
        });
		
		//Footer Content
		var serverConnectionExceptionFooter = Backbone.View.extend({
	 		el:'#preloginfooter',
			events:{
				"click #logoutapp":"goBacktoLogin"
	        },
	      
	        render:function()
			{
	        	console.log("Inside exceptionFooter render..........");
	        	this.$el.html(_.template(serverConnectionexceptionFooterTemplate)).i18n();
	        	return this;
	        },
	        goBacktoLogin:function(){
	        	console.log("inside goBacktoLogin Footer");
	        	var header = new serverConnectionException();
	       	    header.BacktoLogin();
	        	
	        }
	       
		});
		
        return serverConnectionException;
    });