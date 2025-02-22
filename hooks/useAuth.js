"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { useGame } from "./useGame";

import { api } from "@/lib/api";

export function useAuth() {
  const { data: session, status } = useSession();
  const { user, setUser, setSessionStatus } = useGame((state) => ({
    user: state.user,
    setUser: state.setUser,
    setSessionStatus: state.setSessionStatus,
  }));

  useEffect(() => {
    async function fetchUser() {
      if (!session?.user || user) return; // If user exists in Zustand, skip fetching

      try {
        const userData = await api.users.getById(session.user.id);
        setUser(userData.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, [session]);

  useEffect(() => {
    setSessionStatus(status); // Keep session status in Zustand
  }, [status]);

  return { user, loading: status === "loading" };
}
