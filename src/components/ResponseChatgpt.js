import React, { useEffect } from "react";
import axios from "axios"

const ResponseChagpt = (props)=>{
const { state, setState } = props;
const sURL ="https://870avezjq0.execute-api.us-east-1.amazonaws.com/dev/chat"
    debugger;
    useEffect(async () =>{
    let obj = {"question":state.question}
        console.log(obj)
     axios.post(sURL,obj)
     .then(e=>{
        let response = e.data.response;
        setState(state=> ({...state, payload:response}))
     })

    },[])

    return(
        <div>{state.payload}</div>
    )


}

export default ResponseChagpt;