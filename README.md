# TransactionService
 A microservice for transaction APIs

# Supported APIs
 **Create/Update a transaction**
 
 PUT /transactionservice/transaction/$transaction_id
 
 Body
 
 { "amount":double,"type":string,"parent_id":long } 
 
 where:
 
 • transaction id is a long specifying a new transaction
 
 • amount is a double specifying the amount
 
 • type is a string specifying a type of the transaction.
 
 • parent id is an optional long that may specify the parent transaction of this transaction.




 **Get a transaction with a particular transaction_id**
 
 GET /transactionservice/transaction/$transaction_id 
 
 Response { "amount":double,"type":string,"parent_id":long }


 **Get the transaction_ids of all transactions with a given type**
 
 GET /transactionservice/types/$type 
 
 Returns: [long, long, ... ] A json list of all transaction ids that share the same type $type.


 **Get the sum of amounts of all children (both direct and indirect of a transaction)**
 GET /transactionservice/sum/$transaction_id 
 
 Returns: { "sum": double } 
 
 A sum of all transactions that are transitively linked by their parent_id to $transaction_id.( If A is parent of B and C,  and C is parent of D and E . sum(A) = B + C + D + E
