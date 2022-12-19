define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var addPayeeJanaValidationModel = Backbone.Model.extend({
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
    			}
    			
    		},
  			initialize: function(props){		
				this.url = props.url;	
				console.log("validation");
			}
		});
    return addPayeeJanaValidationModel;;
});