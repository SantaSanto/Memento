/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var argAccount = arg('Account');
	
	var argActLst = argAccount.split(',');
	
	for(var argAct in argActLst) {
		
		alert(argAct);
		
	}
	
}