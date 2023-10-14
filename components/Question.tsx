'use client'

import { askQuestion } from "@/util/api";
import { useState } from "react";
import { set } from "zod";


const Question = () => {
    const [value,setValue] = useState('')
    const [answer,setAnswer] = useState('')
    const[isLoading,setIsLoading] = useState(false)
    const onChange = (e)=>{
        setValue(e.target.value)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const answer = await askQuestion(value)
        setAnswer(answer)
        setIsLoading(false)
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input disabled={isLoading} onChange={onChange} value={value} type="text" placeholder="What's on your mind?" 
        className="border border-black/20 px-4 py-2 text-lg rounded-lg"/>
        <button disabled={isLoading} type="submit" className="bg-blue-400 px-4 py-2 rounded-lg text-lg">Ask</button>    
      </form>
      {isLoading && <div>Loading...</div>}
        {answer && <div>{answer}</div>}
    </div>
  );
}

export default Question