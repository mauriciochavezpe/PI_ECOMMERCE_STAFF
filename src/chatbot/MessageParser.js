import React from 'react';
 
// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      //if(message.toLowerCase().includes("hi")){
        this.actionProvider.handleHello(message)
      //}
    }
  }
{/*

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log(message);
    if (message.includes('hi')) {
      actions.handleHello();
    }



  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};
*/}
export default MessageParser;

