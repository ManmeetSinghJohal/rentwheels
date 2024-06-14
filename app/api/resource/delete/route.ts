import { deleteBooking } from "@/lib/actions/booking.action";
import { deleteClerkUser } from "@/lib/actions/clerk.action";
import { deleteCar } from "@/lib/actions/car.action";

export async function DELETE(req: Request) {
  const payload = await req.json();
  const { id, clerkId, resourceType } = payload;

  if (!id || typeof id !== "number" || !resourceType) {
    return new Response("Invalid request data", { status: 400 });
  }

  try {
    switch (resourceType) {
      case "user":
        await deleteClerkUser({ clerkId });
        break;
      case "booking":
        await deleteBooking(id);
        break;
      case "car":
        await deleteCar(id);
        break;
      default:
        return new Response("Invalid resource type", { status: 400 });
    }

    return new Response(JSON.stringify({ isSuccess: true }), { status: 200 });
  } catch (error) {
    console.error(`Error deleting ${resourceType}:`, error);
    return new Response("Internal server error", { status: 500 });
  }
}
