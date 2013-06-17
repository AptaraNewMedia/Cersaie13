// JavaScript Document
var filter_selected= '#subitem1';
var companyType=1;

var companies = [];
var tempcompanies = [];
var favoritedCompanies = [];
var favoritedHalls= [];


localStorage.favoritedCompaniesCount = 0;
var favorited_company_id;


var db;
var shortName = 'cersaie';
var version = '1.0';
var displayName = 'Cersaie';
var maxSize = 1000000; //  bytes



$.getJSON("companies.json",function(data){
          
          // alert(data.length);
          for (var i=0; i<data.length; i++) {
          var row = data[i];
          tempcompanies[i]= row;
          
          }
          
          })




function openDb(){

	db = openDatabase(shortName, version, displayName, maxSize);
	db.transaction(populateDB, errorCB, successCB);
}


//Function to populate Data
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS favorited(favoriteid INTEGER NOT NULL PRIMARY KEY,companyid INTEGER)');
//    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES (0,1)');
//    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES (1,1)');
//    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES (2,1)');
    
    
    //Function call to get Default Speechpad
	db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(getFavorties, errorCB);
}

function getFavorties(tx1){
    tx1.executeSql('SELECT * from favorited', [], querySuccess1, errorCB);
}

function querySuccess1(tx, results){
    //alert(results.rows.length);
    
    
    for( var i =0; i < results.rows.length; i++){
        var row = results.rows.item(i);
        favoritedCompanies.push(row);
    }
    localStorage.favoritedCompaniesCount = results.rows.length;
    
    init();

}

function insertCompanyIntoFavorites(){
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(insertCompanyHandler, errorCB);
}

function insertCompanyHandler(tx){
    tx.executeSql('INSERT INTO favorited(favoriteid,companyid) VALUES ('+localStorage.favoritedCompaniesCount+','+favorited_company_id+')', [], insertCompanySuccess, errorCB);
}

function insertCompanySuccess(){
//    db = openDatabase(shortName, version, displayName, maxSize);
//    db.transaction(getFavourites, errorCB);
    getFavourites();
}





function removeCompanyFromFavorites(){
    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(removeCompanyHandler, errorCB);
}

function removeCompanyHandler(tx){
    tx.executeSql('DELETE FROM favorited where companyid ='+favorited_company_id+'', [], removeCompanySuccess, errorCB);
}

function removeCompanySuccess(){
//    db = openDatabase(shortName, version, displayName, maxSize);
//    db.transaction(getFavourites, errorCB);
    getFavourites();
}




getFavourites= function() {

    
//    try {
//        db.transaction(
//                         function(transaction) {
//                         
//                         var sql = "SELECT * from favorited";
//                         
//                         transaction.executeSql(sql, [], companiesFavouritesDataHandler, errorHandler);
//                         });
//        
//    } catch(e) {
//        alert(e.message);
//    }

    db = openDatabase(shortName, version, displayName, maxSize);
    db.transaction(getFavortiesCall, errorCB);
    
};

function getFavortiesCall(transaction){

     transaction.executeSql('SELECT * from favorited', [], companiesFavouritesDataHandler, errorCB);

}

function companiesFavouritesDataHandler(tx, results) {

   
    setTimeout(function() {
               companies = [];
               favoritedHalls = [];
               
               for (var i=0; i<results.rows.length; i++) {
               var row = results.rows.item(i);
               
               for(var k =0; k < tempcompanies.length; k++){
               
                if(row['companyid'] == tempcompanies[k].company_id){
                    companies.push(tempcompanies[k]);
                    var hallid = tempcompanies[k].hall;
                    favoritedHalls.push(hallid);
                //alert("itha"+favoritedHalls);
                    localStorage.setItem("favoriteHallKey",JSON.stringify(favoritedHalls));
                }
               }
               
               }
               
               if(favoritepage == true){
                    $('#slider').sliderNavFavourites();
               }
               
    }, 1000);
    
    
}

