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
    const { name, membre, nbZoky, nbZandry, egliseId } = await req.json();

    // Validation basique
    if (!name || !membre || !egliseId) {
      return NextResponse.json({ error: "Champ requis" }, { status: 400 });
    }

    const data = await prisma.homonorie.create({
      data: {
        name,
        membre,
        nbZoky,
        nbZandry,
        egliseId,
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" + error },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const itemsPerPage = searchParams.get("itemsPerPage")
    ? parseInt(searchParams.get("itemsPerPage")!)
    : 10;
  const offset = (page - 1) * itemsPerPage;

  if (id) {
    try {
      const paroasy = await prisma.homonorie.findUnique({
        where: { id: Number(id) },
        include: { responsable: true, eglise: true },
      });

      if (paroasy) {
        return NextResponse.json({
          success: true,
          data: paroasy,
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
  } else if (name) {
    try {
      const totalCount = await prisma.homonorie.count({
        where: {
          name: {
            contains: name,
            // mode: 'insensitive'
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const eglise = await prisma.homonorie.findMany({
        where: {
          name: {
            contains: name,
            // mode: 'insensitive'
          },
        },
        skip: offset,
        take: itemsPerPage,
        include: { eglise: true, responsable: true },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: eglise,
      });
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
      const totalCount = await prisma.homonorie.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const diocese = await prisma.homonorie.findMany({
        skip: offset,
        take: itemsPerPage,
        include: { responsable: true, eglise: true },
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
    const paroasy = await prisma.homonorie.findUnique({
      where: { id: Number(id) },
    });

    if (!paroasy) {
      return NextResponse.json({
        success: false,
        message: "Content not found",
        status: 404,
      });
    }

    await prisma.homonorie.delete({
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
  const { name, membre, nbZoky, nbZandry, egliseId } = await req.json();
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
  if (!name || !membre || !egliseId) {
    return NextResponse.json({
      success: false,
      message: "Field is required for update",
      status: 400,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const updatedEglise = await prisma.homonorie.update({
      where: { id: +id },
      data: {
        name: name,
        membre: membre,
        egliseId: egliseId,
        nbZandry: nbZandry,
        nbZoky: nbZoky,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedEglise,
    });
  } catch (error) {
    console.error("Error updating paroasy:", error);
    return NextResponse.json({
      message: "Error updating paroasy",
      error: error,
      status: 400,
    });
  }
};