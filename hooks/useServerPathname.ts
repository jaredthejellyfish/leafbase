import { headers } from "next/headers";

const useServerPathname = () => {
  try {
    const headersList = headers();
    const fullUrl = headersList.get("referer") || "";
    console.log(fullUrl)
    const url = new URL(fullUrl);
    const currentPath = url.pathname;

    return { currentPath, fullUrl, error: null };
  } catch (error) {
    console.log(error);
    return { currentPath: "", fullUrl: "", error: error };
  }
};

export default useServerPathname;
