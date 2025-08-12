import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rsvokvjzqdsfxyxobrks.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzdm9rdmp6cWRzZnh5eG9icmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNzIyMzMsImV4cCI6MjA1NjY0ODIzM30.UJ2VDA7egsf0BkToUJWR6V236u9FZ1-0bY1a4K7u28Y'
);
export default function Register() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({ mode: 'blur' });


  const password = watch('password');

  const onSubmit = async (data) => {
    console.log(data, errors);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // 默认跳过邮箱验证
        emailOtp: false,
        data: {
          username: data.username,
          registered_at: new Date().toISOString()
        }
      }
    });
    if (error) {
      // 处理注册错误
      setError(error.message);
      return;
    }
    // 检查用户状态
    if (signUpData.user) {
      // 注册成功
      setSuccess(true);
      reset(); // 重置表单
      console.log('注册成功:', signUpData);
    } else {
      // 可能是其他特殊情况
      setError('注册过程中出现未知错误');
    }

  };


  console.log(errors);


  return (
    <Container
      maxWidth="xs"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="w-full p-8 bg-white rounded-lg shadow-md">
        <Typography
          variant="h4"
          className="text-center mb-6 text-blue-600"
        >
          用户注册
        </Typography>

        {error && (
          <Alert
            severity="error"
            className="mb-4"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            className="mb-4"
            onClose={() => setSuccess(false)}
          >
            注册成功！
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <Controller
            name="name"
            control={control}
            rules={{
              required: '请输入用户名',
            }}
            render={({ field }) => <TextField
              {...field}
              fullWidth
              label="用户名"
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              className="mb-4"
            />}
          />
          <Controller
            rules={{
              required: '请输入邮箱',
            }}
            name="email"
            control={control}
            render={({ field }) => <TextField
              {...field}
              fullWidth
              label="邮箱"
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              className="mb-4"
            />}
          />



          <Controller
            name="password"
            control={control}
            rules={{
              required: '请输入密码',
            }}
            render={({ field }) => <TextField
              {...field}
              fullWidth
              label="密码"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              variant="outlined"
              className="mb-4"
            />}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: '请确认密码',
              validate: (value) => value === password || '两次密码输入不一致',
            }}
            render={({ field }) => <TextField
              {...field}
              fullWidth

              label="确认密码"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              variant="outlined"
              className="mb-4"
            />}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 bg-blue-600 hover:bg-blue-700"
          >
            注册
          </Button>
        </form>
      </div>
    </Container>
  );
}