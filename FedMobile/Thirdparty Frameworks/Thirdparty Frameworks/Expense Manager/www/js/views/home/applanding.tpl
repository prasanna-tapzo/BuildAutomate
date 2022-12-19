<link rel="stylesheet" href="css/style.css" />
<%
var els = new EncryptedLocalStorage('secret');
var language_id = els.get("language_id");
%>


<!--App Wrapper Starts Here-->
<div class="appwrapper" id="appwrapper">
		<header class="appheaderwrapper" id="preloginheader">
		    <div class="appheader">
		    	<div class="approw">
		        	<h1><span id="screentitle"><span></h1> 		        	
		        	<div class="app_topbtn" >
		        	<span id="termscloseicon">	
		        		<a href="#/newmpingeneration" class="icoclose"><i class="fa fa-times" aria-hidden="true"></i></a>
		        	</span>	
		        	<span id="closeicon">	
		        		<a href="#/login" class="icoclose"><i class="fa fa-times" aria-hidden="true"></i></a>
		        	</span>
		        	<span id="menuicon">
		        		<!--<a href="#/expandico"><div class="setting_ico"></div></a>-->
		        		<a href="#/login" class="icoclose"><i class="fa fa-times" aria-hidden="true"></i></a>
		        	</span>
		        	</div>
		        </div>
		    </div>
		</header>
		
		<!--Body Wrapper Starts Here-->
		<div class="bodywrapper" >
		<!-- Left side main navigation area starts-->
  <!--
  <aside class="subnav" id="menuwrapper">
        <nav>
            <ul>
            <li><a href="#/wealth" class="acc">My Accounts</a></li>
            <li><a href="javascript:void(0);" class="dep">Open deposits</a></li>
            <li><a href="javascript:void(0);" class="tran">Funds transfer</a></li>
            <li><a href="javascript:void(0);" class="bill">Bill pay</a></li>
            <li><a href="javascript:void(0);" class="ser">Services</a></li>
            <li><a href="javascript:void(0);" class="inbx">Inbox</a></li>
            <li><a href="javascript:void(0);" class="rew">Rewards</a></li>
            <li><a href="javascript:void(0);" class="faq">FAQ</a></li>
            <li><a href="javascript:void(0);" class="cont">Contact us</a></li>
            <li><a href="javascript:void(0);" class="set">Settings</a></li>
            <li><a href="javascript:void(0);" class="help">Help</a></li>
            <li><a href="javascript:void(0);" class="abt">About Us</a></li>
            </ul>
        </nav>  
  </aside>
  -->
  <!-- Left side main navigation area ends-->
		    <!-- Actual content wraping area -->
		    <div class="contentwrap"> 
		      	<section class="content" id="preloginmobcontent">
				</section>
			</div>
		</div>
 		<!--Body Wrapper Ends Here-->

		<!--footwrap starts Here-->
		<footer class="footerwrap" id="preloginfooter">
		
		</footer>
</div>
<!--App Wrapper Ends Here-->


<script>
$("#closeicon").hide();
$("#menuicon").hide();
$("#termscloseicon").hide();
</script>

