# TransactionService
 A microservice for transaction APIs

# Supported APIs
 **<h2>Create/Update a transaction</h2>**
 
 PUT /transactionservice/transaction/$transaction_id
 
 Body
 
 { "amount":double,"type":string,"parent_id":long } 
 
 where:
 
 • transaction id is a long specifying a new transaction
 
 • amount is a double specifying the amount
 
 • type is a string specifying a type of the transaction.
 
 • parent id is an optional long that may specify the parent transaction of this transaction.




 **<h2>Get a transaction with a particular transaction_id</h2>**
 
 GET /transactionservice/transaction/$transaction_id 
 
 Response { "amount":double,"type":string,"parent_id":long }


 **<h2>Get the transaction_ids of all transactions with a given type</h2>**
 
 GET /transactionservice/types/$type 
 
 Returns: [long, long, ... ] A json list of all transaction ids that share the same type $type.


 **<h2>Get the sum of amounts of all children (both direct and indirect of a transaction)</h2>**
 GET /transactionservice/sum/$transaction_id 
 
 Returns: { "sum": double } 
 
 A sum of all transactions that are transitively linked by their parent_id to $transaction_id.( If A is parent of B and C,  and C is parent of D and E . sum(A) = B + C + D + E

# Code Structure
1. The routers are present at **src/routes**
2. The controllers and models are present at **src/models**

# Algorithm to calculate sum of amounts of Child Transactions**
Perform a DFS starting from the root transaction_id and add the amounts of all transactions in its subtree. 
**Time Complexity**: O(n), where n is the number of child transactions.

# Dependencies
1. Node and Express
2. TypeScript
3. MongoDB driver
4. Babel to compile TypeScript for build version
5. Other libraries including dotenv, cookie-parser, ts-node, etc

# How to run
1. Create a MongoDB server at port 27017
2. To run in development mode, run following commands:

``npm start``

3. To run in build (production) mode,

**In Windows:**

``npm run wclean && npm run prod``

**In Linux:**

``npm run lclean && npm run prod``
