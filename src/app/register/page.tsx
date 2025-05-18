import RegisterForm from './components/RegisterForm';

export const metadata = {
  title: 'Register | Next JS APP',
  description: 'Register a new user in the app',  
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