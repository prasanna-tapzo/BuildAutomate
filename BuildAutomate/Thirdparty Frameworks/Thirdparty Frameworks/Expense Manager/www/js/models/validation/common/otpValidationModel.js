define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var otpValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				otpValue: {
	     			required: true,
	    			msg: "validation.otp.otpnotnull"
    			}
				
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
				console.log("OTP MODEL");
			}
		});
    return otpValidationModel;
});