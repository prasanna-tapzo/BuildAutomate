define(['jquery', 'underscore', 'Backbone',
        'text!views/home/login/expandico/expandico.tpl'],
        
    function ($, _, Backbone, 
    		expandicoTemplate
    		) {
	var els = new EncryptedLocalStorage('secret'); 
	 
	var expandico = Backbone.View.extend({
	 		
			el:'#preloginmobcontent',
			e2:'#preloginfooter',
			events:{
				"click #forgotmpin":"forgotMPIN",
				"click #submitMPIN":"submitMPIN"
				
            },
            render:function()
			{

                if(els.get("locateus")!="Y" && els.get("locateus")!="N")
                   {
                        els.set("billpay","Y");
                        els.set("locateus","Y");
                        els.set("contactus","Y");
                        els.set("promotion","Y");
                        els.set("rewards","Y");
                        els.set("calculator","Y");
                        els.set("faq","Y");
                        els.set("offerings","Y");
                    }else{
                        console.log("not null------------------------------");
                   }


                console.log("billpay = - - - - - ",els.get("billpay"));
                console.log("locateus = - - - - - ",els.get("locateus"));
                console.log("contactus = - - - - - ",els.get("contactus"));
                console.log("promotion = - - - - - ",els.get("promotion"));
                console.log("rewards = - - - - - ",els.get("rewards"));
                console.log("calculator = - - - - - ",els.get("calculator"));
                console.log("faq = - - - - - ",els.get("faq"));
                console.log("offerings = - - - - - ",els.get("offerings"));


            	console.log("Inside expandico render..........");
            	hideSpinner();
    		    $("#preloginmobcontent").html(_.template(expandicoTemplate)).i18n();
    		    $("#screentitle").text("");
    		    return this;
            }
            
        });
        return expandico;
    });