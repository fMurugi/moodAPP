import Editor from "@/components/Editor"
import { getuserByClerkId } from "@/util/auth"
import { prisma } from "@/util/db"

const getEntry =async (id) => {
    const user = await getuserByClerkId()
    const entry = await prisma.journal.findUnique({
        where:{
            userId_id:{
                userId:user.id,
                id:id
            }
        }
    })
    return entry
}

const EntryPage = async({params})=>{
    const entry = await getEntry(params.id)
    return(
        <div className="h-full w-full">
            <Editor entry={entry}/>
        </div>
    )
}

export default EntryPage