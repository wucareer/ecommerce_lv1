import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://rsvokvjzqdsfxyxobrks.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdm9rdmp6cWRzZnh5eG9icmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzIyMzMsImV4cCI6MjA1NjY0ODIzM30.UJ2VDA7egsf0BkToUJWR6V236u9FZ1-0bY1a4K7u28Y'
);

export const ImageHandler = {
  upload: async (file, path) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${path}/${fileName}`;
      const { data, error: uploadError } = await supabase.storage
        .from('eshop')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      const { data: { publicUrl }, error: urlError } = await supabase.storage
        .from('eshop')
        .getPublicUrl(filePath);
      if (urlError) throw urlError;
      return publicUrl;
    } catch (error) {
      console.error('图片上传失败:', error);
      throw error;
    }
  }
};