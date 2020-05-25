class Operation {
    constructor(date, stockId, type, price, quantity, tax) {
        this._id = this.generateUniqueId();
        this._date = date;
        this._stockId = stockId;
        this._type = type;
        this._price = price;
        this._quantity = quantity;
        this._tax = tax;
    }

    get id() {
        return this._id;
    }

    get date() {
        return this._date;
    }

    get stockId() {
        return this._stockId;
    }

    get type() {
        return this._type;
    }

    get price() {
        return this._price;
    }

    get quantity() {
        return this._quantity;
    }

    get tax() {
        return this._tax;
    }

    generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

export default Operation;