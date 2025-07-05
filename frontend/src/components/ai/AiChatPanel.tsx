import { useState, useRef, useEffect } from "react";
import MessageItem from "../MessageItem";
import { chatWithSession, fetchChatHistory, saveChatMessage } from "../../services/ai";

interface Message {
  author: string;
  content: string;
  colorClass: string;
  isOwn?: boolean;
  timestamp?: string;
  date: string; // "YYYY/M/D"
}

interface AiChatPanelProps {
  aiName?: string;
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

export default function AiChatPanel({ aiName = "AI子" }: AiChatPanelProps) {
  const contactId = "ai-1";
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const todayDateStr = new Date()
    .toLocaleDateString("zh-CN", { year: "numeric", month: "numeric", day: "numeric" })
    .replace(/年|月/g, "/")
    .replace("日", "");

  useEffect(() => {
    async function loadHistory() {
      const history = await fetchChatHistory("session-gentle-1");
      const formatted = history.map((item: any) => {
        const dt = new Date(item.created_at);
        return {
          author: item.sender === "user" ? "你" : aiName,
          content: item.content,
          colorClass: item.sender === "user" ? "text-purple-300" : "text-green-300",
          isOwn: item.sender === "user",
          timestamp: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: dt.toLocaleDateString("zh-CN").replace(/年|月/g, "/").replace("日", ""),
        };
      });
      setMessages(formatted);
    }

    loadHistory();
  }, [aiName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const append = (msg: Message) => setMessages((pre) => [...pre, msg]);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text) return;
    const now = new Date();
    const userMsg: Message = {
      author: "你",
      content: text,
      colorClass: "text-purple-300",
      isOwn: true,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: todayDateStr,
    };
    append(userMsg);
    setInputValue("");

    // ✅ 保存用户消息到后端
    await saveChatMessage("session-gentle-1", "user", text);

    const aiReplyText = await chatWithSession("session-gentle-1", text);
    const reply = new Date();
    const aiMsg: Message = {
      author: aiName,
      content: aiReplyText,
      colorClass: "text-green-300",
      timestamp: reply.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: todayDateStr,
    };
    append(aiMsg);

    // ✅ 保存 AI 回复到后端
    await saveChatMessage("session-gentle-1", "ai", aiReplyText);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  let lastDate = "";
  const list = messages.flatMap((msg, idx) => {
    const out: any[] = [];
    if (msg.date !== lastDate) {
      lastDate = msg.date;
      out.push(<DateSeparator key={`sep-${idx}`} date={msg.date} />);
    }
    out.push(
      <MessageItem
        key={idx}
        author={msg.author}
        content={msg.content}
        colorClass={msg.colorClass}
        isOwn={msg.isOwn}
        timestamp={msg.timestamp}
      />
    );
    return out;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-800 text-white min-h-0">
      <div className="chat-scroll flex-1 overflow-y-auto px-4 py-2 min-h-0">
        {list}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 py-3 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="发送消息"
          className="flex-1 p-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition"
        >
          发送
        </button>
      </div>
    </div>
  );
}
