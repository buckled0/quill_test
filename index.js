const fs = require('fs');

fs.readFile('station_names', 'utf8', (err, data) => {
	if (err) console.log(err);

	var resultsArray = [];
	var stationArray = data.replace(/[^\w\s]/gi, '').split('\n');
	var leftSide = stationArray.splice(0, Math.floor(stationArray.length / 2));

	leftSide.forEach(function(element) {
		var stationSet = new Set();
		var setSize = 0;
		var split = element.toLowerCase().replace(/[\s\d]/gi, '').split('');
		var subset = [];
		split.forEach(function(splitElement){
			stationSet.add(splitElement);
		});
		if (setSize != stationSet.size) {
			subset.push(element);
		}
		resultsArray.push(stationSubset(element, stationArray, stationSet, setSize, subset));
	})

	stationArray.forEach(function(element) {
		var stationSet = new Set();
		var setSize = 0;
		var split = element.toLowerCase().replace(/[\s\d]/gi, '').split('');
		var subset = [];
		split.forEach(function(splitElement){
			stationSet.add(splitElement);
		});
		if (setSize != stationSet.size) {
			subset.push(element);
		}
		resultsArray.push(stationSubset(element, leftSide, stationSet, setSize, subset));
	})

	resultsArray = resultsArray.filter(function(n){ return n != undefined }); 
	console.log(resultsArray.reduce((prev, next) => prev.length > next.length ? next : prev));
});

function stationSubset(station, stationArray, stationSet, setSize, subset) {
	for(var i = 0; i < stationArray.length; i++) {
		var split = stationArray[i].toLowerCase().replace(/[\s\d]/gi, '').split('');
		split.forEach(function(element, index){
			stationSet.add(element);
		});
		if (setSize != stationSet.size) {
			subset.push(stationArray[i]);
		}
		setSize = stationSet.size;
		if (stationSet.size == 26) {
			return subset;
		}
	}
}