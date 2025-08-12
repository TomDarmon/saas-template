import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getServerSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await getServerSession();

  return (
    <HydrateClient>
      <main className="min-h-dvh bg-gradient-to-b from-background to-muted/30">
        {/* Top nav */}
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight">SaaS Template</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </a>
              <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                Testimonials
              </a>
            </nav>
            <div className="flex items-center gap-2">
              {!session ? (
                <>
                  <Button asChild variant="ghost">
                    <Link href="/auth/signin">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/signup">Get started</Link>
                  </Button>
                </>
              ) : (
                <>
                   <Button asChild>
                     <Link href="/dashboard">Open dashboard</Link>
                   </Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]" />
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-20 md:grid-cols-2 md:pb-24 md:pt-28">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                <Zap className="size-3" /> Boost your product launch
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                Launch faster with a beautiful SaaS starter
              </h1>
              <p className="text-pretty text-base text-muted-foreground md:text-lg">
                Auth, database, UI, and DX—all wired up with modern best practices.
                Focus on what matters: your product.
              </p>
              <div className="flex flex-wrap gap-3">
                {!session ? (
                  <>
                    <Button asChild size="lg">
                      <Link href="/auth/sign-up">
                        Start free <ArrowRight className="ml-1 size-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/auth/sign-in">Sign in</Link>
                    </Button>
                  </>
                ) : (
                  <Button asChild size="lg">
                     <Link href="/dashboard">
                      Go to dashboard <ArrowRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><ShieldCheck className="size-4" />Secure auth</div>
                <div className="flex items-center gap-2"><BarChart3 className="size-4" />Analytics-ready</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="size-4" />Production-grade</div>
              </div>
            </div>
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/[0.03]">
              <CardHeader>
                <CardTitle className="text-lg text-muted-foreground">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/10] w-full rounded-lg border bg-muted" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t bg-background/60">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Everything you need to ship
              </h2>
              <p className="mt-3 text-muted-foreground">
                Prebuilt auth, tRPC, Drizzle ORM, and a polished component system.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Authentication",
                  desc: "Magic links, email/password, sessions, and role-based access.",
                  Icon: ShieldCheck,
                },
                {
                  title: "Type-safe APIs",
                  desc: "End-to-end types with tRPC and Zod validation included.",
                  Icon: BarChart3,
                },
                {
                  title: "Beautiful UI",
                  desc: "shadcn/ui primitives with Tailwind tokens to move fast.",
                  Icon: Sparkles,
                },
              ].map(({ title, desc, Icon }) => (
                <Card key={title} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <CardTitle className="text-lg">{title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Simple pricing
              </h2>
              <p className="mt-3 text-muted-foreground">Start free. Upgrade as you grow.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { name: "Starter", price: "$0", features: ["Unlimited dev", "Email auth", "Basic UI"] },
                { name: "Pro", price: "$19", features: ["Custom domains", "Team roles", "Priority support"] },
                { name: "Scale", price: "$99", features: ["SLA", "SAML SSO", "Dedicated support"] },
              ].map((tier) => (
                <Card key={tier.name} className="flex h-full flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-end justify-between">
                      <span>{tier.name}</span>
                      <span className="text-xl font-bold">{tier.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between">
                    <ul className="mb-6 mt-2 space-y-2 text-sm">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={tier.name === "Pro" ? "default" : "outline"} asChild>
                       <Link href={!session ? "/auth/sign-up" : "/dashboard"}>
                        {tier.name === "Starter" ? "Get started" : "Choose plan"}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="border-t bg-background">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Loved by builders
              </h2>
              <p className="mt-3 text-muted-foreground">Teams ship faster with our starter.</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "We launched our MVP in days, not weeks. The DX is fantastic.",
                  author: "Alex P.",
                  role: "Founder @ Flowly",
                },
                {
                  quote:
                    "Clean architecture and beautiful UI out of the box.",
                  author: "Sofia R.",
                  role: "CTO @ Nimbus",
                },
                {
                  quote:
                    "The best baseline for serious SaaS projects.",
                  author: "Jason M.",
                  role: "Engineer @ Orbit",
                },
              ].map((t) => (
                <Card key={t.author}>
                  <CardContent className="pt-6">
                    <p className="text-pretty">“{t.quote}”</p>
                    <p className="mt-4 text-sm text-muted-foreground">{t.author} · {t.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-gradient-to-b from-background to-primary/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
            <h3 className="text-balance text-2xl font-semibold md:text-3xl">Build your SaaS today</h3>
            <p className="max-w-2xl text-muted-foreground">
              Start free and scale when you’re ready. No lock-in, fully type-safe, and production-ready.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {!session ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/auth/sign-up">Create account</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/auth/sign-in">Sign in</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg">
                   <Link href="/dashboard">Open dashboard</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
