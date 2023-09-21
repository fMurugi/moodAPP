import { getuserByClerkId } from "@/util/auth"
import { prisma } from "@/util/db"
import { NextResponse } from "next/server"

export const PATCH = async(request:Request,{params})=>{
    const user =  await getuserByClerkId()
    const {content} = await request.json()

    const updateEntry = await prisma.journal.update({
        where:{
            userId_id:{
                userId:user.id,
                id:params.id,
            },
            data:{
                content,
            },
        }
    })

    return NextResponse.json({data:updateEntry})
}