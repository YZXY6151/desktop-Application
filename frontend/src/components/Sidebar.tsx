import { useState } from "react";
import {
  ChatAlt2Icon,
  UserGroupIcon,
  SparklesIcon,
  ShoppingBagIcon,
  PlusIcon,
} from "@heroicons/react/solid";

interface Section {
  key: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const fixedSections: Section[] = [
  { key: "chat", Icon: ChatAlt2Icon, label: "私信" },
  { key: "friends", Icon: UserGroupIcon, label: "好友" },
  { key: "nitro", Icon: SparklesIcon, label: "Nitro" },
  { key: "store", Icon: ShoppingBagIcon, label: "商店" },
];

interface SidebarProps {
  onModeChange: (mode: "chat" | "ai") => void;
}

export default function Sidebar({ onModeChange }: SidebarProps) {
  const [active, setActive] = useState<string>("chat");

  const handleClick = (key: string) => {
    setActive(key);
    if (key === "store") {
      onModeChange("ai");
    }else if(key === "chat") {
      onModeChange("chat")
    }else{
      
    }
  };

  return (
    <div className="w-20 h-screen bg-[#1e1f22] flex flex-col items-center py-4">
      {/* 顶部 Logo */}
      <div
        className="mb-4 p-2 rounded-full bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer"
        onClick={() => handleClick("chat")}
      >
        <ChatAlt2Icon className="w-6 h-6 text-white" />
      </div>

      {/* 图标 + 分隔线 + ＋ 都在同一个滚动区 */}
      <div className="flex-1 flex flex-col items-center space-y-2 overflow-y-auto">
        {/* 固定功能图标 */}
        {fixedSections.map(({ key, Icon, label }) => {
          const isActive = key === active;
          return (
            <div key={key} className="relative">
              <button
                onClick={() => handleClick(key)}
                className={`
                  w-12 h-12 flex items-center justify-center rounded-2xl
                  ${isActive ? "bg-[#3A3C43]" : "hover:bg-[#2B2D31]"}
                  transition
                `}
                title={label}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                />
              </button>
              {isActive && (
                <span
                  className="
                    absolute left-0 top-0
                    w-1 h-12
                    bg-[#5865F2]
                    rounded-r-md
                  "
                />
              )}
            </div>
          );
        })}

        {/* 横线分隔 */}
        <div className="w-10 h-px bg-gray-700 my-2" />

        {/* ＋ 按钮（返回“chat”模式） */}
        <button
        // 暂时没有这功能
          // onClick={() => handleClick("chat")}
          className="p-2 rounded-full hover:bg-[#2B2D31] transition"
          title="添加功能图标"
        >
          <PlusIcon className="w-6 h-6 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
