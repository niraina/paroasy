"use server";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? "",
  "public/uploads/preast"
);
// env ROOT_PATH=/var/www/node/next-upload/ # path to your project here

export const POST = async (req: NextRequest) => {
  const token = req.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({
      message: "Unauthorized",
      status: 401,
    });
  }

  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
  let uniqueName = `preast_${uuidv4()}_${(body.file as File).name}`;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(path.resolve(UPLOAD_DIR, uniqueName), buffer);
  } else {
    return NextResponse.json({
      success: false,
    });
  }

  try {
    const newPreast = await prisma.preast.create({
      data: {
        firstName: body?.firstName as string,
        lastName: body?.lastName as string,
        about: body?.about as string,
        status: body?.status as string,
        birthDate: new Date(body?.birthDate as string),
        egliseId: Number(body?.egliseId),
        thumbnail: "/uploads/preast/" + uniqueName,
      },
      include: {
        eglise: true, // Include the related Eglise in the response
      },
    });

    return NextResponse.json({
      success: true,
      data: newPreast,
    });
  } catch (error) {
    console.error("Error creating preast:", error);
    return NextResponse.json({
      message: "Error uploading file",
      error: error,
      status: 400,
    });
  }
};

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const itemsPerPage = searchParams.get("itemsPerPage")
    ? parseInt(searchParams.get("itemsPerPage")!)
    : 10;
  const offset = (page - 1) * itemsPerPage;

  if (id) {
    try {
      const preast = await prisma.preast.findUnique({
        where: { id: Number(id) },
        include: {
          eglise: true, // Include the related Eglise in the response
        },
      });

      if (preast) {
        return NextResponse.json({
          success: true,
          data: preast,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Preast not found",
          status: 404,
        });
      }
    } catch (error) {
      console.error("Error fetching preast by ID:", error);
      return NextResponse.json({
        message: "Error fetching preast by ID",
        error: error,
        status: 400,
      });
    }
  } else if (firstName) {
    try {
      const totalCount = await prisma.preast.count({
        where: {
          firstName: {
            contains: firstName,
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const preasts = await prisma.preast.findMany({
        where: {
          firstName: {
            contains: firstName,
          },
        },
        skip: offset,
        take: itemsPerPage,
        include: {
          eglise: true, // Include the related Eglise in the response
        },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: preasts,
      });
    } catch (error) {
      console.error("Error fetching preast by firstName:", error);
      return NextResponse.json({
        message: "Error fetching preast by firstName",
        error: error,
        status: 400,
      });
    }
  } else {
    try {
      const totalCount = await prisma.preast.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const preasts = await prisma.preast.findMany({
        skip: offset,
        take: itemsPerPage,
        include: {
          eglise: true, // Include the related Eglise in the response
        },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: preasts,
      });
    } catch (error) {
      console.error("Error fetching preasts:", error);
      return NextResponse.json({
        message: "Error fetching preasts",
        error: error,
        status: 400,
      });
    }
  }
};

export const DELETE = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "ID is required for deletion",
      status: 400,
    });
  }

  try {
    const preast = await prisma.preast.findUnique({
      where: { id: Number(id) },
      include: {
        eglise: true, // Include the related Eglise in the response (if needed)
      },
    });

    if (!preast) {
      return NextResponse.json({
        success: false,
        message: "Preast not found",
        status: 404,
      });
    }

    const filePath = path.resolve(UPLOAD_DIR, path.basename(preast.thumbnail));
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        const newFileName = `delete_${uuidv4()}_${path.basename(filePath)}`;
        fs.renameSync(filePath, path.resolve(UPLOAD_DIR, newFileName));
      }
    }

    await prisma.preast.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Preast deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting preast:", error);
    return NextResponse.json({
      message: "Error deleting preast",
      error: error,
      status: 400,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
  const id = Number(body.id);

  if (!id) {
    return NextResponse.json({
      success: false,
      message: "ID is required for update",
      status: 400,
    });
  }

  try {
    let uniqueName;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }

      uniqueName = `${uuidv4()}_${(body.file as File).name}`;

      fs.writeFileSync(path.resolve(UPLOAD_DIR, uniqueName), buffer);

      const existingPreast = await prisma.preast.findUnique({
        where: { id: id },
      });

      if (existingPreast) {
        const oldFilePath = path.resolve(
          UPLOAD_DIR,
          path.basename(existingPreast.thumbnail)
        );
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (err) {
            const newFileName = `preast_${uuidv4()}_${path.basename(
              oldFilePath
            )}`;
            fs.renameSync(oldFilePath, path.resolve(UPLOAD_DIR, newFileName));
          }
        }
      }
    }

    const updatedPreast = await prisma.preast.update({
      where: { id: id },
      data: {
        firstName: body?.firstName as string,
        lastName: body?.lastName as string,
        about: body?.about as string,
        status: body?.status as string,
        birthDate: new Date(body?.birthDate as string),
        ...(file && { thumbnail: "/uploads/preast/" + uniqueName }),
        egliseId: Number(body?.egliseId),
      },
      include: {
        eglise: true, // Include the related Eglise in the response
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPreast,
    });
  } catch (error) {
    console.error("Error updating preast:", error);
    return NextResponse.json({
      message: "Error updating preast",
      error: error,
      status: 400,
    });
  }
};
