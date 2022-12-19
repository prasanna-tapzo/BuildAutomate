    <div class="loginad"><img src="images/adbanner.jpg" width="100%"/></div>
               <!-- <div class="loginless">
                <div class="row">
                    <div class="col-xs-4"><a href="#/gotobillpay" class="paybills"><%-$.i18n.t('app.login.billpay.paybills')%></a></div>
                    <div class="col-xs-4"><a href="#/gotolocateus" class="locate"><%-$.i18n.t('app.login.general.locateus')%></a></div>
                    <div class="col-xs-4"><a href="#/gotocontactus" class="contact"><%-$.i18n.t('app.login.general.contactus')%></a></div>
                </div>
                <div class="row">
                    <div class="col-xs-4"><a href="#/promotions" class="promo"><%-$.i18n.t('app.login.general.promotions')%></a></div>
                    <div class="col-xs-4"><a href="#/gotorewards" class="reward"><%-$.i18n.t('app.login.layout.rewards')%></a></div>
                    <div class="col-xs-4"><a href="#/emicalculator" class="emi"><%-$.i18n.t('app.login.general.emi')%></a></div>
                </div>
                <div class="row">
                    <div class="col-xs-4"><a href="#/gotoFAQ" class="faqico"><%-$.i18n.t('app.login.layout.faq')%></a></div>
                    <div class="col-xs-4"><a href="#/offerings" class="offer"><%-$.i18n.t('app.login.layout.offerings')%></a></div>
                    <div class="col-xs-4"><a href="#/gotosettings" class="setting"><%-$.i18n.t('app.login.layout.settings')%></a></div>
                </div>
                </div>-->
<%
    var favArray=[];

favArray[0]={
                "favEnabled":els.get('billpay'),
                "className":"paybills",
                "title":$.i18n.t('app.login.billpay.paybills'),
                "link":"#/gotobillpay"
            };
favArray[1]={
                "favEnabled":els.get('locateus'),
                "className":"locate",
                "title":$.i18n.t('app.login.general.locateus'),
                "link":"#/gotolocateus"
            };
favArray[2]={
                "favEnabled":els.get('contactus'),
                "className":"contact",
                "title":$.i18n.t('app.login.general.contactus'),
                "link":"#/gotocontactus"
            };
favArray[3]={
                "favEnabled":els.get('promotion'),
                "className":"promo",
                "title":$.i18n.t('app.login.general.promotions'),
                "link":"#/promotions"
            };
favArray[4]={
                "favEnabled":els.get('rewards'),
                "className":"reward",
                "title":$.i18n.t('app.login.layout.rewards'),
                "link":"#/gotorewards"
            };
favArray[5]={
                "favEnabled":els.get('calculator'),
                "className":"emi",
                "title":$.i18n.t('app.login.general.emi'),
                "link":"#/emicalculator"
            };
favArray[6]={
                "favEnabled":els.get('faq'),
                "className":"faqico",
                "title":$.i18n.t('app.login.layout.faq'),
                "link":"#/gotoFAQ"
            };
favArray[7]={
                "favEnabled":els.get('offerings'),
                "className":"offer",
                "title":$.i18n.t('app.login.layout.offerings'),
                "link":"#/offerings"
            };
favArray[8]={
                "favEnabled":"Y",
                "className":"offer",
                "title":$.i18n.t('app.login.layout.settings'),
                "link":"#/gotochangempin"
            };



var newArrayEnabled = [];

 for(i=0 ; i < favArray.length ; i++ ){ 

    if(favArray[i].favEnabled == 'Y')
    {
        newArrayEnabled.push(favArray[i]);
    }

 }


console.log(newArrayEnabled);
%>        
        

        <div class="loginless">
        <% var k=0; %>
        <% for(i=0 ; i < newArrayEnabled.length ; i++ ){ %>

            <% var FavObject=newArrayEnabled[i]; %>

            <% if(k%3==0){ %>
                <div class="row">
            <% } %>

        <!--     <% console.log("i = "+i+" enabled ="+FavObject.favEnabled+"  , k = "+k); %> -->

              <% if(FavObject.favEnabled == 'Y'){ %>

    <div class="col-xs-4"><a href="<%-FavObject.link%>" class="<%-FavObject.className%>"><%-FavObject.title%></a></div>  

               <%  } %>

            <% if((k+1)%3==0){  %>
                </div>
            <%  } k++; %>

        <% } %>

        <% if(newArrayEnabled.length%3!=0){ %>
                    </div>
        <% } %>

        </div>

            <!-- <div class="loginless">
                <div class="row">
                    <div class="col-xs-4"><a href="javascript:void(0)" class="paybills"><%-$.i18n.t('app.login.billpay.paybills')%></a></div>
                    <div class="col-xs-4"><a href="#/gotolocateus" class="locate"><%-$.i18n.t('app.login.general.locateus')%></a></div>
                    <div class="col-xs-4"><a href="#/gotocontactus" class="contact"><%-$.i18n.t('app.login.general.contactus')%></a></div>
                </div>
                <div class="row">
                    <div class="col-xs-4"><a href="javascript:void(0)" class="promo"><%-$.i18n.t('app.login.general.promotions')%></a></div>
                    <div class="col-xs-4"><a href="javascript:void(0)" class="reward"><%-$.i18n.t('app.login.layout.rewards')%></a></div>
                    <div class="col-xs-4"><a href="#/emicalculator" class="emi"><%-$.i18n.t('app.login.general.emi')%></a></div>
                </div>
                <div class="row">
                    <div class="col-xs-4"><a href="#/gotoFAQ" class="faqico"><%-$.i18n.t('app.login.layout.faq')%></a></div>
                    <div class="col-xs-4"><a href="#/offerings" class="offer"><%-$.i18n.t('app.login.layout.offerings')%></a></div>
                    <div class="col-xs-4"><a href="#/gotochangempin" class="setting"><%-$.i18n.t('app.login.layout.settings')%></a></div>
                    
                </div>
                </div> -->
  
<script>

$('#preloginmobcontent').removeClass("pnkbg");
$('#preloginmobcontent').removeClass("login-content");
$('#preloginmobcontent').addClass("content");
$("#menuicon").hide();
$("#closeicon").show();
$("#termscloseicon").hide();
</script>
<script>	
$(document).ready( function () {
    $('.bodywrapper').addClass("noFooter");
    $("#preloginfooter").hide();
});
</script>
