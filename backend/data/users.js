import bcrypt from "bcryptjs";

const users = [
  {
    name: "Test User",
    email: "test@email.com",
    points: "500",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Test2 User",
    email: "test2@email.com",
    points: "500",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Billy",
    email: "billy@email.com",
    points: "500",
    password: bcrypt.hashSync("Anchor1", 10),
    isAdmin: false,
  },
  {
    name: "Sarah",
    email: "sarah@email.com",
    points: "500",
    password: bcrypt.hashSync("Anchor1", 10),
    isAdmin: false,
  },
  {
    name: "Ross",
    email: "ross@email.com",
    points: "500",
    password: bcrypt.hashSync("Anchor1", 10),
    isAdmin: true,
  },
  {
    name: "Mary",
    email: "mary@email.com",
    points: "500",
    password: bcrypt.hashSync("Anchor1", 10),
    isAdmin: true,
  },
  {
    name: "Mandy",
    email: "mandy@email.com",
    points: "500",
    password: bcrypt.hashSync("Anchor1", 10),
    isAdmin: true,
  },

  // {
  //   name: "Admin User",
  //   email: 'admin"email.com',
  //   password: bcrypt.hashSync("123456", 10),
  //   isAdmin: true,
  // },
  // {
  //   name: "John Doe",
  //   email: 'john"email.com',
  //   password: bcrypt.hashSync("123456", 10),
  //   isAdmin: false,
  // },
  // {
  //   name: "Jane Doe",
  //   email: 'jane"email.com',
  //   password: bcrypt.hashSync("123456", 10),
  //   isAdmin: false,
  // },
];

export default users;
