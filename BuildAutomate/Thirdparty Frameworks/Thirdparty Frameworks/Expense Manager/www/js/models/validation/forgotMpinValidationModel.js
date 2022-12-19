define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var forgotMpinValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				uname: {
	     			required: true,
	    			msg: "validation.forgotmpin.unamenotnull"
    			},
    			passwd: {
	      			required: true,
	     			msg: "validation.forgotmpin.passwdnotnull"
    			},
    			txnotp:{
	      			required: true,
	     			msg: "validation.forgotmpin.otpnotnull"
    			},
    			newpin:{
	      			required: true,
	     			msg: "validation.forgotmpin.newpinnotnull"
    			},
    			conpin:{
	      			required: true,
	     			msg: "validation.forgotmpin.conpinnotnull"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return forgotMpinValidationModel;
});