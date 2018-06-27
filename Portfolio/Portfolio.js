/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var argAct = arg('Account');	

	for(var i=0; i<argAct.length; i++) {
		
		log(argAct[i]);
		
		var prtflEnt = lib().find(argAct[i]);
		
		prtflEnt.sort(
			function(a, b) {
				var aDate = a.field('Date');
				var bDate = b.field('Date');
				
				return (aDate - bDate);
			}
		);
		
		log(prtflEnt[0]);
		
	}
	
	function sortByDate(eLst) {
		
		for(var i=0; i<eLst.length; i++) {
			for(var j=0; j<eLst.length; j++) {
				
				var aDate = eLst[i].field('Date');
				var bDate = eLst[j].field('Date');
				
			}
		}		
	}
	
}