import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../redux/user/user.action';
import * as yup from 'yup';
import { InputField } from '../components/form-controll/InputField';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { api } from '../apis/axios';
import toast from 'react-hot-toast';
import Button from '../components/form-controll/Button';

const Login = () => {
  let loginUser = async (values: { email: string; password: string }) => {
    const data = await api.post('users/login', values);
    return data.data;
  };

  const currentUser = useSelector((state: any) => state?.user);

  const { mutateAsync } = useMutation(loginUser);

  const varient = {
    hidden: {
      opacity: 0,
      x: '100vw',
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {
      x: '-100vw',
      opacity: 0,
    },
  };

  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await mutateAsync(values, {
        onSuccess: (data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            dispatch(
              setCurrentUser({
                ...data.user,
              })
            );
            if (location.state) {
              toast.success('Login Successful');
              navigate(location.state.from.pathname);
            } else {
              navigate('/');
            }
          } else {
            toast.error('Invalid email or password');
          }
        },
        onError: (err) => {
          toast.error('Invalid email or password');
        },
      });
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <motion.div
      variants={varient}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="w-screen h-screen flex flex-col justify-center items-center"
    >
      <FormikProvider value={formik}>
        <Form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            required
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            required
          />
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Please wait...' : 'Login'}
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </motion.div>
  );
};

export default Login;
