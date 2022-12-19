define(['jquery', 'underscore', 'Backbone',
        'text!views/home/login/login.tpl',
        'text!views/home/login/loginFooter.tpl',
        'collections/home/login/loginCollections'
        //'collections/home/prelogin/preLoginCollections',
        //'collections/home/prelogin/preLoginOauthVerifyCollections'
		//'libs/security/crypto-js/sha512',
		//'libs/security/crypto-js/tripledes'
        ],
    function ($, _, Backbone, 
    		loginTemplate,
    		loginFooterTemplate,
    		loginCollections
    		//preLoginCollections,
            //preLoginOauthVerifyCollections
			//SHA512,
			//tripledes
    		) {
	var els = new EncryptedLocalStorage('secret'); 
	 
	var login = Backbone.View.extend({
	 		
			el:'#preloginmobcontent',
			e2:'#preloginfooter',
			events:{
				"click #forgotmpin":"forgotMPIN",
				"click #submitMPIN":"submitMPIN"
				//,"click .pincode-input-text":"mpinInput"
				
            },
            render:function()
			{
            removejscssfile("js/libs/security/crypto-js/sha512.js", "js");
			removejscssfile("js/libs/security/crypto-js/tripledes.js", "js");
            loadjscssfile("js/libs/security/crypto-js/sha512.js", "js");
            loadjscssfile("js/libs/security/crypto-js/tripledes.js", "js");
			var InternetAccess = els.get("internetAccessFlag");
        	var notConfrim = els.get("allowOnConfirmAppAccessFlag");
        	var allowAccess=els.get("allowAppAccessFlag");
        	var allowAccess1=els.get("allowAppAccessFlag1");
        	els.set('appSessionId',"");
        	
        	//els.set('smartbudgetInfoShow',"");
        	els.set('changeYourExpnType',"");
        	els.set('smartbudgetUncateInfoShow',"");
        	
        	console.log("InternetAccess",InternetAccess);
        	console.log("allowAccess",allowAccess);
        	console.log("notConfrim",notConfrim);
        	console.log("allowAccess1",allowAccess1);
        	var isphone = /BlackBerry | IEMobile| Windows Phone | Win32NT | Android | iPad|iPhone|iPod/.test(navigator.userAgent);
        	if(isphone){
        	if(InternetAccess=="true" && allowAccess == "true" && notConfrim == "false" ){
        		//this.preLogin();
        		this.loginPFMWithSession();
            	/*console.log("Inside changeMpinReview render..........");
            	var that = this;
      			var onDataHandler = function(collection) {   				
      				that.preLogin();}
  				var onErrorHandler = function(collection) {that.errorresponse(); }
      				showSpinner();
      				var deviceId=getDeviceId();	    
      				that.collection= new preLoginCollections();
      				that.collection.fetch({
         			data: $.param({device_id:deviceId}),
         			dataType: "json",
         			type: 'POST',
         			cache: false,
         			success : function(data)
         			{
         				if(ackStatus == "00000"){
         				console.log("inside ackStatus");
 						onDataHandler(data);
         				}else{
         					onErrorHandler(data);
         				}
         			},
         			error:onErrorHandler
      				});*/
  			}else if(allowAccess1 == "known" ){
        		
        		Backbone.history.navigate("#/ServerConnectionexception");
        		
        	}else if(allowAccess1 == "unknown" ){
        		Backbone.history.navigate("#/InternetException");
        	}else{
				Backbone.history.navigate("#/InternetException");
        	}
        	}else{
        		els.set("gobackscreen","");
        		//this.preLogin();
        		//this.submitMPIN();
        		this.loginPFMWithSession();
        		/*console.log("Inside changeMpinReview render..........");
        	var that = this;
  			var onDataHandler = function(collection) {   				
  				that.preLogin();}
  				var onErrorHandler = function(collection) {that.errorresponse(); }
  				showSpinner();
  				var deviceId=getDeviceId();	    
  				that.collection= new preLoginCollections();
  				that.collection.fetch({
     			data: $.param({device_id:deviceId}),
     			dataType: "json",
     			type: 'POST',
     			cache: false,
     			success : function(data)
     			{if(ackStatus == "00000")
     			   {console.log("inside ackStatus");
 					
						onDataHandler(data);
						hideSpinner();
 					
     				}else{
     					onErrorHandler(data);
     				}
     			},
     			error:onErrorHandler
  				});*/
  			
        	}
            	
    		 },
    		 mpinInput:function(event){
    			 $(".pincode-input-text").keyup(function(event) {
    			
    			 var allowedTest ="1234567890"; 
    			
    				var orignalValue=$(".pincode-input-text").val();
    					for (var i=0;i<orignalValue.length;i++){
//    						alert("for");
    						var atchar = orignalValue[i];
    				 		if(allowedTest.indexOf(atchar) != -1){
//    				 			orignalValue=atchar.replace(/([^0-9])/g,"");
    				 		}else{
    				 		//	alert("chnge");
    				 			var changeTest =orignalValue.substr(0,i);
    				 			orignalValue=changeTest;
    				 		}
    				 		$(".pincode-input-text").val(orignalValue);
    				 	}
    					
    					
    			 });		
    		 },
            preLoginOauthVerify:function(){
                showSpinner();
                var that = this;
                var onDataHandler = function(collection) {                  
                that.resultpageSuccess();
                    }
                var onErrorHandler = function(collection) {that.errorresponse(); }
                
                var deviceId=getDeviceId();     
                that.collection= new preLoginOauthVerifyCollections();
                var salt = els.get("salT");
                that.collection.fetch({
                data: $.param({deviceid:deviceId,salt:salt}),
                dataType: "json",
                type: 'POST',
                cache: false,
                success : function(data)
                {if(ackStatus == "00000")
                   {console.log("inside ackStatus");
                    
                        onDataHandler(data);
                    
                    }else{
                        onErrorHandler(data);
                    }
                },
                error:onErrorHandler
                });

            },
            preLogin:function(){
            	console.log("Inside login render..........");
            	hideSpinner();
    		    $("#preloginmobcontent").html(_.template(loginTemplate)).i18n();
    		    $("#screentitle").text($.i18n.t('app.login.general.title'));
            	this.renderFooter();
    		    return this;
            },
            renderFooter:function()
			{
            	console.log("Inside loginFooter render..........");
            	$('#preloginfooter').html(_.template(loginFooterTemplate)).i18n();
    		    return this;
            },
            // Implemented for Federal Bank PFM app with
            loginPFMWithSession: function(){
            	els.set("appSessionId","");
            	$("#mpinWrong").hide();
            	$("#mpinError").hide();					
				var bar_colors=["#D95D70","#3366CC"];
				var bar_label = ["BUDGETS","EXPENSES"];
				var bar_series_colors = ["#FFFFFF","#3366CC","#D95D70"];
				els.set("bar_colors", bar_colors);
				els.set("bar_label", bar_label);
				els.set("bar_series_colors", bar_series_colors);
				els.set("emflag", "Y");
				
				var that=this;
	            /**
	             * To get Session Id and Customer Id(Unique) from Native application
	             * <Customer ID>||~||<session ID>
	             * */
	            var custNo="";
	            var sessionId="";
	            var device_id ="";
	            var tenantId = "50000";
	            var groupId = "40000";
	            
	            
	            var rnd  = Math.floor(100000 + Math.random() * 900000);
	            rnd = rnd + "";
	            console.log("rnd..........................."+ rnd);
	            //var cif = "123456789"+"||~||"+"CLAYFIN2019"+rnd; //132137577
	            var cif = "23370530"+"||~||"+"CLAYFIN2019"+rnd; //132137577
	            
	            /*setTimeout(function(){
	            	//var exec = cordova.require('cordova/exec');
			        try{    
			        	//exec(function(cif){			        	
		            		var nativearr = cif.split("||~||");
		            		custNo = nativearr[0];
		            		sessionId = nativearr[1];
		            		device_id = getDeviceId();
		            		els.set("appSessionId",sessionId);
		            		els.set("newMPIN",custNo);
		    				els.set("customerID_EM",custNo);
		    				els.set("smartbudgetUncateInfoShow","SHOWONCE");
		            	//},function(error){ },"AndroidPlugin", "getcif", []);
		    	        	
			        }catch(ee){
			        	custNo = "";
	            		sessionId = "";
			        }
	            },500);*/
//84974334347472JHHJHSAJD3894983381321375775000040000646456576876456808906667887
	            setTimeout(function(){
			        try{    
			        	//var exec = cordova.require('cordova/exec');
			        	//exec(function(cif){
                               // var cif = els.get("sessionID");
                                var nativearr = cif.split("||~||");
			            		custNo = nativearr[0];
			            		sessionId = nativearr[1];
			            		device_id = getDeviceId();
			            		els.set("appSessionId",sessionId);
			            		els.set("newMPIN",custNo);
			    				els.set("customerID_EM",custNo);
			    				els.set("smartbudgetUncateInfoShow","SHOWONCE");
			    				
			    				/*
			    				var pt = "246809"+"3DD55C52-CEF7-45A0-ADD4-1A00AB0D2585";
			    				var hs = CryptoJS.SHA512(pt);
								for (i = 0; i < 1024 ; i++){
				    				hash = CryptoJS.SHA512(hs);
								}
								var cs  = hash +"";
								cs = cs.toUpperCase();
								console.log("HASH PIN : "+ cs);
								
								var encpin  = EncryptMPIN(cs);
								console.log(" ENC PIN : "+ encpin);
								//encpin = (escape(encpin)).replace( "+", "%2B" );
								
								do{
									encpin = encpin.replace( "+", "%2B" );
								}while( encpin.indexOf("+") > 0 )
								console.log("ENC PIN1 : "+ encpin);								
								*/
			    				
			    				
				        		var plainText = sessionId+custNo+tenantId+groupId+device_id+"";
			       				console.log("plainText : "+ plainText);
			    				hash = CryptoJS.SHA512(plainText);
								for (i = 0; i < 1024 ; i++){
				    				hash = CryptoJS.SHA512(hash);
								}
								var app_checksum  = hash +"";
								console.log(app_checksum);
			            		
			    	        	var onDataHandler = function(collection) { 
			    	           		that.resultpageSuccess();
			    	           	}
			    	            var onErrorHandler = function(collection) {
			    	            	that.errorresponse();
			    	            }
			    	            
			            		showSpinner();
			    	            that.collection= new loginCollections([],{});
			    	            var deviceId=getDeviceId();	
			                    var salt = new Date().getTime();
			                	els.set("salT",salt);
			    	        	that.collection.fetch({
			    	        			data : $.param({
			    	        				customer_id : custNo,
			                                device_id : device_id,
			                                appchecksum : app_checksum
			    						}),
			    						dataType: "json",
			    						type: 'POST',
			    						cache: false,
			    						//timeout:parseInt(els.get('calltimeout')),
			    	     			success : function(data){
			    	     				if(ackStatus = "0000"){
			    	     					onDataHandler(data);
			    	     				}else{
			    	     					onErrorHandler(data);
			    	     					hideSpinner();
			    	     				}
			    	     			},
			    	     		
			    	     			error:onErrorHandler
			    	     		});
		    	       // },function(error){ },"AndroidPlugin", "getcif", []);
			        }catch(ee){
			        	custNo = "";
	            		sessionId = "";
			        }
	            },300);
            },
            
            
            
            submitMPIN:function(){
            	
            	$("#mpinWrong").hide();
            	$("#mpinError").hide();
				//var mpindisp;
				var mpinval;
				mpinval = "1473"; //$("#mpininput").val();
				//var mpinval;
            	/*var mpinval_1 = $("#mpin1").val();
				var mpinval_2 = $("#mpin2").val();
				var mpinval_3 = $("#mpin3").val();
				var mpinval_4 = $("#mpin4").val();
				var mpinval;*/
				if(mpinval.length==4){
					//mpinval = mpinval_1+""+mpinval_2+""+mpinval_3+""+mpinval_4;
					
					
					var bar_colors=["#D95D70","#3366CC"];
					var bar_label = ["BUDGETS","EXPENSES"];
					var bar_series_colors = ["#FFFFFF","#3366CC","#D95D70"];
					els.set("bar_colors", bar_colors);
					els.set("bar_label", bar_label);
					els.set("bar_series_colors", bar_series_colors);
					els.set("emflag", "Y");
					console.log("newMPINnewMPINnewMPIN",mpinval);
					els.set("newMPIN",mpinval);
					//this.resultpageSuccess();
					if("1473"==mpinval){
						//mpinval = "360448";
						mpinval = "360448";
					}
					
					els.set("customerID_EM",mpinval);
					els.set("smartbudgetUncateInfoShow","SHOWONCE");
					this.resultpageSuccess();
					
	            }else {
					$("#mpinError").show();
					$(".pincode-input-text").val('');
				}
// -------------------------------------------- Starts
				/*var that=this;
	        	var onDataHandler = function(collection) { 
                   that.preLoginOauthVerify();
	           		//that.resultpageSuccess();
	           	}
	            var onErrorHandler = function(collection) {
	            	that.errorresponse();
	            }
	            var password = mpinval;
	            var tenantId = "50000";
	            var groupId = "40000";
	            var ulpid = els.get("ulpID");
	            var custID=els.get("customerID");
	            var cusarr=custID.split('|');
	            var cusId=cusarr[0];
	            els.set("URN",cusId);
	            console.log("cusId",cusId);
				
	            //if (password.length > 0) {
					var plainText = cusId+password+tenantId+groupId+"";
   				
    				hash = CryptoJS.SHA512(plainText);
					for (i = 0; i < 1024 ; i++){
	    				hash = CryptoJS.SHA512(hash);
					}
					hash = hash +"";
				 	localStorage.setItem('password',hash);
				 	localStorage.setItem('clientSecret',hash);
				 	$("#password").val(hash);
				 	console.log("hash------->"+hash);
				//}
				password = hash;
				
	            console.log("password : " + password);
	            
	            showSpinner();
	            that.collection= new loginCollections([],{});
	            var deviceId=getDeviceId();	
                var salt = new Date().getTime();
            	els.set("salT",salt);
	        	that.collection.fetch({
	        			data : $.param({
							login : ulpid,
                            				salt:salt,
							device_id : deviceId,
							userOperatingCountryId : '10980',
							allowedIp : 'true',
							client_id : ulpid,
							username : ulpid,
							password : password,
							client_secret : password,
							scope:"read,write",
							grant_type : 'password',
							response_type  : 'token'
						}),
						dataType: "json",
						type: 'POST',
						cache: false,
						//timeout:parseInt(els.get('calltimeout')),
	     			success : function(data){
	     				console.log("Success : "+data);
	     				if(ackStatus != '9999' && ackStatus != '8888'){
	     						onDataHandler(data);
	     						//hideSpinner();
	     				}else{
	     						onErrorHandler(data);
	     						hideSpinner();
	     				}
	     			},
	     		
	     			error:onErrorHandler
	     		});
				}else {
    				$("#mpinError").show();
    				$(".pincode-input-text").val('');
    				
    				
    			}*/
// -------------------------------------------- Ends
			},
          
			resultpageSuccess:function(){
				//hideSpinner();
				Backbone.history.navigate("#/loginlayout");
					
			},
            forgotMPIN:function(event){
            		Backbone.history.navigate("#/forgotmpin");
            },
            errorresponse: function(){
            	hideSpinner();
            	Backbone.history.navigate("#/preloginexception");
            }
           
        });
        return login;
    });
