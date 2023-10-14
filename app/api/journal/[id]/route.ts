import { analyze } from "@/util/ai"
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
        },
        data:{
            content,
        },
    })
    
    const analysis = await analyze(updateEntry.content)

    const updated=await prisma.analysis.upsert({
        where:{
            entryId:updateEntry.id,
        },
        create:{
            userId:user.id,
            entryId:updateEntry.id,
           ...analysis,
        },
        update: analysis,
            
    })
    console.log(updated)

    return NextResponse.json({data:{...updateEntry,analysis:updated}})
}