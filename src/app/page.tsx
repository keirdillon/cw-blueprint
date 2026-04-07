"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const sessions = [
  { num: "01", date: "Apr 13", title: "Operationalizing Your Business Plan", desc: "Creating a 12-month business plan. Revenue targets, activity goals, market strategy, and accountability structure." },
  { num: "02", date: "Apr 20", title: "Enhancing Your Market", desc: "Applying the 12 Week Year framework to financial services. Setting 12-week goals, weekly scorecards, and executing with urgency." },
  { num: "03", date: "Apr 27", title: "Objection Handling", desc: "Mastering the most common objections in prospecting and sales. Framework for responding with confidence. Live practice rounds." },
  { num: "04", date: "May 4", title: "Joint Work Preparation", desc: "How to prepare for and execute joint fieldwork with a senior advisor. What to do before, during, and after the meeting." },
  { num: "05", date: "May 11", title: "A360 Activity Tracking", desc: "Mastering the CRM as a business tool. Logging activity, tracking pipeline, using data to stay accountable and hit targets." },
  { num: "06", date: "Jun 1", title: "Expanding Your Market", desc: "Identifying and working your personal network. Building your first 200 names, categorizing contacts, and creating outreach strategy." },
  { num: "07", date: "Jun 8", title: "Technology as Your Infrastructure", desc: "Using technology to run your practice. Tools for prospecting, client management, scheduling, and communication. Led by Katarina." },
  { num: "08", date: "Jun 15", title: "Fact Finding Excellence", desc: "How to conduct a thorough fact-finding meeting. Understanding client needs, asking the right questions, documenting key information, and setting up next steps." },
  { num: "09", date: "Jun 22", title: "Client Connections", desc: "Building confidence on cold calls. Scripts, tone, pacing, and how to convert cold contacts into appointments. Live practice included." },
  { num: "10", date: "Jun 29", title: "Meeting Readiness", desc: "Ensuring how to run a smooth meeting, and gaining the ability to pivot when topics change." },
];

