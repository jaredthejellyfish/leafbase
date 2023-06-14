"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type Props = {};

const ProfileRevalidator = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const revalidate = searchParams.get("revalidate");

  useEffect(() => {
    if (revalidate === "true") {
      router.replace("/profile")
      router.refresh();
    }
  }, [revalidate, router]);

  return <></>;
};

export default ProfileRevalidator;
