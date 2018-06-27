/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var argAccount = arg('Account');	

	for(var argAct in argAccount) {
		
		alert(argAct);
		
		var prtflEnt = lib().find(argAct);
		
		alert(prtflEnt.length);
		
	}
	
}