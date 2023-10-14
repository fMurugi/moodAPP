'use client'

import { updateEntry } from "@/util/api"
import { useEffect, useState } from "react"
import { set } from "zod"

// import { AutoSave,useAutoSave } from "react-autosave"

const Editor =({entry})=>{
    const [value,setValue] = useState(entry.content)
    const [isLoading,setIsLoading] = useState(false)
    const [analysis,setAnalysis] = useState(entry.analysis)

    // useAutoSave(
    //     {data:value,
    //     onSave:async(_value)=>{
    //         setIsLoading(true)
    //         const updated =  await updateEntry(entry.id,_value)
    //         setIsLoading(false)
    //     },}
    
    // )
    const {mood,subject,summary,Negative,color} = entry.analysis
    const analysisData = [
        {name:"Summary",value:summary},
        {name:"Subject",value:subject},
        {name:"mood",value:mood},
        {name:"Negative",value:Negative ? "Yes":"No"},
        
    ]
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
          setIsLoading(true);
          const updated = await updateEntry(entry.id, value);
          console.log(updated)
          setAnalysis(updated.analysis)
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timeoutId);
      }, [value,analysis]);
    
    return(
        <div className=" w-full h-full grid grid-cols-3">
            <textarea className=" p-8 text-xl col-span-2" value={value} onChange={e=>setValue(e.target.value)}/>
            <div className="border-l border-black/10">
                <div className="py-10 px-6 "style={{background:color}} >
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

export default Editor

// function useAutoSave(arg0: { data: any; onSave: (_value: any) => Promise<void> }) {
//     throw new Error("Function not implemented.")
// }
