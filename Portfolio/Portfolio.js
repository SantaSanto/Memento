/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var argAct = arg('Account');	

	for(var i=0; i<argAct.length; i++) {
		
		log(argAct[i]);
		
		var prtflEnt = lib().find(argAct[i]);
		
		log(prtflEnt.length);
		
	}
	
}