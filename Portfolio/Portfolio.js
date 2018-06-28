/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var argAct = arg('Account');	

	for(var i=0; i<argAct.length; i++) {
		
		log('updateInterest - Starts ::' + argAct[i]);
		
		var prtflEnt = lib().find(argAct[i]);
		
		sortByDate(prtflEnt);
		
		var accBal = 0;
		var accInt = 0;
		
		var anuIntRate = 7.0;
		var monIntRate = anuIntRate / 12;
		
		for(var j=0; j<prtflEnt.length; j++) {
			
			var curEnt = prtflEnt[j];
			
			var amt = curEnt.field('Amount');
			
			accInt += (accBal * monIntRate); 
			
			accBal += (accInt + amt);
			
			curEnt.set('Sequence', j+1);
			
			curEnt.set('Balance', accInt);
			
		}
		
		log('updateInterest - Ends ::' + argAct[i]);
		
	}
}

function sortByDate(eLst) {
		
	for(var i=0; i<eLst.length; i++) {
	for(var j=0; j<eLst.length; j++) {				
		var aDate = eLst[i].field('Date');
		var bDate = eLst[j].field('Date');				
		
		if( (aDate - bDate) < 0 ) {					
			var temp = eLst[i];
			eLst[i] = eLst[j];
			eLst[j] = temp;
		}					
	}}		
}