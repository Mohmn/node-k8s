import { Publisher } from "../events/base-publisher";
import { CheckPrimeNoEvent } from "../events/check-prime-event";
import { Queues } from "../events/queues";

export class CheckPrimeNoPublisher extends Publisher<CheckPrimeNoEvent> {
    queue: Queues.CheckPrimeNo = Queues.CheckPrimeNo;
}