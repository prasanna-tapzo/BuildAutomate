define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var preLoginAuthModel = Backbone.Model.extend({
		loginerror:[],
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
			 loginprofile[5] = userLoginProfile.userProfile.mobileNoMasked;
			 loginprofile[6] = userLoginProfile.userProfile.emailid;
			 els.set("LoginProfile",loginprofile);
			 els.set("MaskMobile",loginprofile[5]);
			  els.set("emailid",loginprofile[6]);			
			 userName = $('#userName').val();
			
			if (this.get("ackStatus")) {
	    		ackStatus=this.get("ackStatus");
		    }
			if (this.get("error")) {
				loginerror=this.get("error");
			 }
         }
    });	
    return preLoginAuthModel;
});