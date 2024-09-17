"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

export const POST = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const { content, creationDate } = await req.json();

    if (!content || !creationDate) {
      return NextResponse.json({ error: "Champ requis" }, { status: 400 });
    }

    const donnees = await prisma.dailyProgram.create({
      data: {
        content,
        creationDate,
      },
    });

    return NextResponse.json(donnees, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const itemsPerPage = searchParams.get("itemsPerPage")
    ? parseInt(searchParams.get("itemsPerPage")!)
    : 10;
  const offset = (page - 1) * itemsPerPage;

  if (id) {
    try {
      const donneess = await prisma.dailyProgram.findUnique({
        where: { id: Number(id) },
      });

      if (donneess) {
        return NextResponse.json({
          success: true,
          data: donneess,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Content not found",
          status: 404,
        });
      }
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      return NextResponse.json({
        message: "Error fetching post by ID",
        error: error,
        status: 400,
      });
    }
  } else {
    try {
      const totalCount = await prisma.dailyProgram.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const donnees = await prisma.dailyProgram.findMany({
        skip: offset,
        take: itemsPerPage,
      });
      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: donnees,
      });
    } catch (error) {
      console.error("Error fetching content:", error);
      return NextResponse.json({
        message: "Error fetching content",
        error: error,
        status: 400,
      });
    }
  }
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "ID is required for deletion",
      status: 400,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const donnees = await prisma.dailyProgram.findUnique({
      where: { id: Number(id) },
    });

    if (!donnees) {
      return NextResponse.json({
        success: false,
        message: "Content not found",
        status: 404,
      });
    }

    await prisma.dailyProgram.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "donnees deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({
      message: "Error deleting post",
      error: error,
      status: 400,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { content, creationDate } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "ID is required for update",
      status: 400,
    });
  }
  if (!content || !creationDate) {
    return NextResponse.json({
      success: false,
      message: "content is required for update",
      status: 400,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const updateddonnees = await prisma.dailyProgram.update({
      where: { id: +id },
      data: {
        content: content,
        creationDate: creationDate,
      },
    });

    return NextResponse.json({
      success: true,
      data: updateddonnees,
    });
  } catch (error) {
    console.error("Error updating donnees:", error);
    return NextResponse.json({
      message: "Error updating donnees",
      error: error,
      status: 400,
    });
  }
};
