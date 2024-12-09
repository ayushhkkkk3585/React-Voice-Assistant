import React, { createContext, useState } from "react";
import run from "../gemini";
export const datacontext = createContext();
const UserContext = ({ children }) => {
  const [speaking, setSpeaking] = useState(false);
  const [recognitionText, setRecognitionText] = useState("Listening....");
  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse(prompt) {
    let text = await run(prompt);
    // let newText=text.split("**")&&text.split("*")&&text.replace("google", "Ayush")&&text.replace("Google", "Ayush") ;
    setRecognitionText(text);
    speak(text);
    setTimeout(() => {
      setSpeaking(false);
    }, 4000);
  }

  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setRecognitionText(transcript);
    console.log(transcript);
    // aiResponse(transcript);
    takeCommand(transcript.toLowerCase());
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening Youtube...");
      setRecognitionText("Opening Youtube...");
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening Instagram...");
      setRecognitionText("Opening Instagram...");
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    } else if (command.includes("open") && command.includes("Twitter")) {
      window.open("https://x.com/home", "_blank");
      speak("Opening Twitter...");
      setRecognitionText("Opening Twitter...");
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    } else if (command.includes("open") && command.includes("Spotify")) {
      window.open("https://open.spotify.com/", "_blank");
      speak("Opening Spotify...");
      setRecognitionText("Opening Spotify...");
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    } else if (command.includes("time")) {
      let time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(time);
      setRecognitionText(time);
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleString(undefined, {
        day: "numeric",
        month: "short",
      });
      speak(date);
      setRecognitionText(date);
      setTimeout(() => {
        setSpeaking(false);
      }, 4000);
    } else {
      aiResponse(command);
    }
  }

  let value = {
    recognition,
    speaking,
    setSpeaking,
    recognitionText,
    setRecognitionText,
  };
  return (
    <>
      <datacontext.Provider value={value}>{children}</datacontext.Provider>
    </>
  );
};

export default UserContext;
