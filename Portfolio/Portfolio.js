/**
	Memento DB - Portfolio JS Library.
*/


function updateInterest() {
	
	var timesArr = [2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3]
	
	var argAct = arg('Account');	

	for(var i=0; i<argAct.length; i++) {
		
		log('updateInterest - Starts ::' + argAct[i]);
		
		var prtflEnt = lib().find(argAct[i]);
		
		sortByDate(prtflEnt);
		
		var anuIntRate = 0.07;		
		var monIntRate = anuIntRate / 12;		
		monIntRate = fixed(monIntRate, 5);  
		
		var accInt = 0;
		
		for(var j=0; j<prtflEnt.length; j++) {
			
			var curEnt = prtflEnt[j];
			
			var amt  = curEnt.field('Amount');
			var date = curEnt.field('Date');
			var cat  = curEnt.field('Categoty');
			
			var month = date.getMonth();			
			var times = timesArr[month];
			
			var recInt = (amt * monIntRate * times);			
			recInt = fixed(recInt, 2);	

			accInt = accInt + recInt;
			log(date + ';' + accInt)
		
			curEnt.set('Sequence', j+1);			
			
			if(cat == 'Interest') {
				log(date + ' - Interest = ' + accInt)
				curEnt.set('Balance', accInt);
				accInt = 0;
			} else {
				curEnt.set('Balance', 0);
			}
			
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