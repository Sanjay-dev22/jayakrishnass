import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Mail,
  BookText,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/submissions", label: "Submissions", icon: Mail, exact: false },
  { to: "/admin/publications", label: "Publications", icon: BookText, exact: false },
] as const;

export function AdminShell() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // 🎨 Theme setup
  useEffect(() => {
    const stored = localStorage.getItem("admin-theme") as "light" | "dark" | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("admin-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  // 🚨 CRITICAL: Skip auth guard for login page
  const isLoginPage = location.pathname === "/admin/login";

  // 🔐 Auth guard
  useEffect(() => {
    if (loading || isLoginPage) return;

    if (!user || !isAdmin) {
      navigate({
        to: "/admin/login",
        search: { redirect: location.pathname },
      });
    }
  }, [user, isAdmin, loading, isLoginPage, navigate, location.pathname]);

  // 🔄 Show login page WITHOUT admin shell
  if (isLoginPage) {
    return <Outlet />;
  }

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="font-mono text-xs text-muted-foreground">
          Loading authentication...
        </div>
      </div>
    );
  }

  // 🚫 Not authorized
  if (!user || !isAdmin) {
    return null;
  }

  // ✅ Main Admin UI
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link to="/admin" className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-foreground">Studio</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              v1
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded p-1 text-muted-foreground hover:text-foreground md:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "bg-accent text-foreground font-medium" }}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-border p-3">
          <Link
            to="/"
            className="mb-2 flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View public site
          </Link>

          <div className="rounded-md bg-muted px-3 py-2">
            <div className="truncate font-mono text-[10px] text-muted-foreground">
              {user.email}
            </div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">
              Admin
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded p-2 text-muted-foreground hover:text-foreground md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground md:block">
            {location.pathname.replace("/admin", "Admin") || "Admin"}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate({
                  to: "/admin/login",
                  search: { redirect: "/admin" },
                });
              }}
              className="gap-2"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}