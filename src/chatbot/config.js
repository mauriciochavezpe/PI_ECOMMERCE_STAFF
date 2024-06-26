import { createChatBotMessage } from "react-chatbot-kit";

import ResponseChagpt from "../components/ResponseChatgpt";

const config = {
  initialMessages: [createChatBotMessage(`¡Hola! Soy Botsito, tu asistente para sugerir productos y verificar su disponibilidad en stock. ¿En qué puedo ayudarte hoy?`)],
  botName:"Botsito",
  state: {
    payload:"",
    question:""
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
      fontsize:8
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
      fontsize:8

    },
  },
  widgets: [
    {
      widgetName: 'responseChagpt',
      widgetFunc: (props) => <ResponseChagpt {...props} />,
      mapStateToProps: ['payload', "question"],
    }
  ]
}

export default config