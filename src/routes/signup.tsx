import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Copy, Check, Share2, Pause, Play, Volume2, VolumeX, RotateCcw, Settings } from "lucide-react";
import logo from "@/assets/m3-logo.png";
import founderVideo from "@/assets/founder-video.mp4";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is The Founding Members Program?",
    a: "Before M3 officially launches, we're giving a small group of people early access to the full 30 day M3 protocol completely free. In exchange, we ask for honest feedback and a little word of mouth if you love it. No strings attached.",
  },
  {
    q: "How much does The Founding Members Program cost?",
    a: (
      <>
        Nothing. The product and shipping are completely free. If you love it,{" "}
        <a href="https://g.page/r/Cb2vve3DXC47EBM/review" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold underline">
          leave us a Google review under Max Mend Method
        </a>
        , follow us on Instagram (@maxvalrose, @maxmendmethod), and tell a friend.
      </>
    ),
  },
  {
    q: "How will I receive it?",
    a: "We'll ship it directly to you at no cost. Once you're confirmed as a founding member, we'll reach out with next steps.",
  },
  {
    q: "What happens after my 30 days?",
    a: "When M3 officially drops, founding members get first access at $49 - half the retail price of $99. That discount is yours to keep.",
  },
  {
    q: "What if I don't want to lose momentum before the official launch?",
    a: "DM us on Instagram @maxmendmethod. If you loved the first cycle and don't want a gap, we'll take care of you.",
  },
];

