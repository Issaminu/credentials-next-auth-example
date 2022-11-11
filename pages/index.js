import { useRouter } from "next/router";
import { useEffect } from "react";

export const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  });
  return <></>;
};

export default Index;
