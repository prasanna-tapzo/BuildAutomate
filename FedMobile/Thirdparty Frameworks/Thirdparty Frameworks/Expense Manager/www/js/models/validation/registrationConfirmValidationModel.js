define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var registrationConfirmValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				uname: [{
	      			required: true,
	     			msg: "validation.newregistration.unamenotnull"
    			},{
					minLength: 6,
					msg: "validation.newregistration.unameminlength"
				}],
    			password: {
	      			required: true,
	     			msg: "validation.newregistration.passwordnotnull"
    			},
    			confirmpassword: {
	      			required: true,
	     			msg: "validation.newregistration.conpassnotnull"
    			},
    			/*mpin: {
	      			required: true,
	     			msg: "validation.newregistration.mpinnotnull"
    			},
    			confirmmpin: {
	      			required: true,
	     			msg: "validation.newregistration.conmpinnotnull"
    			},*/
    			/*emailid: {
    				pattern:'email',
	      			required: true,
	     			msg: "validation.newregistration.emailnotnull"
    			},*/
    			iagreee: {
    				secureimagevalidation : true,
	     			msg: "validation.newregistration.iagreee"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return registrationConfirmValidationModel;
});