import { getuserByClerkId } from "@/util/auth"
import {prisma} from '@/util/db'
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST =async () => {
    const user = await getuserByClerkId()
    const entry =  await prisma.journal.create({
        data:{
            userId: user.id,
            content: 'write about your day',
        },
    })
    
    revalidatePath('/journal')
    return NextResponse.json({data:entry})
}