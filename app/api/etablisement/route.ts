"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";

export const POST = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  // if (!token) {
  //   return NextResponse.json({
  //     message: "Unauthorized",
  //     status: 401,
  //   });
  // }

  try {
    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // await jwtVerify(token, secret);
    const {
      name,
      region,
      district,
      diocese,
      nbEleve,
      nbCepe,
      nbBepc,
      nbBacc,
      resultCepe,
      resultBepc,
      resultBacc,
      schoolYear,
    } = await req.json();

    // Validation basique
    if (!name || !region || !district || !nbEleve) {
      return NextResponse.json({ error: "Champ requis" }, { status: 400 });
    }

    // Créez le nouvel utilisateur
    const allData = await prisma.etablisement.create({
      data: {
        name,
        region,
        district,
        diocese,
        nbEleve,
        nbCepe,
        nbBepc,
        nbBacc,
        resultCepe,
        resultBepc,
        resultBacc,
        schoolYear,
      },
    });

    return NextResponse.json(allData, { status: 201 });
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
  const region = searchParams.get("region");
  const district = searchParams.get("district");
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;
  const itemsPerPage = searchParams.get("itemsPerPage")
    ? parseInt(searchParams.get("itemsPerPage")!)
    : 10;
  const offset = (page - 1) * itemsPerPage;

  if (id) {
    try {
      const allData = await prisma.etablisement.findUnique({
        where: { id: Number(id) },
        include: {
          responsable: true, // Inclusion du responsable
        },
      });

      if (allData) {
        return NextResponse.json({
          success: true,
          data: allData,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Établissement non trouvé",
          status: 404,
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'établissement par ID :",
        error
      );
      return NextResponse.json({
        message: "Erreur lors de la récupération de l'établissement par ID",
        error: error,
        status: 400,
      });
    }
  } else if (name) {
    try {
      const totalCount = await prisma.etablisement.count({
        where: {
          name: {
            contains: name,
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const etablisement = await prisma.etablisement.findMany({
        where: {
          name: {
            contains: name,
          },
        },
        skip: offset,
        take: itemsPerPage,
        include: {
          responsable: true, // Inclusion du responsable
        },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: etablisement,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération par nom :", error);
      return NextResponse.json({
        message: "Erreur lors de la récupération par nom",
        error: error,
        status: 400,
      });
    }
  } else if (district) {
    try {
      const totalCount = await prisma.etablisement.count({
        where: {
          district: {
            contains: district,
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const etablisement = await prisma.etablisement.findMany({
        where: {
          district: {
            contains: district,
          },
        },
        skip: offset,
        take: itemsPerPage,
        include: {
          responsable: true, // Inclusion du responsable
        },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: etablisement,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération par district :", error);
      return NextResponse.json({
        message: "Erreur lors de la récupération par district",
        error: error,
        status: 400,
      });
    }
  } else if (region) {
    try {
      const totalCount = await prisma.etablisement.count({
        where: {
          region: {
            contains: region,
          },
        },
      });

      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const etablisement = await prisma.etablisement.findMany({
        where: {
          region: {
            contains: region,
          },
        },
        skip: offset,
        take: itemsPerPage,
        include: {
          responsable: true, // Inclusion du responsable
        },
      });

      return NextResponse.json({
        success: true,
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        data: etablisement,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération par région :", error);
      return NextResponse.json({
        message: "Erreur lors de la récupération par région",
        error: error,
        status: 400,
      });
    }
  } else {
    try {
      const totalCount = await prisma.etablisement.count();
      const totalPages = Math.ceil(totalCount / itemsPerPage);

      const diocese = await prisma.etablisement.findMany({
        skip: offset,
        take: itemsPerPage,
        include: {
          responsable: true, // Inclusion du responsable
        },
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
      console.error("Erreur lors de la récupération du contenu :", error);
      return NextResponse.json({
        message: "Erreur lors de la récupération du contenu",
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
    const allData = await prisma.etablisement.findUnique({
      where: { id: Number(id) },
    });

    if (!allData) {
      return NextResponse.json({
        success: false,
        message: "Content not found",
        status: 404,
      });
    }

    await prisma.etablisement.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Delete successfully",
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
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const {
    name,
    region,
    district,
    diocese,
    nbEleve,
    nbCepe,
    nbBepc,
    nbBacc,
    resultCepe,
    resultBepc,
    resultBacc,
    schoolYear,
  } = await req.json();
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
  if (!name || !region || !district || !nbEleve) {
    return NextResponse.json({
      success: false,
      message: "Champ required for update",
      status: 400,
    });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    const updateData = await prisma.etablisement.update({
      where: { id: +id },
      data: {
        name,
        region,
        district,
        diocese,
        nbEleve,
        nbCepe,
        nbBepc,
        nbBacc,
        resultCepe,
        resultBepc,
        resultBacc,
        schoolYear,
      },
    });

    return NextResponse.json({
      success: true,
      data: updateData,
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
