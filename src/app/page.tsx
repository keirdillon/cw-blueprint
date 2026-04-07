"use client";

import { useState, useEffect, useRef } from "react";

/* ───────── SESSION DATA ───────── */
const sessions = [
  {
    num: "01",
    date: "April 8, 2026",
    title: "The Advisor Mindset",
    desc: "Establish the mental framework for consultative selling and client-first positioning.",
  },
  {
    num: "02",
    date: "April 15, 2026",
    title: "Prospecting Foundations",
    desc: "Build a repeatable system for identifying and qualifying high-potential prospects.",
  },
  {
    num: "03",
    date: "April 22, 2026",
    title: "The Discovery Meeting",
    desc: "Master the art of asking the right questions to uncover client needs and goals.",
  },
  {
    num: "04",
    date: "April 29, 2026",
    title: "Building the Recommendation",
    desc: "Translate discovery insights into compelling, personalized financial recommendations.",
  },
  {
    num: "05",
    date: "May 6, 2026",
    title: "Presenting with Confidence",
    desc: "Deliver recommendations with clarity, conviction, and professional presence.",
  },
  {
    num: "06",
    date: "May 13, 2026",
    title: "Handling Objections",
    desc: "Navigate concerns and resistance with empathy, logic, and proven frameworks.",
  },
  {
    num: "07",
    date: "May 20, 2026",
    title: "Closing the Engagement",
    desc: "Guide prospects through the decision-making process to a confident commitment.",
  },
  {
    num: "08",
    date: "May 27, 2026",
    title: "Client Onboarding Excellence",
    desc: "Create a seamless onboarding experience that sets the foundation for long-term relationships.",
  },
  {
    num: "09",
    date: "June 3, 2026",
    title: "Referral Generation",
    desc: "Develop organic referral systems that turn satisfied clients into advocates.",
  },
  {
    num: "10",
    date: "June 10, 2026",
    title: "Your 90-Day Blueprint",
    desc: "Synthesize all sessions into a personal action plan for your first quarter of production.",
  },
];

