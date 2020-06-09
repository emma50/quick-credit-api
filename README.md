# Quickcredit api  [![Build Status](https://travis-ci.com/emma50/quick-credit-api.svg?branch=develop)](https://travis-ci.com/emma50/quick-credit-api)  [![Coverage Status](https://coveralls.io/repos/github/emma50/quick-credit-api/badge.svg?branch=develop)](https://coveralls.io/github/emma50/quick-credit-api?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/af29e09b1ea40068c6a6/maintainability)](https://codeclimate.com/github/emma50/quick-credit-api/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/af29e09b1ea40068c6a6/test_coverage)](https://codeclimate.com/github/emma50/quick-credit-api/test_coverage)

___


## Quick Credit API
is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.

___


## Technologies
Quick Credit API was developed with JavaScript (ES6), Node.js using [Express 4](http://expressjs.com/). <br/>
with [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

___


## Swagger Documentation
API endpoints Documentation URL - https://quick-credit-api.herokuapp.com/api/v1/docs/

## API Information
API endpoints URL - https://quick-credit-api.herokuapp.com/

|METHOD  |DESCRIPTION                             |ENDPOINT                                  |
|------- |----------------------------------------|------------------------------------------|
|POST    |Sign Up                                 |api/v1/auth/signup                        |
|POST    |Sign In                                 |api/v1/auth/signin                        |
|POST    |Apply for a Loan                        |api/v1/loans                              |
|GET     |Get all User                            |api/v1/Users                              |
|GET     |Get all Loan Applications               |api/v1/loans                              |
|GET     |Get Specific Loan Application           |api/v1/loans/:loanid                      |
|GET     |Get Current Loans (not fully repaid)    |api/v1/loans/?status=approved&repaid=false|
|GET     |Get all Repaid Loans.                   |api/loans/?status=approved&repaid=true    |
|PATCH   |Mark a client as verified               |api/v1/users/<:user-email>/verify         |
|PATCH   |Approve or reject a loan application    |api/v1/loans/<:loan-id>                   |
|POST    |Create a loan repayment record          |api/v1/loans/<:loan-id>/repayment         |
|GET     |View loan repayment history             |api/v1/loans/<:loan-id>/repayments        |

___
### Sample Users
Admin-<br/>
Username: admin@quickcredit.com<br/>
Password: Domi@2019

User-<br/>
Username: user@quickcredit.com<br/>
Password: Domi@2019

___

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) 12.14.1 installed and [POSTMAN](https://www.getpostman.com/downloads/).

```sh
git clone https://github.com/emma50/quick-credit-api.git
cd quick-credit-api
npm install
npm start
```

Quick Credit API should now be running on [localhost:3000](http://localhost:3000/).
___

## Author
### Okwuidegbe Emmanuel Ikechukwu
