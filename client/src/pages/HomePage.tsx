
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UploadSection } from  '../components/UploadSection'
import { QuerySection } from '../components/QuerySection'
import { AnswerSection } from '../components/AnswerSection'
import { FileText, Zap, CheckCircle, Check, Sparkles, ArrowRight, ShieldCheck, Wand2 } from "lucide-react"
import heroIllustration from "@/assets/hero-illustration.jpg"

// --- Interface for Query Response (Unchanged) ---
interface QueryResponse {
  answer: string
  sources: Array<{
    page: number
    content: string
  }>
}

// --- Animated Text Configuration ---
const changingTexts = ["Financial Reports", "Legal Contracts", "Research Papers", "Textbooks"]

export default function HomePage() {
  const [currentAnswer, setCurrentAnswer] = useState<QueryResponse | null>(null)
  const [showApp, setShowApp] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [featuresVisible, setFeaturesVisible] = useState(false)
  const [stepsVisible, setStepsVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)

  const featuresRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Effect for cycling through the animated text
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % changingTexts.length)
    }, 3000) // Change text every 3 seconds
    return () => clearInterval(interval)
  }, [])

  // Initial fade in
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === featuresRef.current && entry.isIntersecting) {
          setFeaturesVisible(true)
        }
        if (entry.target === stepsRef.current && entry.isIntersecting) {
          setStepsVisible(true)
        }
        if (entry.target === ctaRef.current && entry.isIntersecting) {
          setCtaVisible(true)
        }
      })
    }, observerOptions)

    if (featuresRef.current) observer.observe(featuresRef.current)
    if (stepsRef.current) observer.observe(stepsRef.current)
    if (ctaRef.current) observer.observe(ctaRef.current)

    return () => observer.disconnect()
  }, [])

  const handleAnswerReceived = (response: QueryResponse) => {
    setCurrentAnswer(response)
  }

  const handleGetStarted = () => {
    setShowApp(true)
    setTimeout(() => {
      document.getElementById("app-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 font-sans text-slate-100">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.5s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }

        .stagger-item {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.3s; }
        .stagger-item:nth-child(3) { animation-delay: 0.5s; }

        .text-cycle-enter {
          animation: slideInUp 1s ease-in-out forwards;
        }

        .text-cycle-exit {
          animation: slideOutUp 1s ease-in-out forwards;
        }

        .app-enter {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          border-color: hsl(var(--primary) / 0.5);
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2);
        }
      `}</style>

      {!showApp ? (
        <>
          {/* Hero Section */}
          <section
            className={`container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
            style={{
              backgroundImage: "radial-gradient(#e0e0e1 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}>
          
            <h1 className="text-5xl font-bold tracking-tight text-black md:text-7xl">
              Chat with your
              <br />
              <span className="relative inline-block h-[1.2em] w-full md:w-auto">
                <span
                  key={changingTexts[textIndex]}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-cycle-enter"
                  style={{ animationDuration: '1s' }}
                >
                  {changingTexts[textIndex]}
                </span>
                {/* Placeholder to maintain height */}
                <span className="invisible">{changingTexts[0]}</span>
              </span>
              <br/>
              with AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Unlock insights from your documents instantly. <br/>Upload any PDF and ask questions to get precise,
              source-cited answers.
            </p>
            <div className="mt-10 flex items-center gap-4 scale-in">
              <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6 rounded-full font-semibold bg-blue-500 hover:bg-blue-700">
                Get Started<Check className="h-20 w-20" />
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24" ref={featuresRef}>
            <div className="container mx-auto max-w-6xl px-4">
              <div className={`text-center ${featuresVisible ? 'fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl font-bold text-primary">
                  Unlock Document Intelligence
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                  DocuSPARK transforms static PDFs into interactive sources of knowledge.
                </p>
              </div>

              <div className="mt-16 grid gap-8 md:grid-cols-3">
                {[
                  { icon: Zap, title: "Instant Answers", text: "AI-powered analysis provides immediate responses to your queries, saving you hours of manual searching." },
                  { icon: CheckCircle, title: "Verifiable Sources", text: "Every answer is backed by direct quotes and page citations, ensuring you can trust the information." },
                  { icon: FileText, title: "Effortless Upload", text: "A simple drag-and-drop interface gets your documents ready for analysis in seconds." },
                ].map((feature, i) => (
                  <div key={i} className={featuresVisible ? 'stagger-item' : 'opacity-0'}>
                    <Card className="h-full border-border/60 bg-background/50 backdrop-blur-sm card-hover">
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <feature.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.text}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24 bg-card/20 border-y" ref={stepsRef}>
            <div className="container mx-auto max-w-6xl px-4">
              <div className={`text-center mb-16 ${stepsVisible ? 'fade-in-up' : 'opacity-0'}`}>
                <h2 className="text-4xl font-bold">Get Answers in 3 Simple Steps</h2>
                <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">From PDF to pinpoint answers, the process is seamless.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className={stepsVisible ? 'stagger-item' : 'opacity-0'}>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-primary/40">1</div>
                    <h3 className="text-2xl font-semibold mt-4">Upload Your PDF</h3>
                    <p className="text-muted-foreground mt-2">Securely drag and drop any PDF document into the system.</p>
                  </div>
                </div>
                <div className={stepsVisible ? 'stagger-item' : 'opacity-0'}>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-primary/40">2</div>
                    <h3 className="text-2xl font-semibold mt-4">Ask a Question</h3>
                    <p className="text-muted-foreground mt-2">Type your question in natural language, just like talking to a person.</p>
                  </div>
                </div>
                <div className={stepsVisible ? 'stagger-item' : 'opacity-0'}>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl font-bold text-primary/40">3</div>
                    <h3 className="text-2xl font-semibold mt-4">Get Your Insight</h3>
                    <p className="text-muted-foreground mt-2">Receive a concise answer with direct links to the source content.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="container mx-auto max-w-4xl px-4 py-32 text-center" ref={ctaRef}>
            <div className={ctaVisible ? 'fade-in-up' : 'opacity-0'}>
              <h2 className="text-3xl font-bold md:text-5xl text-blue-500">Ready to Unlock Your Documents?</h2>
              <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
                Stop skimming, start understanding. Try DocuSPARK now and turn your documents into a database you can query.
              </p>
              <Button onClick={handleGetStarted} size="lg" className="mt-10 px-8 py-6 rounded-full font-semibold text-lg">
                Start for Free
              </Button>
            </div>
          </section>
        </>
      ) : (
        // --- The Main Application UI ---
        <section
          id="app-section"
          className="relative container mx-auto max-w-6xl px-4 py-10 app-enter"
        >
          <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur-2xl md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                  <Sparkles className="h-4 w-4" />
                  DocuSPARK document intelligence
                </div>
                <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
                  Upload, ask, and uncover answers from your PDFs.
                </h1>
                <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
                  DocuSPARK turns long documents into a searchable, conversational workspace with grounded answers and source snippets.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-200">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <ShieldCheck className="h-4 w-4 text-cyan-300" />
                    Gemini-powered
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <Wand2 className="h-4 w-4 text-sky-300" />
                    PDF RAG pipeline
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/60 p-3 shadow-2xl shadow-cyan-500/10">
                <img
                  src={heroIllustration}
                  alt="DocuSPARK document illustration"
                  className="h-64 w-full rounded-[1.5rem] object-cover"
                />
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300">
                  <span>Smart PDF workspace</span>
                  <ArrowRight className="h-4 w-4 text-cyan-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <UploadSection />
            <QuerySection onAnswerReceived={handleAnswerReceived} />
            <AnswerSection response={currentAnswer} />
          </div>
        </section>
      )}
    </main>
  )
}