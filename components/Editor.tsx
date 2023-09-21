'use client'

import { updateEntry } from "@/util/api"
import { useEffect, useState } from "react"

// import { AutoSave,useAutoSave } from "react-autosave"

const Editor =({entry})=>{
    const [value,setValue] = useState(entry.content)
    const [isLoading,setIsLoading] = useState(false)

    // useAutoSave(
    //     {data:value,
    //     onSave:async(_value)=>{
    //         setIsLoading(true)
    //         const updated =  await updateEntry(entry.id,_value)
    //         setIsLoading(false)
    //     },}
    
    // )
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
          setIsLoading(true);
          const updated = await updateEntry(entry.id, value);
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timeoutId);
      }, [value]);
    
    return(
        <div className=" w-full h-full">
            {isLoading && <div>Loading...</div>}
            <textarea className="w-full h-full p-8 text-xl" value={value} onChange={e=>setValue(e.target.value)}/>
        </div>
    )
}

export default Editor

// function useAutoSave(arg0: { data: any; onSave: (_value: any) => Promise<void> }) {
//     throw new Error("Function not implemented.")
// }
