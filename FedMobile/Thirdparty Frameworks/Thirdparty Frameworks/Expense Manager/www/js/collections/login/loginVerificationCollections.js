define(['underscore','Backbone','models/login/loginVerificationModel'], function(_, Backbone, loginVerificationModel){
	var loginVerificationCollections = Backbone.Collection.extend({
    	model: loginVerificationModel,
        initialize : function(models, options) {
        },
        url:function() {   
        }
    });
    return loginVerificationCollections;
});
  
  
      