$("#shareemail").live("click",function(){
   
                      alert("open div");
                      
});



$.fn.sliderNavFavourites = function(options) {
    
    $('.slider-content').css('left',0);
    
    $('.slider-content ul').empty();
    
	var defaults = {height: null, arrows: true};
    var opts = $.extend(defaults, options);
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
    var slider = $(this);
    
    $(slider).addClass('slider');
    
    var left= $('#leftFavourites');
    var height = $(left).height();
	$('.slider-content', slider).css('height',height);
    
    var content = '';
    content+='<li id="favourites"><div>';
    var finUL=false;
    if(companies.lenght > 0){
        content+='<ul>';
        finUL= true;
    }
    
    while(companies.length>0){
        var classFavorited="favorited-favourites";
        var functionVar= "favorited("+companies[0].company_id+");";
        
        
        var type_comp= 'Others';
        if(companies[0].company_type == '1'){
            type_comp= 'Ceramic tiles';
        }else if(companies[0].company_type == '2'){
            type_comp= 'Sanitaryware';
        }
        
        content +='<li>'+
        '<div class="row">'+
        '<a href="#" onclick="gotoCompanyFromFavouriteList('+companies[0].company_id+')"><div class="identity">'+
        '<div class="rowtitle">'+companies[0].short_name+'</div>'+
        '<div class="rowsubtitle">'+type_comp+'</div>'+
        '</div></a> '+
        
        '<div class="arrow arrow-iphone"></div> '+
        
        '<div class="situation">'+
        '<div class="hall"> Hall '+companies[0].hall+'</div>'+
        '<div class="stand"> Stand '+companies[0].stand+'</div>'+
        '</div>'+
        '<a href="#" onClick="'+functionVar+'; getFavourites()">'+
        '<div id="star_'+companies[0].company_id+'" class="'+classFavorited+'"></div>'+
        '</a>'+
        '</div>'+
        '</li>';
        companies.splice(0, 1);
    }
    
    if(finUL){
        content+= '</ul>';
    }
    
    content+='</li>';
    
    $('.slider-content ul', slider).append(content);
    
    
};




function successCB() {
//    alert("success");
}
function errorCB(tx, err) {
   //alert("Error processing SQL: "+err);
}



jQuery.fn.sort = function() {
    return this.pushStack( [].sort.apply( this, arguments ), []);
};

 function sortLastName(a,b){
     if (a.l_name == b.l_name){
       return 0;
     }
     return a.l_name> b.l_name ? 1 : -1;  
 };  
  function sortLastNameDesc(a,b){  
     return sortLastName(a,b) * -1;  
 };
 

function init()
{

$.getJSON("companies.json",function(data){
				// Handle the results 
			companies = []; 
			
     // alert(data.length); 
     for (var i=0; i<data.length; i++) {
        var row = data[i]; 
		//alert("in");
        companies[i]= row;
        tempcompanies[i]= row;
          
    }
	 
   $('#slider').sliderNav();
	  
 })
    
   // openDb();
    
}







changeFilter = function(element){
    var current_filer='#'+element;
    if(filter_selected != current_filer){
        $(filter_selected).removeClass('subitem-hover');
        filter_selected=current_filer;
        $(filter_selected).addClass('subitem-hover');
    }
    
    search();
};



search= function() {
    
    var key = $('.search-key').val();
    
    if(key == ''){
        $('#leftAlphabetic').css('display','block');
        if(navigator.userAgent.match(/iPhone/i)){
            $('.slider-content').css('left','30px');
        }else if(navigator.userAgent.match(/iPad/i)) {
            $('.slider-content').css('left','50px');
        }else{
           $('.slider-content').css('left','30px');        
        }
        
        
    }else{
        $('#leftAlphabetic').css('display','none');
        $('.slider-content').css('left','0px');
    }

    findByName(key);
};


