import { getuserByClerkId } from "@/util/auth"
import { prisma } from "@/util/db"
import {qa} from '@/util/ai'
import { NextResponse } from "next/server"

export const POST = async (request) => {  
    const {question } = await request.json()
    const user = await getuserByClerkId()
    const entries = await prisma.journal.findMany({
        where:{
            userId:user.id,
        },
        select:{
            id:true,
            content:true,
            createdAt:true,
        },
    })

    const answer = await qa(question,entries)
    return NextResponse.json({data:answer})
}


