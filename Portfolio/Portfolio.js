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
		
		var anuIntRate = 0.070;	

		if(argAct[i] == 'PPF#S') {
			anuIntRate = 0.0760;
		} else if(argAct[i] == 'PPF#L') {
			anuIntRate = 0.0760;	
		} else if(argAct[i] == 'SSA#P') {
			anuIntRate = 0.0810;	
		} else if(argAct[i] == 'EPF#S Employee') { 
			anuIntRate = 0.0855;	
		} else if(argAct[i] == 'EPF#S Company') { 
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
			
			var ins  = curEnt.field('Instrument');
			var fy   = curEnt.field('Financial Year');
			
			var air = fetchInterest(ins, fy);
						
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
					prevBal = prevBal + accBal + newInt;						
				} else {
					accInt = amt;	
					prevBal = prevBal + accBal + accInt;	
				}			
				
				curEnt.set('Balance', fixed(prevBal, 2));
				curEnt.set('AIR', fixed(air, 2));
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
		air = irEnt.field('Rate');
	} 
	
	return air;
}