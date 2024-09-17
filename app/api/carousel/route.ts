'use server'
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { ReplaceChar } from "@/app/shared/usecase/replaceChar";
import { v4 as uuidv4 } from 'uuid';  // Pour générer un identifiant unique

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");
// env ROOT_PATH=/var/www/node/next-upload/ # path to your project here

export const POST = async (req: NextRequest) => {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;
    let uniqueName = `carousel_${uuidv4()}_${(body.file as File).name}`;

    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }

        fs.writeFileSync(
            path.resolve(UPLOAD_DIR, uniqueName),
            buffer
        );
    } else {
        return NextResponse.json({
            success: false,
        });
    }

    try {
        const newPost = await prisma.carousel.create({
            data: {
                title: body?.title as string || ReplaceChar((body.file as File).name),
                path: "/uploads/" + uniqueName,
                rank: +body.rank || 0
            }
        });
        return NextResponse.json({
            success: true,
            data: newPost,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({
            message: 'Error uploading file',
            error: error,
            status: 400
        });
    }
};

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        try {
            const carousel = await prisma.carousel.findUnique({
                where: { id: Number(id) },
            });

            if (carousel) {
                return NextResponse.json({
                    success: true,
                    data: carousel,
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Carousel not found',
                    status: 404
                });
            }
        } catch (error) {
            console.error('Error fetching carousel by ID:', error);
            return NextResponse.json({
                message: 'Error fetching carousel by ID',
                error: error,
                status: 400
            });
        }
    } else {
        try {
            const carousels = await prisma.carousel.findMany();
            return NextResponse.json({
                success: true,
                data: carousels,
            });
        } catch (error) {
            console.error('Error fetching carousels:', error);
            return NextResponse.json({
                message: 'Error fetching carousels',
                error: error,
                status: 400
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
            message: 'ID is required for deletion',
            status: 400
        });
    }

    try {
        const carousel = await prisma.carousel.findUnique({
            where: { id: Number(id) },
        });

        if (!carousel) {
            return NextResponse.json({
                success: false,
                message: 'Carousel not found',
                status: 404
            });
        }

        // Supprimer ou renommer le fichier associé
        const filePath = path.resolve(UPLOAD_DIR, path.basename(carousel.path));
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                const newFileName = `delete_${uuidv4()}_${path.basename(filePath)}`;
                fs.renameSync(filePath, path.resolve(UPLOAD_DIR, newFileName));
            }
        }

        await prisma.carousel.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({
            success: true,
            message: 'Carousel deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting carousel:', error);
        return NextResponse.json({
            message: 'Error deleting carousel',
            error: error,
            status: 400
        });
    }
};