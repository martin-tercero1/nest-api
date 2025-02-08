const myName: string = 'Martin';

const myAge: number = 23;

const sum = (a: number, b: number) => {
  return a + b;
};

sum(10, 10);

class Person {
  // private age: number;
  // // By default properties are public
  // private name: string;

  // constructor(age: number, name: string) {
  //   this.age = age;
  //   this.name = name;
  // }

  // A shorter way using TS

  constructor(
    private age: number,
    private name: string,
  ) {}

  getSummary() {
    return `My name is ${this.name}, I am ${this.age} old.`;
  }
}

const martin = new Person(23, 'Martin');
console.table(martin);
