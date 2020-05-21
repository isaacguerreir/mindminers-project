

const calculateIR = (listOperations) => {
    let medianPrice = 0.0;
    let medianQuantity = 0.0;
    let accumulatedLoss = 0.0;

    const result = listOperations.map(function(operation) {
        let price    = operation.price;
        let quantity = operation.quantity;
        let tax      = operation.tax;
        let type     = operation.type;

        if (operation.type == "BUY") {
            medianPrice = calculateMedianPrice(medianPrice, medianQuantity, price, quantity, tax);
            medianQuantity = calculateMedianQuantity(medianQuantity, quantity);
            return 0.0;
        }
        
        let measuredResult = calculateMeasuredResult(medianPrice, price, quantity, tax);
        
        if (measuredResult < 0) {
            accumulatedLoss += Math.abs(measuredResult);
            return 0.0;
        }

        let IRTax = measuredResult - descountAccLoss(measuredResult, accumulatedLoss);
        IRTax = (IRTax * 15.0) / 100.0;
        
        accumulatedLoss = calculateAccumulatedLoss(measuredResult, accumulatedLoss);

        return IRTax;
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

export { 
    calculateMedianPrice,
    calculateMedianQuantity,
    calculateAccumulatedLoss,
    descountAccLoss,
    calculateMeasuredResult,
    calculateIR
};