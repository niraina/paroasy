"use server";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? "",
  "public/uploads/responsable"
);

// POST - Création d'un ResponsableEtablisement
export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
  let uniqueName = `responsable_${uuidv4()}_${(body.file as File).name}`;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }
    fs.writeFileSync(path.resolve(UPLOAD_DIR, uniqueName), buffer);
  } else {
    return NextResponse.json({
      success: false,
      message: "A file is required for the responsable's thumbnail",
      status: 400,
    });
  }

  try {
    const newResponsable = await prisma.responsableEtablisement.create({
      data: {
        fullName: body?.fullName as string,
        poste: body?.poste as string,
        thumbnail: "/uploads/responsable/" + uniqueName,
        etablisementId: +body.etablisementId,
        tel: +body.tel,
      },
    });
    return NextResponse.json({
      success: true,
      data: newResponsable,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating ResponsableEtablisement",
      error: error,
      status: 400,
    });
  }
};

// GET - Récupération d'un ou plusieurs Responsables
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const responsable = await prisma.responsableEtablisement.findUnique({
        where: { id: Number(id) },
      });
      if (!responsable) {
        return NextResponse.json({
          success: false,
          message: "Responsable not found",
          status: 404,
        });
      }
      return NextResponse.json({
        success: true,
        data: responsable,
      });
    }

    const responsables = await prisma.responsableEtablisement.findMany();
    return NextResponse.json({
      success: true,
      data: responsables,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching responsables",
      error: error,
      status: 400,
    });
  }
};

// DELETE - Suppression d'un Responsable
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
    const responsable = await prisma.responsableEtablisement.findUnique({
      where: { id: Number(id) },
    });

    if (!responsable) {
      return NextResponse.json({
        success: false,
        message: "Responsable not found",
        status: 404,
      });
    }

    const filePath = path.resolve(
      UPLOAD_DIR,
      path.basename(responsable.thumbnail)
    );
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.responsableEtablisement.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Responsable deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting responsable",
      error: error,
      status: 400,
    });
  }
};

// PUT - Mise à jour d'un Responsable
export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const id = +body.id;
  const file = (body.file as Blob) || null;

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

      uniqueName = `responsable_${uuidv4()}_${(body.file as File).name}`;
      fs.writeFileSync(path.resolve(UPLOAD_DIR, uniqueName), buffer);

      const existingResponsable =
        await prisma.responsableEtablisement.findUnique({
          where: { id },
        });

      if (existingResponsable) {
        const oldFilePath = path.resolve(
          UPLOAD_DIR,
          path.basename(existingResponsable.thumbnail)
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    const updatedResponsable = await prisma.responsableEtablisement.update({
      where: { id },
      data: {
        fullName: body?.fullName as string,
        poste: body?.poste as string,
        tel: +body.tel,
        ...(file && { thumbnail: "/uploads/responsable/" + uniqueName }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedResponsable,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating responsable",
      error: error,
      status: 400,
    });
  }
};
