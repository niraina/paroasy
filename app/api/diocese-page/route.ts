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
    const { content } = await req.json();

    // Validation basique
    if (!content) {
      return NextResponse.json({ error: "Champ requis" }, { status: 400 });
    }

    // Créez le nouvel utilisateur
    const diocese = await prisma.diocesePage.create({
      data: {
        content,
      },
    });

    return NextResponse.json(diocese, { status: 201 });
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
      const dioceses = await prisma.diocesePage.findUnique({
        where: { id: Number(id) },
      });

      if (dioceses) {
        return NextResponse.json({
          success: true,
          data: dioceses,
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
      const totalCount = await prisma.diocesePage.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const diocese = await prisma.diocesePage.findMany({
        skip: offset,
        take: itemsPerPage,
      });
      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: diocese,
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
    const diocese = await prisma.diocesePage.findUnique({
      where: { id: Number(id) },
    });

    if (!diocese) {
      return NextResponse.json({
        success: false,
        message: "Content not found",
        status: 404,
      });
    }

    await prisma.diocesePage.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Diocese deleted successfully",
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
  const { content } = await req.json();
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
  if (!content) {
    return NextResponse.json({
      success: false,
      message: "content is required for update",
      status: 400,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const updatedDiocese = await prisma.diocesePage.update({
      where: { id: +id },
      data: {
        content: content as any,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedDiocese,
    });
  } catch (error) {
    console.error("Error updating diocese:", error);
    return NextResponse.json({
      message: "Error updating diocese",
      error: error,
      status: 400,
    });
  }
};
