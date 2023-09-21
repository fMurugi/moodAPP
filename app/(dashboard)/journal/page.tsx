import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getuserByClerkId } from '@/util/auth'
import {prisma} from '@/util/db'
import Link from 'next/link'

const getEntries = async()=>{
    const user = await getuserByClerkId()
    const entries =  await prisma.journal.findMany({
        where:{
            userId:user.id,

        },
        orderBy:{
            createdAt:'desc'
        }
    })
    return entries 
}

const Journalpage = async ()=>{
    const entries =  await getEntries()
    
    return(
        <div className='p-10 bg-zinc-400/10 h-full'>
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className='grid grid-cols-3 gap-4 p-10'>
            <NewEntryCard/>
            {entries.map(entry=> 
            <Link href={`/journal/${entry.id}`} key={entry.id} >
                <EntryCard  entry={entry}/>

            </Link>
            )}
            </div>
        </div>
    
    )
}

export default Journalpage