
/******************************  MODEL *******************************************/
var filter_selected= '#subitem1';
var filter_map_selected='generalMapItem';
var mydb=false;
var companies = []; 

var imageURI="data:image/jpeg;base64,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";


var hallArr=[14,15,18,19,20,21,22,25,26,29,30,33,34,35,36,44,45]
var currentMapId=0;


// initialise the database
initDB = function() {
    try { 
        if (!window.openDatabase) { 
            alert('not supported'); 
        } else { 
            var shortName = 'ascer'; 
            var version = '1.0'; 
            var displayName = 'ASCER Database'; 
            var maxSize = 200000; // in bytes 
            mydb = openDatabase(shortName, version, displayName, maxSize);
            
            try {
				
				//document.addEventListener("backbutton", backbuttonPressFunction, false);


				
                mydb.transaction(
                                 function(transaction) {
                                 
                                 var sql = "UPDATE companies SET stand = 'C35' " +
                                 "WHERE company_id = 14838";  
                                 
                                 transaction.executeSql(sql, null, null, errorHandler);
                                 });
                
            } catch(e) {
                alert(e.message);
            }    
            
            findByName("");
        }
    } catch(e) { 
        // Error handling code goes here. 
        if (e == INVALID_STATE_ERR) { 
            // Version number mismatch. 
            alert("Invalid database version."); 
        } else { 
            alert("Unknown error "+e+"."); 
        } 
        return; 
    } 
};

// db error handler - prevents the rest of the transaction going ahead on failure
errorHandler = function (transaction, error) { 
    // returns true to rollback the transaction
    return true;  
} 

// null db data handler
nullDataHandler = function (transaction, results) { } 


function alertDismissed() {
    // hacer algo
}


backbuttonPressFunction=function(){
	
	window.location.href="index.html";
	
	};

// callback function to retrieve the data from the prefs table
companiesDataHandler=function(transaction, results) {
    
    // Handle the results 
    companies = [];  
    // alert(results.rows.length);  
	setTimeout(function(){
						
						 for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        companies[i]= row;
    } 
	
   
           
    $('#slider').sliderNav();
	
	},100);
    
}

// callback function to retrieve the data from the prefs table
companiesFavouritesDataHandler=function(transaction, results) {
    
    // Handle the results 
    
    companies = [];  
    
    //alert(results.rows.length);
    setTimeout(function(){
						
						for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        companies[i]= row;
    } 
    
    $('#slider').sliderNavFavourites();
	
						},1000)
    
    
}

companySelectedDataHandler=function(transaction, results) {
        
    var row = results.rows.item(0); 
   
    loadCompany(row);       
}

// callback function to retrieve the data from the prefs table
hallDataHandler=function(transaction, results) {
    
    // Handle the results 
    
    companies = [];  
    
    //alert(results.rows.length);
    
    for (var i=0; i<results.rows.length; i++) { 
        var row = results.rows.item(i); 
        companies[i]= row;
        
        var generalMap= $('#pavilion'+row.hall+'Map');
        //alert(row.favorited);
        //*********************************************************************************//
        var pos_x=row.coord_x;
        var pos_y=row.coord_y;        
        
        if(row.hall == 26){
            pos_y= (parseInt(row.coord_y)*3)+(i*-36); // RESTO 235 para el pabellon 14, ver si la resta lo hace igual
            pos_x = row.coord_x * 3; //RESTO 30 para el pabellon 14, ver si la resta lo hace igual
            pos_y += 10;
        }else if(row.hall == 25){
            //IMPORTANTE REVISAR SI ESTO FUNCIONA EN TODOS LOS CASOS
            pos_y= (parseInt(row.coord_y)*2)+(i*-36); // RESTO 235 para el pabellon 14, ver si la resta lo hace igual
            pos_x = row.coord_x * 2; //RESTO 30 para el pabellon 14, ver si la resta lo hace igual
            pos_y += 10;
        }else{
        //IMPORTANTE REVISAR SI ESTO FUNCIONA EN TODOS LOS CASOS
            pos_y= parseInt(row.coord_y)+(i*-36); // RESTO 235 para el pabellon 14, ver si la resta lo hace igual
            pos_x = row.coord_x; //RESTO 30 para el pabellon 14, ver si la resta lo hace igual
        }
        
        pos_y -= 25;
        pos_x -= 20;

        if(row.hall == 14){
            pos_y -= 205;
            pos_x -= 10;

        }
        //*********************************************************************************//
        
        $(generalMap).append('<div style = "left: '+pos_x+'px; position: relative; top: '+pos_y+'px; width: 37px; height: 36px;"><a href="#" onclick="gotoCompanyFromMap('+row.company_id+')"><div class="hotpot"></div></a><div id="stand_name">'+row.short_name+'</div></div>');

		if(row.favorited==1)
		{
			$(".hotpot").html("<img src='star-big.png' style='padding:7px 0px 0px 8px;width:20px;height:20px' />");
		}
    } 
    
}


