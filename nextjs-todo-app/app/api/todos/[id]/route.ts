import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  try {
    const { id } = await request.json();
    const data = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ success: true, data: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
};