/* ───────── OFFICE OPTIONS ───────── */
const offices = [
  "Fort Lauderdale",
  "Boca Raton",
  "Miami",
  "Tampa",
  "Other",
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    office: "",
    startDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      {/* ═══════ NAV ═══════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo ${
          scrolled
            ? "bg-coastal-900 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.svg"
            alt="Coastal Wealth"
            className="h-[22px] w-auto"
          />
          <button
            onClick={scrollToForm}
            className="bg-coastal-600 hover:bg-coastal-700 text-white text-sm font-medium tracking-wide px-6 py-2.5 transition-colors duration-200 ease-out-expo"
          >
            Register Now
          </button>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/hero-water.svg)" }}
        />
        <div className="absolute inset-0 bg-coastal-900/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <p className="text-coastal-400 text-xs font-ui tracking-[3px] uppercase mb-6 animate-fade-in-up">
              Sales Training Program
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 animate-fade-in-up delay-100">
              Coastal{" "}
              <em className="not-italic font-display italic">Blueprint</em>
            </h1>
            <p className="font-body-serif italic text-coastal-200 text-xl md:text-2xl mb-6 animate-fade-in-up delay-200">
              Built for momentum. Built for you.
            </p>
            <p className="font-body-serif text-coastal-200/80 text-lg leading-relaxed max-w-xl mb-10 animate-fade-in-up delay-300">
              A 10-session virtual series designed to equip new Coastal Wealth
              advisors with the sales skills, confidence, and systems they need
              to build a thriving practice from day one.
            </p>

            {/* Meta bar */}
            <div className="flex items-center gap-8 text-sm text-coastal-200/70 mb-10 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-coastal-400" />
                10 Sessions
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-coastal-400" />
                Virtual
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-coastal-400" />
                Apr–Jun 2026
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-500">
              <button
                onClick={scrollToForm}
                className="bg-coastal-600 hover:bg-coastal-700 text-white text-sm font-medium tracking-wide px-8 py-3.5 transition-colors duration-200 ease-out-expo"
              >
                Register Now
              </button>
              <a
                href="#schedule"
                className="border border-white/30 hover:border-white/60 text-white text-sm font-medium tracking-wide px-8 py-3.5 transition-colors duration-200 ease-out-expo"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OVERVIEW SPLIT ═══════ */}
      <section className="grid lg:grid-cols-2 min-h-[600px]">
        <div
          className="bg-cover bg-center min-h-[400px] lg:min-h-0"
          style={{ backgroundImage: "url(/images/meeting.svg)" }}
        />
        <div className="bg-sand-100 flex items-center">
          <div className="px-8 lg:px-16 py-16 max-w-xl">
            <p className="text-coastal-600 text-xs tracking-[3px] uppercase mb-4 font-ui">
              Program Overview
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-coastal-900 leading-tight mb-10">
              Everything you need to{" "}
              <em className="italic">launch with confidence</em>
            </h2>

            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "Sales Fundamentals",
                  text: "Master consultative selling, prospecting, discovery, and presentation skills tailored to financial advisory.",
                },
                {
                  num: "02",
                  title: "Client Engagement",
                  text: "Learn to handle objections, close engagements, and create seamless onboarding experiences.",
                },
                {
                  num: "03",
                  title: "Practice Building",
                  text: "Develop referral systems and build a 90-day action plan for sustainable growth.",
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-5">
                  <span className="text-coastal-200 font-display text-3xl leading-none mt-1">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-ui text-coastal-900 font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body-serif text-gray-500 text-[15px] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS DARK BAR ═══════ */}
      <section className="bg-coastal-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10", label: "Weekly Sessions" },
              { value: "100%", label: "Virtual" },
              { value: "Q2 2026", label: "Series" },
              { value: "Year 1", label: "Advisors" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl md:text-4xl text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-coastal-400 text-sm tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SCHEDULE ═══════ */}
      <section id="schedule" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-coastal-600 text-xs tracking-[3px] uppercase mb-4 font-ui">
              10-Session Series
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-coastal-900">
              The Full <em className="italic">Blueprint</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sessions.map((s) => (
              <div
                key={s.num}
                className="group relative bg-white border border-gray-200 p-6 transition-all duration-200 ease-out-expo hover:shadow-lg hover:border-transparent"
              >
                {/* Gradient top-border on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-coastal-600 to-coastal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="flex items-start gap-4">
                  <span className="text-coastal-200 font-display text-2xl leading-none mt-0.5">
                    {s.num}
                  </span>
                  <div className="flex-1">
                    <p className="text-coastal-600 text-sm mb-1 font-ui">
                      {s.date}
                    </p>
                    <h3 className="font-ui text-coastal-900 font-semibold text-lg mb-2">
                      {s.title}
                    </h3>
                    <p className="font-body-serif text-gray-500 text-[15px] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ COASTAL PARALLAX DIVIDER ═══════ */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/images/coastal-divider.svg)" }}
      >
        <div className="absolute inset-0 bg-coastal-900/40" />
        <div className="relative z-10 text-center px-6">
          <p className="text-white/60 text-xs tracking-[4px] uppercase mb-6 font-ui">
            Coastal Wealth
          </p>
          <p className="font-body-serif italic text-white text-2xl md:text-3xl lg:text-4xl max-w-2xl leading-relaxed">
            &ldquo;Start your journey with clarity and purpose&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════ REGISTRATION FORM ═══════ */}
      <section ref={formRef} id="register" className="bg-sand-100 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-coastal-600 text-xs tracking-[3px] uppercase mb-4 font-ui">
              Secure Your Spot
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-coastal-900">
              Register for <em className="italic">Blueprint</em>
            </h2>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-coastal-600 mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-coastal-900 mb-3">
                  You&apos;re Registered
                </h3>
                <p className="font-body-serif text-gray-500 text-lg leading-relaxed max-w-md mx-auto">
                  Thank you for registering for Coastal Blueprint. Check your
                  email for confirmation details and calendar invites.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-coastal-900 mb-2 font-ui">
                      First Name <span className="text-coastal-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full border border-gray-200 px-4 py-3 text-coastal-900 font-ui text-sm focus:outline-none focus:border-coastal-600 transition-colors"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-coastal-900 mb-2 font-ui">
                      Last Name <span className="text-coastal-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full border border-gray-200 px-4 py-3 text-coastal-900 font-ui text-sm focus:outline-none focus:border-coastal-600 transition-colors"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-coastal-900 mb-2 font-ui">
                    Email <span className="text-coastal-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border border-gray-200 px-4 py-3 text-coastal-900 font-ui text-sm focus:outline-none focus:border-coastal-600 transition-colors"
                    placeholder="you@coastalwealth.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-coastal-900 mb-2 font-ui">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border border-gray-200 px-4 py-3 text-coastal-900 font-ui text-sm focus:outline-none focus:border-coastal-600 transition-colors"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-coastal-900 mb-2 font-ui">
                    Office Location <span className="text-coastal-600">*</span>
                  </label>
                  <select
                    required
                    value={formData.office}
                    onChange={(e) =>
                      setFormData({ ...formData, office: e.target.value })
                    }
                    className="w-full border border-gray-200 px-4 py-3 text-coastal-900 font-ui text-sm focus:outline-none focus:border-coastal-600 transition-colors bg-white appearance-none"
                  >
                    <option value="">Select your office</option>
                    {offices.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-coastal-900 mb-2 font-ui">
                    Start Date at Coastal Wealth
                  </label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full border border-gray-200 px-4 py-3 text-coastal-900 font-ui text-sm focus:outline-none focus:border-coastal-600 transition-colors"
                    placeholder="e.g., March 2026"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm font-ui">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-coastal-900 hover:bg-coastal-800 text-white text-sm font-medium tracking-wide py-4 transition-colors duration-200 ease-out-expo disabled:opacity-50"
                >
                  {submitting
                    ? "Registering..."
                    : "Register for the Full Series"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-coastal-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.svg"
                alt="Coastal Wealth"
                className="h-[22px] w-auto mb-6"
              />
              <p className="font-body-serif text-coastal-400 text-lg italic mb-6 max-w-sm">
                Building the next generation of financial advisors.
              </p>
              <p className="text-coastal-700 text-sm leading-relaxed">
                Coastal Wealth
                <br />
                1000 East Hillsboro Boulevard
                <br />
                Deerfield Beach, FL 33441
              </p>
            </div>
            <div className="md:text-right">
              <p className="font-display text-[80px] md:text-[120px] leading-none text-coastal-800/20 select-none">
                CW
              </p>
            </div>
          </div>
          <div className="border-t border-coastal-800 mt-12 pt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-coastal-700 text-sm">
              &copy; {new Date().getFullYear()} Coastal Wealth. All rights
              reserved.
            </p>
            <p className="text-coastal-800 text-xs tracking-wider uppercase">
              Coastal Blueprint — Sales Training Program
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
