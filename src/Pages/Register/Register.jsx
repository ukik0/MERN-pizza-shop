import React from 'react';
import { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, fetchRegister } from '../../redux/slices/authSLice';

import cl from './register.module.scss';

import { Typography, TextField, Button } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.auth);
  console.log(message);
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    message.length !== 0 && toast.error(message);
  }, [message]);

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
      e.preventDefault();
      dispatch(fetchRegister(value));
      reset();
    } catch (error) {
      toast.error('Регистрация не удалась');
    }
  };

  if (isAuth) {
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
        Регстрация аккаунта
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
          autoComplete="Password"
          type={'password'}
          fullWidth
          color="primary"
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Укажите пароль',
            minLength: {
              value: 3,
              message: 'Минимальная длина пароля 3 символа',
            },
          })}
        />

        <Button
          disabled={!isValid ? true : false}
          fullWidth
          type={'submit'}
          variant="outlined"
          color="primary">
          Зарегистрироваться
        </Button>

        <Typography
          sx={{
            transition: '.3s all ease',
            '&:hover': {
              borderBottom: '1px solid #fe5f1e',
            },
          }}
          variant="h6"
          color="primary">
          <Link to={'/login'}>Уже есть аккаунт?</Link>
        </Typography>
      </form>
    </div>
  );
};

export default Register;
