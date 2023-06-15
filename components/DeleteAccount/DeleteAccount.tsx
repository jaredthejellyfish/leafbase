import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const DeleteAccount = (props: Props) => {
  const router = useRouter();
  const deleteUser = async () => {
    const result = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (result) {
      const res = await fetch("http://localhost:3000/api/user/delete");
      const status = await res.json();

      if (status.result === "success") {
        router.push("/");
        signOut();
      }
    } else {
      return;
    }
  };
  return (
    <button
      type="button"
      className="w-1/2 mt-4 text-white bg-green-700 hover:bg-green-800 transition-all focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => deleteUser()}
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;
