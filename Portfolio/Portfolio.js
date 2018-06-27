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
				
				return (a-b);
			}
		);
		
		log(prtflEnt[0]);
		
	}
	
}