define(['underscore', 'Backbone'], 
	function(_, Backbone) {
		var reminderValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
  				
  				addReminderDate: {
	      			required: true,
	     			msg: "validation.reminders.reminderdatenull"
    			},
    			reminderText: {
	      			required: true,
	     			msg: "validation.reminders.reminderdesc"
    			}
    			
    		},    
  			initialize: function(props){
				this.url = props.url;
			}
		});
    return reminderValidationModel;
});