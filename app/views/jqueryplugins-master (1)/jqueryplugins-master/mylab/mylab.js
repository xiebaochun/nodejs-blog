$(document).ready(function(){  
	var header_nav_links=["http://www.juerry.com","mylab.html","../myblog/index.html"];
	var isMouseOver=false;
	var isTimeOut=false;
	var isFirstMouseOverIn=true;
	var curIndex=0;
	console.log("DOM is already!");
	$("#header_nav>ul>li").mouseover(function(){
		var _this=$(this);
        currentIndex=_this.index("#header_nav>ul>li");
        console.log(currentIndex);
        isMouseOver=true;
       
	    if(isMouseOver){
	    	var timeCount=0;
	        if(isFirstMouseOverIn){
	            isFirstMouseOverIn=false;

	            setTimeout(function(){     
		         show(currentIndex);
		        },200);
		            
	            var timer =setInterval(function(){
	            timeCount++;
	            if(timeCount>5){
	              timeCount=0;
	              isMouseOver=false;
	              isFirstMouseOverIn=true;
	              timer&&clearInterval(timer);
	            }
	    	   },40);	
	        } 
	    
	    }
    });
	function show(index) {         
	    $.easing.def = "easeOutQuad";
	    $("#drag_ctr").stop(false, true).animate({ left: index * 100+10 }, 300);
        $("#header_links").attr("href",header_nav_links[index]);
        // console.log($("#header_links").attr("href")); 
        setTimeout(function(){$("#navtext_"+index).css("color","#E01B6A");},100);
        setTimeout(function(){$("#navtext_"+index).css("color","#fff");},500);
     }
     ///////////////////////////////////////below the main_content js//////////////////////////////////
     $(".box").each(function(index){
     	$(this).hide();
     });
     $(".box").eq(0).show();
     $("#left_panel>nav>ul>li").mouseover(function(){
		var _this=$(this);
        currentIndex=_this.index("#left_panel>nav>ul>li");
        console.log(currentIndex);
        isMouseOver=true;
       
	    if(isMouseOver){
	    	var timeCount=0;
	        if(isFirstMouseOverIn){
	            isFirstMouseOverIn=false;

	            setTimeout(function(){     
		         show_content(currentIndex);
		        },200);
		            
	            var timer =setInterval(function(){
	            timeCount++;
	            if(timeCount>5){
	              timeCount=0;
	              isMouseOver=false;
	              isFirstMouseOverIn=true;
	              timer&&clearInterval(timer);
	            }
	    	   },100);	
	        } 
	    
	    }
    });
     $('.one_fourth_box').each(function(){
				$(this).hover(function(){
					$(this).children('.ofb-img').stop(true).animate({top:'-135px'})
					$(this).children('.ofb-img-bottom').stop(true).animate({top:'25px'})
					$(this).children('.ofb-text').stop(true).animate({top:'160px'})
					$(this).children('.ofb-text-top').stop(true).animate({top:'25px'})
					$(this).children('.ofb-bg').stop(true,true).fadeIn();
				},function(){
					$(this).children('.ofb-img').stop(true).animate({top:'25px'})
					$(this).children('.ofb-img-bottom').stop(true).animate({top:'160px'})
					$(this).children('.ofb-text').stop(true).animate({top:'25px'})
					$(this).children('.ofb-text-top').stop(true).animate({top:'-110px'})
					$(this).children('.ofb-bg').stop(true,true).fadeOut();
				})
			})
      function show_content(index){
          // $(".box").eq(0).show();
            if(curIndex!=index){
	             $.easing.def = "easeOutQuad";
	            $(".box").eq(curIndex).stop(false,true).fadeOut(1000);
			    // $(".box").eq(curIndex).stop(false,true).animate({top:'-135px'},200);
			     
			      setTimeout(function () {

				    // $(".box").eq(index).stop(false,true).fadeIn(1000);
	                  
				    // $(".box").eq(curIndex).css("left","1500px");
	                 $(".box").eq(index).stop(false,true).animate({left:'1500px'},100);
				     setTimeout(function(){
				     	$(".box").eq(index).show();
				        $(".box").eq(index).stop(false,true).animate({left:'0px'},500);
				        // $(".box").eq(index).show();	
				     },100);  
				      
				      
				  }, 10);
			      curIndex = index; 
		    }
		    else{
		    	 // $(".box").eq(index).stop(false,true).animate({left:'1500px'},500);
		    	 var i=0;
		    	 var timer_same=setInterval(function(){
				     	i++;
                        $(".box").eq(curIndex).css("left",(Math.random()*30-20)+'px');
				        //$(".box").eq(index).stop(false,true).animate({left:''+(Math.random()*30-20)+'px'},10);
				        if(i>5){
				        	clearInterval(timer_same);
				        	$(".box").eq(index).stop(false,true).animate({left:'0px'},500);
				        }
				     },10);  
		    }
	
        }
           
});