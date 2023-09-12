import { NextResponse , NextRequest} from 'next/server'

const connection = require('../config/db');

export async function POST() {
    console.log(NextRequest.toString);
}