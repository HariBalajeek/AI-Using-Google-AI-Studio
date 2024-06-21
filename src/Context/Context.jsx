import { createContext , useState} from "react";
import run from "../config/spitzai";

export const Context = createContext();

const ContextProvider = (props) => {

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPreviousPrompt(prev=>[...prev,input])
        const response = await run(input)
        let responseArray = response.split("**")
        let newResponse = ""
        for(let i=0;i< responseArray.length;i++) {
            if(i===0 || i%2 !==1){
                newResponse += responseArray[i]

            }
            else{
                newResponse += "<b>" + responseArray[i]+"</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("<br>")
        let newResponseArray = newResponse2.split(" ")
        for(let i=0;i< newResponseArray.length;i++) {
        const nextWord=newResponseArray[i]
        delayPara(i,nextWord+"")
        }
        setLoading(false)
        setInput("")
        await run(input)
    }

    const delayPara = (index,nextWord) => {
        setTimeout(function(){
                setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const [input , setInput] = useState("")
    const [recentPrompt , setRecentPrompt] = useState("")
    const [previousPrompt , setPreviousPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData , setResultData] = useState("")
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        resultData,
        input,
        setInput,
        setLoading,
        setResultData

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;