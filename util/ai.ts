import { OpenAI } from "langchain/llms/openai";
import z from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser =  StructuredOutputParser.fromZodSchema(
    z.object({
        sentimentScore:z.number().describe('sentiment of the text and rated on a scale from -10 to 10 ,where -1o is extremely negative, 0 is neutral, and 10 is extremely positive.'),
        mood:z.string().describe('the mood of the person who wrote the journal entry.'),
        summary:z.string().describe('a summary of the journal entry.'),
        subject:z.string().describe('the subject of the journal entry.'),
        negative:z.boolean().describe('is the journal entry negative?(ie does it contain negative emotions?)'),
        color:z.string().describe('a hexadecimal color code representing the mood of the journal entry.Example #0101fe for blue representing happiness.'), 
    })
)

const getPrompt = async (content)=>{
    const formattedInstructions = parser.getFormatInstructions()
    const prompt =  new PromptTemplate({
        template:      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables:['entry'],
        partialVariables:{format_instructions:formattedInstructions},
     }) 

     const input = await prompt.format({entry:content})

     return input
}

export const analyze =async (content)=>{
    const input = await getPrompt(content)
    const model = new OpenAI({temperature:0,modelName:'gpt-3.5-turbo',maxTokens:100})
    const result = await model.call(input)
    try {
        return parser.parse(result)
    } catch (error) {
        console.log(error)
    }
}

 
export const qa = async (question,entries)=>{
    const docs  = entries.map(entry=>{
        return new Document({
            pageContent:entry.content,
            metadata:{
                id:entry.id,
                createdAt:entry.createdAt,
            },
        })
    })

    const model = new OpenAI({temperature:0,modelName:'gpt-3.5-turbo'})
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await  MemoryVectorStore.fromDocuments(docs,embeddings)
    const relevantDocs = await store.similaritySearch(question)

    const res = await chain.call(
        {
            input_documents:relevantDocs,
            question:question,
        }
    )

    return res.output_text;
}
