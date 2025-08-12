import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(
  'https://rsvokvjzqdsfxyxobrks.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdm9rdmp6cWRzZnh5eG9icmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzIyMzMsImV4cCI6MjA1NjY0ODIzM30.UJ2VDA7egsf0BkToUJWR6V236u9FZ1-0bY1a4K7u28Y'
);

export function useUserAccess(userId) {
  const [accessList, setAccessList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 如果没有 userId，不执行查询
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchUserAccess() {
      try {
        // 从 user_expansion 表获取 access 列表
        const { data, error } = await supabase
          .from('user_expansion')
          .select('access')
          .eq('user_id', userId)
          .single();

        if (error) {
          throw error;
        }

        // 设置权限列表，如果 access 为 null 则设置为空数组
        setAccessList(data?.access || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchUserAccess();
  }, [userId]);

  // 检查是否有特定权限的辅助函数
  const hasAccess = (requiredAccess) => {
    return accessList.includes(requiredAccess);
  };

  return {
    accessList,
    loading,
    error,
    hasAccess
  };
}