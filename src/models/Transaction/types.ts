import { ObjectId } from "mongodb";

export interface TransactionSchema {
    _id?: ObjectId,                     //database id
    transaction_id: number,             //transacton id
    amount: number,                     //amount
    type: string,                       //type
    parent_id: number | null,           //parent id
}

export interface PutTransaction {
    amount: number,
    type: string,
    parent_id: number,
}

export interface ExpressRequest {
    body: PutTransaction,
    params: {
        transaction_id: string,
        type: string,
    },
}

export interface ExpressResponse {
    json: (object: any) => void;
}