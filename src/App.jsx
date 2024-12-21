import React, { useEffect, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import QB from "quickblox/quickblox";

function App() {
  const [submittedRecommendations, setSubmittedRecommendations] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  async function prepareSDK() {
    if (window.QB === undefined) {
      if (QB !== undefined) {
        window.QB = QB;
      } else {
        var QBLib = require('quickblox/quickblox.min');
        window.QB = QBLib;
      }
    }

    const APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID;
    const AUTH_KEY = import.meta.env.VITE_AUTH_KEY;
    const AUTH_SECRET = import.meta.env.VITE_AUTH_SECRET;
    const ACCOUNT_KEY = import.meta.env.VITE_ACCOUNT_KEY;
    var CONFIG = { debug: true };
    window.QB.init(APPLICATION_ID, AUTH_KEY, AUTH_SECRET, ACCOUNT_KEY, CONFIG);
  }

  useEffect(() => {
    prepareSDK()
      .then(() => {
        const currentUser = {
          login: import.meta.env.VITE_LOGIN,
          password: import.meta.env.VITE_PASSWORD,
        };
        QB.createSession(currentUser, (errorCreateSession, session) => {
          if (!errorCreateSession) {
            const userId = session.user_id;
            const password = session.token;
            const paramsConnect = { userId, password };
            QB.chat.connect(paramsConnect, (errorConnect) => {
              if (errorConnect) {
                console.log('Cannot connect to chat server: ', errorConnect);
              }
            });
          }
        });
      })
      .catch((e) => {
        console.log('init SDK has error: ', e);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const smartChatAssistantId = import.meta.env.VITE_SMART_CHAT_ASSISTANT_ID;
    const messageToAssist = inputText;
    const history = [
      { role: "user", message: "Hello" },
      { role: "assistant", message: "Hi" },
    ];

    QB.ai.answerAssist(smartChatAssistantId, messageToAssist, history, (error, response) => {
      setLoading(false);
      if (error) {
        console.error('QB.ai.answerAssist: Error:', error);
      } else {
        const recommendations = response.answer.split("\n").map((line) => {
          const [movie, platformInfo] = line.split(", ");
          const [platformName, platformLink] = platformInfo
            .replace("[", "")
            .replace("]", "")
            .split("(");

          return {
            movieName: movie.trim(),
            platformName: platformName.trim(),
            platformLink: platformLink.replace(")", "").trim(),
          };
        });

        setSubmittedRecommendations(recommendations);
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bgimg">
        <div className="p-3 rounded-md">
          <div className="flex flex-col items-center p-4 m-4">
            <h1 className="text-4xl lg:text-7xl text-slate-50 font-serif text-center">
              What's on your mind?
            </h1>
            <div className="text-xl text-stone-400 text-center mb-4">
              Tell us how you’re feeling, and let me recommend the perfect movie for you!
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="m-2 text-black text-xl text-center w-full resize-none"
              placeholder="Type your thoughts here..."
            />
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="p-4 m-2 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
            >
              {loading ? "Loading..." : "Recommend me!"}
            </Button>
          </div>
          {submittedRecommendations.length > 0 && (
            <div className="grid gap-6 mt-8">
              {submittedRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6 rounded-lg shadow-lg flex flex-col items-center text-white"
                >
                  <h2 className="text-2xl font-bold mb-4">{rec.movieName}</h2>
                  <Button
                    onClick={() => window.open(rec.platformLink, "_blank")}
                    className="p-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white rounded-lg"
                  >
                    Watch a glimpse of it at {rec.platformName}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
