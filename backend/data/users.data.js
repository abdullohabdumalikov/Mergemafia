// Oddiy xotira (database o'rniga)
let users = [
  { id: 1, name: "Ali Karimov", email: "ali@mail.com", age: 25 },
  { id: 2, name: "Malika Rahimova", email: "malika@mail.com", age: 22 },
];
let nextId = 3;

module.exports = { users, getNextId: () => nextId++ };










