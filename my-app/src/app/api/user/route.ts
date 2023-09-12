import { NextResponse , NextRequest} from 'next/server'

const connection = require('../config/db');

export async function POST(request: Request) {
    const {msg} = await request.json();
    console.log(msg)
    return msg
}