import React from "react";
import { useContext } from "react";
import { datacontext } from "../context/UserContext";

const VoiceA = () => {
  let {
    recognition,
    speaking,
    setSpeaking,
    recognitionText,
    setRecognitionText,
  } = useContext(datacontext);
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-5">
        <img
          src="/woman.png"
          alt=""
          className="w-64 h-64 mt-20 sm:w-72 sm:h-72 md:w-1/2 md:h-1/2 lg:w-1/4 lg:h-1/4 lg:mt-10"
        />

        <p className="text-center mt-5 text-lg sm:text-2xl md:text-3xl lg:text-4xl">
          I am Parineeti, who will listen and answer your questions
        </p>
        {!speaking ? (
          <button
            onClick={() => {
              setRecognitionText("Listening....");
              setSpeaking(true);
              recognition.start();
            }}
            className="bg-teal-400 text-black p-3 font-semibold rounded-full"
          >
            Click here!
          </button>
        ) : (
          <div>
            <p className="bg-zinc-800 flex text-center p-5 m-2 rounded-md">
              {recognitionText}
            </p>
          </div>
        )}
      </div>

      {/* <Loader /> */}
    </>
  );
};

export default VoiceA;
