import React, { useEffect } from 'react';
import { useState } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, fetchLogin } from '../../redux/slices/authSLice';

import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import cl from './login.module.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {message} = useSelector((state) => state.auth)
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    message.length !== 0 && toast.error(message)
  }, [message])

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (value, e) => {
    try {
      e.preventDefault()
      dispatch(fetchLogin(value));
      reset();
    } catch (error) {
      toast.error('Авторизация не удалась');
    }
  };

  if (isAuth) {
    toast.success('Авторизация прошла успешно');
    navigate('/');
    window.location.reload();
  }

  return (
    <div className="container">
      <Typography
        variant="h5"
        color="success"
        component={'div'}
        sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: '500' }}>
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
        <TextField
          variant="outlined"
          label="Почта"
          autoComplete="Email"
          fullWidth
          color="primary"
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Укажите почту',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Неверный формат почты',
            },
          })}
        />

        <TextField
          variant="outlined"
          label="Пароль"
          size="medium"
          color="primary"
          autoComplete="Password"
          type={'password'}
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Укажите пароль',
            minLength: { value: 3, message: 'Минимальная длина пароля 3 символа' },
          })}
        />

        <Button
          disabled={!isValid ? true : false}
          type={'submit'}
          variant="outlined"
          color="primary"
          fullWidth>
          Войти
        </Button>

        <Box>
          <Typography
            variant="h6"
            color="primary"
            component={'div'}
            sx={{
              transition: '.3s all ease',
              '&:hover': {
                borderBottom: '1px solid #fe5f1e',
              },
            }}>
            <Link to={'/register'}>Нет аккаунта?</Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Login;
