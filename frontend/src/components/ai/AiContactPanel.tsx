import {
  SearchIcon,
  PlusIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

interface AiContact {
  id: string;
  name: string;
  tag?: string;
  unread?: number;
  online?: boolean;
}

export default function AiContactPanel() {
  const aiContacts: AiContact[] = [
    { id: "ai-1", name: "AI子", tag: "0001", online: true },
  ];
  const [activeId, setActiveId] = useState(aiContacts[0].id);

  return (
    <div className="h-full bg-[#2B2D31] flex flex-col" style={{ width: "100%" }}>
      {/* 搜索区域 */}
      <div className="flex items-center px-4 py-3 border-b border-[#1E1F22]">
        <SearchIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="搜索或开始新的对话"
          className="flex-1 bg-transparent focus:outline-none text-sm text-gray-200 placeholder-gray-500 leading-none"
        />
        <button className="ml-2 p-1 rounded hover:bg-[#404249]">
          <PlusIcon className="w-5 h-5 text-gray-400 hover:text-white" />
        </button>
      </div>

      {/* 私信 标题 */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-400 uppercase leading-none">
        <span>私信</span>
        <button className="p-1 rounded hover:bg-[#404249]">
          <BellIcon className="w-4 h-4" />
        </button>
      </div>

      {/* 联系人列表，按需滚动 */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-hide">
        {aiContacts.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`
                w-full 
                grid grid-cols-[2.5rem_1fr_auto] gap-x-2 justify-items-start items-center
                p-2 rounded-lg transition
                ${isActive ? "bg-[#404249]" : "hover:bg-[#3A3C43]"}
              `}
            >
              <div className="relative">
                <UserCircleIcon className="w-10 h-10 text-gray-400" />
                {c.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2B2D31] rounded-full" />
                )}
              </div>
              <span className="text-sm text-gray-200 leading-none">{c.name}</span>
              <span className="w-5 h-5">{c.unread && <span className="bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">{c.unread}</span>}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
