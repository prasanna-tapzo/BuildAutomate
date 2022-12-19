define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var OTPValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				otp: [{
	     			required: true,
	    			msg: "validation.otp.otpnotnull"
    			},{
					minLength: 6,
					msg: "validation.otp.otpnotnull"
				},{
					maxLength: 6,
					msg: "validation.otp.otpnotnull"
				}
				],
    			mpinotp: {
	     			required: true,
	    			msg: "validation.otp.otpnotnull"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return OTPValidationModel;
});