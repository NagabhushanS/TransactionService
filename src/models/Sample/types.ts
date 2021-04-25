import { ObjectId } from "mongodb";

export interface SampleSchema {

}

export interface ExpressRequest {
    body: null,
    params: {
        transaction_id: string,
        type: string,
    },
}

export interface ExpressResponse {
    json: (object: any) => void;
}