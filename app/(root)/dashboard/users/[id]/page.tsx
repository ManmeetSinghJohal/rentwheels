import { getUserById } from "@/lib/actions/user.action";
import Image from "next/image";
import UpdateUserForm from "@/components/Dashboard/UpdateUserForm";

type ShowUserPageParams = {
  params: {
    id: string;
  };
};

const ShowUserPage = async ({ params }: ShowUserPageParams) => {
  const { id } = params;
  const user = await getUserById(+id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="mt-5 flex gap-12 p-5">
      <div className="flex h-auto w-1/3 flex-col items-center justify-center rounded-lg bg-gray-200 p-5 font-bold text-gray-500 dark:bg-gray-850 dark:text-white-200">
        {/* User Image and Username */}
        <div className="relative mb-5 flex h-72 w-full items-center justify-center overflow-hidden rounded-lg">
          <Image src={user.picture || "/images/default-picture.png"} width={250} height={250} alt="profile-picture" className="rounded-full" />
        </div>
        <div>{user.username}</div>
      </div>
      <div className="flex h-auto w-2/3 flex-col items-center justify-center rounded-lg bg-gray-200 p-5 font-bold text-gray-500 dark:bg-gray-850 dark:text-white-200">
        <UpdateUserForm user={user} />
      </div>
    </div>
  );
};

export default ShowUserPage;
