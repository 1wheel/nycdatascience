fs = require('fs')
_ = require('lodash-node')

var outputRows = [];

fileNames = ['ILCHICAGO.TXT', 'NYNEWYOR.TXT', 'TXDALLAS.TXT', 'SPMADRID.TXT'];
fileNames.forEach(function(fileName){
	var data = fs.readFileSync('allsites/' + fileName, 'ascii');
	var lines = data.split('\n')
		//remove meta data rows
		.filter(function(d){ return d.length > 100; })
		.map(function(line){
			//delimited by spaces
			return line.split(' ')
				.map(function(d){ return +d; })
				//sum pairs of elements, then remove half to reduce the size/num of lines displayed
				.map(function(d, i, array){ return i % 2 ? 0 : d + array[i + 1]; })
				.filter(function(d, i){ return i % 2 == 0; })
		})
		//sum pairs of rows, then remove every other one
		// .map(function(lineArray, i, array){
		// 	return i % 2 ? 0 : lineArray.map(function(d, j){ return d + array[i][j]; }) 
		// })
		// .filter(function(d, i){ return i % 2 == 0; })

	years.push(lines);

	lines.forEach(function(longitude, longitudeNum){
		var threshhold = 20000;
		var i = longitude.length - 2;
		var aboveThreshhold = false;
		while (i > 0){
		  i = i - 1;
		  if (aboveThreshhold != longitude[i] > threshhold){
		  	breaks[longitudeNum].push(i);
		    aboveThreshhold = longitude[i] > threshhold;
		  }
		}		
	});
});

//remove duplicates
breaks.map(_.uniq);

fs.writeFile('formatedData.json', JSON.stringify(years));