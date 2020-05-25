import ListStocks from '../../domain/ListStocks';
import ListOperations from '../../domain/ListOperations';
import Operation from '../../domain/Operation';

describe("Using List of Stocks object", () => { 
    it("Testing list with 1 operation", () => {
        const stocks = new ListStocks();
        const operations = new ListOperations('PETR4');
        const op1 = new Operation(new Date(2020, 1, 17), 'PETR4', 'BUY', 0, 0, 0);
        operations.push(op1);
        expect(stocks.addOperationByStockId(op1)).toEqual([operations]);
    })
    it("Testing list with 2 operation", () => {
        const stocks = new ListStocks();
        const operations = new ListOperations('PETR4');
        const op1 = new Operation(new Date(2020, 1, 17), 'PETR4', 'BUY', 0, 0, 0);
        const op2 = new Operation(new Date(2020, 1, 15), 'PETR4', 'BUY', 0, 0, 0);
        operations.push(op1);
        expect(stocks.addOperationByStockId(op1)).toEqual([operations]);
        operations.push(op2);
        expect(stocks.addOperationByStockId(op2)).toEqual([operations]);
    })
    it("Testing list using 2 different stocks operations", () => {
        const stocks = new ListStocks();
        const operations1 = new ListOperations('PETR4');
        const operations2 = new ListOperations('VALE5');
        const op1 = new Operation(new Date(2020, 1, 17), 'PETR4', 'BUY', 0, 0, 0);
        const op2 = new Operation(new Date(2020, 1, 17), 'VALE5', 'BUY', 0, 0, 0);
        operations1.push(op1);
        operations2.push(op2);
        expect(stocks.addOperationByStockId(op1)).toEqual([operations1]);
        expect(stocks.addOperationByStockId(op2)).toEqual([operations1, operations2]);
    })
})