$("#subitem1").live("click",function(){
companies=[];
companyType="";
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		companies[i]= row;
     }
	
    // alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});


$("#subitem2").live("click",function(){
companies=[];
companyType=1;
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		if(data[i].company_type=="1")
		{
			
        	companies.push(data[i]);
		}
     }
	
    // alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});



$("#subitem3").live("click",function(){
companies=[];
companyType=2;
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		if(data[i].company_type=="2")
		{
			
        	companies.push(data[i]);
		}
     }
	
     //alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});



$("#subitem4").live("click",function(){
companies=[];
companyType=3;
$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		if(data[i].company_type=="3")
		{
			
        	companies.push(data[i]);
		}
     }
	
    //alert(companies.length);      
   $('#slider').sliderNav();
	  
 });
									 
});


function findByName(key){
	key=key.toLowerCase();
	companies=[];

$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		var chkval=data[i].short_name.toLowerCase();
		if(data[i].company_type==companyType && chkval.indexOf(key)!=-1)
		{
			
        	companies.push(data[i]);
		}
     }
	
    //alert(companies.length);      
   $('#slider').sliderNav();
	  
 });

	
}


function gotoCompanyFromList(company_id){
    window.location.href = "company.html?id="+company_id+"-index";
}

gotoCompanyFromFavouriteList = function(company_id){
    
    window.location.href = "company.html?id="+company_id+"-favourite_list";
    
}

