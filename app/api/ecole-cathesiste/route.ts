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
    const { name, egliseId, preastId } = await req.json();

    // Validation basique
    if (!name || !egliseId || !preastId) {
      return NextResponse.json({ error: "Champ requis" }, { status: 400 });
    }

    // Créez le nouvel
    const datas = await prisma.ecoleCathesiste.create({
      data: {
        name,
        egliseId,
        preastId,
      },
    });

    return NextResponse.json(datas, { status: 201 });
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
      const datas = await prisma.ecoleCathesiste.findUnique({
        where: { id: Number(id) },
        include: {
          eglise: true,
          preast: true,
        },
      });

      if (datas) {
        return NextResponse.json({
          success: true,
          data: datas,
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
      const totalCount = await prisma.ecoleCathesiste.count({
        where: {
          name: {
            contains: name,
            // mode: 'insensitive'
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const datas = await prisma.ecoleCathesiste.findMany({
        where: {
          name: {
            contains: name,
            // mode: 'insensitive'
          },
        },
        skip: offset,
        take: itemsPerPage,
        include: {
          eglise: true,
          preast: true,
        },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: datas,
      });
    } catch (error) {
      console.error("Error fetching diocese by title:", error);
      return NextResponse.json({
        message: "Error fetching diocese by title",
        error: error,
        status: 400,
      });
    }
  } else {
    try {
      const totalCount = await prisma.ecoleCathesiste.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const datas = await prisma.ecoleCathesiste.findMany({
        skip: offset,
        take: itemsPerPage,
        include: {
          eglise: true,
          preast: true,
        },
      });
      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: datas,
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
    const datas = await prisma.ecoleCathesiste.findUnique({
      where: { id: Number(id) },
    });

    if (!datas) {
      return NextResponse.json({
        success: false,
        message: "Content not found",
        status: 404,
      });
    }

    await prisma.ecoleCathesiste.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "datas deleted successfully",
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
  const { name, egliseId, preastId } = await req.json();
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
  if (!name || !egliseId || !preastId) {
    return NextResponse.json({
      success: false,
      message: "Datas is required for update",
      status: 400,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const updateDatas = await prisma.ecoleCathesiste.update({
      where: { id: +id },
      data: {
        name: name as string,
        egliseId: egliseId as number,
        preastId: preastId as number,
      },
    });

    return NextResponse.json({
      success: true,
      data: updateDatas,
    });
  } catch (error) {
    console.error("Error updating :", error);
    return NextResponse.json({
      message: "Error updating ",
      error: error,
      status: 400,
    });
  }
};
