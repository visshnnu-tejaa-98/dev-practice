import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const response = await prisma.todo.findMany();
    console.log(response);
  } catch (error: any) {
    console.log(error);
    NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 },
    );
  }
};
