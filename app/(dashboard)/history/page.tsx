import HistoryChart from "@/components/HistoryCharts"
import { getuserByClerkId } from "@/util/auth"
import { prisma } from "@/util/db"


const getData = async ()=>{
    const user = await getuserByClerkId()
    const analysis = await prisma.analysis.findMany({
        where:{
            userId:user.id
        },
        orderBy:{
            createdAt:'asc'
        }
    })
    const sum =  analysis.reduce((all,current)=>all+current.sentimentScore,0)
    const average = Math.round(sum/analysis.length)
    return {analysis,average}
}

const History  = async()=>{
    const {analysis,average} = await getData()
    return(
        <div className="h-full w-full px-6 py-8">
        <div>
          <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
        </div>
        <div className="h-full w-full">
          <HistoryChart data={analysis} />
        </div>
      </div>
    )
}

export default History