// src/components/ai/AiChatPage.tsx

import React, { useState, useRef, useEffect } from "react";
import ContactPanel from "../ContactPanel";
import UserStatusBar from "../UserStatusBar";
import ChatHeader from "../ChatHeader";
import AiChatPanel from "./AiChatPanel"

const aiContacts = [{ id: "ai-1", name: "AI子", tag: "0001" }];

export default function AiChatPage() {
  const [activeId, setActiveId] = useState(aiContacts[0].id);
  const [contactWidth, setContactWidth] = useState(240);
  const isResizing = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      setContactWidth(Math.min(400, Math.max(180, e.clientX - 72)));
    };
    const onUp = () => (isResizing.current = false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* 左中：ContactPanel + UserStatusBar */}
      <div style={{ width: contactWidth }} className="flex flex-col h-full">
        <ContactPanel
          contacts={aiContacts}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <UserStatusBar />
      </div>

      {/* 拖拽条 */}
      <div
        className="w-1 cursor-col-resize bg-gray-600"
        onMouseDown={() => (isResizing.current = true)}
      />

      {/* 右侧：ChatHeader + ChatPanel */}
      <div className="flex-1 flex flex-col">
        <ChatHeader contact={aiContacts.find((c) => c.id === activeId)!} />
        <AiChatPanel aiName="AI子" />
      </div>
    </>
  );
}
