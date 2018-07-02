/**
	Memento DB - Portfolio JS Library.
*/

function updateStatus() {
	
	var today = new Date();
	
	var prtflEnt = lib().entries();
	
	for(var i=0; i<prtflEnt.length; i++) {
		
		var curEnt = prtflEnt[i];
		
		var date = curEnt.field('Date');
		var cat  = curEnt.field('Category');
		
		var isFuture = false;
		if( (date - today) > 0 ) {
			isFuture = true;
		}
		
		var curStatus;
		if(cat == 'Deposit' && !isFuture) {
			curStatus = 'Saved';
		} else 
		if(cat == 'Deposit' && isFuture) {
			curStatus = 'Planned';
		} else 
		if(cat == 'Interest' && !isFuture) {
			curStatus = 'Earned';
		} else 
		if(cat == 'Interest' && isFuture) {
			curStatus = 'Expected';
		} 
		
		curEnt.set('Status', curStatus);
		
		if(isFuture) {
			curEnt.set('Timeline', 'Projected');
		} else {
			curEnt.set('Timeline', 'Actual');
		}
	}	
}



function updateInterest() {
	
	var timesArr = [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3]
	
	var argAct = arg('Account');	
	
	var today = new Date();

	for(var i=0; i<argAct.length; i++) {
		
		log('updateInterest - Starts ::' + argAct[i]);
		
		var prtflEnt = lib().find(argAct[i]);
		
		sortByDate(prtflEnt);
		
		var accInt  = 0.0;
		var accBal  = 0.0;
		var prevBal = 0.0;
		
		for(var j=0; j<prtflEnt.length; j++) {
			
			var curEnt = prtflEnt[j];
			
			var amt  = curEnt.field('Amount');
			var date = curEnt.field('Date');
			var cat  = curEnt.field('Category');
			
			var ins  = curEnt.field('Instrument');
			var fy   = curEnt.field('Financial Year');
			
			var air = fetchInterest(ins, fy);
			var monIntRate = air / 12;
						
			if(cat == 'Deposit') {
				var month = date.getMonth();			
				var times = timesArr[month];				
				
				var recInt = (amt * monIntRate * times);			
				accInt = accInt + recInt;
				accBal = accBal + amt;		

				curEnt.set('Balance', 0);
				
			} else if(cat == 'Interest') {
				
				if( (date - today) > 0 ) {
					var newInt = (prevBal * air) + accInt;	
					curEnt.set('Amount', fixed(newInt, 2));					
					prevBal = prevBal + accBal + newInt;
					var calAir = air * 100;					
					curEnt.set('AIR', fixed(calAir, 2));
				} else {
					accInt = amt;
					var newBal = prevBal + accBal;
					var calAir = ((accInt * 100) / newBal) ;
					prevBal = newBal + accInt;					
					curEnt.set('AIR', fixed(calAir, 2));
				}			
				
				curEnt.set('Balance', fixed(prevBal, 2));
				
				accInt = 0;
				accBal = 0;
			} 
			
			//curEnt.set('Sequence', j+1);
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

function fetchInterest(instrument, finYear) {
	
	var key = instrument + " - " + finYear;	
	var irLib = libByName('Interest Rate').find(key);
	
	var air = 0;
	if(irLib.length == 1) {
		var irEnt = irLib[0];
		airFloat = irEnt.field('Rate');
		air = fixed((airFloat / 100), 4) 
	} 
	
	return air;
}