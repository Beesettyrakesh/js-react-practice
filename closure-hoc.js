function createCounter(startValue, step) {
  const initialValue = startValue;
  let count = startValue;
  return {
    increment() {
      count += step;
      console.log(count);
    },
    decrement() {
      count -= step;
      console.log(count);
    },
    reset() {
      count = initialValue;
      console.log(count);
    },
  };
}

const counter1 = createCounter(10, step = 1);
console.log("Counter 1");
counter1.increment();
counter1.increment();
counter1.decrement();
counter1.reset();
counter1.increment();

const counter2 = createCounter(0, step = 2);
console.log("Counter 2");
counter2.increment();
counter2.increment();
counter2.decrement();
counter2.reset();

console.log("Counter 1 again");
counter1.reset();
counter1.increment();
