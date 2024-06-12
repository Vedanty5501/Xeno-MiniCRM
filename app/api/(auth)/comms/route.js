
import { NextResponse } from "next/server"
import connect from "@/lib/db"
import communication from "@/lib/modals/communication"



// export const GET = async() =>{
//     await connect();
//     const customers = await Customer.find({ BilledAmount: { '$gt': 11000} });
//     return new NextResponse(JSON.stringify(customers), { status: 200 });
// }
export const GET = async (request) => {
    try {
        const url = new URL(request.url);
        const params = JSON.parse(url.searchParams.get('query'));
        await connect();
        const communication= await communication.find(params);
        return new NextResponse(JSON.stringify(communication), { status: 200 });
    } catch (error) {
        return new NextResponse(error);
    }
}

export const POST = async (request) => {
    try {
        const body = await request.json();
        await connect();
        console.log(body)
        const newComms = new communication(body);
        await newComms.save();

        return new NextResponse(JSON.stringify({ message: "Log Created", log:newComms }), { status: 201 });
    } catch (error) {
        return new NextResponse("Error in creating admin: " + error);
    }
}
