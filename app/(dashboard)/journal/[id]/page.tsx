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

const analysisData = [
    {name:"Summary",value:""},
    {name:"Subject",value:""},
    {name:"mood",value:""},
    {name:"Negative",value:"False"},
    
]

const EntryPage = async({params})=>{
    const entry = await getEntry(params.id)
    return(
        <div className="h-full w-full grid grid-cols-3">
             <div className="col-span-2">
                <Editor entry={entry}/>
            </div>
            <div className="border-l border-black/10">
                <div className="py-10 px-6 bg-blue-300" >
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                        <ul>
                            {analysisData.map((data)=>(
                                <li key={data.name} className="flex items-center justify-between py-4 px-2 border-b border-t border-black/10" >
                                    <span className="text-lg font-semibold">{data.name}</span>
                                    <span className="text-xl">{data.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>     
    )
}

export default EntryPage