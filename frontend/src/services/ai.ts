import axios from 'axios';

export async function chatWithSession(session_id: string, user_input: string): Promise<string> {
  try {
    const res = await axios.post('http://localhost:8182/api/nlp/chat_with_session', {
      session_id,
      user_input,
    });

    // 后端返回的是 { reply: "xxx", meta: {...} }
    return res.data.reply || '[无回复内容]';
  } catch (error) {
    console.error('调用 AI 接口失败:', error);
    return '[调用失败]';
  }
}

// 获取聊天历史记录
export async function fetchChatHistory(session_id: string): Promise<
  { sender: 'user' | 'ai'; content: string; created_at: string }[]
> {
  try {
    const res = await fetch(`http://localhost:8182/api/nlp/chat/history?session_id=${session_id}`);
    if (!res.ok) throw new Error('请求失败');

    const data = await res.json();
    return data.history;
  } catch (error) {
    console.error('获取聊天历史失败:', error);
    return [];
  }
}

export async function saveChatMessage(session_id: string, sender: string, content: string) {
  const res = await fetch("http://localhost:8182/api/nlp/chat/save_message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id, sender, content }),
  });
  return await res.json();
}
