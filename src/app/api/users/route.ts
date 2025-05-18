import { registerUserSchema } from '@/lib/validators';


export async function GET() {
    try {
        // Mocked users data
        const users = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
        ];

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        const mensagem = error?.message || 'Error while fetching users.';
        return new Response(JSON.stringify({ error: mensagem }), {
            status: 500,
        });
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // data validation
    const data = registerUserSchema.parse(body);

    // here you would create in the database
    console.log('User created:', data);

    return new Response(JSON.stringify({ message: 'Success!' }), {
      status: 201,
    });
  } catch (error: any) {
    const mensagem = error?.message || 'Error while creating user.';
    return new Response(JSON.stringify({ error: mensagem }), {
      status: 400,
    });
  }
}