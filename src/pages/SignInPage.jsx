import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/AuthCard';
import Button from '../components/Button';
import ContactModal from '../components/ContactModal';
import FormField from '../components/FormField';
import useAdminSignIn from '../hooks/useAdminSignIn';
import { ROUTES } from '../utils/constants';

function SignInPage() {
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const {
    fields,
    values,
    isLoading,
    isSuccess,
    errorMessage,
    successMessage,
    handleChange,
    handleSubmit,
  } = useAdminSignIn();

  function openContactModal() {
    setIsContactModalOpen(true);
  }

  async function handleSignInSubmit(event) {
    localStorage.clear();

    const isAuthenticated = await handleSubmit(event);

    if (isAuthenticated) {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const currentToken =
        localStorage.getItem('token') ||
        localStorage.getItem('auth_token');

      if (currentToken) {
        localStorage.setItem('token', currentToken);
      }

      const inputEmail =
        (values.email || '').toLowerCase().trim();

      if (inputEmail === 'admin2026@gmail.com') {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('orgName', 'Malak Khaled');

        navigate('/admin-dashboard');
        return;
      }

      localStorage.setItem('role', 'organization');

      if (inputEmail.includes('libya')) {
        localStorage.setItem(
          'orgName',
          'Libyan Red Crescent'
        );
        localStorage.setItem(
          'org_country',
          'libya'
        );
      }

      else if (
        inputEmail.includes('algeria') ||
        inputEmail.includes('algerie') ||
        inputEmail.includes('alger')
      ) {
        localStorage.setItem(
          'orgName',
          'Algerian Red Crescent'
        );
        localStorage.setItem(
          'org_country',
          'algeria'
        );
      }

      else if (
        inputEmail.includes('morocco') ||
        inputEmail.includes('maroc')
      ) {
        localStorage.setItem(
          'orgName',
          'Moroccan Red Crescent'
        );
        localStorage.setItem(
          'org_country',
          'maroc'
        );
      }

      else if (
        inputEmail.includes('tunisia') ||
        inputEmail.includes('tunis')
      ) {
        localStorage.setItem(
          'orgName',
          'Tunisian Red Crescent'
        );
        localStorage.setItem(
          'org_country',
          'tunisia'
        );
      }

      else if (
        inputEmail.includes('egypt') ||
        inputEmail.includes('misr')
      ) {
        localStorage.setItem(
          'orgName',
          'Egyptian Red Crescent'
        );
        localStorage.setItem(
          'org_country',
          'egypt'
        );
      }

      else {
        localStorage.setItem(
          'orgName',
          'Moroccan Red Crescent'
        );
        localStorage.setItem(
          'org_country',
          'maroc'
        );
      }

      navigate(ROUTES.DASHBOARD);
    }
  }

  return (
    <main className="min-h-screen px-5 py-8 md:px-8 md:py-12 bg-[#111] flex items-center justify-center">
      <div className="w-full max-w-[1280px] min-h-[720px] rounded-[28px] overflow-hidden bg-white flex">
        <section className="w-1/2 bg-white px-16 py-12 flex flex-col">
          <div className="text-[28px] font-semibold text-[#49987A] mb-20">
            Silent Link
          </div>

          <h1 className="text-[56px] font-bold text-[#49987A] whitespace-nowrap text-center mb-14">
            Sign in to silent link
          </h1>

          <form
            onSubmit={handleSignInSubmit}
            className="flex flex-col gap-6"
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                label={field.label}
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                type={field.type}
                Icon={field.Icon}
              />
            ))}

            <div className="min-h-6">
              {errorMessage && (
                <p className="text-sm font-semibold text-red-600">
                  {errorMessage}
                </p>
              )}

              {isSuccess && (
                <p className="text-sm font-semibold text-green-700">
                  {successMessage}
                </p>
              )}
            </div>

            <div className="pt-8 flex justify-center">
              <Button
                label={
                  isLoading
                    ? 'Signing In...'
                    : 'SIGN IN'
                }
                type="submit"
                className="w-[333px] h-[70px] rounded-full bg-[#49987A] text-white text-[28px] font-bold"
              />
            </div>
          </form>
        </section>

        <section className="relative w-1/2 bg-[#49987A] flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex items-center justify-center w-[120px] h-[120px] overflow-hidden -ml-6">
            <img
              src="/src/assets/signin-logo.png"
              alt="Silent Link"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-white text-[76px] font-bold leading-none mb-4">
            Hello
          </h2>

          <p className="text-white text-[32px]">
            Enter your personal details
          </p>

          <button
            onClick={openContactModal}
            className="absolute bottom-8 right-8 w-[220px] h-[52px] rounded-full border-2 border-[#3d7f65] text-[#1f4f3d] text-[24px] font-semibold"
          >
            Contact Us
          </button>
        </section>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() =>
          setIsContactModalOpen(false)
        }
      />
    </main>
  );
}

export default SignInPage;