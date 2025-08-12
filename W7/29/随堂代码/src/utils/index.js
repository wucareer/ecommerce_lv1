import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://rsvokvjzqdsfxyxobrks.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdm9rdmp6cWRzZnh5eG9icmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzIyMzMsImV4cCI6MjA1NjY0ODIzM30.UJ2VDA7egsf0BkToUJWR6V236u9FZ1-0bY1a4K7u28Y'
);