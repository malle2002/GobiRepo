import { useSession } from "next-auth/react";

export function useAuth() {
    const { data: session, status } = useSession();
    const googleAuth  = session?.user?.provider === "google";
    const token = session?.user?.accessToken;
  
    return {
        isAuthenticated: !!session,
        isLoggedInFromGoogle: googleAuth,
        user: session?.user,
        token,
        session,
        status,
    };
}