// src/components/TitleBar.tsx
import React from "react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

export default function TitleBar() {
  return (
    <div
      className="flex items-center justify-between px-3 h-8 bg-[#2B2D31] select-none"
      style={{ WebkitAppRegion: "drag" } as any}
    >
      {/* 左侧空隙或 App 名称 */}
      <div className="text-sm text-gray-400">AI 虚拟主播桌面版</div>

      {/* 右侧按钮区：鼠标事件要走 ipc */}
      <div className="flex space-x-2" style={{ WebkitAppRegion: "no-drag" } as any}>
        <button
          onClick={() => window.api.minimize()}
          className="p-1 hover:bg-[#404249] rounded text-gray-400"
        >
          <AiOutlineMinus size={12} />
        </button>
        <button
          onClick={() => window.api.toggleMaximize()}
          className="p-1 hover:bg-[#404249] rounded text-gray-400"
        >
          <AiOutlinePlus size={12} />
        </button>
        <button
          onClick={() => window.api.close()}
          className="p-1 hover:bg-[#922B21] rounded text-gray-400"
        >
          <AiOutlineClose size={12} />
        </button>
      </div>
    </div>
  );
}
