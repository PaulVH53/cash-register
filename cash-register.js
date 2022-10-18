function checkCashRegister(price, cash, cid) {
	const currency = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];
    let changeObj = {};
    let changeDue = parseFloat((cash - price).toFixed(2));
	let cashAvailable = parseFloat(cid
				.reduce((sum, elem) => sum + elem[1], 0)
				.toFixed(2));
	
    function distributingChange(changeDue, cid) {
        let change = parseFloat(changeDue.toFixed(2));
        let remainder = change;
        let changeAllocated = [];
        let distributedChange = {};

        for(let i = 0; i < currency.length; i++) {
            let count = 0;
            let cidValue = cid[cid.length - i - 1][1];
            cidValue = parseFloat(cidValue.toFixed(2));
            while (currency[i][1] <= remainder && cidValue >= currency[i][1]) {
                remainder -= currency[i][1];
                remainder = parseFloat(remainder.toFixed(2));
                cidValue -= currency[i][1];
                cidValue = parseFloat(cidValue.toFixed(2));
                count++;
            }
            changeAllocated.push([currency[i][0], parseFloat((count * currency[i][1]).toFixed(2))]);
        }
        distributedChange.remainder = remainder;
        distributedChange.changeAllocated = changeAllocated;
        return distributedChange;
    };
	
	if (cashAvailable < changeDue) {
		changeObj.status = "INSUFFICIENT_FUNDS";
		changeObj.change = [];
		
	} else if (cashAvailable == changeDue) {
		changeObj.status = "CLOSED";
		changeObj.change = distributingChange(changeDue, cid).changeAllocated.reverse();
	
    } else {
        if (distributingChange(changeDue, cid).remainder > 0) {
            changeObj.status = "INSUFFICIENT_FUNDS";
            changeObj.change = [];
        } else {
            changeObj.status = "OPEN";
            changeObj.change = distributingChange(changeDue, cid)
                        .changeAllocated
                        .filter(elem => elem[1] > 0);
        }

    }

    return changeObj;
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
