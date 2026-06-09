"use client";

import React, { useState } from "react";
import { registerAction, googleLoginAction } from "@/app/actions/auth";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerAction(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
      (e.target as HTMLFormElement).reset();
    }
    
    setIsPending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50/50 p-4">
      <div className="w-full max-w-md bg-white border border-zinc-200 p-8 md:p-10 rounded-2xl shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif text-zinc-900 tracking-tight">Create an Account</h1>
          <p className="text-sm text-zinc-500 mt-2">Start managing your interior design projects</p>
        </div>

        {error && (
          <div className="mb-6 p-3 flex items-start gap-3 bg-red-50 text-red-700 rounded-xl border border-red-100">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 flex items-start gap-3 bg-green-50 text-green-700 rounded-xl border border-green-100">
            <span className="text-sm font-medium">{success}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1.5 uppercase" htmlFor="name">
              Studio / Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
              placeholder="Milena Jovanovic"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1.5 uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1.5 uppercase" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-xl py-3 font-medium text-sm disabled:opacity-70 shadow-sm"
          >
            {isPending ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="h-px bg-zinc-200 flex-1"></div>
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">OR</span>
          <div className="h-px bg-zinc-200 flex-1"></div>
        </div>

        <form action={googleLoginAction} className="mt-8">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-zinc-300 text-zinc-700 font-medium rounded-xl hover:bg-zinc-50 focus:ring-2 focus:ring-offset-2 focus:ring-zinc-200 transition-all shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-zinc-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
