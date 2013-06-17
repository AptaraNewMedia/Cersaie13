/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
  var shortName = 'ascer'; 
            var version = '1.0'; 
            var displayName = 'ASCER Database'; 
            var maxSize = 2000000; // in bytes 
			var tempcompanies=[];
			
			
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
         mydb = openDatabase(shortName, version, displayName, maxSize);
            
            
				window.setTimeout(function(){
					 mydb.transaction(
                                 function(transaction) {
                                 
                                 var sql = "CREATE TABLE IF NOT EXISTS companies(company_id integer PRIMARY KEY, full_name VARCHAR,short_name VARCHAR,initial VARCHAR,address_spain VARCHAR,code_spain VARCHAR,city_spain VARCHAR,state_spain VARCHAR,country_spain VARCHAR,telephone_spain VARCHAR,email_spain VARCHAR,fax_spain VARCHAR,website VARCHAR,hall VARCHAR,stand VARCHAR,coord_x VARCHAR,coord_y VARCHAR,mr_ms VARCHAR,manager VARCHAR,company_italy VARCHAR,person_italy VARCHAR,products VARCHAR,novelties VARCHAR,collection_photo_1 VARCHAR,format_photo_1 VARCHAR,serie_photo_1 VARCHAR,colors_photo_1 VARCHAR,id_photo_1 VARCHAR,collection_photo_2 VARCHAR,format_photo_2 VARCHAR,serie_photo_2 VARCHAR,colors_photo_2 VARCHAR,id_photo_2 VARCHAR,collection_photo_3 VARCHAR,format_photo_3 VARCHAR,serie_photo_3 VARCHAR,colors_photo_3 VARCHAR,id_photo_3 VARCHAR,logo_id VARCHAR,address_italy VARCHAR,city_italy VARCHAR,state_italy VARCHAR,country_italy VARCHAR,telephone_italy VARCHAR,email_italy VARCHAR,postal_code_italy VARCHAR,company_type VARCHAR,latitude VARCHAR,longitude VARCHAR,favorited NUMERIC) ";  
                                 
                                 transaction.executeSql(sql);
                                 },errorCB, successCB1);
								 
					},1000);
		
    }
};


function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB1() {
   console.log("DB creation success!");
	//initDB();
	
	if(localStorage.insertedData==undefined || localStorage.insertedData==null || localStorage.insertedData==""){
					
					
					localStorage.setItem("insertedData",1);
					
					
										
													 
				
							 $.getJSON("companies.json",function(data){
          
								  // alert(data.length);
								  for (var i=0; i<data.length; i++) {
								  var row = data[i];
								  tempcompanies[i]= row;
								  
								  }			
											// alert(tempcompanies[i].company_id);
											insQuery="INSERT INTO companies (company_id, full_name,short_name,initial,address_spain,code_spain,city_spain,state_spain,country_spain,telephone_spain,email_spain,fax_spain,website,hall,stand,coord_x,coord_y,mr_ms,manager,company_italy,person_italy,products,novelties,collection_photo_1,format_photo_1,serie_photo_1,colors_photo_1,id_photo_1,collection_photo_2,format_photo_2,serie_photo_2,colors_photo_2,id_photo_2,collection_photo_3,format_photo_3,serie_photo_3,colors_photo_3,id_photo_3,logo_id,address_italy,city_italy,state_italy,country_italy,telephone_italy,email_italy,postal_code_italy,company_type,latitude,longitude,favorited) VALUES (";
											var result="";
						mydb = openDatabase(shortName, version, displayName, maxSize);					 
						mydb.transaction(
							function(transaction) {
														 	  
								for (var i=0; i<tempcompanies.length; i++) {
												 result=tempcompanies[i].company_id+",'"+tempcompanies[i].full_name+"', '"+tempcompanies[i].short_name+"', '"+tempcompanies[i].initial+"', '"+tempcompanies[i].address_spain+"', '"+tempcompanies[i].code_spain+"', '"+tempcompanies[i].city_spain+"', '"+tempcompanies[i].state_spain+"', '"+tempcompanies[i].country_spain+"', '"+tempcompanies[i].telephone_spain+"', '"+tempcompanies[i].email_spain+"', '"+tempcompanies[i].fax_spain+"', '"+tempcompanies[i].website+"', "+tempcompanies[i].hall+", '"+tempcompanies[i].stand+"', "+tempcompanies[i].coord_x+", "+tempcompanies[i].coord_y+", '"+tempcompanies[i].mr_ms+"', '"+tempcompanies[i].manager+"', '"+tempcompanies[i].company_italy+"', '"+tempcompanies[i].person_italy+"','"+tempcompanies[i].products+"', '"+tempcompanies[i].novelties+"', '"+tempcompanies[i].collection_photo_1+"', '"+tempcompanies[i].format_photo_1+"', '"+tempcompanies[i].serie_photo_1+"', '"+tempcompanies[i].colors_photo_1+"', '"+tempcompanies[i].id_photo_1+"', '"+tempcompanies[i].collection_photo_2+"', '"+tempcompanies[i].format_photo_2+"', '"+tempcompanies[i].serie_photo_2+"', '"+tempcompanies[i].colors_photo_2+"', '"+tempcompanies[i].id_photo_2+"', '"+tempcompanies[i].collection_photo_3+"', '"+tempcompanies[i].format_photo_3+"', '"+tempcompanies[i].serie_photo_3+"', '"+tempcompanies[i].colors_photo_3+"', '"+tempcompanies[i].id_photo_3+"', '"+tempcompanies[i].logo_id+"', '"+tempcompanies[i].address_italy+"', '"+tempcompanies[i].city_italy+"', '"+tempcompanies[i].state_italy+"', '"+tempcompanies[i].country_italy+"', '"+tempcompanies[i].telephone_italy+"', '"+tempcompanies[i].email_italy+"', '"+tempcompanies[i].postal_code_italy+"', "+tempcompanies[i].company_type+", "+tempcompanies[i].latitude+", "+tempcompanies[i].longitude+", "+tempcompanies[i].favorited;
											 
											
											sqlQuery=insQuery+result+")";
																// console.log(sqlQuery);
																													
											transaction.executeSql(sqlQuery);
											
											}//end of for loop
										}, errorHandler,succesInsert);//mydb
													
														
									
												 
						});//End of getjson				
					
					}else{
					initDB();
					}
}
	
	
	function succesInsert(){
	
	console.log("insert success");
	initDB();
	}					
	
	
