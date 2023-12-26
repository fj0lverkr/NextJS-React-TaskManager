import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
  } catch (e) {
    console.log("Error creating Task; ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
  } catch (e) {
    console.log("Error getting Tasks; ", e);
    return NextResponse.json({ error: "Error getting tasks", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
  } catch (e) {
    console.log("Error updating Task; ", e);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (e) {
    console.log("Error deleting Tas; ", e);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
