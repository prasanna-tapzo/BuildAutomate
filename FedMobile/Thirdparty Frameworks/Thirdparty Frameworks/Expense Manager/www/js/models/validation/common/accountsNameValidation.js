define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var otpValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				accountName: {
	     			required: true,
	    			msg: "validation.smartbudget.accountNamenotnull"
    			}
				
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
				console.log("OTP MODEL");
			}
		});
    return otpValidationModel;
});