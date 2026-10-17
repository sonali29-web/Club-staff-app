import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Crown,
  Ticket,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import RoleCard from "../components/RoleCard";

import clubNight from "../assets/clubnight.jpg";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleManagerLogin = () => {
    navigate("/manager/login");
  };

  const handleSellerLogin = () => {
    navigate("/seller/login");
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden">


      <div
        className="
          fixed
          inset-0
          bg-cover
          bg-top
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${clubNight})`,
        }}
      />

      <div
        className="
          fixed
          inset-0
          bg-black/30
        "
      />

      <div
        className="
          fixed
          inset-0
          bg-linear-to-br
          from-purple-950/70
          via-black/60
          to-indigo-950/70
        "
      />


      <div
        className="
          pointer-events-none
          fixed
          -left-32
          -top-32
          h-72
          w-72
          rounded-full
          bg-purple-600/30
          blur-3xl

          sm:h-96
          sm:w-96
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          -bottom-32
          -right-32
          h-72
          w-72
          rounded-full
          bg-indigo-600/20
          blur-3xl

          sm:h-96
          sm:w-96
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

          sm:px-6
          sm:py-12

          lg:px-8
        "
      >

        <div
          className="
            w-full
            max-w-md

            sm:max-w-xl

            lg:max-w-4xl
          "
        >



          <div className="mb-7 text-center sm:mb-9">

            <div className="mb-4 flex justify-center sm:mb-5">

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl

                  border
                  border-purple-300/20

                  bg-purple-500/20

                  text-purple-200

                  shadow-xl
                  shadow-purple-950/30

                  backdrop-blur-md

                  sm:h-14
                  sm:w-14
                "
              >
                <Sparkles
                  size={24}
                  strokeWidth={1.8}
                  className="sm:h-7 sm:w-7"
                />
              </div>

            </div>


            <h1
              className="
                text-4xl
                font-bold
                tracking-tight
                text-white

                sm:text-5xl

                lg:text-6xl
              "
            >
              Club{" "}
              <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Flow
              </span>
            </h1>


            <p
              className="
                mx-auto
                mt-2
                max-w-sm
                px-4
                text-xs
                leading-5
                text-white/55

                sm:mt-3
                sm:max-w-md
                sm:text-sm
              "
            >
              Powering seamless nightlife operations,
              from event management to on-ground sales.
            </p>
          </div>


            <div className="mb-6 text-center sm:mb-8">

              <div
                className="
                  mx-auto
                  mb-3
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-1.5
                  text-[10px]
                  text-white/50
                  sm:text-xs
                "
              >
                <ShieldCheck
                  size={13}
                  className="text-purple-400"
                />

                Secure workspace
              </div>

              <h2
                className="
                  text-2xl
                  font-semibold
                  text-white

                  sm:text-3xl
                "
              >
                Welcome Back
              </h2>

              <p
                className="
                  mt-2
                  px-2
                  text-xs
                  leading-5
                  text-white/50

                  sm:text-sm
                "
              >
                Login to continue to your Club Flow workspace
              </p>
            </div>
            <div
              className="
                grid
                grid-cols-1
                gap-3

                lg:grid-cols-2
                lg:gap-4
              "
            >

              <RoleCard
                title="Club Manager"
                description="Manage your club operations from one place."
                features={[
                  "Create & manage events",
                  "Manage team members",
                  "View sales & event reports",
                ]}
                icon={
                  <Crown
                    size={22}
                    strokeWidth={1.8}
                  />
                }
                onClick={handleManagerLogin}
              />



              <RoleCard
                title="Seller / Employee"
                description="Sell tickets and tables directly on ground."
                features={[
                  "Sell event tickets",
                  "Manage table bookings",
                  "Track your on-ground sales",
                ]}
                icon={
                  <Ticket
                    size={22}
                    strokeWidth={1.8}
                  />
                }
                onClick={handleSellerLogin}
              />


            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-center
                text-[10px]
                text-white/35

                sm:mt-7
                sm:text-xs
              "
            >

            </div>
          </div>


          <p
            className="
              mt-5
              text-center
              text-[10px]
              text-white/30

              sm:mt-6
              sm:text-xs
            "
          >
            © 2026 Club Flow · Club Event Management Platform
          </p>

        </div>
      </div>
    </main>
  );
};

export default Welcome;