
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Seller } from "../types/types";
import clubNight from "../assets/clubnight.jpg";

import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Ticket,
  Sparkles,
} from "lucide-react";

const SellerLogin: React.FC = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(false);

  // STEP 1: Fetch seller and generate demo OTP
  const handleSendOtp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/sellers"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch sellers");
      }

      const sellers: Seller[] = await response.json();

      // Phone field must match your Seller type and db.json
      const foundSeller = sellers.find(
        (item) => item.phone === phone
      );

      if (!foundSeller) {
        alert("Seller not found. Please check your phone number.");
        return;
      }

      // Generate a demo OTP (no SMS is sent)
      const demoOtp = String(
        Math.floor(100000 + Math.random() * 900000)
      );

      setSeller(foundSeller);
      setGeneratedOtp(demoOtp);
      setOtp("");
      setOtpSent(true);

      // Demo only: display OTP for testing
      alert(`Your demo OTP is: ${demoOtp}`);
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "Unable to connect to JSON Server. Please check that it is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP and navigate
  const handleVerifyOtp = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (otp.length!==6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!seller || otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    localStorage.setItem("sellerId", String(seller.id));
    localStorage.setItem("sellerName", seller.name);

    // Clear OTP from component state
    setGeneratedOtp("");
    setOtp("");

    // Update this path if your App.tsx uses another route
    navigate("/seller", { replace: true });
  };

  // STEP 3: Return to phone entry
  const handleChangePhone = () => {
    setOtpSent(false);
    setOtp("");
    setGeneratedOtp("");
    setSeller(null);
    setPhone("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${clubNight})`,
        }}
      />

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/75" />

      {/* Purple gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/70 via-black/70 to-indigo-950/70" />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-6 flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to role selection
          </button>

          {/* Login card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-2xl sm:p-8">
            {/* Header */}
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 ring-1 ring-purple-400/20">
                <Ticket size={26} />
              </div>

              <h1 className="text-2xl font-bold text-white">
                Seller Login
              </h1>

              <p className="mt-2 text-sm text-white/60">
                Sign in to start selling on ground
              </p>
            </div>

            {!otpSent ? (
              /* PHONE FORM */
              <form
                onSubmit={handleSendOtp}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-white/80"
                  >
                    Mobile number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                    />

                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-white/50">
                      +91
                    </span>

                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      value={phone}
                      onChange={(e) =>
                        setPhone(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        )
                      }
                      placeholder="9876543210"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.07] py-3 pl-20 pr-4 text-sm tracking-wide text-white outline-none placeholder:text-white/30 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <p className="text-[11px] text-white/40">
                    Enter the mobile number registered for your
                    seller account.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Checking seller..."
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* OTP FORM */
              <form
                onSubmit={handleVerifyOtp}
                className="space-y-5"
              >
                <div className="text-center">
                  <p className="text-sm text-white/60">
                    Verification code for
                  </p>

                  <p className="mt-1 font-medium text-white">
                    +91 {phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="text-sm font-medium text-white/80"
                  >
                    Enter OTP
                  </label>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="••••••"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.07] py-4 text-center text-xl tracking-[0.5em] text-white outline-none placeholder:text-white/20 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 active:scale-[0.98]"
                >
                  Verify & Continue
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  onClick={handleChangePhone}
                  className="w-full text-center text-xs text-purple-400 transition hover:text-purple-300"
                >
                  Change mobile number
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-white/40">
              <Sparkles
                size={13}
                className="text-purple-400"
              />
              Club Flow Seller Workspace
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerLogin;
