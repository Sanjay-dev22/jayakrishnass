import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { AuthProvider } from "@/lib/auth-context";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="max-w-md text-center">
        <p className="label-meta">Error · 404</p>
        <h1 className="mt-4 font-serif text-6xl text-ink">Not found.</h1>
        <p className="mt-3 text-sm text-ink-muted">
          The page you are looking for has moved, or never existed.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border-b border-ink pb-1 text-sm text-ink"
          >
            ← Return to index
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dr Jayakrishna S S — AI Researcher in Phytopathology" },
      {
        name: "description",
        content:
          "Personal research site of Dr Jayakrishna S S — AI for phytopathology, computer vision, and biodiversity monitoring.",
      },
      { name: "author", content: "Dr Jayakrishna S S" },
      { property: "og:title", content: "Dr Jayakrishna S S — AI Researcher in Phytopathology" },
      {
        property: "og:description",
        content:
          "AI for phytopathology, computer vision, and biodiversity monitoring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr Jayakrishna S S — AI Researcher in Phytopathology" },
      { name: "description", content: "AI Research Hub: A modern, minimal, and professional personal research website for AI scientists." },
      { property: "og:description", content: "AI Research Hub: A modern, minimal, and professional personal research website for AI scientists." },
      { name: "twitter:description", content: "AI Research Hub: A modern, minimal, and professional personal research website for AI scientists." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/49a1a0b8-8c6d-4a51-89c0-76b8c92cb12c/id-preview-c50bdc23--b4fe650d-0ec6-470e-8c52-545b3feeba4d.lovable.app-1776594240420.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/49a1a0b8-8c6d-4a51-89c0-76b8c92cb12c/id-preview-c50bdc23--b4fe650d-0ec6-470e-8c52-545b3feeba4d.lovable.app-1776594240420.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
      {isAdmin ? (
        <>
          <Outlet />
          <Toaster />
        </>
      ) : (
        <div className="flex min-h-screen flex-col bg-paper text-ink">
          <Nav />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </div>
      )}
    </AuthProvider>
  );
}
