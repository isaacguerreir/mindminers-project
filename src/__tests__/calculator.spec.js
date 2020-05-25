import { 
    calculateMedianPrice,
    calculateMedianQuantity,
    calculateAccumulatedLoss,
    descountAccLoss,
    calculateMeasuredResult,
    calculateIR
} from '../service/calculator';
import Operation from '../domain/Operation';

describe("Using calculator", () => {
    it("calculating median prices", () => {
      expect(calculateMedianPrice(0.0, 0.0, 25.90, 100.0, 8.50)).toEqual(25.985);
      expect(calculateMedianPrice(25.985, 100.0, 26.40, 200.0, 8.50)).toEqual(26.29);
      expect(calculateMedianPrice(26.29, 300.0, 27.87, 100.0, 8.50)).toEqual(26.70625);
    })
    it("calculating median quantities", () => {
        expect(calculateMedianQuantity(0, 100)).toEqual(100);
        expect(calculateMedianQuantity(100, 200)).toEqual(300);
        expect(calculateMedianQuantity(300, 100)).toEqual(400);
        expect(calculateMedianQuantity(300, -100)).toEqual(200);
        expect(calculateMedianQuantity(300, -300)).toEqual(0);
    })
    it("calculating descont from accumulated loss",  () => {
        expect(descountAccLoss(100.0, 50.0)).toEqual(50.0);
        expect(descountAccLoss(122.5212, 122.5212)).toEqual(122.5212);
        expect(descountAccLoss(213212313132132132132.5, 213212313132132132132.5)).toEqual(213212313132132132132.5);
        expect(descountAccLoss(0.1264464655487895411, 0.1264464655487895411)).toEqual(0.1264464655487895411);
        expect(descountAccLoss(25.0, 100.0)).toEqual(25.0);
    })
    it("calculating accumulated losses",  () => {
        expect(calculateAccumulatedLoss(0, 26.125)).toEqual(26.125);
        expect(calculateAccumulatedLoss(100.0, 50.0)).toEqual(0);
        expect(calculateAccumulatedLoss(100.0, 76.0)).toEqual(0);
        expect(calculateAccumulatedLoss(13.0, 24.0)).toEqual(11.0);
    })
    it("calculating measured results",  () => {
        expect(calculateMeasuredResult(26.70625, 26.53, 100.0, 8.50)).toEqual(-26.125);
    })
    it("calculating IR based on a list of operations",  () => {
        const op1 = new Operation(new Date, 'PTR4', 'BUY', 25.90, 100.0, 8.50);
        const op2 = new Operation(new Date, 'PTR4', 'BUY', 26.40, 200.0, 8.50);
        const op3 = new Operation(new Date, 'PTR4', 'BUY', 27.87, 100.0, 8.50);
        const op4 = new Operation(new Date, 'PTR4', 'SELL', 26.53, 100.0, 8.50);
        const op5 = new Operation(new Date, 'PTR4', 'SELL', 27.39, 100.0, 8.50);

        const buyRes = {
            ir: 0,
            profit: 0,
            loss: 0
        }
        expect(calculateIR([op1])).toEqual([buyRes]);
        expect(calculateIR([op1, op2])).toEqual([buyRes, buyRes]);
        expect(calculateIR([op1, op2, op3])).toEqual([buyRes, buyRes, buyRes]);
        expect(calculateIR([op1, op2, op3, op4])).toEqual([buyRes, buyRes, buyRes, {
            ir: 0,
            profit: 0,
            loss: 26.125
        }]);
        expect(calculateIR([op1, op2, op3, op4, op5])).toEqual([buyRes, buyRes, buyRes, {
            ir: 0,
            profit: 0,
            loss: 26.125
        }, {
            ir: 5.0625,
            profit: 59.875,
            loss: 0.0
        }]);
    })
})