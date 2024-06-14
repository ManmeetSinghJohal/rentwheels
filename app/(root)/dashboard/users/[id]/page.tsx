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
    <div className="flex gap-12 mt-5 p-5">
      <div className="w-1/3 bg-gray-200 dark:bg-gray-850 dark:text-white-200 p-5 rounded-lg font-bold text-gray-500 h-auto flex flex-col items-center justify-center">
        {/* User Image and Username */}
        <div className="w-full h-72 relative rounded-lg overflow-hidden mb-5 flex justify-center items-center">
          <Image src={user.picture || "/images/default-picture.png"} width={250} height={250} alt="profile-picture" className="rounded-full" />
        </div>
        <div>{user.username}</div>
      </div>
      <div className="w-2/3 bg-gray-200 dark:bg-gray-850 dark:text-white-200 p-5 rounded-lg font-bold text-gray-500 h-auto flex flex-col items-center justify-center">
        <UpdateUserForm user={user} />
      </div>
    </div>
  );
};

export default ShowUserPage;