// load the currently selected icons
findByName= function(key) {
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE short_name LIKE ? " +
                         "ORDER BY initial ASC";
                         
                         if(filter_selected == '#subitem2'){
                            sql = "SELECT * " +
                            "FROM companies " + 
                            "WHERE short_name LIKE ? AND company_type=1 " +
                            "ORDER BY initial ASC";
                         }else if(filter_selected == '#subitem3'){
                            sql = "SELECT * " +
                            "FROM companies " +
                            "WHERE short_name LIKE ? AND company_type=2 " +
                            "ORDER BY initial ASC";
                         }else if(filter_selected == '#subitem4'){
                            sql = "SELECT * " +
                            "FROM companies " +
                            "WHERE short_name LIKE ? AND company_type=3 " +
                            "ORDER BY initial ASC";
                         }
                         
						// console.log("query-----------"+sql);
						 
                         transaction.executeSql(sql, ['%' + key + '%'], companiesDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

getFavourites= function() {
    
    initDB();
    
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE favorited = 1 " +
                         "ORDER BY initial ASC";                         
                         
                         transaction.executeSql(sql, [], companiesFavouritesDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

getCompanyById= function(id_company) {
    
    initDB();
        
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE company_id = "+id_company;     
                         
                         transaction.executeSql(sql, [], companySelectedDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

findByHall= function(hall) {
    //alert(hall);
    try {
        mydb.transaction(
                         function(transaction) {
                         
                         var sql = "SELECT * " +
                         "FROM companies " +
                         "WHERE hall = "+hall;
                         
                         transaction.executeSql(sql, [], hallDataHandler, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }    
};

/*! If a deletion resulted in a change in the list of files, redraw the "Choose a file" pane. */
function UpdateResults(transaction, results)
{
    if (results.rowsAffected) {
    }
}


favorited= function(id_company) {
    
    var current_class= document.getElementById("star_"+id_company).className; 
    
    var sql = "UPDATE companies SET favorited = 1 " +
    "WHERE company_id = "+id_company;

    
    if(current_class == "favorited"){
        Change_Class("star_"+id_company, "no-favorited");  
        sql = "UPDATE companies SET favorited = 0 " +
        "WHERE company_id = "+id_company;
    }else if(current_class == "favorited-company"){
        Change_Class("star_"+id_company, "no-favorited-company");  
        sql = "UPDATE companies SET favorited = 0 " +
        "WHERE company_id = "+id_company;
    }else if(current_class == "favorited-favourites"){
        Change_Class("star_"+id_company, "no-favorited-favourites");  
        sql = "UPDATE companies SET favorited = 0 " +
        "WHERE company_id = "+id_company;
    }else if(current_class == "no-favorited-company"){
        Change_Class("star_"+id_company, "favorited-company");  
    }else{
        Change_Class("star_"+id_company, "favorited");   
    }    
    
    try {
        mydb.transaction(
                         function(transaction) {   
                         
                         transaction.executeSql(sql, [], UpdateResults, errorHandler);
                         });
        
    } catch(e) {
        alert(e.message);
    }  

    

};


$("#buttonList").live("click",function(){
									  // alert("click");
									  setTimeout(function(){
														  
														  findByName("");
														  
														  },100)
		 
});

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

changeFilter = function(element){
    var current_filer='#'+element;
    if(filter_selected != current_filer){
        $(filter_selected).removeClass('subitem-hover');
        filter_selected=current_filer;
        $(filter_selected).addClass('subitem-hover');
    }
    
    search();
};


gotoCompanyFromList = function(company_id){

    window.location.href = "company.html?id="+company_id+"-index";
    
}

gotoCompanyFromFavouriteList = function(company_id){
    
    window.location.href = "company.html?id="+company_id+"-favourite_list";
    
}

gotoCompanyFromMap = function(company_id){
    
    window.location.href = "company.html?id="+company_id+"-map";
    
}


goToMapFromExterna = function(element){
            
    window.location.href = "map.html?id="+element; 
    
};



gotoMap = function(element) {
	
	
    
    var current_filer='#'+element;
    if(filter_map_selected != current_filer){
            
        $(filter_map_selected).removeClass('subitem-hover');
        $(filter_map_selected).removeClass('subitem-hover-bajo');
        var class_name= 'subitem-hover';
            switch(parseInt(element)){
                
                case 29:
                case 30:
                case 33:
                case 34:
                case 35:
                case 36:
                case 44:
                case 45:
                    class_name = 'subitem-hover-bajo'
                break;                
            }            
        
        
        filter_map_selected=current_filer;
        $(filter_map_selected).addClass(class_name);

        var mapContainer= $('#mapContainer');
        $(mapContainer).empty();
        
        var leftMap= $('#leftMap');	
        var height = $(leftMap).height();
        $('#mapContainer').css('height',height);


        if(element == "generalMapItem"){
            loadGeneralMap();
        }else{
            
            $(mapContainer).append('<div id="pavilion'+element+'Map" class=""></div>');
            
			if(element==14)
			{
				$("#prev").hide();
				$("#next").show();
			}
			if(element==45)
			{
				$("#next").hide();
				$("#prev").show();
			}
			if(element<45 && element>14)
			{
				$("#prev").show();
				$("#next").show();
				}
			
			currentMapId=hallArr.indexOf(element);
			
            findByHall(element);
			
        }
    }
};


Change_Class = function (My_Element, My_Class) { 
    document.getElementById(My_Element).setAttribute("class", My_Class); 
};

loadGeneralMap= function() {
    
    var mapContainer= $('#mapContainer');
    $(mapContainer).append('<div id="generalMap" class=""></div>');
    
    var generalMap= $('#generalMap');
    $(generalMap).append('<div id="hall15Container"><a href="#" onclick="gotoMap(15)" onmouseover="Change_Class(\'hall15\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall15\',\'hotpot\')"><div id="hall15" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall20Container"><a href="#" onclick="gotoMap(20)" onmouseover="Change_Class(\'hall20\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall20\',\'hotpot\')"><div id="hall20" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall14Container"><a href="#" onclick="gotoMap(14)" onmouseover="Change_Class(\'hall14\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall14\',\'hotpot\')"><div id="hall14" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall18Container"><a href="#" onclick="gotoMap(18)" onmouseover="Change_Class(\'hall18\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall18\',\'hotpot\')"><div id="hall18" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall19Container"><a href="#" onclick="gotoMap(19)" onmouseover="Change_Class(\'hall19\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall19\',\'hotpot\')"><div id="hall19" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall21Container"><a href="#" onclick="gotoMap(21)" onmouseover="Change_Class(\'hall21\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall21\',\'hotpot\')"><div id="hall21" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall22Container"><a href="#" onclick="gotoMap(22)" onmouseover="Change_Class(\'hall22\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall22\',\'hotpot\')"><div id="hall22" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall25Container"><a href="#" onclick="gotoMap(25)" onmouseover="Change_Class(\'hall25\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall25\',\'hotpot\')"><div id="hall25" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall26Container"><a href="#" onclick="gotoMap(26)" onmouseover="Change_Class(\'hall26\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall26\',\'hotpot\')"><div id="hall26" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall34Container"><a href="#" onclick="gotoMap(34)" onmouseover="Change_Class(\'hall34\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall34\',\'hotpot\')"><div id="hall34" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall36Container"><a href="#" onclick="gotoMap(36)" onmouseover="Change_Class(\'hall36\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall36\',\'hotpot\')"><div id="hall36" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall44Container"><a href="#" onclick="gotoMap(44)" onmouseover="Change_Class(\'hall44\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall44\',\'hotpot\')"><div id="hall44" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall45Container"><a href="#" onclick="gotoMap(45)" onmouseover="Change_Class(\'hall45\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall45\',\'hotpot\')"><div id="hall45" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall29Container"><a href="#" onclick="gotoMap(29)" onmouseover="Change_Class(\'hall29\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall29\',\'hotpot\')"><div id="hall29" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall30Container"><a href="#" onclick="gotoMap(30)" onmouseover="Change_Class(\'hall30\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall30\',\'hotpot\')"><div id="hall30" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall33Container"><a href="#" onclick="gotoMap(33)" onmouseover="Change_Class(\'hall33\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall33\',\'hotpot\')"><div id="hall33" class="hotpot"></div></a></div>');
    $(generalMap).append('<div id="hall35Container"><a href="#" onclick="gotoMap(35)" onmouseover="Change_Class(\'hall35\',\'hotpot-selected\')" onmouseout="Change_Class(\'hall35\',\'hotpot\')"><div id="hall35" class="hotpot"></div></a></div>');


			mydb.transaction(
					 function(transaction)
					 {
						var sql="SELECT hall FROM companies where favorited=1" ;
						
						transaction.executeSql(sql, [], listFavoriteSuccess, errorHandler);
					 }
					 );

};

listFavoriteSuccess=function(tx, results) {
   // console.log("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
   
   setTimeout(function(){
					   
   for (var i=0; i<results.rows.length; i++) { 
		var row = results.rows.item(i); 
		//console.log("----"+row.hall);
		//companies[i]= row;
		$("#hall"+row.hall).html("<img src='star-big.png' style='padding:7px 0px 0px 8px;width:20px;height:20px' />");
	} 
   
   },1000);   
   
};


listEmailFavoriteSuccess=function(tx, results) {

   // console.log("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
   var content="<table border='1' cellspacing='1' cellspadding='5'><tr><td>Company Id</td><td>Company Name</td><td>Hall Id</td><td>Stand</td></tr>";
   var data="";
   setTimeout(function(){
					   
   for (var i=0; i<results.rows.length; i++) { 
		var row = results.rows.item(i); 
		//console.log("----"+row.hall);
		//companies[i]= row;
		data=data+"<tr><td>"+row.company_id+"</td><td>"+row.short_name+"</td><td>"+row.hall+"</td><td>"+row.stand+"</td></tr><br/>";
		
	} 
    content=content+data+"</table>";
	//alert(content);
	

	
	 window.plugins.emailComposer.showEmailComposerWithCallback(null,"Favorite List","Below are the favorited items:<br/>"+content,[],[],[],true,[]);   
   },1000);
  
   
  
   
};

$("#share").live("click",function(){
	
	mydb.transaction(
					 function(transaction)
					 {
						var sql="SELECT * FROM companies where favorited=1" ;
						
						transaction.executeSql(sql, [], listEmailFavoriteSuccess, errorHandler);
					 }
					 );
					 

});

$("#shareCompany").live("click",function(){
										 		 
		    var imgIds = [];//new Array();
			var content=$("#company_information").html()+"<img src='"+imageURI+"' />";
			
			setTimeout(function(){							 
                   //    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
                     //  window.resolveLocalFileSystemURI("arrow.png", onResolveSuccess, fail);
//                        window.plugins.emailComposer.showEmailComposerWithCallback(null,"Company Information",content,[],[],[],true,[]);
                       },1000);
                        
                        var url = "http://indecortech.com/developpradeep/cersaie/sendEmail.php";
                        
//    //Call Webservice to send email.
//    $.getJSON(url, function(data) {
//              
//              alert(data.Response);
//                                  
//                                  })
//                        .done(function() {
//                              
//                              
//                              })
//                        .fail(function() { alert( "error" ); })
//                        .always(function() { alert( "complete" ); });
                        
                        
   var ref = window.open('https://www.facebook.com/sharer/sharer.php?u=www.demosmedpub.com/prod.aspx?prod_id=9781620700020', '_blank', 'location=yes');

});

function onFileSystemSuccess(fileSystem) {
    console.log(fileSystem.name);
    console.log(fileSystem.root.fullPath);
}

function onResolveSuccess(fileEntry) {
    console.log(fileEntry.name);
}

function fail(evt) {
    console.log(evt.code);
}

function getBase64FromImageUrl(URL) {
    var img = new Image();
    img.src = URL;
	var dataURL;
    img.onload = function () {


    var canvas = document.createElement("canvas");
    canvas.width =this.width;
    canvas.height =this.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);


    dataURL = canvas.toDataURL("image/png");

    //alert(  dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
	

    }
	//alert(dataURL);
	return dataURL;
}
$("#next").live("click",function(){
						//hallArr		
					//currentMapId=hallArr.indexOf(currentMapId);
					
			if(hallArr[currentMapId+1]==45)
			{
				$("#next").hide();
			}else{
				$("#prev").show();
				}
					gotoMap(hallArr[currentMapId+1]);
					
								});

$("#prev").live("click",function(){
					
					if(hallArr[currentMapId-1]==14)
			{
				$("#prev").hide();
			}
			else{
				$("#next").show();
				}
			
					gotoMap(hallArr[currentMapId-1]);
					
								});


loadCompany = function(company_selected){
    
    console.log(company_selected.logo_id.replace(" ",""));
  
    
    
    
    
    //alert(company_selected.logo_id.replace(" ",""));
    if(origen == 'map'){
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html?hall='+company_selected.hall+'">BACK</a>');
    }else{
        $('#mainMenu').append('<a id="buttonBack" href="'+origen+'.html">BACK</a>');
    }
    $('#mainMenu').append('<div id="ascerLogo"></div>');
   
    
    var contenedor = '#first_left';
    var classFavorited="no-favorited-company";
    var functionVar= "favorited("+company_selected.company_id+")";
    
    if(company_selected.favorited==1){
        classFavorited="favorited-company";
    }
    
    //$('#company_information').append('<div id="location_content"></div>');
    
    $('#location_content').append('<div id="icon-map"></div>');
    $('#location_content').append('<a href="#" onclick="goToMapFromExterna('+company_selected.hall+')"><div id="hall_title"> Hall '+company_selected.hall+',</div></a>');
    $('#location_content').append('<div id="stand_title"> Stand '+company_selected.stand+'</div><div id="logo_company"><img src="css/images/logo/'+company_selected.logo_id.replace(" ","").toUpperCase()+'"/></div><div id="star_container"><a href="#" onClick="'+functionVar+'"><div id="star_'+company_selected.company_id+'" class="'+classFavorited+'"></div></a></div>');
    
    //$(contenedor).append('<div id="logo_company"><img src="css/images/logo/'+company_selected.logo_id.replace(" ","").toUpperCase()+'"/></div>');
    
    
    
    
  
    //$(contenedor).append('<div id="star_container"><a href="#" onClick="'+functionVar+'"><div id="star_'+company_selected.company_id+'" class="'+classFavorited+'"></div></a></div>');
    
    $('#mainMenu').append('<div id="secondaryMenu"><div id="subitem_company" class="subitem-hover"></div><div id="subitem_company" class="subitem-hover" style="float:right;margin-right:10px;padding:10px 10px 0px;width:50px;"><a href="#" id="shareCompany" style="text-decoration:none;margin-left:10px;color:#fff;font-size:18px;">Share</div></div>');    
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
        content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
    }
    
    if(url_full_2 != ''){
        total++;
        content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2.replace(" ","")+'" class="size_iphone" /></a></li>';
    }
    if(url_full_3 != ''){
        total++;
        content += '<li><a href="'+url_full_3+'"><img src="'+url_thumb_3.replace(" ","")+'" class="size_iphone" /></a></li>';
    }
    
    
    if(total < 3){
        if(total == 1){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
        }else if(total == 2){
            content += '<li><a href="'+url_full_1+'"><img src="'+url_thumb_1.replace(" ","")+'"  class="size_iphone" /></a></li>';
            content += '<li><a href="'+url_full_2+'"><img src="'+url_thumb_2.replace(" ","")+'" class="size_iphone" /></a></li>';
        }
    }
    
    content +='</ul>';
    
    console.log($.trim(url_thumb_1.replace(" ","")));
    console.log(url_thumb_2.replace(" ",""));
    console.log(url_thumb_3.replace(" ",""));
    
    
    //$('#picture_container').append(content);
    $('#first_right').append($('#picture_container').append(content));
    
    
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
        
		var textShow='';
		
		
        
        var finUL=false;
        if(companies.lenght > 0){
            content+='<ul>';
            finUL= true;
        }
		if(companies.length>0)
		{
        console.log("before while====="+companies[0].initial.startsWith(o.items[i]));
		if(companies[0].initial.startsWith(o.items[i]))
		{
			textShow='<li id="'+o.items[i]+'"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
		}else
		{
			textShow='<li id="'+o.items[i]+'" style="display:none;"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
		}
		}
		content+=textShow;//'<li id="'+o.items[i]+'"><div><a name="'+o.items[i]+'" class="title">'+o.items[i]+'</a></div>';
		
        while(companies.length>0){
			//console.log(companies[0].initial+"=-===="+companies[0].short_name);
			
            if(companies[0].initial.startsWith(o.items[i])){ 
                var classFavorited="no-favorited";
                var functionVar= "favorited("+companies[0].company_id+")";
                
                if(companies[0].favorited==1){
                    classFavorited="favorited";
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
                
                                    '<a href="#" onclick="gotoCompanyFromList('+companies[0].company_id+')"><div class="arrow"></div> '+
                
                                    '<div class="situation">'+
                                        '<div class="hall rowsubtitle"> Hall '+companies[0].hall+'</div>'+
                                        '<div class="stand rowsubtitle"> Stand '+companies[0].stand+'</div>'+
                                    '</div></a>'+
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
     
	
	}//end of for
    $('.slider-content ul', slider).append(content);
   //console.log("all contentssss==="+$('.slider-content').html())
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
    
    var type_comp= 'Others';
    if(companies[0].company_type == '1'){
        type_comp= 'Ceramic tiles';
    }else if(companies[0].company_type == '2'){
        type_comp= 'Sanitaryware';
    }
    
    while(companies.length>0){
        var classFavorited="favorited-favourites";
        var functionVar= "favorited("+companies[0].company_id+");";
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


String.prototype.startsWith = function(str) 
{return (this.match("^"+str)==str)};

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