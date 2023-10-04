import { NextRequestWithAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const qryString = request.nextUrl.searchParams;
    
    const userId = qryString.get('seq1');
    const friendId = qryString.get('seq2');

    console.log(userId + ', '+friendId);

    return NextResponse.json({});
}