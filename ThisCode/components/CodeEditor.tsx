"use client";

import React, { useState, useEffect } from "react";
// import CodeEditor from "../components/CodeEditor";
import useSocket from "../hooks/useSocket";
import CodeInput from "./chat/CodeInput";



const CodeEditor: React.FC = () => {
  const [code, setCode] = useState("");
  const socket = useSocket("http://localhost:3001");

  useEffect(() => {
    socket.on("codeUpdate", (newCode: string) => {
      setCode(newCode);
    });

    return () => {
      socket.off("codeUpdate");
    };
  }, [socket]);

  const handleCodeChange = (value: string) => {
    setCode(value);
    socket.emit("codeUpdate", value);
  };

  return (
    <div className="">
      <CodeInput
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditor;
