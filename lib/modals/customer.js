import {Schema,model,models} from "mongoose";

const CustomerSchema = new Schema({
    email: { type: String, required: true, unique: true },
    Name: { type: String, required: true},
    Age: { type: Number, required: true },
    Visit: { type: Date, required: true},
    BilledAmount: { type: Number, required: true},
    NumberOfVisit: { type: Number, required: true}
});

const Customer = models.Customer || model("Customer",CustomerSchema);

export default Customer;