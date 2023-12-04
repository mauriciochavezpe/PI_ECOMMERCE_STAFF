// ActionProvider starter code
import axios from "axios"
import React from 'react';

 
class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }
    handleHello1 = (mesage="") => {
    const botMessage = this.createChatBotMessage('Hello. Nice to meet you.');

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

   async handleHello(message=""){
    let sURL ="https://870avezjq0.execute-api.us-east-1.amazonaws.com/dev/chat"
    let obj = {"question":message}
    let pay = await axios.post(sURL,obj)
    console.log(pay.data.response);
    let iValidate = [null,0,undefined,""];
      let body =iValidate.includes(pay.data.response) ? "Puedes intentar con otra solicitud" : pay.data.response; 
    const message1 = this.createChatBotMessage(
      body
    )
    
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message1],
    }));

  }
 }
 

{/*
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};*/}

export default ActionProvider;