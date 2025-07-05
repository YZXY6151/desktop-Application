// src/services/storage.ts

// 动态加载 electron-store，仅在 Electron 渲染进程中执行
let Store: any = null;
const isElectron = Boolean((window as any)?.process?.type);
if (isElectron) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Store = require("electron-store").default;
}

const store = isElectron && Store ? new Store() : null;

export interface Message {
  author: string;
  content: string;
  colorClass: string;
  isOwn?: boolean;
  timestamp?: string;
  date: string;
}

/**
 * 读取指定联系人的聊天记录。
 * Electron 中从 electron-store 读，浏览器中从 localStorage 读。
 * 若无历史，则返回默认消息并立即持久化。
 */
export function loadMessages(contactId: string, todayDate: string): Message[] {
  const key = `chat_${contactId}`;

  // Electron 环境
  if (store) {
    const data = store.get(key) as Message[] | undefined;
    if (Array.isArray(data)) {
      return data;
    }
  } else {
    // 浏览器环境
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        // ignore parse error
      }
    }
  }

  // 默认初始消息
  const defaults: Message[] = [
    {
      author: "Nadeko",
      content: "欢迎来到这个聊天页面！🎉",
      colorClass: "text-green-300",
      timestamp: "18:04",
      date: todayDate,
    },
    {
      author: "YZXY",
      content: "你好！这个界面真不错！",
      colorClass: "text-purple-300",
      isOwn: true,
      timestamp: "18:05",
      date: todayDate,
    },
  ];

  // 首次加载时持久化默认消息
  if (store) {
    store.set(key, defaults);
  } else {
    localStorage.setItem(key, JSON.stringify(defaults));
  }

  return defaults;
}

/**
 * 保存指定联系人的聊天记录。
 * Electron 中写入 electron-store，浏览器中写入 localStorage。
 */
export function saveMessages(contactId: string, messages: Message[]): void {
  const key = `chat_${contactId}`;
  if (store) {
    store.set(key, messages);
  } else {
    localStorage.setItem(key, JSON.stringify(messages));
  }
}
