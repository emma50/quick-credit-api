const createQueries = {
  userTable: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    mobileno VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isadmin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(100) DEFAULT 'unverified'
  )`,
  loansTable: `CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    repaid BOOLEAN DEFAULT FALSE,
    tenor VARCHAR(100) NOT NULL,
    amount VARCHAR(100) NOT NULL,
    paymentinstallment VARCHAR(100) NOT NULL,
    balance VARCHAR(100) NOT NULL,
    interest VARCHAR(100) NOT NULL,
    status VARCHAR(100) DEFAULT 'pending'
  )`,
  repaymentsTable: `CREATE TABLE repayments (
    id SERIAL PRIMARY KEY,
    createdon TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    loanid VARCHAR(100) NOT NULL,
    paidamount VARCHAR(100) NOT NULL,
    paymentinstallment VARCHAR(100) NOT NULL
  )`,
};

const dropQueries = {
  userTable: 'DROP TABLE IF EXISTS users CASCADE',
  loansTable: 'DROP TABLE IF EXISTS loans CASCADE',
  repaymentsTable: 'DROP TABLE IF EXISTS repayments CASCADE',
};
const hashPassword = '$2b$10$jT.N7WjbzGb9M40v2kmuJ.q1tNyN5OCYtnRQ24jMl8g9zVRnYX9T.';
const seedQueries = {
  userTable: `INSERT INTO
  users(firstname, lastname, email, mobileno, address, isadmin, password, status)
  VALUES('Daniel', 'Ufeli', 'admin@quickcredit.com', '08082205956', '26 fagbeyiro street alakuko', true, '${hashPassword}', 'verified'),
  ('James', 'Oniola', 'user1@quickcredit.com', '08105334020', '26 fagbeyiro street alakuko', false, '$2b$10$jT.N7WjbzGb9M40v2kmuJ.q1tNyN5OCYtnRQ24jMl8g9zVRnYX9T.', 'unverified'),
  ('Olanrewaju', 'Julius', 'user2@quickcredit.com', '08037265917', '26 fagbeyiro street alakuko', false, '${hashPassword}', 'unverified')
  `,
};

module.exports = {
  createQueries,
  dropQueries,
  seedQueries,
};
