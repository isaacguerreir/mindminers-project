class BatchOperations {
    constructor() {
        this._batch = [];
    }

    push(operation) {
        let date = operation.date;
        if (this.batch.length > 0) {
            let index = this.positionByDate(date, this.batch);
            this.batch.splice(index, 0, operation);    
        } else {
            this.batch.push(operation);
        }
        return this.batch;
    }

    positionByDate(date, batch) {
        for (let i = 0; i < this.batch.length; i++) {
            let elementDate = this.batch[i].date;
            if (this.isMoreRecent(date, elementDate)) {
                return i;
            }
        }
        return this.batch.length;
    }

    isMoreRecent(value, last) {
        if(value < last) {
            return true;
        }
        return false;
    }

    get batch() {
        return this._batch;
    }
}

export default BatchOperations;