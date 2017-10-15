$(document).ready(function(){
	if(parseInt($(".js_numbers").find("span").html()) == 2){
		$("select").change(function(){
		    if (($(this).children(":selected").val() == "sale") || ($(this).children(":selected").val() == "transfer")){
	    		$(".attributes_searchbar").find("div").eq(4).attr("class", "show salepricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(5).attr("class", "show salepriceto col-md-2");
	    		$(".attributes_searchbar").find("div").eq(6).attr("class", "hidden rentpricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(7).attr("class", "hidden rentpriceto col-md-2");
	    	}
	    	else if ($(this).children(":selected").val() == "rent"){
	    		$(".attributes_searchbar").find("div").eq(4).attr("class", "hidden salepricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(5).attr("class", "hidden salepriceto col-md-2");
	    		$(".attributes_searchbar").find("div").eq(6).attr("class", "show rentpricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(7).attr("class", "show rentpriceto col-md-2");
	    	}
	    	else if (($(this).children(":selected").val() == "sale_rent") || ($(this).children(":selected").val() == "rent_sale_option")){
	    		$(".attributes_searchbar").find("div").eq(4).attr("class", "show salepricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(5).attr("class", "show salepriceto col-md-2");
	    		$(".attributes_searchbar").find("div").eq(6).attr("class", "show rentpricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(7).attr("class", "show rentpriceto col-md-2");
	    	}
	    	else if ($(this).children(":selected").val() == "operation"){
	    		$(".attributes_searchbar").find("div").eq(4).attr("class", "hidden salepricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(5).attr("class", "hidden salepriceto col-md-2");
	    		$(".attributes_searchbar").find("div").eq(6).attr("class", "hidden rentpricefrom col-md-2");
	    		$(".attributes_searchbar").find("div").eq(7).attr("class", "hidden rentpriceto col-md-2");
	    	}
		    
			
		    
		});

		}
});



$(document).ready(function(){
	if(parseInt($(".js_numbers").find("span").html()) == 3){
		
		var wordtocut =  "";
		var number = 0;
		
		for (i = 0; i < 6; i++) {
			wordtocut =  $(".top_description").find("#internet_description1").eq(i).html();
			
			if (wordtocut.length > 150){
				$(".top_description").find("#internet_description1").eq(i).html(wordtocut.substring(0, 151) + "...");
				
			}
			
		}
		
		}
});



//a partir de aqui es el mapa individual
$(window).load(function(){
    if(parseInt($(".js_numbers").find("span").html()) == 1){
    	
     var long = $("#maps").find("span").eq(0).html();
     var latit = $("#maps").find("span").eq(1).html();
     var map = new L.Map('map');   
        
 	 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
       maxZoom: 18
     }).addTo(map);
     map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

     var centeroflocations = new L.LatLng(parseFloat(long),parseFloat(latit)); 
     map.setView(centeroflocations, 13);
    
     // Define an array. This could be done in a seperate js file.
     // This tidy formatted section could even be generated by a server-side script
     // or fetched seperately as a jsonp request.
     var markerLocation = new L.LatLng(parseFloat(long), parseFloat(latit));
     var marker = new L.Marker(markerLocation);
     map.addLayer(marker);
        
     if ($(window).width() < 768){
    	 var toPrecision = zoomPrecision(15);
			lat = toPrecision(long);
			lon = toPrecision(latit);
			$("#maps").find("a").attr("class", "show urltomaps");
			$("#maps").find("a").attr("href", " http://osm.org/go/" + makeShortCode(lat, lon, 15) + "==?m");
			$("#probandoo").find("div").attr("class", "hidden");
		}  
     }
    
});
function zoomPrecision(zoom) {
    var decimals = Math.pow(10, Math.floor(zoom/3));
    return function(x) {
         return Math.round(x * decimals) / decimals;
    };
}
function interlace(x, y) {
    x = (x | (x << 8)) & 0x00ff00ff;
    x = (x | (x << 4)) & 0x0f0f0f0f;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00ff00ff;
    y = (y | (y << 4)) & 0x0f0f0f0f;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return (x << 1) | y;
}

/*
 * Called to create a short code for the short link.
 */
function makeShortCode(lat, lon, zoom) {
    char_array = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_~";
    var x = Math.round((lon + 180.0) * ((1 << 30) / 90.0));
    var y = Math.round((lat +  90.0) * ((1 << 30) / 45.0));
    // JavaScript only has to keep 32 bits of bitwise operators, so this has to be
    // done in two parts. each of the parts c1/c2 has 30 bits of the total in it
    // and drops the last 4 bits of the full 64 bit Morton code.
    var str = "";
    var c1 = interlace(x >>> 17, y >>> 17), c2 = interlace((x >>> 2) & 0x7fff, (y >>> 2) & 0x7fff);
    for (var i = 0; i < Math.ceil((zoom + 8) / 3.0) && i < 5; ++i) {
        digit = (c1 >> (24 - 6 * i)) & 0x3f;
        str += char_array.charAt(digit);
    }
    for (var i = 5; i < Math.ceil((zoom + 8) / 3.0); ++i) {
        digit = (c2 >> (24 - 6 * (i - 5))) & 0x3f;
        str += char_array.charAt(digit);
    }
    for (var i = 0; i < ((zoom + 8) % 3); ++i) {
        str += "-";
    }
    return str;
}

//a partir de aqui es el mapa general
$(window).load(function(){
     if(parseInt($(".js_numbers").find("span").html()) == 2){
    	 
    	 var topidsfromview=$(".invisible_tops_ids").find("span").html();
     	 while (topidsfromview.indexOf('[') != -1)
     		topidsfromview = topidsfromview.replace('[' , '');
     	 while (topidsfromview.indexOf(']') != -1)
     		topidsfromview = topidsfromview.replace(']' , '');
     	 while (topidsfromview.indexOf("u'") != -1)
     		topidsfromview = topidsfromview.replace("u'" , "");
     	 while (topidsfromview.indexOf("'") != -1)
     		topidsfromview = topidsfromview.replace("'" , "");
         var topids = topidsfromview.split(', ')
         
          
         var totaltops = topids.length / 8;
         var markers2 = [];
         
         var aux = totaltops;
         
         var sumlat = 0;
         var sumlong = 0;
         
         var beginid = totaltops * 2;
         var beginimage = totaltops * 3;
         var beginzone = totaltops * 4;
         var beginaddress = totaltops * 5;
         var beginm2 = totaltops * 6;
         var beginreference = totaltops * 7;
         
         var url_image = $(".url_param_proof").html();
         
         
         for (i = 0; i < totaltops; i++) {
        	 
        	 if (topids[beginaddress].includes('xf1')){
        		 topids[beginaddress] = topids[beginaddress].replace(/\\/g, '');
        		 topids[beginaddress] = topids[beginaddress].replace('xf1', 'ñ')
        	 }
        	 
        	 if (topids[beginaddress].includes('xe1')){
        		 topids[beginaddress] = topids[beginaddress].replace(/\\/g, '');
        		 topids[beginaddress] = topids[beginaddress].replace('xe1', 'á')
        	 }
        	 
        	 if (topids[beginaddress].includes('xe9')){
        		 topids[beginaddress] = topids[beginaddress].replace(/\\/g, '');
        		 topids[beginaddress] = topids[beginaddress].replace('xe9', 'é')
        	 }
        	 
        	 if (topids[beginaddress].includes('xed')){
        		 topids[beginaddress] = topids[beginaddress].replace(/\\/g, '');
        		 topids[beginaddress] = topids[beginaddress].replace('xed', 'í')
        	 }
        	 
        	 if (topids[beginaddress].includes('xf3')){
        		 topids[beginaddress] = topids[beginaddress].replace(/\\/g, '');
        		 topids[beginaddress] = topids[beginaddress].replace('xf3', 'ó')
        	 }
        	 
        	 if (topids[beginaddress].includes('xfa')){
        		 topids[beginaddress] = topids[beginaddress].replace(/\\/g, '');
        		 topids[beginaddress] = topids[beginaddress].replace('xfa', 'ú')
        	 }
        	 
        	 if (topids[beginzone].includes('xd1')){
        		 topids[beginzone] = topids[beginzone].replace(/\\/g, '');
        		 topids[beginzone] = topids[beginzone].replace('xd1', 'Ñ')
        	 }
        	 
        	 if (topids[beginzone].includes('xc1')){
        		 topids[beginzone] = topids[beginzone].replace(/\\/g, '');
        		 topids[beginzone] = topids[beginzone].replace('xc1', 'Á')
        	 }
        	 
        	 if (topids[beginzone].includes('xc9')){
        		 topids[beginzone] = topids[beginzone].replace(/\\/g, '');
        		 topids[beginzone] = topids[beginzone].replace('xc9', 'É')
        	 }
        	 
        	 if (topids[beginzone].includes('xcd')){
        		 topids[beginzone] = topids[beginzone].replace(/\\/g, '');
        		 topids[beginzone] = topids[beginzone].replace('xcd', 'Í')
        	 }
        	 
        	 if (topids[beginzone].includes('xd3')){
        		 topids[beginzone] = topids[beginzone].replace(/\\/g, '');
        		 topids[beginzone] = topids[beginzone].replace('xd3', 'Ó')
        	 }
        	 
        	 if (topids[beginzone].includes('xda')){
        		 topids[beginzone] = topids[beginzone].replace(/\\/g, '');
        		 topids[beginzone] = topids[beginzone].replace('xda', 'Ú')
        	 }
        	 
        	 
        	 if (topids[beginimage] == 'False'){
        		 markers2.push([topids[i], topids[aux],"<div class=\"everyTop1\"><div class=\"col-md-12 col-sm-12 description_right1\"><div class=\"right3\"><p>"+ topids[beginzone] + "-" + topids[beginaddress] + "<br/>M2: " + topids[beginm2] + "<br/>N° Ref:"+ topids[beginreference] + "<br/><a href=\"/realestate/top/"+ topids[beginid] +"\">Más detalles</a></p></div></div></div>" ]);
        		 
        	 }
        	 else{
        		 var url_image = $(".url_param_proof").html();
        		 markers2.push([topids[i], topids[aux],"<div class=\"everyTop1\"><div class=\"col-md-6 col-sm-6 image_left1\"><div class=\"left3\"><div class=\"imageP1 col-md-12  col-sm-12\"><a href=\"/realestate/top/"+ topids[beginid] +"\"><img style=\"width:100%;height:100%;\" class=\"img-responsive\" src=\"" + url_image + "/website/image/base_multi_image.image/" + topids[beginimage] + "/file_db_store\" /></a></div></div></div><div class=\"col-md-6  col-sm-6 description_right1\"><div class=\"right3\"><p>"+ topids[beginzone] + "-" + topids[beginaddress] + "<br/>M2: " + topids[beginm2] + "<br/>N° Ref:"+ topids[beginreference] + "<br/><a href=\"/realestate/top/"+ topids[beginid] +"\">Más detalles</a></p></div></div></div>"]);
        		 
        	 }
        	 
        	 sumlat += parseFloat(topids[i]);
        	 sumlong += parseFloat(topids[aux]);
        	 
        	 beginzone +=1;
        	 beginaddress +=1;
        	 beginm2 +=1;
        	 beginid +=1;
        	 beginimage +=1;
        	 beginreference +=1;
        	 aux += 1;
        	}
         
         
         
    	 var map = new L.Map('map'); 
    	 
    	 
         
      	 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
         }).addTo(map);
         map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

         var centeroflocations = new L.LatLng(sumlat/totaltops,sumlong/totaltops); 
         map.setView(centeroflocations, 13);
         
         // Define an array. This could be done in a seperate js file.
         // This tidy formatted section could even be generated by a server-side script
         // or fetched seperately as a jsonp request.
         var markers = [
            [ parseFloat(markers2[0][1]), parseFloat(markers2[0][0]), markers2[0][2] ],
            [ -0.119623, 51.503308, "London Eye" ],
            [ -0.1279688, 51.5077286, "Nelson's Column<br><a href=\"https://en.wikipedia.org/wiki/Nelson's_Column\">wp</a>" ] 
         ];
         
         
         //Loop through the markers array
         for (var i=0; i<markers2.length; i++) {
            
            var lon = markers2[i][1];
            var lat = markers2[i][0];
            var popupText = markers2[i][2];
            
            var markerLocation = new L.LatLng(lat, lon);
            var marker = new L.Marker(markerLocation);
            map.addLayer(marker);
     
            marker.bindPopup(popupText);
         
         }
         
		}
    
});




$(document).ready(function(){
	if(parseInt($(".js_numbers").find("span").html()) == 3){
		
		
		$("#more_featured").on("click", function(){
			
			$(".listfeatured1").attr("class", "hidden container listfeatured1");
			$(".listfeatured2").attr("class", "show container listfeatured2");
			
		});
		
		var url = window.location.href;
		
		if (url.includes("page")){
			$(".listfeatured1").attr("class", "hidden container listfeatured1");
			$(".listfeatured2").attr("class", "show container listfeatured2");
		}
		
		if (url.includes("2")){
			$(".pagination").find("a").eq(0).attr("href", "1");
		}
		
		
		$(".pagination").find("li").eq(1).on("click", function(){
			
			$(".pagination").find("a").eq(1).attr("href", "1");
			
		});
		
		
		}
});


$(document).ready(function(){
	if(parseInt($(".js_numbers").find("span").html()) == 3){
		
		var wordtocut =  "";
		var number = 0;
		
		for (i = 0; i < 9; i++) {
			wordtocut =  $(".top_description1").find("#internet_description2").eq(i).html();
			if (wordtocut.length > 150){
				$(".top_description1").find("#internet_description2").eq(i).html(wordtocut.substring(0, 151) + "...");
				
			}
			
			
		} 
		}
});



$(window).load(function() {
	if(parseInt($(".js_numbers").find("span").html()) == 3){
		var n = $( ".pending" ).find('span').length;
		
		for (i = 0; i < n; i++) {
			if (($( ".pending" ).find('span').eq(i).html() == 'Pending Sold') || ($( ".pending" ).find('span').eq(i).html() == 'Pending Rented')){
				$(".pending").find("img").eq(i).attr("class", "show");
			}
		}	
	}
});

$(window).load(function() {
	if(parseInt($(".js_numbers").find("span").html()) == 2){
		var n = $( ".pending" ).find('span').length;
		
		for (i = 0; i < n; i++) {
			if (($( ".pending" ).find('span').eq(i).html() == 'Pending Sold') || ($( ".pending" ).find('span').eq(i).html() == 'Pending Rented')){
				$(".pending").find("img").eq(i).attr("class", "show");
			}
		}
		
		
	}
});



$(document).ready(function(){
	if(parseInt($(".js_numbers").find("span").html()) == 2){
		if ($(window).width() < 768){
			$(".ocultbutton").attr("class", "show ocultbutton");
			$(".attributes_searchbar").attr("class", "attributes_searchbar row hidden");
			$("#occultlistmap").find("div").attr("class", "hidden");
		}
		
		$("#pruebaclick").on("click", function(){
	    	
			$(".ocultbutton").attr("class", "hidden ocultbutton");
			$(".attributes_searchbar").attr("class", "attributes_searchbar row show");
			
	    });
		
	}
});















