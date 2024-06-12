import {Schema,model,models} from "mongoose";

const communicationSchema = new Schema({
    email: { type: String, required: true,},
    name: { type: String, required: true},
    message: {type: String, required:true},
    delivery: {type: String, required:true}
});

const communication = models.communication || model("communication",communicationSchema);

export default communication;