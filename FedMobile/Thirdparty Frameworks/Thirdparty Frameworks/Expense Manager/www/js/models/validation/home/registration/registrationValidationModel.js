define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var registrationValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				cardno: {
	     			required: true,
	    			msg: "validation.registration.cardnotnull"
    			},
    			cardpin: {
	      			required: true,
	     			msg: "validation.registration.pinnotnull"
    			}
    			
    		},    
  			initialize: function(props){
  				console.log("VALIDATION");
				this.url = props.url;
				console.log("VALIDATION  : " + this.url);
							}
		});
    return registrationValidationModel;
});