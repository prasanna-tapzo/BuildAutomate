define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var forgotUserNameValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				oldmpin: {
	     			required: true,
	    			msg: "validation.forgotpassword.oldpassnotnull"
    			},
    			newmpin: {
	      			required: true,
	     			msg: "validation.forgotpassword.newpassnotnull"
    			},
    			confirmmpin: {
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