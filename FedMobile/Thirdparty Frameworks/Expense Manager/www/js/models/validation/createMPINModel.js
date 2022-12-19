define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var createMPINModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				newmpin:{
	     			required: true,
	    			msg: "validation.creatempin.newpin"
    			},
    			confirmmpin:{
	     			required: true,
	    			msg: "validation.creatempin.confirmpin"
    			},
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return createMPINModel;
});