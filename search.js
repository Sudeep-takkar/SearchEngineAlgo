//***Pages***
var pageKeys = ["P Ford Car Review", "P Review Car", "P Review Ford","P Toyota Car","P Honda Car","P Car"];

var pages = new Array();
for(var i=0; i<pageKeys.length; i++){
	pages[i] = pageKeys[i].substring(2, pageKeys[i].length).split(" ");
}
//console.log(pages);

//****Queries***
var queryKeys = ["Q Ford", "Q Car", "Q Review","Q Ford Review","Q Ford Car","Q Cooking French"];

var queries = new Array();
for(var i=0; i<queryKeys.length; i++){
	queries[i] = queryKeys[i].substring(2, queryKeys[i].length).split(" ");
}
//console.log(queries);

//***Weight Calculation: Assuming N = 8.It can also be made configurable.
var weight = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0]
];
 //console.log(pages.length);
 //console.log(queries.length);
for(var a=0; a<pages.length; a++){
	for(var b=0; b<queries.length; b++){
		for(var j=0; j<pages[a].length; j++){
			for(var k=0; k<queries[b].length; k++){
				if(pages[a][j] == queries[b][k]){
					//console.log('j:' + j + " k:" + k + " a:" + a + " b:" + b);
					//console.log(pages[a][j] + " : " + queries[b][k]);
					if(weight[b][a] != (8-k)*(8-j))	{ //for use case for page: Review Ford , query: Ford Review
						weight[b][a] += (8-k)*(8-j);
					}
				}
			}
		}
	}
}
//console.log(weight)

//print result
var result = new Array();
for(var i=0; i<weight.length; i++){
	result[i] = "Q" + (i+1) + ": ";
	console.log(weight[i]);
	for(var j=0; j<queries.length; j++){
		if(weight[i][j] != 0){
			result[i] +=" " + "P" + (j+1);
		}
	}
	console.log(result[i]);
	document.write("\n");
}