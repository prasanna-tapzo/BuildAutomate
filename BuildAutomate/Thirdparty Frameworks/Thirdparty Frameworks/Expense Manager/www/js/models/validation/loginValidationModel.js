define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var loginValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				userid: {
	     			required: true,
	    			msg: "validation.login.useridnotnull"
    			},
    			password: {
	      			required: true,
	     			msg: "validation.login.passwordisnotnull"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;	
				//alert("..loginValidationModel.."+this.url);				
			}
		});
    return loginValidationModel;
});