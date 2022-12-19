define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var otpGenerateModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
			 if (this.get("access_token")) {
				 accesstoken=this.get("access_token");				 
				 els.set('access_token', accesstoken);
			 }
			 var userLoginProfile='';
			 if (this.get("userLoginProfile")) {
				 userLoginProfile=this.get("userLoginProfile");
			 }
			 
			 if(userLoginProfile!=''&&userLoginProfile!='undefined'){
				 
			 var loginprofile = new Array();
			 loginprofile[0] = userLoginProfile.userProfile.firstName;
			 loginprofile[1] = userLoginProfile.userProfile.lastName;
			 loginprofile[2] = userLoginProfile.userProfile.middleName;
			 loginprofile[3] = userLoginProfile.lastSuccessLogin;
			 loginprofile[4] = userLoginProfile.lastFailureLogin;
			 els.set("LoginProfile",loginprofile);
			 }
			 userName = $('#userName').val();
			
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
	    		//show the received otp in pop up only in android
	    		//After resolve the issue reopen the sms listener
	    		if(ackStatus == "00000") {
	    			var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
	    			if(!iOS){
					try{
		    				window.smsreceiver.listenToSms(
		    						function(result) {  
		    							els.set("isOtpReceived","false");	
		    							//var sender=result.sender;   sender of the sms
		    							//var message=result.msg;     body of the msg
		    							var receivedMsg=result.msg.trim();
		    							var checkKey=result.msg.trim();
		    							var receivedoneTimeText =receivedMsg.substr(7,receivedMsg.length);
										receivedMsg = receivedMsg.match(/\d/g);
										receivedMsg = receivedMsg.join("");										
		    							//receivedMsg=receivedMsg.substr(0,4);
		    							var sender=result.sender;
		    							var oneTimeText=$.i18n.t('app.login.oneTimeText');
										
										//if(sender.toLowerCase().indexOf("hollandi") != -1 && checkKey.indexOf(oneTimeText) != -1){
										if(sender.indexOf("JANABK") != -1){
											if(/^\d+$/.test(receivedMsg)){	
												els.set("isOtpReceived","true");
												$("#otpValue").val(receivedMsg);
												window.smsreceiver.stopListening(
														function(result) {     }, 
														function(error) {   }
												);											
												/*navigator.notification.alert(
													receivedMsg,  //show only otp, use result.msg for complete text  
														function(){		
															$("#otp").val(receivedMsg);
															window.smsreceiver.stopListening(
																function(result) {     }, 
																function(error) {   }
														);
		    									},         // callback
													$.i18n.t("app.login.otpAlertTitle"),           // title
													$.i18n.t("app.login.okButton")                   // buttonName
												);*/
											}
										}
		    						}, 
		    						function() {   }
		    				);
					}
					catch(e){
					}
	    			}
	    		}//end
		    }
			if (this.get("error")) {
				var errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
				els.set("errorcod",errordet.errorCode);
			 }
			else{
				els.set("errordesc",' ');
			}
         }
    });	
    return otpGenerateModel;
});