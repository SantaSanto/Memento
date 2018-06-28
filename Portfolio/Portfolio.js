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
		
		var anuIntRate = 0.070;	

		if(argAct[i] == 'PPF#S' || argAct[i] == 'PPF#S') {
			anuIntRate = 0.0760;	
		} else if(argAct[i] == 'SSA#P') {
			anuIntRate = 0.0810;	
		} else if(argAct[i] == 'EPF#S') { 
			anuIntRate = 0.0855;	
		}
		
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
				
			} else if(cat == 'Interest') {
				
				if( (date - today) > 0 ) {
					var newInt = (prevBal * anuIntRate) + accInt;	
					curEnt.set('Amount', fixed(newInt, 2));	
					curEnt.set('Balance', fixed(prevBal, 2));	
					prevBal = accBal + newInt;	
				} else {
					accInt = amt;	
					prevBal = accBal + accInt;	
				}			
				
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