define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var OTPValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				softotp: {
	     			required: true,
	    			msg: "validation.otp.softotpnotnull"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return OTPValidationModel;
});