import Modal from "@/components/Modal/Modal";
import React from "react";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 pt-16">
      <Modal
        title="Hello world!"
        containerClasses={"xh-4/7 md:h-4/7 xl:w-2/5 md:w-2/3"}
      >
        <p>Hi</p>
      </Modal>
    </main>
  );
}
