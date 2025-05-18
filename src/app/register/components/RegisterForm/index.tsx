"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { registerUserSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';


// Define the type for the form data based on the Zod schema
type RegisterFormData = z.infer<typeof registerUserSchema>;

export default function RegisterForm() {

  const router = useRouter();

  // State to track if the form is being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Optimistic state to manage the list of users
  const [users, setUsers] = useOptimistic<any[]>([]);

  // Initialize react-hook-form with Zod validation
  const {
    register, // Used to register input fields
    handleSubmit, // Handles form submission
    formState: { errors }, // Contains validation errors
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema), // Use Zod for schema validation
  });

  // Fetch the list of users from the API and update the optimistic state
  const handleUsers = async () => {
    const res = await fetch('/api/users'); // Fetch users from the API
    const data = await res.json();
    startTransition(() => {
      setUsers(data); // Update the optimistic state with the fetched users
    });
     router.push('/');
  };

  // Function to handle form submission
  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true); // Set the submitting state to true

    // Optimistically update the users state before the API call
    startTransition(() => {
      setUsers((state) => [...state, data]);
    });

    try {
      // Send the form data to the API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Throw an error if the response is not OK
      if (!response.ok) {
        throw new Error('Error while trying to create user.');
      }

      // Fetch the updated list of users after the API call
      await handleUsers();
    } catch (err) {
      console.error(err); // Log the error
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  }

  // Log the users state whenever it changes
  useEffect(() => {
    console.log('Users:', users);
  }, [users]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username input field */}
      <div>
        <label>UserName</label>
        <input
          type="text"
          {...register('username')} // Register the input field with react-hook-form
          placeholder="seu-usuario"
        />
        {errors.username && <p>{errors.username.message}</p>} {/* Display validation error */}
      </div>

      {/* Full name input field */}
      <div>
        <label>Fullname</label>
        <input
          type="text"
          {...register('name')} // Register the input field with react-hook-form
          placeholder="Seu nome"
        />
        {errors.name && <p>{errors.name.message}</p>} {/* Display validation error */}
      </div>

      {/* Submit button */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Registrar'} {/* Show loading state */}
      </button>
    </form>
  );
}