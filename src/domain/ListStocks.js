import ListOperations from './ListOperations';

class ListStocks {
    constructor() {
        this._id = this.generateUniqueId();
        this._stocks = [];
    }

    addOperationByStockId(operation) {
        let stockId = operation.stockId;

        if (this.stocks.length > 0) {
            const batch = this.stockListById(stockId);
            if (batch != null) {
                batch.push(operation);
            } else {
                this.createOperationList(operation);
            }
        } else {
            this.createOperationList(operation);
        }

        return this.stocks;
    }

    stockListById(stockId) {
        for (let i = 0; i < this.stocks.length; i++) {
            if (this.stocks[i].stockId === stockId) {
               return this.stocks[i];
            }
        }
        return null;
    }

    createOperationList(operation) {
        const batchOperations = new ListOperations(operation.stockId);
        batchOperations.push(operation);
        this.addOperationList(batchOperations);
    }

    addOperationList(batchOperations) {
        this.stocks.push(batchOperations);
    }

    get stocks() {
        return this._stocks;
    }

    set stocks(value) {
        this._stocks = value;
    }

    generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

export default ListStocks;