import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState = {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch role
  async function checkRole(userId: string) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!error && data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      setLoading(true);

      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!isMounted) return;

      setSession(session);

      if (session?.user) {
        await checkRole(session.user.id);
      } else {
        setIsAdmin(false);
      }

      setLoading(false); // ✅ ALWAYS FINAL
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event, sess) => {
        if (!isMounted) return;

        setLoading(true); // 🔥 important
        setSession(sess);

        if (sess?.user) {
          await checkRole(sess.user.id);
        } else {
          setIsAdmin(false);
        }

        setLoading(false); // 🔥 important
      }
    );

    return () => {
      isMounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn: AuthState["signIn"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isAdmin,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}