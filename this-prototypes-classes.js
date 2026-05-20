// 1. What does this log and why?
const user = {
  name: "Ravi",
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

const greet = user.greet;
greet(); // what happens here?
user.greet(); // what about here?

// 2. Fix the broken timer — make it log "Ravi" after 1 second
const user1 = {
  name: "Ravi",
  greet() {
    setTimeout(() => {
      console.log(`Hi, I am ${this.name}`); // broken — fix it
    }, 1000);
  },
};
user1.greet();

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
  }

  birthday() {
    this.age += 1;
  }

  static fromObject({ name, age }) {
    return new Person(name, age);
  }
}

const ravi = Person.fromObject({ name: "Ravi", age: 28 });
ravi.greet(); // "Hi, I am Ravi and I am 28 years old"
ravi.birthday();
ravi.greet(); // "Hi, I am Ravi and I am 29 years old"

class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  greet() {
    console.log(`Hi, I am ${this.name}, I work as a ${this.role}`);
  }
}

const emp = new Employee("Ravi", 28, "Developer");
emp.greet(); // "Hi, I am Ravi, I work as a Developer"
emp.birthday();
emp.greet(); // still works — same message
