import { PaymentMethodEnum } from "./PaymentMethodEnum";

export type PaymentDataType = {
    id : string;
    applicantId : string;
    amount : string;
    currency : string;
    paymentMethod  : PaymentMethodEnum;
    paymentDate : string;
    status : string;
    referenceNumber : string;
    notes : string;
}