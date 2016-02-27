function DataLoader() {
	
	var that = this;

	/**
	 * Load text file
	 */
	 $("#speed_chart").text("Please wait... data are being loaded. This may take a while.");
	
	this.loadPosData = function(file) {

			var pts = [];
      var categoryOSM = [];
      var category = [];      
      var source = [];
			
      //var categoryarray = ["Car Services", "Culture & Entertainment", "Food and Drink", "Lodging", "Natural Features", "Other", "Outdoors", "Professional and Public", "Shopping and Services", "Transportation"]      
      var categoryOSMarray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      var categoryarray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      var sourcearray = ["1", "2","3"];
			var j = 0;		
		/**
		 * load data
		 */
		d3.csv(file, function(error, data) {

			data.forEach(function(val, i) {
							
					pts[j++] = parseFloat(val.x);
					pts[j++] = parseFloat(val.y);
        
          categoryOSM[i] = val.categoryOSM;
          category[i] = val.category;   
          source[i] = val.source;
				
				});
			
			visualize({
        pts: pts, 
        categoryOSM: categoryOSM,
        category: category,   
        source: source,
				num : data.length,
        categoryOSMarray: categoryOSMarray,
        categoryarray: categoryarray,
        sourcearray: sourcearray
        });
			});
	}
	
	
	function getMinMax(val, minmax){
		if (typeof(minmax)=='undefined'){
			minmax = [];
			minmax.min = Number.MAX_VALUE;
			minmax.max = Number.MIN_VALUE;
		}
		if (val < minmax.min) {minmax.min = val};
		if (val > minmax.max) {minmax.max = val};
		return minmax;
		
	}
	
}
