define(['jquery','underscore', 'Backbone','text!views/transfer/moi/drivinglicense.tpl','models/validation/moiFormValidationModel','views/transfer/moi/drivinglicenseconfirm'],
    function ($,_, Backbone,drivingLicenseTemplate,moiFormValidationModel,drivingLicenseConfirm) {

        var timpsmmid = Backbone.View.extend({
        	el:'#content',
        	
        	events:{
        		'submit #drivinflicenseissueform':'goTodrivingLicense',
				
            }, 
			update:function (id,e) {			
 		  		var drvLsncIssueTpl=_.template(drivingLicenseTemplate);
				this.$el.html( drvLsncIssueTpl ).trigger("create"); 
                $.mobile.loading('hide');
				return this;
            },
			goTodrivingLicense: function(event,e) {
			this.model = new moiFormValidationModel({url:'json/'});
    			this.$('.alert').hide();
                Backbone.Validation.bind(this);
				var data = this.$('form').serializeObject();
				if(this.model.set(data, {validate: true})){
            	$.mobile.loading('show');
				this.subview = this.disposeView(new drivingLicenseConfirm());
				this.subview.render().$el.trigger("create");
				$.mobile.loading('hide');
				this.undelegateEvents();
				}else {
    				this.$('.alert-error').fadeIn();  
    				event.preventDefault();     				
    			}	
			},
			disposeView: function(view){
   				Backbone.View.prototype.close = function () {
   					this.unbind();
      				this.undelegateEvents();
   				};

   			/* --Destroy current view */
   			if(this.currentView !== undefined) {
   				this.currentView.close();
   			}

   			/* --Create new view */
   			this.currentView = view;
   			this.currentView.delegateEvents();
   			return this.currentView;
			}
        });

        return timpsmmid;
    });