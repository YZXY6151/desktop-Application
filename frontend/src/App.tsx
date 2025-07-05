// src/App.tsx
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ContactPanel from "./components/ContactPanel";
import UserStatusBar from "./components/UserStatusBar";
import ChatHeader from "./components/ChatHeader";
import ChatPanel from "./components/ChatPanel";
import AiChatPage from "./components/ai/AiChatPage";  // 新增

interface Contact {
  id: string;
  name: string;
  tag: string;
}

export default function App() {
  const [mode, setMode] = useState<"chat" | "ai">("chat");

  // 普通聊天状态
  const [contacts] = useState<Contact[]>([
    { id: "1", name: "Nadeko", tag: "6685" },
    { id: "2", name: "GPT子", tag: "1234" },
    { id: "3", name: "绘图酱", tag: "2468" },
  ]);
  const [activeId, setActiveId] = useState(contacts[0].id);
  const [contactWidth, setContactWidth] = useState(240);
  const isResizing = useRef(false);

  // 拖拽逻辑（同你原来写的）
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

  // 切到 AI 模式
  if (mode === "ai") {
    return (
      <div className="flex h-screen bg-[#313338]">
        <Sidebar onModeChange={setMode} />
        <AiChatPage />
      </div>
    );
  }

  // 普通聊天模式
  return (
    <div className="flex h-screen bg-[#313338]">
      <Sidebar onModeChange={setMode} />

      <div style={{ width: contactWidth }} className="flex flex-col h-full">
        <ContactPanel
          contacts={contacts}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <UserStatusBar />
      </div>

      <div
        className="w-1 cursor-col-resize bg-gray-600"
        onMouseDown={() => (isResizing.current = true)}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader contact={contacts.find((c) => c.id === activeId)!} />
        <ChatPanel contactId={activeId} />
      </div>
    </div>
  );
}
