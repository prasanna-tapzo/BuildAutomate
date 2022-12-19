define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var otpPreloginGenerateModel = Backbone.Model.extend({
		errordet:[],
		initialize:function(){
			 if (this.get("access_token")) {
				 accesstoken=this.get("access_token");				 
				 els.set('access_token', accesstoken);
			 }
			 if (this.get("userLoginProfile")) {
				 userLoginProfile=this.get("userLoginProfile");
			 }
			 var loginprofile = new Array();
			 loginprofile[0] = userLoginProfile.userProfile.firstName;
			 loginprofile[1] = userLoginProfile.userProfile.lastName;
			 loginprofile[2] = userLoginProfile.userProfile.middleName;
			 loginprofile[3] = userLoginProfile.lastSuccessLogin;
			 loginprofile[4] = userLoginProfile.lastFailureLogin;
			 els.set("LoginProfile",loginprofile);
         	 	
			 userName = $('#userName').val();
			
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			if (this.get("error")) {
				var errordet=this.get("error");
				els.set("errordesc",errordet.errorDescription);
			 }
			else{
				els.set("errordesc","FAILURE");
			}
         }
    });	
    return otpPreloginGenerateModel;
});