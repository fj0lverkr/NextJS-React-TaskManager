import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const DELETE = async (
  _: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const { userId } = auth();
    const { id } = params;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (task && task.userId === userId) {
      const res = await prisma.task.delete({
        where: { id },
      });
      return NextResponse.json(res);
    } else {
      return NextResponse.json({
        error: "You do not own a task with that ID.",
        status: 404,
      });
    }
  } catch (e) {
    console.log("Error deleting task: ", e);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
};
