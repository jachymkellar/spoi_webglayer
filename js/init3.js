	
function init() { 
		/*Initialize the map*/
		initMap();
		
		/*Load the data*/
		var data = new DataLoader();
		//data.loadPosData("data/new_data/data2.csv");
		data.loadPosData("data/data2.csv");
    
	//	data.loadPosData("data/test.json");
			
				
	}
function circleSelection(element){
	if (element.checked){
		console.log("cvvv");
	}
}

function visualize(data){	
	
		/**
		 * initialize WGL with link to data, the relative path to the shader folder, and id of the map div
		 */
		WGL = new WGL(data.num,'', 'map');		
		
		/**
		 * map is global variable from Open Layers, we set our onMove 
		 * function to be called any time the map moves 
		 */		 
		map.events.register("move", map, onMove);							
			
		/**
		 * Adding heatmap, point map and polybrush interactions
		 */
     

		WGL.addHeatMapDimension(data.pts, 'heatmap');
		


    
    
	WGL.addMapDimension(data.pts, 'themap');
	WGL.addColorFilter('themap','colorbrush');
	WGL.addPolyBrushFilter('themap','polybrush');
		


/*
		WGL.getDimensions()['heatmap'].radiusFunction = function(z){			
			zoom = z;
			var res =  radius;//Math.pow(radius / 5,(z-8));
			//console.log(res);
			return  res ;
			};
*/
		
		/**
		 * Adding fitering by map extent
		 */
		WGL.addExtentFilter();
	
	
		/**
		 * Configuring the histograms and charts
		 */
		var charts = [];
		
		/** Histogram for severity */
		
		var category = {data: data.category,  domain: data.categoryarray,  name: 'category', type:'ordinal'};			
		WGL.addOrdinalHistDimension(category);
		WGL.addLinearFilter(category,10, 'categoryF');		
		charts['category'] = new StackedBarChart(category, "chart4", "Category","categoryF");

		var categoryOSM = {data: data.categoryOSM,  domain: data.categoryOSMarray,  name: 'categoryOSM', type:'ordinal'};			
		WGL.addOrdinalHistDimension(categoryOSM);
		WGL.addLinearFilter(categoryOSM,10, 'categoryOSMF');		
		charts['categoryOSM'] = new StackedBarChart(categoryOSM, "chart6", "CategoryOSM","categoryOSMF");

		var source = {data: data.source,  domain: data.sourcearray,  name: 'source', type:'ordinal'};			
		WGL.addOrdinalHistDimension(source);
		WGL.addLinearFilter(source,2, 'sourceF');		
		charts['source'] = new StackedBarChart(source, "chart5", "Source","sourceF");

		/**
		 * Addin all charts
		 */		
		WGL.addCharts(charts);
		
		/**
		 * Initilizing all the filters
		 */
		WGL.initFilters();

		WGL.getDimensions()['heatmap'].radiusFunction = function(z){
             var res = (12* Math.pow(2,z)/5000)+3;
             //console.log(res);
             return  res ;
             };
   /* 
    var radius = 20.;    
    
WGL.getDimensions()['heatmap'].radiusFunction = function(z){
var res = radius;
//console.log(res);
return res ;
};
*/
		
		/** Drawing the map fist time */
		WGL.mcontroller.zoommove(map.getZoom(), getTopLeftTC());
		//WGL.render();
		

/*
		WGL.getDimensions()['heatmap'].radiusFunction = function(z){			
			var res = radius* (z-5);
			//console.log(res);
			return  res ;
			};
*/
      
		$("#slider_radius").on("input", function(){			
			radius = this.value;			
			WGL.render();			
		});

		
		$("#slider_color").on("input", function(){						
			WGL.filterDim('themap',"colorbrush",this.value);			
		});
  
	}
			
	

	

/**
 * Function to calculate top left corner of the map in pixels for zoom 0
 * @returns {___anonymous_res}
 */	
function getTopLeftTC() {

	
	var tlwgs = (new OpenLayers.LonLat(-180, 90)).transform(
			new OpenLayers.Projection("EPSG:4326"),
		 	new OpenLayers.Projection("EPSG:900913"));
	
	var s = Math.pow(2, map.getZoom());
	tlpixel = map.getViewPortPxFromLonLat(tlwgs);
	res = {
			x : -tlpixel.x / s,
			y : -tlpixel.y / s
	}
	//console.log(res);
	return res;
}
	
/**
 * Function to for moving the map event.
 */
function onMove() {			
		WGL.mcontroller.zoommove(map.getZoom(), getTopLeftTC(), WGL.filterByExt);
}
	
	
	