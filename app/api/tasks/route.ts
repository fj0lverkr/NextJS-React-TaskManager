import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();
    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json({ task, status: 200 });
  } catch (e) {
    console.log("Error creating Task; ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(_: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const tasks = await prisma.task.findMany({
      where: { userId },
    });
    return NextResponse.json(tasks);
  } catch (e) {
    console.log("Error getting Tasks; ", e);
    return NextResponse.json({ error: "Error getting tasks", status: 500 });
  }
}