function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareText = "Just joined the M3 Founding Members program. It's a free 30 day supplement protocol. Check it out:";
  const shareUrl = "maxmendmethod.com/signup";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (submitted) {
    return (
      <div>
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <Link to="/"><img src={logo} alt="M3" className="mx-auto h-12 w-auto" /></Link>
          <h1 className="mt-10 text-2xl md:text-4xl font-black uppercase tracking-tight">
            Congratulations on taking the first step to optimizing your health
          </h1>
          <p className="mt-5 text-base md:text-lg text-foreground/80">
            We'll review your application and reach out soon with next steps and shipping info for your Founding Membership!
          </p>
          <p className="mt-3 text-base text-foreground/80">
            Follow along on Instagram for updates while you wait —{" "}
            <a href="https://instagram.com/maxmendmethod" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold">@maxmendmethod</a>
          </p>

          <div className="mt-10 space-y-3">
            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({ text: shareText + " " + shareUrl });
                } else {
                  await navigator.clipboard.writeText(shareText + " " + shareUrl);
                }
              }}
              className="flex items-center justify-center gap-2 w-full rounded-md bg-brand px-5 py-3 text-sm font-bold uppercase text-white hover:opacity-90"
            >
              <Share2 className="h-4 w-4" /> Tell a friend
            </button>

            <button
              onClick={copy}
              className="flex items-center justify-center gap-2 w-full rounded-md border border-brand text-brand px-5 py-3 text-sm font-bold uppercase hover:bg-brand hover:text-white transition-colors"
            >
              {copied ? <><Check className="h-4 w-4" /> Link copied</> : <><Copy className="h-4 w-4" /> Copy share link</>}
            </button>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full rounded-md border border-foreground/20 text-foreground/70 px-5 py-3 text-sm font-bold uppercase hover:border-foreground/40 hover:text-foreground transition-colors mt-2"
            >
              Return to Homepage
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div>
      <main>
        {/* Logo header — dark background */}
        <div className="bg-[#1d1e1c] w-full pt-10 pb-8 text-center">
          <Link to="/"><img src={logo} alt="M3" className="mx-auto h-12 w-auto" /></Link>
        </div>

        {/* Dark band: Headline + Subheader + Video */}
        <section className="bg-[#1d1e1c]">
          <div className="mx-auto max-w-5xl px-4 pb-8">
            <h1 className="text-[2.4rem] md:text-[3.9rem] font-black text-center uppercase tracking-tight leading-[1.05] text-white">
              Are you getting everything out of your supplements?
            </h1>
            <p className="mt-4 text-center text-[1.7rem] md:text-[2.1rem] text-white/80">
              Join 345 Other M3 Founding Members - Stop Guessing at Your Supplement Routine
            </p>
            <FounderVideo />
          </div>
        </section>

        {/* Body copy + form */}
        <div className="mx-auto max-w-5xl px-4">
          <p className="mt-6 text-center text-[1.5rem] md:text-[1.7rem] text-foreground/85">
            It's a 30 day, <strong className="font-bold">science backed protocol</strong> where every packet is optimized for the day you're on. No research or guesswork required.
          </p>

          {/* Fields section — white background */}
          <div className="mt-8 bg-white border border-border rounded-lg px-8 py-10 max-w-2xl mx-auto text-foreground">
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="space-y-4"
            >
              <Field label="Name" name="name" placeholder="Your full name" required />
              <Field label="Email" name="email" type="email" placeholder="you@email.com" required />
              <button
                type="submit"
                className="w-full rounded-md bg-brand px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white hover:opacity-90"
              >
                Join The Waitlist
              </button>
              <p className="text-center text-sm text-foreground/60">
                The founding members program is FREE + free shipping
              </p>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <section className="mt-14 mx-auto max-w-3xl px-4 pb-10">
          <h2 className="text-2xl md:text-3xl font-black text-center uppercase">FAQs</h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none flex justify-between items-center font-bold text-base md:text-lg">
                  <span>{f.q}</span>
                  <span className="ml-4 text-brand text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm md:text-base text-foreground/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FounderVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
      setShowSettings(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => setIsPlaying(false));
    resetHideTimer();
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [resetHideTimer]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    lastTimeRef.current = v.currentTime;
    setProgress(v.currentTime / v.duration);
  };

  // Prevent scrubbing — snap back only for significant seeks (>0.5s) to avoid
  // interfering with browser-internal seeking that fires during play() resumption.
  const handleSeeking = () => {
    const v = videoRef.current;
    if (!v) return;
    if (Math.abs(v.currentTime - lastTimeRef.current) > 0.5) {
      v.currentTime = lastTimeRef.current;
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => setIsPlaying(false)); } else { v.pause(); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const rewind10 = () => {
    const v = videoRef.current;
    if (!v) return;
    const newTime = Math.max(0, v.currentTime - 10);
    lastTimeRef.current = newTime;
    v.currentTime = newTime;
  };

  const changeSpeed = (rate: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
    resetHideTimer();
  };

  // Sqrt curve: fills fast early, slows toward the end — gamified feel
  const visualProgress = Math.sqrt(progress);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      className="mt-8 relative rounded-lg overflow-hidden bg-black"
      onMouseMove={resetHideTimer}
      onMouseEnter={resetHideTimer}
      onMouseLeave={() => {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setShowControls(false);
        setShowSettings(false);
      }}
    >
      <video
        ref={videoRef}
        src={founderVideo}
        className="w-full aspect-video block"
        autoPlay
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onSeeking={handleSeeking}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent px-4 pt-10 pb-3 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Gamified progress bar — display only */}
        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden mb-3 pointer-events-none">
          <div
            className="h-full bg-brand rounded-full"
            style={{ width: `${visualProgress * 100}%`, transition: "width 0.2s linear" }}
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={togglePlay} className="text-white hover:text-brand transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          {/* Rewind 10s */}
          <button onClick={rewind10} className="relative text-white hover:text-brand transition-colors" aria-label="Rewind 10 seconds">
            <RotateCcw className="h-5 w-5" />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold leading-none mt-0.5 pointer-events-none">10</span>
          </button>

          <button onClick={toggleMute} className="text-white hover:text-brand transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          {/* Settings — speed control */}
          <div className="ml-auto relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowSettings((s) => !s); resetHideTimer(); }}
              className="text-white hover:text-brand transition-colors"
              aria-label="Playback speed"
            >
              <Settings className="h-4 w-4" />
            </button>

            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-md py-1 min-w-[110px] z-10">
                <p className="px-3 py-1 text-xs text-white/50 uppercase tracking-wide">Speed</p>
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => changeSpeed(s)}
                    className={`block w-full text-left px-3 py-1.5 text-sm transition-colors ${
                      playbackRate === s ? "text-brand font-bold" : "text-white hover:text-brand"
                    }`}
                  >
                    {s === 1 ? "Normal" : `${s}x`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-base font-bold">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border-2 border-border bg-white text-foreground placeholder:text-foreground/40 px-4 py-3.5 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}
