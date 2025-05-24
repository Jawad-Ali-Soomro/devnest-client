import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z_]+$/, 'Username can only contain letters and underscores')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(30, 'Password must be at most 30 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),

  avatar: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'File too large (max 2MB)', value =>
      value && value[0]?.size <= 2 * 1024 * 1024
    )
    .test('fileType', 'Unsupported file format', value =>
      value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0]?.type)
    )
});

export default registerSchema;
