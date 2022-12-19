define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var mpinGenValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				newmpin: {
	     			required: true,
	    			msg: "validation.mpingeneration.mpinnotnull"
    			},
    			confirmmpin: {
	      			required: true,
	     			msg: "validation.mpingeneration.confirmnotnull"
    			}
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
							}
		});
    return mpinGenValidationModel;
});