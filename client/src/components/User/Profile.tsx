import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { InputField } from '../form-controll/InputField';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import Button from '../form-controll/Button';
import Select from 'react-select';

const Profile = () => {
  const varient = {
    hidden: {
      opacity: 0,
      // x: '100vw',
    },
    visible: {
      opacity: 1,
      // x: 0,
    },
    exit: {
      // x: '-100vw',
      opacity: 0,
    },
  };

  const dispatch = useDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      imgUrl: '',
      dd: '',
      mm: '',
      yyyy: '',
      phone: '',
      language: '',
      gender: '',
      martialStatus: '',
      timeOfBirth: '',
    },
    onSubmit: async (values) => {
      console.log({ values });
    },
    validationSchema: yup.object({
      // email: yup.string().email().required(),
    }),
  });

  return (
    <motion.div
      variants={varient}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-gray-100 w-full"
    >
      <div className="flex max-w-md mx-auto justify-start items-center gap-4 p-4 text-lg">
        <img
          src="assets/svg/back.svg"
          alt="back"
          className="w-4 hover:scale-110 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <span className="text-gray-700 font-medium w-full text-center">
          User Profile
        </span>
      </div>
      <FormikProvider value={formik}>
        <Form className=" rounded-md p-4  max-w-md mx-auto shadow-md font-light text-gray-500 bg-white">
          <div className="flex justify-start items-center gap-4">
            <InputField
              name="username"
              label="Username"
              type="username"
              placeholder="Enter Name Here"
              required
            />
            <div className="flex justify-center items-end gap-1 p-2">
              <img src="assets/svg/camera.svg" className="mt-9" />
              <img
                src="assets/dp.jpeg"
                alt="avatar"
                className="w-20 h-20 rounded-md"
              />
            </div>
          </div>

          <InputField
            name="email"
            label="E-mail"
            type="email"
            placeholder="Enter Your Email ID"
            required
          />
          <InputField
            name="passsword"
            label="Password"
            type="passsword"
            placeholder="Min 8 char"
            required
          />
          <InputField
            name="phone"
            label="Phone Number"
            type="phone"
            placeholder="Enter Your mobile no"
            required
          />
          <div className="flex justify-between items-center gap-4 mt-4 accent-primary">
            Gender
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue('gender', 'MALE');
                  }
                }}
              />
              <label>Male</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                onChange={(e) => {
                  if (e.target.checked) {
                    formik.setFieldValue('gender', 'FEMALE');
                  }
                }}
              />
              <label>Female</label>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            Language
            <div className="flex justify-center items-center">
              <span className="bg-primary text-white bg-opacity-90 hover:bg-opacity-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline min-w-[90px] text-center rounded-tr-none rounded-br-none cursor-pointer">
                Hindi
              </span>
              <span className="bg-transparent text-gray-600 hover:text-gray-700 border border-gray-500 hover:border-gray-800  hover:bg-white py-2 px-4 rounded focus:outline-none focus:shadow-outline min-w-[90px] text-center rounded-tl-none rounded-bl-none cursor-pointer">
                English
              </span>
            </div>
          </div>
          <div className="mt-4">
            Martial Status
            <div className="">
              <Select
                options={[
                  { value: 'single', label: 'Single' },
                  { value: 'married', label: 'Married' },
                  { value: 'other', label: 'Other' },
                ]}
                className="w-full "
                styles={{
                  control: (base: any, state: any) => ({
                    ...base,
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    boxShadow: 'none',
                    width: '100%',
                    '&:hover': {
                      border: '1px solid #ddd',
                    },
                  }),
                  menu: (base: any, state: any) => ({
                    ...base,

                    border: '1px solid #ddd',
                    boxShadow: 'none',
                  }),
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            Date of Birth
            <div className="flex gap-4 -mt-2">
              <InputField
                name="dd"
                label=""
                type="number"
                placeholder="DD"
                required
              />
              <InputField
                name="dd"
                label=""
                type="number"
                placeholder="MM"
                required
              />
              <InputField
                name="dd"
                label=""
                type="number"
                placeholder="YYYY"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            Time Of Birth
            <div className=" border border-gray-300 rounded-md p-2 flex justify-between items-center">
              <span className="text-sm text-gray-400">Choose Time</span>
              <img src="assets/svg/am.svg" />
              <img src="assets/svg/pm.svg" />
            </div>
          </div>
          <div className="mt-4 flex gap-4 items-center justify-start">
            <input type="checkbox" className="rounded h-4 w-4 accent-primary" />
            I accept the terms and privacy policy
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="mt-5 w-full bg-gray-400 py-6 text-lg font-medium"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Please wait...' : 'Save'}
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </motion.div>
  );
};

export default Profile;
