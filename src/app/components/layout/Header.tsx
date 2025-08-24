"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with Supabase auth

  return (
    <header className="border-b border-pixel-edges bg-indigo-900 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="font-pixel text-xl font-bold tracking-tight hover:text-yellow-400"
        >
          UMICH SHEETS
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/subjects"
            className="rounded border border-yellow-400 px-4 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-indigo-900"
          >
            Browse
          </Link>
          <Link
            href="/upload"
            className="rounded border border-yellow-400 px-4 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-indigo-900"
          >
            Upload
          </Link>
          {!isLoggedIn ? (
            <>
              <button
                className="rounded border border-yellow-400 px-4 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-indigo-900"
                onClick={() => {
                  /* TODO: Implement login */
                }}
              >
                Login
              </button>
              <button
                className="rounded bg-yellow-400 px-4 py-2 text-indigo-900 hover:bg-yellow-500"
                onClick={() => {
                  /* TODO: Implement signup */
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              className="rounded border border-yellow-400 px-4 py-2 text-yellow-400 hover:bg-yellow-400 hover:text-indigo-900"
              onClick={() => {
                /* TODO: Implement logout */
                setIsLoggedIn(false);
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