$.fn.sliderNav = function(options) {    
    
    $('#leftAlphabetic').empty();
    $('.slider-content ul').empty();
    
        
	var defaults = {items: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"], height: null, arrows: true};
	var opts = $.extend(defaults, options); 
    var o = $.meta ? $.extend({}, opts, $$.data()) : opts; 
    var slider = $(this); 
    var alphabetic= $('#leftAlphabetic');	
    $(slider).addClass('slider');
    

    
    var content = '';
	for(var i in o.items){
        $(alphabetic).append('<a alt="#'+o.items[i]+'"><div class="letter submenu-font submenu-font-left">'+o.items[i]+'</div></a>');             
        
        content+='<li id="'+o.items[i]+'"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
        var finUL=false;
		//alert(companies);
        if(companies.length > 0){
            content+='<ul>';
            finUL= true;
        }
        //alert(companies.length)

        
        while(companies.length>0){
			//alert(companies[0].initial+"\n"+companies.length);
			
            if(companies[0].initial.startsWith(o.items[i])){ 
                var classFavorited="no-favorited";
                var functionVar= "favorited("+companies[0].company_id+")";
                
//                if(companies[0].favorited==1){
//                    classFavorited="favorited";
//                }

                
                for ( var k = 0; k < favoritedCompanies.length ; k++){
                    var row = favoritedCompanies[k];

                    if(row['companyid'] == companies[0].company_id){
                        classFavorited="favorited";
                    }
                }
                
                
                var type_comp= 'Others';
                if(companies[0].company_type == '1'){
                    type_comp= 'Ceramic tiles';
                }else if(companies[0].company_type == '2'){
                    type_comp= 'Sanitaryware';
                }
                
                content +='<li>'+
                                '<div class="row">'+                
                                    '<a href="#" onclick="gotoCompanyFromList('+companies[0].company_id+')"><div class="identity">'+
                                        '<div class="rowtitle">'+companies[0].short_name+'</div>'+
                                        '<div class="rowsubtitle">'+type_comp+'</div>'+
                                    '</div></a> '+ 
                
                                    '<div class="arrow"></div> '+
                
                                    '<div class="situation">'+
                                        '<div class="hall"> Hall '+companies[0].hall+'</div>'+
                                        '<div class="stand"> Stand '+companies[0].stand+'</div>'+
                                    '</div>'+
                                    '<a href="#" onClick="'+functionVar+'">'+
                                        '<div id="star_'+companies[0].company_id+'" class="'+classFavorited+'"></div>'+
                                    '</a>'+
                                '</div>'+
                        '</li>';
                companies.splice(0, 1);
            }else{
                break;
            }
        }
        
        if(finUL){
            content+= '</ul>';
        }  
        
        content+='</li>';   
    }

    $('.slider-content ul', slider).append(content);
    
    $('.slider-content li:first', slider).addClass('selected');
    
    var key = $('.search-key').val();
    
    if(key == ''){
    var height = $(alphabetic).height();
	if(o.height) height = o.height;
	$('.slider-content', slider).css('height',height);
	
	$('a', alphabetic).mouseover(function(event){
                                 var target = $(this).attr('alt');
                                 var cOffset = $('.slider-content', slider).offset().top;
                                 var tOffset = $('.slider-content '+target, slider).offset().top;
                                 var height = $(alphabetic).height(); 
                                 if(o.height) height = o.height;
                                 var pScroll = (tOffset - cOffset) - height/8;
                                 $('.slider-content li', slider).removeClass('selected');
                                 $(target).addClass('selected');
                                 $('.slider-content', slider).stop().animate({scrollTop: '+=' + pScroll + 'px'});
                                 });
    }
    
};


getCompanyById= function(id_company) {


$.getJSON("companies.json",function(data){
				// Handle the results 
				
     // alert(data.length); 
     for (var i=0; i<data.length; i++) { 
        var row = data[i]; 
		//alert("in"+data[i].company_type);
		//var chkval=data[i].short_name.toLowerCase();
		if(data[i].company_id==id_company)
		{
			
        	//companies.push(data[i]);
			loadCompany(data[i]);
		}
     }
									});
	 
};

loadCompany = function(company_selected){
        
alert(company_selected.logo_id);
    if(origen == 'map'){
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html?hall='+company_selected.hall+'">BACK</a>');
    }else{
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html">BACK</a>');
    }
    $('#mainMenu').append('<div id="ascerLogo"></div>');
   
    
    var contenedor = '#first_left';
    
    
    $('#first_left').append('<div id="location_content"></div>');
    
    $('#location_content').append('<div id="icon-map"></div>');
    $('#location_content').append('<a href="#" onclick="goToMapFromExterna('+company_selected.hall+')"><div id="hall_title"> Hall '+company_selected.hall+',</div></a>');
    $('#location_content').append('<div id="stand_title"> Stand '+company_selected.stand+'</div>');
    
    
    $(contenedor).append('<div id="logo_company"><img src="css/images/logo/'+company_selected.logo_id.toUpperCase()+'"/></div>'); 
    var classFavorited="no-favorited-company";
    var functionVar= "favorited("+company_selected.company_id+")";
    
//    if(company_selected.favorited==1){
//        classFavorited="favorited-company";
//    }
    
    for ( var k = 0; k < favoritedCompanies.length ; k++){
        var row = favoritedCompanies[k];
        
        if(row['companyid'] == company_selected.company_id){
            classFavorited="favorited";
        }
    }

  
    $(contenedor).append('<div id="star_container"><a href="#" onClick="'+functionVar+'"><div id="star_'+company_selected.company_id+'" class="'+classFavorited+'"></div></a></div>');
    
    $('#mainMenu').append('<div id="secondaryMenu"><div id="subitem_company" class="subitem-hover"></div></div>');    
    $('#subitem_company').append('<div class="textSubmenu_company submenu-font-company"> '+company_selected.short_name+' </div>');
    
    var contenido_novelties= company_selected.novelties;    
    var contenido_products= company_selected.products;    
    
    if(contenido_novelties != null && contenido_novelties != ''){
        $('#first_left').append('<div id="novelties_title" class="section_title">Novelties</div>');
        $('#first_left').append('<div id="description_content">'+contenido_novelties+'</div>');
    }
    $('#first_left').append('<div id="manager_title" class="section_title2">Stand Manager</div>');
    $('#first_left').append('<div id="manager_name">'+company_selected.mr_ms+' '+company_selected.manager+'</div>');
    
   
    if(contenido_products != null && contenido_products != ''){
        $('#first_left').append('<div id="products_title" class="section_title3">Products</div>');
        $('#first_left').append('<div id="description_content">'+contenido_products+'</div>');
    }
      
    
    $(contenedor).append('<div id="separator"></div>');
    $(contenedor).append('<div id="picture_container" class="center"></div>');    
    

    var url_full = 'css/images/iphone/full/iphone-';
    var url_thumb = 'css/images/iphone/thumb/iphone-';
     
    
    var photo_1 = company_selected.id_photo_1;
    var url_full_1='';
    var url_thumb_1='';
    if(photo_1 != null && photo_1 != ''){
        var name_photo_1 = photo_1.replace('.jpg', '');
        url_full_1= url_full+name_photo_1+'.jpg';
        url_thumb_1 = url_thumb+name_photo_1+'_th.jpg';
    }
    
    var photo_2 = company_selected.id_photo_2;
    var url_full_2='';
    var url_thumb_2='';
    if(photo_2 != null && photo_2 != ''){
        var name_photo_2 = photo_2.replace('.jpg', '');
        url_full_2= url_full+name_photo_2+'.jpg';
        url_thumb_2 = url_thumb+name_photo_2+'_th.jpg';
    }
    
    var photo_3 = company_selected.id_photo_3;
    var url_full_3='';
    var url_thumb_3='';
    if(photo_3 != null && photo_3 != ''){
        var name_photo_3 = photo_3.replace('.jpg', '');
        url_full_3= url_full+name_photo_3+'.jpg';
        url_thumb_3 = url_thumb+name_photo_3+'_th.jpg';
    } 
    
    var total=0;
    var content= '<ul id="frontpage-slider" class="aviaslider"><div id="enlarge"></div>';
    
    if(url_full_1 != ''){ 
        total++;
        content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
    }
    
    if(url_full_2 != ''){
        total++;
        content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2+'" alt="'+company_selected.collection_photo_2+'-'+company_selected.format_photo_2+'-'+company_selected.colors_photo_2+'" class="size_iphone" /></a></li>';
    }
    if(url_full_3 != ''){
        total++;
        content += '<li><a href="'+url_full_3+'"><img src="'+url_thumb_3+'" alt="'+company_selected.collection_photo_3+'-'+company_selected.format_photo_3+'-'+company_selected.colors_photo_3+'" class="size_iphone" /></a></li>';
    }
    
    
    if(total < 3){
        if(total == 1){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
        }else if(total == 2){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1+'" alt="'+company_selected.collection_photo_1+'-'+company_selected.format_photo_1+'-'+company_selected.colors_photo_1+'" class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2+'" alt="'+company_selected.collection_photo_2+'-'+company_selected.format_photo_2+'-'+company_selected.colors_photo_2+'" class="size_iphone" /></a></li>';
        }
    }
    
    content +='</ul>';    
    
    
    $('#picture_container').append(content); 
    
         /*
         $('#content').append('<script type="text/javascript" src="js/slider/jquery.js"></script>');
         $('#content').append('<script src="js/slider/jquery.prettyPhoto.js" type="text/javascript"></script>');	
                         
         $('#content').append('<script type="text/javascript" src="js/slider/jquery.aviaSlider.min.js"></script>');
         $('#content').append('<script type="text/javascript" src="js/slider/custom.min.js"></script>');
         */
    
         $('#content').append('<script type="text/javascript" src="libs/klass.min.js"></script>');
         $('#content').append('<script type="text/javascript" src="js/code.photoswipe-3.0.5.min.js"></script>');
	
         $('#content').append('<script type="text/javascript" src="js/script_function.js"></script>');
    
    
    
    $('#second_part_company').append('<div id="title_company"><div id="subitem_company_information" class="subitem-hover"><div class="textSubmenu_company submenu-font-company"> CONTACT </div></div></div>');
    $('#second_part_company').append('<div id="second_content"><div id="second_left"></div><div id="second_right"></div></div>');
    
       
    $('#second_left').append('<div id="title_location">MAIN OFFICE</div>');
    $('#second_left').append('<div id="name_company">'+company_selected.full_name+'</div>');
    $('#second_left').append('<div id="text_address">'+company_selected.address_spain+'</div>');
    $('#second_left').append('<div id="text_cpostal">'+company_selected.code_spain+'</div>');
    $('#second_left').append('<div id="text_city">'+company_selected.city_spain+' ('+company_selected.country_spain+')</div>');
    
    if(company_selected.telephone_spain != null && company_selected.telephone_spain != '--'){
    $('#second_left').append('<div id="first_row" class="contact_row"><div class="image_contact_phone"></div><div class="title_contact">Phone:</div><a href="tel:'+company_selected.telephone_spain+'" class="link_contact">'+company_selected.telephone_spain+'</a></div>');
    }
    if(company_selected.fax_spain!= null && company_selected.fax_spain!= '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_fax"></div><div class="title_contact">Fax:</div><a href="tel:'+company_selected.fax_spain+'" class="link_contact">'+company_selected.fax_spain+'</a></div>'); 
    }
    if(company_selected.fax_spain != null && company_selected.fax_spain != '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_mail"></div><div class="title_contact">Email:</div><a href="mailto:'+company_selected.email_spain+'" class="link_contact">'+company_selected.email_spain+'</a></div>');
    }
    if(company_selected.website != null && company_selected.website != '--'){
    $('#second_left').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="'+company_selected.website+'" class="link_contact">'+company_selected.website+'</a></div>');    
    }
    if(company_selected.latitude != null && company_selected.longitude != null){
    var url_google = "http://maps.google.com/maps?ll="+company_selected.latitude+","+company_selected.longitude+"&z=15";
    
    $('#second_left').append('<div id="last_row" class="contact_row"><div class="image_contact_google"></div><a href="'+url_google+'" class="link_contact">Get directions in Google Maps</a></div>  ');
    }
    
    
    if(company_selected.company_italy != null && company_selected.company_italy != '' &&  company_selected.company_italy != '--'){  
        
        $('#second_right').append('<div id="title_location">CONTACT IN ITALY</div>');
        $('#second_right').append('<div id="name_company">'+company_selected.company_italy+'</div>');
        $('#second_right').append('<div id="text_address">'+company_selected.address_italy+'</div>');
        $('#second_right').append('<div id="text_cpostal">'+company_selected.postal_code_italy+'</div>');
        $('#second_right').append('<div id="text_city">'+company_selected.city_italy+' ('+company_selected.country_italy+')</div>');
    
        if(company_selected.telephone_italy != null && company_selected.telephone_italy != '--'){
        $('#second_right').append('<div id="first_row" class="contact_row"><div class="image_contact_phone"></div><div class="title_contact">Phone:</div><a href="tel:'+company_selected.telephone_italy+'" class="link_contact">'+company_selected.telephone_italy+'</a></div>');    
        }
        if(company_selected.email_italy != null && company_selected.email_italy != '--'){
        $('#second_right').append('<div class="contact_row"><div class="image_contact_mail"></div><div class="title_contact">Email:</div><a href="mailto:'+company_selected.email_italy+'" class="link_contact">'+company_selected.email_italy+'</a></div>');    
        }
        if(company_selected.website != null && company_selected.website != '--'){
        $('#second_right').append('<div class="contact_row"><div class="image_contact_web"></div><div class="title_contact">Web:</div><a href="'+company_selected.website+'" class="link_contact">'+company_selected.website+'</a></div>');    
        }        


    }
};


