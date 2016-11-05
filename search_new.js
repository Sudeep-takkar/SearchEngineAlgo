
function searchAlgo(){
	//***Pages***
	//var pageKeys = [P Ford Car Review,P Review Car,P Review Ford,P Toyota Car,P Honda Car,P Car];

	var pageKeys = document.getElementById('pageKeywords').value.split(',');
	console.log(pageKeys);

	var pages = new Array();
	for(var i=0; i<pageKeys.length; i++){
		pages[i] = pageKeys[i].substring(2, pageKeys[i].length).split(" ");
	}
	//console.log(pages);

	//****Queries***
	var queryKeys = document.getElementById('queryKeywords').value.split(',');
	//console.log(queryKeys);
	//[Q Ford,Q Car,Q Review,Q Ford Review,Q Ford Car,Q Cooking French];

	var queries = new Array();
	for(var i=0; i<queryKeys.length; i++){
		queries[i] = queryKeys[i].substring(2, queryKeys[i].length).split(" ");
	}
	//console.log(queries);
	var keywordLimit = document.getElementById('keywordLimit').value;
	//console.log(keywordLimit);

	if(!keywordLimit || !pageKeys || !queryKeys){
		alert('please fill data');
		return;
	}

	//***Weight Calculation: Assuming N = 8.It can also be made configurable.
	var weight = [
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0]
	];

	var artificialWeight = [
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0],
	  [0,0,0,0,0,0]
	];

	console.log(pages);
	console.log(queries);
	for(var a=0; a<pages.length; a++){
		for(var b=0; b<queries.length; b++){
			for(var j=0; j<pages[a].length; j++){
				for(var k=0; k<queries[b].length; k++){

					if(pages[a][j].toUpperCase() === queries[b][k].toUpperCase()){
						//console.log('j:' + j + " k:" + k + " a:" + a + " b:" + b);
						//console.log(pages[a][j] + " : " + queries[b][k]);
						if(weight[b][a] != (keywordLimit-k)*(keywordLimit-j))	{ //for use case for page: Review Ford , query: Ford Review
							weight[b][a] += (keywordLimit-k)*(keywordLimit-j);
						}
					}
				}
			}
		}
	}
	//console.log(weight)

	//***print result***
	for(var i=0; i<weight.length; i++){
		//console.log(weight[i]);
		for(var j=0; j<queries.length; j++){
			if(weight[i][j] != 0){
				artificialWeight[i][j] = weight[i][j] + "_" +(j+1);
			}
		}
		artificialWeight[i].sort(function(a, b) {
	    	return parseFloat(b) - parseFloat(a);
		});
		//console.log(artificialWeight);
	}


	for(var i=0; i<artificialWeight.length; i++){
		for(var j=0; j<queries.length; j++){
			if(artificialWeight[i][j] != 0){
				artificialWeight[i][j] = artificialWeight[i][j].replace(artificialWeight[i][j].substring(0, artificialWeight[i][j].indexOf("_")+1), "P");
			}
		}
		artificialWeight[i].pop();
		output ="Q" + (i+1) + ": " + artificialWeight[i];
		output = output.replace(/,/g, ' ');
		output = output.replace(/0/g, '');
		console.log(output);
		document.write("\n");
	}
}