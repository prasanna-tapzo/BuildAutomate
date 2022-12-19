define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var ComposeValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {    			
  				category: {
	     			required: true,
	    			msg: "validation.messagecenter.category"
    			},
    			subject: {
	     			required: true,
	    			msg: "validation.messagecenter.subject"
    			},
    			messageBody: {
	     			required: true,
	    			msg: "validation.messagecenter.messageBody"
    			}
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return ComposeValidationModel;
});