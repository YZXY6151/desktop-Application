// src/components/MessageItem.tsx

interface MessageItemProps {
  author: string;
  content: string;
  colorClass?: string;   // 文本颜色
  isOwn?: boolean;       // 是否为自己发送的消息
  timestamp?: string;    // 时间戳，如 "18:05"
}

export default function MessageItem({
  content,
  colorClass = "text-gray-300",
  isOwn = false,
  timestamp = "18:04",
}: MessageItemProps) {
  return (
    <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} space-y-1`}>
      {/* 消息泡泡 */}
      <div
        className={`
          max-w-[40%] px-4 py-3
          ${isOwn
            ? "bg-gray-700 text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl rounded-br-none"
            : "bg-gray-700 text-white rounded-tr-xl rounded-tl-none rounded-br-xl rounded-bl-xl border-l-4 border-green-500"
          }
        `}
      >
        <div className={`text-sm ${colorClass}`}>{content}</div>
      </div>
      
      {/* 时间戳 */}
      <div className="text-[10px] text-gray-400">
        {timestamp}
      </div>
    </div>
  );
}

