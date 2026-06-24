import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ success: true, data: todos }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const parsedData = await request.json();
    const { title } = parsedData;
    if (!title) {
      throw new Error("Title is required");
    }
    const response = await prisma.todo.create({
      data: {
        title: title,
        completed: false,
      },
    });
    return NextResponse.json(
      { success: true, data: response },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error?.message },
      { status: 500 },
    );
  }
};
