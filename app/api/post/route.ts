"use server";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? "",
  "public/uploads/posts"
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
  let uniqueName = `post_${uuidv4()}_${(body.file as File).name}`;

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
    const newPost = await prisma.post.create({
      data: {
        title: body?.title as string,
        content: body?.content as string,
        isPublic: (body?.is_public as unknown as boolean) || true,
        tumbnail: "/uploads/posts/" + uniqueName,
      },
    });
    return NextResponse.json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
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
  const title = searchParams.get("title");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const itemsPerPage = searchParams.get("itemsPerPage")
    ? parseInt(searchParams.get("itemsPerPage")!)
    : 10;
  const offset = (page - 1) * itemsPerPage;

  if (id) {
    try {
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });

      if (post) {
        return NextResponse.json({
          success: true,
          data: post,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Post not found",
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
  } else if (title) {
    try {
      const totalCount = await prisma.post.count({
        where: {
          title: {
            contains: title,
            // mode: 'insensitive'
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const posts = await prisma.post.findMany({
        where: {
          title: {
            contains: title,
            // mode: 'insensitive'
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
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts by title:", error);
      return NextResponse.json({
        message: "Error fetching posts by title",
        error: error,
        status: 400,
      });
    }
  } else {
    try {
      const totalCount = await prisma.post.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const posts = await prisma.post.findMany({
        skip: offset,
        take: itemsPerPage,
      });
      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({
        message: "Error fetching posts",
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
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "Post not found",
        status: 404,
      });
    }

    // Supprimer ou renommer le fichier associé
    const filePath = path.resolve(UPLOAD_DIR, path.basename(post.tumbnail));
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        const newFileName = `delete_${uuidv4()}_${path.basename(filePath)}`;
        fs.renameSync(filePath, path.resolve(UPLOAD_DIR, newFileName));
      }
    }

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
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

      // Générer un nom de fichier unique
      uniqueName = `${uuidv4()}_${(body.file as File).name}`;

      fs.writeFileSync(path.resolve(UPLOAD_DIR, uniqueName), buffer);

      // Supprimer ou renommer l'ancien fichier
      const existingPost = await prisma.post.findUnique({
        where: { id: id },
      });

      if (existingPost) {
        const oldFilePath = path.resolve(
          UPLOAD_DIR,
          path.basename(existingPost.tumbnail)
        );
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath);
          } catch (err) {
            const newFileName = `post_${uuidv4()}_${path.basename(
              oldFilePath
            )}`;
            fs.renameSync(oldFilePath, path.resolve(UPLOAD_DIR, newFileName));
          }
        }
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title: body?.title as string,
        content: body?.content as string,
        // isPublic: body?.is_public as unknown as boolean || true,
        ...(file && { tumbnail: "/uploads/posts/" + uniqueName }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({
      message: "Error updating post",
      error: error,
      status: 400,
    });
  }
};
