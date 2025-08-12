import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils';

export default function Register() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({ mode: 'onBlur' });

  const password = watch('password');

  const onSubmit = async (data) => {
    setError(null);
    setSuccess(false);

    try {
      // 注册用户
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name || data.email.split('@')[0],
            role: 'user'
          }
        }
      });

      if (signUpError) throw signUpError;

      // 在 user_expansion 表中创建记录
      const { error: expansionError } = await supabase
        .from('user_expansion')
        .insert({
          userId: user.id,
          email: user.email,
          name: user.name,
          access: []
        });

      if (expansionError) throw expansionError;

      setSuccess(true);
      reset();
      // 延迟跳转到登录页
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
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
            注册成功！即将跳转到登录页面...
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            rules={{
              required: '姓名是必填项'
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="姓名"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                className="mb-4"
              />
            )}
          />

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
            注册
          </Button>

          <div className="text-center mt-4">
            <Button 
              variant="text" 
              color="primary"
              onClick={() => navigate('/login')}
            >
              已有账号？立即登录
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}