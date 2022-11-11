import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { userState } from "../store/atoms";
import { useRecoilState } from "recoil";
import LoadingBar from "react-top-loading-bar";
import logo from "../public/next-auth-logo.png";

const error = "Wrong email or password";

export default function Login(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const { data: session } = useSession();
  const ref = useRef(null);
  useEffect(() => {
    setIsEmailValid(true);
    setIsPasswordValid(true);
    if (session) {
      let tempUser = {
        ...session.user,
      };
      setUser(tempUser);
      router.push("/");
    }
  }, [session]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    ref.current.staticStart();
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    }).then(async (res) => {
      ref.current.complete();
      if (!res.ok) {
        setIsEmailValid(false);
        setIsPasswordValid(false);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <div
        className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{
          background: "url('/login-bg.webp') no-repeat center center fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div className="mt-8 sm:mx-auto sm:w-96 sm:max-w-md">
          <div className="bg-white pt-14 pb-6 px-4 shadow sm:rounded-2xl sm:px-12">
            <LoadingBar height={3} color="#06b6d4" ref={ref} />
            <div className="sm:mx-auto mb-10 sm:w-full sm:max-w-md">
              <div className="flex justify-center">
                <Image
                  className="mx-auto h-12 w-auto"
                  src={logo}
                  alt="Next Auth's logo"
                  loading="eager"
                />
              </div>
              <h2
                className="mt-6 text-center text-3xl font-semibold "
                style={{ color: "#1e212a" }}
              >
                Welcome!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-900">
                Please sign in to your account
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div>
                {isEmailValid ? (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        autoComplete="email"
                        required
                        autoFocus
                        className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        autoComplete="email"
                        required
                        className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                        aria-invalid="true"
                        aria-describedby="email-error"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div>
                {isPasswordValid ? (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        autoComplete="password"
                        required
                        className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        autoComplete="password"
                        required
                        className="block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                        aria-invalid="true"
                        aria-describedby="password-error"
                      />
                    </div>
                    <div className="flex flex-row">
                      <ExclamationCircleIcon
                        className="h-4 w-4 mt-2 mr-2 text-red-500"
                        aria-hidden="true"
                      />
                      <p
                        className="mt-2 text-xs text-red-600"
                        id="password-error"
                      >
                        {error}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-5">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:text-cyan-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center h-full">Sign in</div>
                  </button>
                </div>
                <div className="text-sm">
                  Don&apos;t have an account? &nbsp;
                  <Link href="/signup">
                    <span className="font-medium cursor-pointer text-cyan-600 hover:text-cyan-500">
                      Sign up
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
