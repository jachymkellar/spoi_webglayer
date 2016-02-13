function DataLoader() {
	
	var that = this;

	/**
	 * Load text file
	 */
	 $("#speed_chart").text("Please wait... data are being loaded. This may take a while.");
	
	this.loadPosData = function(file) {

			var pts = [];
      var category = [];      
			
      //var categoryarray = ["Car Services", "Culture & Entertainment", "Food and Drink", "Lodging", "Natural Features", "Other", "Outdoors", "Professional and Public", "Shopping and Services", "Transportation"]      
      var categoryarray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
			var j = 0;		
		/**
		 * load data
		 */
		d3.csv(file, function(error, data) {

			data.forEach(function(val, i) {
							
					pts[j++] = parseFloat(val.x);
					pts[j++] = parseFloat(val.y);
									
          category[i] = val.category;          
				
				});
			
			visualize({
        pts: pts, 
        category: category,        
				num : data.length,
        categoryarray: categoryarray
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
