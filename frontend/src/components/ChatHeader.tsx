// src/components/ChatHeader.tsx

import { UserCircleIcon } from "@heroicons/react/outline";

interface Contact {
  id: string;
  name: string;
  tag: string;
  avatarUrl?: string; // 未来可传入头像地址
}

interface ChatHeaderProps {
  contact: Contact;
}

export default function ChatHeader({ contact }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-900 text-white">
      {/* 左侧：头像 + 名称 + tag */}
      <div className="flex items-center space-x-4">
        {/* 头像占位（放大至 3rem x 3rem） */}
        <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden flex-shrink-0">
          {contact.avatarUrl ? (
            <img
              src={contact.avatarUrl}
              alt={contact.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircleIcon className="w-full h-full text-gray-500" />
          )}
        </div>

        {/* 名称和 tag，中间留出垂直间隙 */}
        <div className="flex flex-col space-y-1">
          <span className="font-semibold text-lg leading-none">
            {contact.name}
          </span>
          <span className="text-xs text-gray-400 leading-none">
            {contact.name}#{contact.tag}
          </span>
        </div>
      </div>

      {/* 右侧：操作按钮
      <div className="flex items-center space-x-3 text-gray-400">
        <button className="p-1 rounded hover:bg-gray-800 transition">🔍</button>
        <button className="p-1 rounded hover:bg-gray-800 transition">📌</button>
        <button className="p-1 rounded hover:bg-gray-800 transition">⭐</button>
        <button className="p-1 rounded hover:bg-gray-800 transition">🔔</button>
      </div> */}
    </div>
  );
}
