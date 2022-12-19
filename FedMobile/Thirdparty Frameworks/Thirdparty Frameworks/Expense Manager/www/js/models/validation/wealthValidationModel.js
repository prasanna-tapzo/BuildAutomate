define(['underscore', 'Backbone'], 
	function(_, Backboner) {
		var wealthValidationModel = Backbone.Model.extend({
			url: function(){
    			return this.instanceUrl;
  			},
  			validation: {
    			fromDate: {
     				required: true,
    				msg: "validation.wealth.fromdateisnotnull"
    			},
    			toDate: {
     				required: true,
    				msg: "validation.wealth.todateisnotnull"
    			},
    			startDate: {
     				required: true,
    				msg: "validation.wealth.startdateisnotnull"
    			},
    			endDate: {
     				required: true,
    				msg: "validation.wealth.enddateisnotnull"
    			},
    			amtabove: {
     				required: true,
    				msg: "validation.wealth.amtaboveisnotnull"
    			},
    			amtbelow: {
     				required: true,
    				msg: "validation.wealth.amtbelowisnotnull"
    			},
    			nicknameid: {
     				required: true,
    				msg: "validation.activatecc.nicknamenotnull"
    			}
    			
    		},    
  			initialize: function(props){		
				this.url = props.url;			
			}
		});
    return wealthValidationModel;
});