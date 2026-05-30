import { useMemo, useState } from 'react';
import { mapFieldsWithIcons } from '../utils/iconMap';
import { SIGN_IN_FIELDS } from '../utils/formSchemas';

const SUCCESS_MESSAGE = 'Access granted. Redirecting...';

function createInitialValues() {
  return {
    email: '',
    password: '',
  };
}

function useAdminSignIn() {
  const fields = useMemo(() => mapFieldsWithIcons(SIGN_IN_FIELDS), []);
  const [values, setValues] = useState(createInitialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    if (errorMessage) setErrorMessage('');
    if (isSuccess) {
      setIsSuccess(false);
      setSuccessMessage('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) return false;

    setIsLoading(true);
    setErrorMessage('');
    setIsSuccess(false);
    setSuccessMessage('');

    try {
      // تعديل الرابط لـ http صريح
      const response = await fetch('http://silentlink.runasp.net/api/dashboard/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Invalid email or password.');
        return false;
      }

      const token = data.token || data.accessToken || data.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }

      const country = data.country || data.data?.country || 'Egypt';
      const role = data.role || data.data?.role || 'admin';
      localStorage.setItem('userCountry', country);
      localStorage.setItem('userRole', role);

      setIsSuccess(true);
      setSuccessMessage(SUCCESS_MESSAGE);
      return true;

    } catch (error) {
      setErrorMessage('Unable to sign in. Please check your connection.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    fields,
    values,
    isLoading,
    isSuccess,
    errorMessage,
    successMessage,
    handleChange,
    handleSubmit,
  };
}

export default useAdminSignIn;