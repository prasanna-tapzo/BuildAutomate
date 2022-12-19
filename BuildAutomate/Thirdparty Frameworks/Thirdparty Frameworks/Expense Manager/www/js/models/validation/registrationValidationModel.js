define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var registrationValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				atmCardNumber: {
	     			required: true,
	    			msg: "validation.newregistration.atmcardnumbernotnull"
    			},
    			atmPinNumber: {
	      			required: true,
	     			msg: "validation.newregistration.atmpinnumbernotnull"
    			},
    			txnotp: {
	      			required: true,
	     			msg: "validation.newregistration.otpnotnull"
    			}
    			/*,
    			uname: {
	      			required: true,
	     			msg: "validation.newregistration.unamenotnull"
    			},
    			password: {
	      			required: true,
	     			msg: "validation.newregistration.passwordnotnull"
    			},
    			confirmpassword: {
	      			required: true,
	     			msg: "validation.newregistration.conpassnotnull"
    			},
    			mpin: {
	      			required: true,
	     			msg: "validation.newregistration.mpinnotnull"
    			}
    			confirmmpin: {
	      			required: true,
	     			msg: "validation.newregistration.conmpinnotnull"
    			},
    			emailid: {
	      			required: true,
	     			msg: "validation.newregistration.emailnotnull"
    			}*/
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return registrationValidationModel;
});