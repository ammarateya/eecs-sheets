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
          EECS SHEETS
        </Link>

        <nav className="flex items-center gap-4">
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
// Updated on Tue May  6 23:04:02 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:03 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:04 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:05 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:06 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:07 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:08 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:09 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:10 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:11 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:12 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:04:13 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:11 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:12 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:13 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:14 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:16 EDT 2025
// Updated on Tue May  6 23:08:17 EDT 2025
// Updated on Tue May  6 23:08:17 EDT 2025
// Updated on Tue May  6 23:08:17 EDT 2025
// Updated on Tue May  6 23:08:17 EDT 2025
// Updated on Tue May  6 23:08:17 EDT 2025
// Updated on Tue May  6 23:08:18 EDT 2025
// Updated on Tue May  6 23:08:18 EDT 2025
