/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var timesArr = [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3]
	
	var argAct = arg('Account');	
	
	var today = new Date();

	for(var i=0; i<argAct.length; i++) {
		
		log('updateInterest - Starts ::' + argAct[i]);
		
		var prtflEnt = lib().find(argAct[i]);
		
		sortByDate(prtflEnt);
		
		var anuIntRate = 0.07;		
		var monIntRate = anuIntRate / 12;		
		
		var accInt  = 0.0;
		var accBal  = 0.0;
		var prevBal = 0.0;
		
		for(var j=0; j<prtflEnt.length; j++) {
			
			var curEnt = prtflEnt[j];
			
			var amt  = curEnt.field('Amount');
			var date = curEnt.field('Date');
			var cat  = curEnt.field('Category');
			
			if(cat == 'Deposit') {
				var month = date.getMonth();			
				var times = timesArr[month];				
				
				var recInt = (amt * monIntRate * times);			
				accInt = accInt + recInt;
				accBal = accBal + amt;		

				curEnt.set('Balance', fixed(recInt, 2));	
				
			} else if(cat == 'Interest') {
				
				if( (date - today) > 0 ) {
					accInt = (prevBal * anuIntRate) + accInt;				
				} else {
					accInt = amt;	
				}
				
				curEnt.set('Balance', fixed(accInt, 2));
				prevBal = accBal + accInt;	
				accInt = 0;
			} 
			
			curEnt.set('Sequence', j+1);
		}
		
		log('updateInterest - Ends ::' + argAct[i]);
		
	}
}

function fixed(x, n) {
  return Number.parseFloat(x).toFixed(n);
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