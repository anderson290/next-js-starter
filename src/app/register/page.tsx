import RegisterForm from './components/RegisterForm';

export const metadata = {
  title: 'Registro | Ignite Call',
  description: 'Crie sua conta no Ignite Call.',
};

export default async function RegisterPage() {

  return (
    <div>
      <h1>Register User</h1>
      <p>We will need some information!</p>
      <RegisterForm />
    </div>
  );
}