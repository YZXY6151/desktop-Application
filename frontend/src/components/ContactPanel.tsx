// src/components/ContactPanel.tsx

import {
  SearchIcon,
  PlusIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

interface Contact {
  id: string;
  name: string;
  tag?: string;
  unread?: number;
  online?: boolean;
}

interface ContactPanelProps {
  contacts: Contact[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function ContactPanel({
  contacts,
  activeId,
  onSelect,
}: ContactPanelProps) {
  return (
    <div
      className="h-full bg-[#2B2D31] flex flex-col"
      style={{ width: "100%" }} // 用外部容器控制宽度
    >
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

      {/* 联系人列表 */}
      <div className="contact-panel flex-1 overflow-y-scroll px-2">
        {contacts.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`
                w-full 
                grid grid-cols-[2.5rem_1fr_auto] gap-x-2 justify-items-start items-center
                p-2 rounded-lg transition
                ${isActive ? "bg-[#404249]" : "hover:bg-[#3A3C43]"}
              `}
            >
              {/* 第一列：头像槽 */}
              <div className="relative">
                <UserCircleIcon className="w-10 h-10 text-gray-400" />
                {c.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2B2D31] rounded-full" />
                )}
              </div>

              {/* 第二列：名字 */}
              <span className="text-sm text-gray-200 leading-none">
                {c.name}
              </span>

              {/* 第三列：未读徽章或空占位 */}
              {c.unread ? (
                <span className="bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {c.unread}
                </span>
              ) : (
                <span className="w-5 h-5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
