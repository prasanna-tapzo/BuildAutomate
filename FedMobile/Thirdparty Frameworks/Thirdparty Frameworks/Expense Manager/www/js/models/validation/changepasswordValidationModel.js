define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var forgotUserNameValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				oldpassword: {
	     			required: true,
	    			msg: "validation.forgotpassword.oldpassnotnull"
    			},
    			newpassword: {
	      			required: true,
	     			msg: "validation.forgotpassword.newpassnotnull"
    			},
    			confirmpassword: {
	      			required: true,
	     			msg: "validation.forgotpassword.conpassnotnull"
    			}    			
    		},    
  			initialize: function(props){  				
				this.url = props.url;
			}
		});
    return forgotUserNameValidationModel;
});