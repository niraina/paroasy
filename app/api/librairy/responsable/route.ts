"use server";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? "",
  "public/uploads/librairy"
);

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
  let uniqueName = `radio_${uuidv4()}_${(body.file as File).name}`;

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
    const newPersonelRadio = await prisma.responsableLibrairy.create({
      data: {
        fullName: body?.fullName as string,
        poste: body?.poste as string,
        tel: body?.tel as any,
        librairyId: +body?.librairyId as any,
        thumbnail: "/uploads/librairy/" + uniqueName,
      },
    });

    return NextResponse.json({
      success: true,
      data: newPersonelRadio,
    });
  } catch (error) {
    console.error("Error creating:", error);
    return NextResponse.json({
      message: "Error uploading file" + error,
      error: error,
      status: 400,
    });
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

  try {
    if (id) {
      // Recherche par ID
      const personelRadio = await prisma.responsableLibrairy.findUnique({
        where: { id: Number(id) },
      });

      if (personelRadio) {
        return NextResponse.json({
          success: true,
          data: personelRadio,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "GET not found",
          status: 404,
        });
      }
    } else if (name) {
      // Recherche par nom
      const totalCount = await prisma.responsableLibrairy.count({
        where: {
          fullName: {
            contains: name,
            // mode: 'insensitive' // Décommentez ceci si vous voulez rendre la recherche insensible à la casse
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const personelRadios = await prisma.responsableLibrairy.findMany({
        where: {
          fullName: {
            contains: name,
            // mode: 'insensitive' // Décommentez ceci si vous voulez rendre la recherche insensible à la casse
          },
        },
        skip: offset,
        take: itemsPerPage,
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: personelRadios,
      });
    } else {
      // Récupération de tous les enregistrements
      const totalCount = await prisma.responsableLibrairy.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const personelRadios = await prisma.responsableLibrairy.findMany({
        skip: offset,
        take: itemsPerPage,
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: personelRadios,
      });
    }
  } catch (error) {
    console.error("Error fetching:", error);
    return NextResponse.json({
      message: "Error fetching",
      error: error,
      status: 400,
    });
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
    const personelRadio = await prisma.responsableLibrairy.findUnique({
      where: { id: Number(id) },
    });

    if (!personelRadio) {
      return NextResponse.json({
        success: false,
        message: "PersonelRadio not found",
        status: 404,
      });
    }

    // Supprimer ou renommer le fichier associé
    const filePath = path.resolve(
      UPLOAD_DIR,
      path.basename(personelRadio.thumbnail)
    );
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        const newFileName = `delete_${uuidv4()}_${path.basename(filePath)}`;
        fs.renameSync(filePath, path.resolve(UPLOAD_DIR, newFileName));
      }
    }

    await prisma.responsableLibrairy.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting:", error);
    return NextResponse.json({
      message: "Error deleting",
      error: error,
      status: 400,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
  const id = +body.id;

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

      const existingPersonelRadio = await prisma.responsableLibrairy.findUnique(
        {
          where: { id: id },
        }
      );

      if (existingPersonelRadio) {
        const oldFilePath = path.resolve(
          UPLOAD_DIR,
          path.basename(existingPersonelRadio.thumbnail)
        );
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (err) {
            const newFileName = `personelRadio_${uuidv4()}_${path.basename(
              oldFilePath
            )}`;
            fs.renameSync(oldFilePath, path.resolve(UPLOAD_DIR, newFileName));
          }
        }
      }
    }

    const updatedPersonelRadio = await prisma.responsableLibrairy.update({
      where: { id: id },
      data: {
        fullName: body?.fullName as string,
        poste: body?.poste as string,
        tel: body?.tel as any,
        librairyId: +body?.librairyId as any,
        ...(file && { thumbnail: "/uploads/librairy/" + uniqueName }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPersonelRadio,
    });
  } catch (error) {
    console.error("Error updating:", error);
    return NextResponse.json({
      message: "Error updating" + error,
      error: error,
      status: 400,
    });
  }
};