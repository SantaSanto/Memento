/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var argAccount = arg('Account');	

	for(var argAct in argAccount) {
		
		log(argAct);
		
		var prtflEnt = lib().find(argAct);
		
		log(prtflEnt.length);
		
	}
	
}