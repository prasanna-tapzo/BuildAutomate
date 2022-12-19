define(['underscore', 'Backbone'], function(_, Backbone) {
	var els = new EncryptedLocalStorage('secret'); 
	var loginVerificationModel = Backbone.Model.extend({
		initialize:function(){
			 if (this.get("access_token")) {
				 accesstoken=this.get("access_token");				 
			 }
			userName = $('#userName').val();
			els.set('userName', userName);
         	els.set('access_token', accesstoken);
         	els.set('tenantApplicationId', '99999');
         	els.set('tenantShortDescription', 'SBI');
         	els.set('groupId', '54337875');
         	els.set('groupShortDescription', 'RIB');
         	els.set('locale', 'en,US');
         	els.set('applicationId', '322');
         	els.set('channelId', 'RIB');
         	els.set('mediaType', 'MOB');         	
         	els.set('mainModule', 'payment');
         	els.set('subModule', 'ownaccounttransfer');}
    });	
    return loginVerificationModel;
});