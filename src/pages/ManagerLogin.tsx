import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Crown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

import LoginInput from "../components/LoginInput";

const ManagerLogin: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (email === "manager@club.com" && password === "5656") {
      setLoading(true);
      navigate("/manager/");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden ">

      <div
        className="
          fixed
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: "url('/src/assets/clubnight.jpg')",
        }}
      />


      <div className="fixed inset-0 bg-black/75" />


      <div
        className="
          fixed
          inset-0
          bg-linear-to-br
          from-purple-950/70
          via-black/70
          to-indigo-950/70
        "
      />


      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-4
          py-8
        "
      >
        <div className="w-full max-w-md">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="
              mb-6
              flex
              items-center
              gap-2
              text-sm
              text-white/50
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={17} />
            Back to role selection
          </button>

          <div
            className="
              rounded-3xl
              border
              border-white/10

              p-5
              shadow-2xl
              backdrop-blur-2xl

              sm:p-8
            "
          >

            <div className="mb-7 text-center">
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-purple-500/20
                  text-purple-300
                  ring-1
                  ring-purple-400/20
                "
              >
                <Crown size={26} />
              </div>

              <h1 className="text-2xl font-bold text-white">Manager Login</h1>

              <p className="mt-2 text-sm text-white/50">
                Sign in to manage your club
              </p>
            </div>


            <form onSubmit={handleLogin} className="space-y-5">

              <LoginInput
                label="Email address"
                type="email"
                placeholder="manager@example.com"
                value={email}
                onChange={setEmail}
                icon={<Mail size={17} />}
              />


              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="
                      pointer-events-none
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-white/40
                    "
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/7
                      py-3
                      pl-10
                      pr-11
                      text-sm
                      text-white
                      outline-none
                      placeholder:text-white/30
                      focus:border-white/10
                      focus:ring-2
                      focus:ring-purple-500/20
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-white/40
                      hover:text-white
                    "
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="
                    text-xs
                    text-purple-400
                    hover:text-purple-300
                  "
                >
                  Forgot password?
                </button>
              </div>


              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-purple-600
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-purple-950/30
                  transition

                  hover:bg-purple-500

                  active:scale-[0.98]

                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  "Logining....."
                ) : (
                  <>
                    Login
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>


            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-[11px]
                text-white/35
              "
            >
              <Sparkles size={13} className="text-purple-400" />
              Secure Club Flow workspace
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManagerLogin;
