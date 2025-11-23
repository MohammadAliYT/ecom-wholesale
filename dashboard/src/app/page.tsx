import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="bg-(--color-background) text-(--color-foreground) min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-[var(--color-background)/0.6] border-b border-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                W
              </div>
              <span className="font-semibold tracking-tight">WholesaleHub</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="hover:underline">
                Features
              </a>
              <a href="#pricing" className="hover:underline">
                Pricing
              </a>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
              <Link
                href="/login"
                className="inline-block rounded-md px-4 py-2 border border-border"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-block rounded-md px-4 py-2 bg-primary text-primary-foreground"
              >
                Get started
              </Link>
            </nav>

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Wholesale e‑commerce built for scale
              </h1>
              <p className="mt-4 text-lg sm:text-xl max-w-2xl text-muted-foreground">
                Simplify ordering, manage catalogs, and automate pricing for B2B
                customers — fast integration with your existing stack.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 bg-primary text-primary-foregroundium"
                >
                  Start free trial
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 border border-border"
                >
                  See features
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <Stat number="5K+" label="Suppliers" />
                <Stat number="120K" label="Products" />
                <Stat number="99.9%" label="Uptime" />
                <Stat number="30+" label="Integrations" />
              </div>
            </div>

            <div className="relative">
              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden shadow-lg ring-1 ring-border">
                <Image
                  src="/hero.png"
                  alt="Wholesale dashboard"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Dashboard preview — orders, pricing, analytics.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 bg-[var(--card)/0.03]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">What we offer</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Everything you need for wholesale: catalogs, bulk ordering, flexible
            pricing, and integrations.
          </p>

          <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="Catalog Management"
              description="Create multi-variant catalogs with tiered pricing and bulk upload support."
            />
            <Feature
              title="B2B Ordering"
              description="Quick reorder, custom order forms, purchase approvals, and PO numbers."
            />
            <Feature
              title="Integrations"
              description="Connect via APIs, webhooks, or import/export CSV — work with your ERP and shipping partners."
            />
            <Feature
              title="Analytics"
              description="Insights into order velocity, customer segmentation, and inventory health."
            />
            <Feature
              title="Wholesale Pricing"
              description="Set customer-specific prices, volume discounts, and dynamic promos."
            />
            <Feature
              title="Security & Roles"
              description="Role-based access, audit logs and SSO-ready configuration."
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Plans that grow with you</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Simple pricing for small wholesalers all the way to enterprise.
          </p>

          <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$49/mo"
              bullets={["Up to 1K SKUs", "Basic analytics", "Email support"]}
            />
            <PricingCard
              name="Growth"
              price="$199/mo"
              featured
              bullets={[
                "Up to 25K SKUs",
                "Advanced pricing rules",
                "Priority support",
              ]}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              bullets={["Unlimited SKUs", "Dedicated onboarding", "SLA & SSO"]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">
              Ready to streamline wholesale?
            </h3>
            <p className="mt-1 text-sm">
              Start a free trial — no credit card required.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/signup"
              className="rounded-md px-5 py-3 bg-primary-foreground text-primary font-semibold"
            >
              Get started
            </Link>
            <a
              href="#contact"
              className="rounded-md px-5 py-3 border border-primary-foreground"
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-10 text-muted-foreground">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold">WholesaleHub</h4>
            <p className="mt-2 text-sm">
              Built for B2B sellers — fast, reliable, and secure.
            </p>
          </div>
          <div>
            <h5 className="font-medium">Product</h5>
            <ul className="mt-2 text-sm space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium">Contact</h5>
            <p className="mt-2 text-sm">hello@wholesalehub.example</p>
            <p className="text-xs mt-3">
              © {new Date().getFullYear()} WholesaleHub
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-bold text-lg">{number}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-(--card)/50 border border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
          🔧
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  bullets,
  featured = false,
}: {
  name: string;
  price: string;
  bullets: string[];
  featured?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        featured
          ? "ring-2 ring-primary border-transparent shadow-lg"
          : "border-border"
      } bg-card`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <div className="mt-2 text-2xl font-bold">{price}</div>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-1">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link
          href="/signup"
          className={`block text-center w-full rounded-md px-4 py-2 ${
            featured
              ? "bg-primary text-primary-foreground"
              : "border border-border"
          }`}
        >
          Choose
        </Link>
      </div>
    </div>
  );
}

function MobileMenu() {
  // Small, accessible disclosure-like mobile menu implemented without external libs.
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer px-2 py-1 rounded-md border border-border">
        ☰
      </summary>
      <div className="absolute right-0 mt-2 w-48 rounded-md bg-card border border-border shadow-lg p-3">
        <a href="#features" className="block py-2">
          Features
        </a>
        <a href="#pricing" className="block py-2">
          Pricing
        </a>
        <a href="#contact" className="block py-2">
          Contact
        </a>
        <div className="mt-2 border-t border-border pt-2">
          <Link href="/login" className="block py-2">
            Sign in
          </Link>
          <Link href="/signup" className="block py-2">
            Get started
          </Link>
        </div>
      </div>
    </details>
  );
}
