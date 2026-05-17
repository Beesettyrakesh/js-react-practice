function myMap(array, transformFn) {
  const resultArr = [];
  for (let i = 0; i < array.length; i++) {
    resultArr.push(transformFn(array[i]));
  }
  return resultArr;
}

function myFilter(array, predicateFn) {
  const resultArr = [];
  for (let i = 0; i < array.length; i++) {
    if (predicateFn(array[i])) {
      resultArr.push(array[i]);
    }
  }
  return resultArr;
}

function myReduce(array, reducerFn, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = reducerFn(accumulator, array[i]);
  }
  return accumulator;
}

const orders = [
  { id: 1, product: "keyboard", price: 120, shipped: true },
  { id: 2, product: "mouse", price: 45, shipped: false },
  { id: 3, product: "monitor", price: 380, shipped: true },
  { id: 4, product: "webcam", price: 89, shipped: false },
  { id: 5, product: "headset", price: 150, shipped: true },
];

const result = myReduce(
  myMap(
    myFilter(orders, (order) => order.shipped),
    (order) => order.price * 0.9,
  ),
  (accumulator, item) => accumulator + item,
  0,
);

console.log(result);
