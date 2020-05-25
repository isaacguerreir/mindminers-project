import ListOperations from '../../domain/ListOperations';
import Operation from '../../domain/Operation';

describe("Using List of Operations object", () => { 
    it("Testing list with 1 operation", () => {
        const operations = new ListOperations('PTR4');
        const op1 = new Operation(new Date(2020, 1, 17), 'PTR4', 'BUY', 0, 0, 0);
        expect(operations.batch).toEqual([]);
        expect(operations.push(op1)).toEqual([op1]);
    })
    it("Testing list with 2 operations and different dates", () => {
        const operations = new ListOperations('PTR4');
        const op1 = new Operation(new Date(2020, 1, 17), 'PTR4', 'BUY', 0, 0, 0);
        const op2 = new Operation(new Date(2020, 1, 15), 'PTR4', 'BUY', 0, 0, 0);
        expect(operations.push(op1)).toEqual([op1]);
        expect(operations.push(op2)).toEqual([op2, op1]);
    })
    it("Testing list with 4 operations to test if they organize the list by date", () => {
        const operations = new ListOperations('PTR4');
        const op1 = new Operation(new Date(2020, 1, 17), 'PTR4', 'BUY', 0, 0, 0);
        const op2 = new Operation(new Date(2020, 1, 15), 'PTR4', 'BUY', 0, 0, 0);
        const op3 = new Operation(new Date(2020, 1, 18), 'PTR4', 'BUY', 0, 0, 0);
        const op4 = new Operation(new Date(2020, 1, 17), 'PTR4', 'BUY', 0, 0, 0);
        expect(operations.push(op1)).toEqual([op1]);
        expect(operations.push(op2)).toEqual([op2, op1]);
        expect(operations.push(op3)).toEqual([op2, op1, op3]);
        expect(operations.push(op4)).toEqual([op2, op1, op4, op3]);
    })
})