import React, { useEffect } from "react";
import axios from "axios"

const ResponseChagpt = (props)=>{
const { state, setState } = props;
const sURL = process.env.REACT_APP_URL_ALL+"/chat"
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