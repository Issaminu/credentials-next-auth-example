import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store/atoms";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  });
  const logout = () => {
    localStorage.removeItem("recoil-persist");
    signOut({ callbackUrl: "/login" });
  };
  if (status == "loading") return null;
  if (session) {
    return (
      <div>
        <h2>Welcome {user.name}!</h2>
        <p>Your email address is: {user.email}</p>
        <button
          type="submit"
          onClick={logout}
          className="w-64 mt-6 h-11 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center h-full">Click here to sign out</div>
        </button>
      </div>
    );
  }
};
export default Dashboard;
