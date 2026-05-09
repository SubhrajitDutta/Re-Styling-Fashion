import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState } from "react";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong p-10 rounded-3xl">
        <h1 className="text-7xl font-display font-extrabold text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">This drop doesn't exist.</p>
        <a href="/" className="inline-block mt-6 px-6 py-3 rounded-full bg-blush-grad font-semibold">Back home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong p-10 rounded-3xl">
        <h1 className="text-2xl font-display font-bold">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 px-6 py-3 rounded-full bg-blush-grad font-semibold">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Re-Stylin — Fashion for Gen Z" },
      { name: "description", content: "Buy, rent and donate pre-loved clothing. Earn points for every donation." },
      { property: "og:title", content: "Re-Stylin — Fashion for Gen Z" },
      { name: "twitter:title", content: "Re-Stylin — Fashion for Gen Z" },
      { property: "og:description", content: "Buy, rent and donate pre-loved clothing. Earn points for every donation." },
      { name: "twitter:description", content: "Buy, rent and donate pre-loved clothing. Earn points for every donation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b707e0c4-8849-4967-b6f9-c3ef4afd77e9/id-preview-8605fa25--47b6c0a7-6ee9-4b96-b21d-70ed71f0ea13.lovable.app-1778323393236.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b707e0c4-8849-4967-b6f9-c3ef4afd77e9/id-preview-8605fa25--47b6c0a7-6ee9-4b96-b21d-70ed71f0ea13.lovable.app-1778323393236.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar onAuthClick={() => setAuthOpen(true)} />
        <main className="flex-1"><Outlet /></main>
        <Footer />
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </QueryClientProvider>
  );
}