const offices = ["Fort Lauderdale", "Boca Raton", "Miami", "Tampa", "Other"];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", office: "", startDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  // Nav scroll behavior
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for fade-in animations
  const addFadeRef = useCallback((el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    fadeRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.office) {
      setError("Please fill in all required fields.");
      return;
    }
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
    <>
      {/* NAVIGATION */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="mainNav">
        <div className="nav-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Coastal Wealth" />
        </div>
        <a href="#register" className="nav-cta">Register Now</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/water-bg.jpg" alt="" />
        </div>
        <div className="hero-content">
          <div className="overline">Sales Training Program</div>
          <h1 className="hero-title">Coastal <em>Blueprint</em></h1>
          <p className="hero-tagline">Built for momentum. Built for you.</p>
          <p className="hero-body">
            You&apos;ve been selected to participate in Coastal Blueprint, our sales training program designed to accelerate momentum, build confidence, and sharpen sales effectiveness. This is an investment in you and in starting your journey at Coastal Wealth with clarity and purpose.
          </p>
          <div className="hero-meta">
            <div className="hero-stat">
              <div className="hero-stat-value">10</div>
              <div className="hero-stat-label">Sessions</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">Virtual</div>
              <div className="hero-stat-label">Format</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">Apr–Jun</div>
              <div className="hero-stat-label">2026</div>
            </div>
          </div>
          <div className="btn-row">
            <a href="#register" className="btn btn-accent">Register for the Series</a>
            <a href="#schedule" className="btn btn-white-outline">View Schedule</a>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="overview-split">
        <div className="overview-image fade-in" ref={addFadeRef}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/meeting.jpg" alt="Team meeting" />
        </div>
        <div className="overview-content fade-in" ref={addFadeRef}>
          <div className="overline">What You&apos;ll Build</div>
          <h2>The sales skills that matter most in your <em>first year</em></h2>
          <p>You&apos;ll focus on building your pipeline, starting conversations with confidence, positioning solutions, handling objections, closing with conviction, and delivering a strong client experience.</p>
          <div className="pillar-list">
            <div className="pillar-item">
              <div className="pillar-num">01</div>
              <div>
                <h4>Pipeline &amp; Prospecting</h4>
                <p>Build your first 200 names, master cold outreach, and create a repeatable strategy that drives real activity.</p>
              </div>
            </div>
            <div className="pillar-item">
              <div className="pillar-num">02</div>
              <div>
                <h4>Positioning &amp; Objections</h4>
                <p>Position solutions clearly, handle common objections with confidence, and close with conviction.</p>
              </div>
            </div>
            <div className="pillar-item">
              <div className="pillar-num">03</div>
              <div>
                <h4>Client Experience</h4>
                <p>Run thorough fact-finding meetings, deliver smooth client engagements, and set up next steps that move forward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-dark">
        <div className="stat-d">
          <div className="stat-d-num">10</div>
          <div className="stat-d-label">Weekly Sessions</div>
        </div>
        <div className="stat-d">
          <div className="stat-d-num">100%</div>
          <div className="stat-d-label">Virtual</div>
        </div>
        <div className="stat-d">
          <div className="stat-d-num">Q2</div>
          <div className="stat-d-label">2026 Series</div>
        </div>
        <div className="stat-d">
          <div className="stat-d-num">Year 1</div>
          <div className="stat-d-label">Advisors</div>
        </div>
      </div>

      {/* SCHEDULE */}
      <section className="schedule-section" id="schedule">
        <div className="section-header fade-in" ref={addFadeRef}>
          <div className="overline">10-Session Series</div>
          <h2>The <em>Schedule</em></h2>
          <p className="lead">Each session builds on the last, taking you from business planning through prospecting, objection handling, and client delivery.</p>
        </div>
        <div className="session-grid">
          {sessions.map((s) => (
            <div key={s.num} className="session-card fade-in" ref={addFadeRef}>
              <div className="session-meta">
                <div className="session-num">{s.num}</div>
                <div className="session-date">{s.date}</div>
              </div>
              <div className="session-title">{s.title}</div>
              <p className="session-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COASTAL DIVIDER */}
      <div className="coastal-break">
        <div
          className="coastal-break-bg"
          style={{ backgroundImage: "url('/images/coastal-divider.jpg')" }}
        />
        <div className="coastal-break-text fade-in" ref={addFadeRef}>
          <p>Start your journey with clarity and purpose</p>
          <span>Coastal Wealth</span>
        </div>
      </div>

      {/* REGISTRATION */}
      <section className="reg-section" id="register">
        <div className="reg-container">
          <div className="section-header fade-in" ref={addFadeRef}>
            <div className="overline">Secure Your Seat</div>
            <h2>Register for<br />Coastal <em>Blueprint</em></h2>
            <p className="lead">Register once for the full 10-session series. You&apos;ll receive calendar invites and session details via email.</p>
          </div>

          {!submitted ? (
            <form className="reg-form fade-in" ref={addFadeRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="First name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Last name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="(555) 555-5555"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Office Location *</label>
                <select
                  className="form-select"
                  required
                  value={formData.office}
                  onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                >
                  <option value="" disabled>Select your office</option>
                  {offices.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Start Date at Coastal Wealth</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., January 2026"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              {error && <p style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px" }}>{error}</p>}
              <button type="submit" className="form-submit" disabled={submitting}>
                {submitting ? "Registering..." : "Register for the Full Series"}
              </button>
              <p className="form-disclaimer">
                By registering, you confirm your commitment to the full Coastal Blueprint series.<br />
                Virtual access details will be sent to your email after registration.
              </p>
            </form>
          ) : (
            <div className="success-message show">
              <div className="success-icon">&#10003;</div>
              <h3 className="success-title">You&apos;re Registered</h3>
              <p className="success-text">
                Welcome to Coastal Blueprint. You&apos;ll receive a confirmation email with virtual access details and calendar invites for all 10 sessions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/footer-logo.png" alt="Coastal Wealth" className="footer-logo" />
        <div className="footer-tagline">Coastal Blueprint — Sales Training Program</div>
        <div className="footer-address">
          1000 Corporate Drive, Suite 700 &middot; Fort Lauderdale, FL 33334<br />
          mycoastalwealth.com
        </div>
      </footer>
    </>
  );
}
