import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils';

export default function Login() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = async (data) => {
    // 重置之前的错误和成功状态
    setError(null);
    setSuccess(false);

    try {
      // 使用 Supabase 登录
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        // 处理登录错误
        setError(error.message);
        return;
      }

      // 登录成功
      if (loginData.user) {
        setSuccess(true);
        reset(); // 重置表单
        console.log('登录成功:', loginData);
        // 跳转到首页或仪表盘
        navigate('/');
      } else {
        // 可能是其他特殊情况
        setError('登录过程中出现未知错误');
      }
    } catch (catchError) {
      // 捕获其他可能的错误
      setError(catchError.message);
    }
  };

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
          用户登录
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
            登录成功！
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="email"
            control={control}
            rules={{
              required: '邮箱是必填项',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '请输入有效的邮箱地址'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="邮箱"
                type="email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                className="mb-4"
              />
            )}
          />
          
          <Controller
            name="password"
            control={control}
            rules={{
              required: '密码是必填项',
              minLength: {
                value: 6,
                message: '密码至少需要6个字符'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="密码"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                className="mb-4"
              />
            )}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 bg-blue-600 hover:bg-blue-700"
          >
            登录
          </Button>

          <div className="text-center mt-4">
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate('/register')}
            >
              没有账号？立即注册
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}