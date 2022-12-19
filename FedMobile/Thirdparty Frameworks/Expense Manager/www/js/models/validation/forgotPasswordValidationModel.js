define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var forgotUserNameValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				atmCardNumber: {
	     			required: true,
	    			msg: "validation.forgotpassword.atmcardnumbernotnull"
    			},
    			atmPinNumber: {
	      			required: true,
	     			msg: "validation.forgotpassword.atmpinnumbernotnull"
    			},
    			txnotp: {
	      			required: true,
	     			msg: "validation.forgotpassword.otpnotnull"
    			},
    			newpass: {
	      			required: true,
	     			msg: "validation.forgotpassword.newpassnotnull"
    			},
    			conpass: {
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