String.prototype.startsWith = function(str) 
{return (this.match("^"+str)==str)};


//Function to set company as favorite
favorited= function(id_company) {
    var current_class= document.getElementById("star_"+id_company).className;
    //alert(current_class);
    
    var flag;
    
    if(current_class == "favorited"){
        Change_Class("star_"+id_company, "no-favorited");
        flag = 1;
    }else if(current_class == "favorited-company"){
        Change_Class("star_"+id_company, "no-favorited-company");
        flag = 1;
    }else if(current_class == "favorited-favourites"){
        Change_Class("star_"+id_company, "no-favorited-favourites");
        flag = 1;
    }else if(current_class == "no-favorited-company"){
        Change_Class("star_"+id_company, "favorited-company");
        flag = 0;
    }else{
        Change_Class("star_"+id_company, "favorited");
        flag = 0;
    }
    
    
    favorited_company_id = id_company;
    if(flag == 0){
        insertCompanyIntoFavorites();
    }
    else{
        removeCompanyFromFavorites();
    }
          
}
Change_Class = function (My_Element, My_Class) {
    
    setTimeout(function(){
               document.getElementById(My_Element).setAttribute("class", My_Class);
           
               },1000);
    };




function isTouchDevice(){
	/* Added Android 3.0 honeycomb detection because touchscroll.js breaks
		the built in div scrolling of android 3.0 mobile safari browser */
	if((navigator.userAgent.match(/android 3/i)) ||
		(navigator.userAgent.match(/honeycomb/i)))
		return false;
	try{
		document.createEvent("TouchEvent");
		return true;
	}catch(e){
		return false;
	}
}

