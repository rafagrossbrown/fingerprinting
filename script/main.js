

$( document ).ready(function() {
 
	//bootstrap tooltip
	$('[data-toggle="tooltip"]').tooltip();  

	// Fade In script
		$(function() {
		    $(window).scroll( function(){
				$('.fadeInBlock').each( function(i){
		            
		            var bottom_of_object = $(this).position().top + $(this).outerHeight();
		            var bottom_of_window = $(window).scrollTop() + $(window).height();
		            
		            /* Adjust the "200" to either have a delay or that the content starts fading a bit before you reach it  */
		            bottom_of_window = bottom_of_window +600;  
		          
		            if( bottom_of_window > bottom_of_object ){
		                
		                $(this).animate({'opacity':'1'},500);
		                    
		            }
		        }); 
		    
		    });
		});

		// FA search icon on search bar
		$('#iconified').on('keyup', function() {
		    var input = $(this);
		    if(input.val().length === 0) {
		        input.addClass('empty');
		    } else {
		        input.removeClass('empty');
		    }
		});

});
// angular tutorial

(function() {

var app= angular.module('fingerprinting',['ngRoute'] );

app.controller('FPController', function(){

	 

	});

})();



	//initialize the 3 popup css class names - create more if needed
	// var matchClass=['popup1','popup2','popup3'];
	//Set your 3 basic sizes and other options for the class names above - create more if needed
	// var popup1 = 'width=400,height=300,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=20,top=20';
	// var popup2 = 'width=800,height=600,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=20,top=20';
	// var popup3 = 'width=1000,height=750,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=20,top=20';
	
	//The pop-up function
	// function tfpop(){
	// 		var x = 0;
	// 		var popClass;
			//Cycle through the class names
			// while(x < matchClass.length){
			// 		popClass = "'."+matchClass[x]+"'";
					//Attach the clicks to the popup classes
					// $(eval(popClass)).click(function() {
							//Get the destination URL and the class popup specs
							// var popurl = $(this).attr('href');
							// var popupSpecs = $(this).attr('class');
							//Create a "unique" name for the window using a random number
							// var popupName = Math.floor(Math.random()*10000001);
							//Opens the pop-up window according to the specified specs
	// 						newwindow=window.open(popurl,popupName,eval(popupSpecs));
	// 						return false;
	// 				});							
	// 		x++;
	// 		} 
	// }
	



	//Wait until the page loads to call the function
	// $(function() {
	// 	tfpop();
			// 		$('#accordion').on('hidden.bs.collapse', function () {
			 
			// })

			// $('#accordion .accordion-toggle').click(function (e){
			//   var chevState = $(e.target).siblings("span.indicator").toggleClass('glyphicon-plus glyphicon-minus');
			//   $("i.indicator").not(chevState).removeClass("glyphicon-plus").addClass("glyphicon-minus");
			// });
	// });
 

