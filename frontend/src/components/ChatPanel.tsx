// src/components/ChatPanel.tsx

import { useState, useRef, useEffect } from "react";
import MessageItem from "./MessageItem";

interface Message {
  author: string;
  content: string;
  colorClass: string;
  isOwn?: boolean;
  timestamp?: string;
  date: string; // "YYYY/M/D"
}

interface ChatPanelProps {
  contactId: string;
  /** 输入框的 placeholder 文本，默认 "发送消息" */
  placeholder?: string;
  /** 发送按钮的文本，默认 "发送" */
  buttonLabel?: string;
}

function DateSeparator({ date }: { date: string }) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-600" />
      <span className="px-2 text-xs text-gray-400">{date}</span>
      <div className="flex-grow border-t border-gray-600" />
    </div>
  );
}

export default function ChatPanel({
  contactId,
  placeholder = "发送消息",
  buttonLabel = "发送",
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const todayDateStr = new Date()
    .toLocaleDateString("zh-CN", { year: "numeric", month: "numeric", day: "numeric" })
    .replace(/年|月/g, "/")
    .replace("日", "");

  useEffect(() => {
    const key = `chat_${contactId}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
        return;
      } catch {}
    }
    const defaults: Message[] = [
      {
        author: "Nadeko",
        content: "欢迎来到这个聊天页面！🎉",
        colorClass: "text-green-300",
        timestamp: "18:04",
        date: todayDateStr,
      },
      {
        author: "YZXY",
        content: "你好！这个界面真不错！",
        colorClass: "text-purple-300",
        isOwn: true,
        timestamp: "18:05",
        date: todayDateStr,
      },
    ];
    setMessages(defaults);
    localStorage.setItem(key, JSON.stringify(defaults));
  }, [contactId, todayDateStr]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    const now = new Date();
    const newMsg: Message = {
      author: "YZXY",
      content: text,
      colorClass: "text-purple-300",
      isOwn: true,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: now
        .toLocaleDateString("zh-CN", { year: "numeric", month: "numeric", day: "numeric" })
        .replace(/年|月/g, "/")
        .replace("日", ""),
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(`chat_${contactId}`, JSON.stringify(updated));
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  let lastDate = "";
  const messageList = messages.flatMap((msg, idx) => {
    const elems: any[] = [];
    if (msg.date !== lastDate) {
      lastDate = msg.date;
      elems.push(<DateSeparator key={`sep-${idx}`} date={msg.date} />);
    }
    elems.push(
      <MessageItem
        key={idx}
        author={msg.author}
        content={msg.content}
        colorClass={msg.colorClass}
        isOwn={msg.isOwn}
        timestamp={msg.timestamp}
      />
    );
    return elems;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-800 text-white min-h-0">
      <div className="chat-scroll flex-1 overflow-y-auto px-4 py-2 min-h-0">
        {messageList}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 py-3 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 p-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
