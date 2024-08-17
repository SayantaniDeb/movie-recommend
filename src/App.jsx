import React, {useEffect, useState} from 'react';
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import QB from "quickblox/quickblox";


function App() {
  const [submittedText, setSubmittedText] = useState('');
   const [inputText, setInputText] = useState('');
   const [loading, setLoading] = useState(false);

  async function prepareSDK() {
    // check if we have installed SDK
    if (window.QB === undefined) {
      if (QB !== undefined) {
        window.QB = QB;
      } else {
        var QBLib = require('quickblox/quickblox.min');
        window.QB = QBLib;
      }
    }
    /*
   
     */
    var APPLICATION_ID = process.env.REACT_APP_APPLICATION_ID;
    var AUTH_KEY = process.env.REACT_APP_AUTH_KEY;
    var AUTH_SECRET = process.env.REACT_APP_AUTH_SECRET;
    var ACCOUNT_KEY = process.env.REACT_APP_ACCOUNT_KEY;
    var CONFIG = { debug: true };
    window.QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);
  }

  useEffect(() => {
    prepareSDK().then(result => {
      const currentUser = {
        login: process.env.REACT_APP_LOGIN,
        password: process.env.REACT_APP_PASSWORD,
      };
      QB.createSession(currentUser, async function (errorCreateSession, session) {
        if (errorCreateSession) {
          console.log('Create User Session has error:', JSON.stringify(errorCreateSession));
        } else {
          const userId = session.user_id;
          const password = session.token;
          const paramsConnect = { userId, password };
          QB.chat.connect(paramsConnect, async function (errorConnect, resultConnect) {
            if (errorConnect) {
              console.log('Can not connect to chat server: ', errorConnect);
            }
          });
        }
      });
    }).catch(
        e => {
          console.log('init SDK has error: ', e)
        });
  }, []);


  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const smartChatAssistantId = process.env.REACT_APP_SMART_CHAT_ASSISTANT_ID; // Replaced with our actual Assistant ID from testing ac
    const messageToAssist = inputText; // Use inputText from state
    const history = [
      { role: "user", message: "Hello" },
      { role: "assistant", message: "Hi" }
    ];

    QB.ai.answerAssist(smartChatAssistantId, messageToAssist, history, (error, response) => {
      setLoading(false);
      if (error) {
        console.error('QB.ai.answerAssist: Error:', error);
      } else {
        setSubmittedText(response.answer); // Set the response answer to state
        console.log('QB.ai.answerAssist: Response:', response.answer);
      }
    });
  };

 
  

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bgimg">
    <div className="p-3 rounded-md">
      <div className='flex flex-col items-center p-4 m-4'>
        <h1 className='text-4xl lg:text-7xl text-slate-50 font-serif text-center'>What's on your mind?</h1>
        <div className='text-xl text-stone-400 text-center mb-4'>Tell us how you’re feeling, and let me recommend the perfect movie for you!</div>
        <Textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="m-2 text-black text-xl text-center w-full resize-none"
              placeholder="Type your thoughts here..."
            />
        <Button onClick={handleSubmit} disabled={loading} className="p-4 m-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
        {loading ? "Loading..." : "Recommend me!"}

        </Button>
      </div>
      {submittedText && (
          <div className="m-2 p-4 lg:m-10 lg:text-xl border border-gray-300 rounded zinc-950 text-slate-50">
            {submittedText}
          </div>
        )}
    </div>
  </div>

  
  </>
  )
}

export default App