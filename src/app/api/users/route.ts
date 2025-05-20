import { prisma } from "@/lib/prisma";
import { registerUserSchema } from "@/lib/validators";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export async function GET() {
  try {
    // Mocked users data
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Doe", email: "jane@example.com" },
    ];

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const mensagem = error?.message || "Error while fetching users.";
    return new Response(JSON.stringify({ error: mensagem }), {
      status: 500,
    });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = req.body;
    // data validation
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { username, name } = registerUserSchema.parse(body);
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      return new Response(
        JSON.stringify({ error: "Username already taken." }),
        {
          status: 400,
        }
      );
    }

    // here you would create in the database
    console.log("User created:", {name, username});

    const user = await prisma.user.create({
      data: {
        name, username
      },
    });

    console.log("User created in DB:", user);
    setCookie({res}, "next-js-starter:userId", user.id, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    return new Response(JSON.stringify({ message: "Success!" }), {
      status: 201,
    });
  } catch (error: any) {
    const mensagem = error?.message || "Error while creating user.";
    return new Response(JSON.stringify({ error: mensagem }), {
      status: 400,
    });
  }
}