function touchScroll(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPosY=0;
		var scrollStartPosX=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPosY=this.scrollTop+event.touches[0].pageY;
			scrollStartPosX=this.scrollLeft+event.touches[0].pageX;
			//event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			// These if statements allow the full page to scroll (not just the div) if they are
			// at the top of the div scroll or the bottom of the div scroll
			// The -5 and +5 below are in case they are trying to scroll the page sideways
			// but their finger moves a few pixels down or up.  The event.preventDefault() function
			// will not be called in that case so that the whole page can scroll.
			if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
				this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
				(this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
					event.preventDefault();	
			if ((this.scrollLeft < this.scrollWidth-this.offsetWidth &&
				this.scrollLeft+event.touches[0].pageX < scrollStartPosX-5) ||
				(this.scrollLeft != 0 && this.scrollLeft+event.touches[0].pageX > scrollStartPosX+5))
					event.preventDefault();	
			this.scrollTop=scrollStartPosY-event.touches[0].pageY;
			this.scrollLeft=scrollStartPosX-event.touches[0].pageX;
		},false);
	}
}

function touchScrollVertical(id){
	if(isTouchDevice()){ //if touch events exist...
		var el=document.getElementById(id);
		var scrollStartPosY=0;

		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPosY=this.scrollTop+event.touches[0].pageY;
			//event.preventDefault(); // Keep this remarked so you can click on buttons and links in the div
		},false);

		document.getElementById(id).addEventListener("touchmove", function(event) {
			// These if statements allow the full page to scroll (not just the div) if they are
			// at the top of the div scroll or the bottom of the div scroll
			// The -5 and +5 below are in case they are trying to scroll the page sideways
			// but their finger moves a few pixels down or up.  The event.preventDefault() function
			// will not be called in that case so that the whole page can scroll.
			if ((this.scrollTop < this.scrollHeight-this.offsetHeight &&
				this.scrollTop+event.touches[0].pageY < scrollStartPosY-5) ||
				(this.scrollTop != 0 && this.scrollTop+event.touches[0].pageY > scrollStartPosY+5))
					event.preventDefault();	

			this.scrollTop=scrollStartPosY-event.touches[0].pageY;
		},false);
	}
}