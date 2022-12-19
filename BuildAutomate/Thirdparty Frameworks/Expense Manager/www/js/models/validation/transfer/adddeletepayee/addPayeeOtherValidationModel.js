define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var addPayeeOtherValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			
  				accnumber: {
  					required: true,
    				msg: "validation.transfer.accountnonotnull"
    			},
    			reenteracc: {
    				required: true,
    				msg: "validation.transfer.reenteraccnotnull"
    			},
    			bank: {
    				required: true,
    				msg: "validation.transfer.bankname"
    			},
    			branch: {
    				required: true,
    				msg: "validation.transfer.branchname"
    			},
    			ifsc: {
    				required: true,
    				msg: "validation.transfer.ifsc"
    			},
    			payeename: {
    				required: true,
    				msg: "validation.transfer.payeename"
    			}
    			/*emailid:{
    				pattern:'email',
    				required: false,
    				msg: "validation.transfer.email"
    			}*/
    			
    			
    		},
  			initialize: function(props){		
				this.url = props.url;	
				console.log("validation");
			}
		});
    return addPayeeOtherValidationModel;;
});