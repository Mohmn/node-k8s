import { Queues } from "./queues";
export interface CheckPrimeNoEvent {
    queue: Queues.CheckPrimeNo;
    data: {
        number: number;
    };
}