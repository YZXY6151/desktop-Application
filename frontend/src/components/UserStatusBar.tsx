// src/components/UserStatusBar.tsx
import { CogIcon, MicrophoneIcon, VolumeUpIcon, UserCircleIcon } from "@heroicons/react/outline";

export default function UserStatusBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#2F3136] border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <UserCircleIcon className="w-8 h-8 text-gray-400" />
        <div className="flex flex-col text-white">
          <span className="text-sm font-semibold">YZXY</span>
          <span className="text-xs text-gray-400">在线</span>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-gray-400">
        <MicrophoneIcon className="w-5 h-5 p-1 hover:bg-[#404249] rounded transition" />
        <VolumeUpIcon className="w-5 h-5 p-1 hover:bg-[#404249] rounded transition" />
        <CogIcon className="w-5 h-5 p-1 hover:bg-[#404249] rounded transition" />
      </div>
    </div>
  );
} 