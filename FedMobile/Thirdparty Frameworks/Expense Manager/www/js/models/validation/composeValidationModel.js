define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var composeValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			
    			messageBody: {
     				required: true,
    				msg: "validation.messages.bodyisnotnull"
    			},
    			messageSubject: {
     				required: true,
    				msg: "validation.messages.messageSubjectnotnull"
    			}
    		},
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return composeValidationModel;
});