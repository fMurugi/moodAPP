import { analyze } from "@/util/ai"
import { getuserByClerkId } from "@/util/auth"
import {prisma} from '@/util/db'
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
    const user = await getuserByClerkId()
    const entry = await prisma.journal.create({
        data: {
            userId: user.id,
            content: 'today was a great day',
        },
    })

    const analysis = await analyze(entry.content)

    if (!analysis) {
        // handle the case where analysis is undefined
        return NextResponse.json({ error: 'Failed to analyze journal entry' })
    }

    const newAnalysis = await prisma.analysis.create({
        data: {
            ...analysis,
            entryId: entry.id,
            userId: user.id,
        }
    })

    revalidatePath('/journal')
    return NextResponse.json({ data: entry })
}