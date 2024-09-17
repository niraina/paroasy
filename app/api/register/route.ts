import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Assurez-vous d'importer correctement Prisma client

export async function POST(request: Request) {
  try {
    const { email, password, roleId, name } = await request.json();

    // Validation basique
    if (!email || !password || !roleId || !name) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créez le nouvel utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        roleId,
        hashedPassword,
        name
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
