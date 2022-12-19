define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var forgotUserNameValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				atmCardNumber: {
	     			required: true,
	    			msg: "validation.forgotusername.atmcardnumbernotnull"
    			},
    			atmPinNumber: {
	      			required: true,
	     			msg: "validation.forgotusername.atmpinnumbernotnull"
    			},
    			txnotp: {
	      			required: true,
	     			msg: "validation.forgotusername.otpnotnull"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return forgotUserNameValidationModel;
});