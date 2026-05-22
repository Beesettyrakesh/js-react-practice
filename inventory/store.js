function createStore() {
  let productsStore = [];

  function getById(id) {
    const product = productsStore.find((product) => product.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  function getInStock() {
    const inStockProducts = productsStore.filter(
      (product) => product.stock > 0,
    );
    return inStockProducts;
  }

  function getTotalValue() {
    return productsStore.reduce(
      (acc, product) => acc + product.price * product.stock,
      0,
    );
  }

  return {
    getById,
    getInStock,
    getTotalValue,
    addProduct(product) {
      productsStore.push(product);
    },

    getAll() {
      return productsStore;
    },

    updateStock(id, quantity) {
      const product = getById(id);
      product.stock += quantity;
      return { ...product };
    },

    getSummary() {
      let summary = {};
      summary.totalProducts = productsStore.length;
      summary.inStock = getInStock().length;
      summary.outOfStock = summary.totalProducts - summary.inStock;
      summary.totalValue = getTotalValue();
      return summary;
    },
  };
}

export default createStore;
