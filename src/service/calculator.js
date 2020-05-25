const calculateIR = (listOperations) => {
    let medianPrice = 0.0;
    let medianQuantity = 0.0;
    let accumulatedLoss = 0.0;
    const result = listOperations.map(function(operation) {
        let price    = parseFloat(operation.price);
        let quantity = parseFloat(operation.quantity);
        let tax      = parseFloat(operation.tax);
        let type     = operation.type;

        if (type === "BUY") {
            medianPrice = calculateMedianPrice(medianPrice, medianQuantity, price, quantity, tax);
            medianQuantity = calculateMedianQuantity(medianQuantity, quantity);
            return {
                ir: 0.0,
                profit: 0.0,
                loss: 0.0
            }
        }
        
        let measuredResult = calculateMeasuredResult(medianPrice, price, quantity, tax);
        
        if (measuredResult < 0) {
            accumulatedLoss += Math.abs(measuredResult);
            return {
                ir: 0.0,
                profit: 0.0,
                loss: Math.abs(measuredResult)
            }
        }

        let IRTax = measuredResult - descountAccLoss(measuredResult, accumulatedLoss);
        IRTax = (IRTax * 15.0) / 100.0;
        
        accumulatedLoss = calculateAccumulatedLoss(measuredResult, accumulatedLoss);

        return {
            ir: IRTax,
            profit: measuredResult,
            loss: 0.0
        };
    })

    return result;

}

const roundValue = (number) => {
    return parseFloat(number.toFixed(12));
}

const calculateMeasuredResult = (medianPrice, price, quantity, tax) => {
    let result = price - medianPrice;
    result = result * quantity - tax;
    return roundValue(result);
}

const calculateMedianPrice = (medianPrice, medianQuantity, price, quantity, tax) => {
    let result = medianPrice * medianQuantity + price * quantity + tax;
    result = result / (quantity + medianQuantity);
    return roundValue(result);
}

const calculateMedianQuantity = (medianQuantity, quantity, isBuying = true) => {
    if (isBuying) {
        let result = medianQuantity + quantity;
        return roundValue(result);
    }
    let result = medianQuantity - quantity;
    return roundValue(result);
}

const calculateAccumulatedLoss = (measuredResult, accumulatedLoss) => {
    let result = accumulatedLoss - descountAccLoss(measuredResult, accumulatedLoss);
    return roundValue(result);
}

const descountAccLoss = (measuredResult, accumulatedLoss) => {
    if (accumulatedLoss <= measuredResult) {
        return accumulatedLoss;
    }
    return measuredResult;
}

const totalIR = (list) => {
    const IRList = list.map((obj) => { return obj.ir })
    return IRList.reduce((acc, val) => {
        return acc += val
    })
}

const totalProfit = (list) => {
    const profitList = list.map((obj) => { return obj.profit })
    return profitList.reduce((acc, val) => {
        return acc += val
    })
}

const totalLoss = (list) => {
    const lossList = list.map((obj) => { return obj.loss })
    return lossList.reduce((acc, val) => {
        return acc += val
    })
}

const totalLiquid = (list) => {
    const profit = totalProfit(list);
    const loss = totalLoss(list);
    const ir = totalIR(list);

    return profit - (loss + ir);
}

export { 
    calculateMedianPrice,
    calculateMedianQuantity,
    calculateAccumulatedLoss,
    descountAccLoss,
    calculateMeasuredResult,
    calculateIR,
    totalIR,
    totalProfit,
    totalLiquid,
    totalLoss
};