class Reminder {
  constructor({ product, dueDate, quantity, removed }) {
    this.quantity = quantity;
    this.product = product;
    this.dueDate = dueDate;
    this.removed = !!removed;
  }

  setQuantity(quantity) {
    return this.quantity = quantity;
  }

  getQuantity() {
    return this.quantity;
  }

  setProduct(product) {
    return this.product = product;
  }

  getProduct() {
    return this.product;
  }

  setDueDate(dueDate) {
    return this.dueDate = new Date(dueDate);
  }

  getDueDate() {
    return new Date(this.dueDate);
  }

  setRemoved(removed) {
    return this.removed = new Date(removed);
  }

  getRemoved() {
    return new Date(this.removed);
  }
}

module.exports = Reminder;