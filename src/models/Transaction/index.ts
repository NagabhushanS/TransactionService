import { Collection, MongoClient } from "mongodb";
import { ExpressRequest, TransactionSchema } from "./types";

class Transaction {
    private static dbHandle: Collection<TransactionSchema>;

    public static injectDB(dbHandle: MongoClient) {
        this.dbHandle = dbHandle.db(process.env.DB_NAME).collection('transactions');
        console.log('Successfully injected db into Transaction Model');
    }

    public static getDB() {
        return this.dbHandle;
    }

    //PUT /transactionservice/transaction/:transaction_id
    public static async updateTransaction(req: ExpressRequest, transaction_id: number) {
        const transaction = await this.dbHandle.findOne({
            transaction_id,
        });

        if (transaction != null) {
            //exists
            this.dbHandle.replaceOne({
                transaction_id,
            }, {
                transaction_id,
                parent_id: req.body.parent_id,
                amount: req.body.amount,
                type: req.body.type,
            });
        } else {
            //create new
            this.dbHandle.insertOne({
                transaction_id,
                parent_id: req.body.parent_id,
                amount: req.body.amount,
                type: req.body.type,
            });
        }
    }

    // GET /transactionservice/transaction/:transaction_id 
    public static async getTransaction(transaction_id: number) {
        const transaction = await this.dbHandle.findOne({
            transaction_id,
        });

        return transaction;
    }

    // GET /transactionservice/types/:type
    public static async getAllTransactionsOfType(type: string) {
        const cursor = this.dbHandle.find({
            type,
        });

        const transactions: number[] = [];

        await cursor.forEach((transaction) => {
            transactions.push(transaction.transaction_id);
        });

        return transactions;
    }

    //GET /transactionservice/sum/:transaction_id 
    public static async getAllChildTransactions(transaction_id: number) {
        return await this.dfs(transaction_id);
    }

    private static async dfs(parent_id: number) {
        const parentTransaction = await this.dbHandle.findOne({
            transaction_id: parent_id,
        });

        let sumOfChildTransactions = parentTransaction!.amount;

        //Get all imediate children
        const childrenCursor = this.dbHandle.find({
            parent_id: parent_id,
        });

        //Call dfs recursively on children
        while(await childrenCursor.hasNext()) {
            const childTransaction = await childrenCursor.next();
            sumOfChildTransactions += await this.dfs(childTransaction!.transaction_id);
        }

        return sumOfChildTransactions;
    }
}

export default Transaction;