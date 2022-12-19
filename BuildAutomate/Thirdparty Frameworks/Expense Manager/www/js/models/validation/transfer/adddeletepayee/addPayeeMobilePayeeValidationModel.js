define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var addPayeeMobilePayeeValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			
  				mobno: {
  					required: true,
    				msg: "validation.transfer.mobno"
    			},
    			reentermobno: {
    				required: true,
    				msg: "validation.transfer.reentermobno"
    			},
    			mmid: {
    				required: true,
    				msg: "validation.transfer.mmid"
    			},
    			payeename: {
    				required: true,
    				msg: "validation.transfer.payeename"
    			}
    		},
  			initialize: function(props){		
				this.url = props.url;	
				console.log("validation");
			}
		});
    return addPayeeMobilePayeeValidationModel;;
});