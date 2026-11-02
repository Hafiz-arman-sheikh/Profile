import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check,
  Code2, Coffee, Database, ExternalLink, FileText, GraduationCap,
  Layers3, Mail, MapPin, Menu, Moon, Rocket, Sparkles, Sun,
  Terminal, Workflow, Wrench, X
} from "lucide-react";

const email = "arman.com700@gmail.com";
const github = "https://github.com/Hafiz-arman-sheikh";
const linkedin = "https://www.linkedin.com/in/hafiz-arman-sheikh-05b723186/";

const projects = [
  {
    name: "LifeTrack",
    type: "Application",
    category: "Apps",
    description: "A personal tracking app for keeping important routines, reminders and everyday records organised.",
    stack: ["TypeScript", "Firebase"],
    code: "https://github.com/Hafiz-arman-sheikh/LifeTrack",
    live: "https://lifetrack-864d7.web.app/",
    icon: Workflow,
    accent: "from-cyan-400/20 to-blue-500/10",
    featured: true
  },
  {
    name: "PeopleFlow HCM",
    type: "Management system",
    category: "Apps",
    description: "An HR management application covering employee records, attendance, leave requests and payroll workflows.",
    stack: ["JavaScript", "Supabase", "SQL"],
    code: "https://github.com/Hafiz-arman-sheikh/peopleflow-hcm",
    live: "https://peopleflow-hcm.vercel.app/",
    icon: BriefcaseBusiness,
    accent: "from-violet-400/20 to-fuchsia-500/10",
    featured: true
  },
  {
    name: "LiquidDrop",
    type: "Cloud application",
    category: "Apps",
    description: "A cloud file manager with authentication, drag-and-drop uploads and persistent file storage.",
    stack: ["JavaScript", "Supabase Auth", "Storage"],
    code: "https://github.com/Hafiz-arman-sheikh/LiquidDrop",
    live: "https://liquiddrop.vercel.app/",
    icon: Database,
    accent: "from-sky-400/20 to-cyan-500/10",
    featured: true
  },
  {
    name: "Barkat Bakery & Nimco",
    type: "E-commerce",
    category: "Apps",
    description: "An online bakery storefront concept with product categories, cart, order tracking and inventory tools.",
    stack: ["JavaScript", "Supabase"],
    code: "https://github.com/Hafiz-arman-sheikh/BARKAT-BAKERY---NIMCO",
    live: "https://barkat-bakery-nimco.vercel.app/",
    icon: Coffee,
    accent: "from-amber-400/20 to-orange-500/10",
    featured: true
  },
  {
    name: "Learning Management System",
    type: "Education platform",
    category: "Frontend",
    description: "A multi-page learning interface with student and teacher views, login screens and responsive layouts.",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/Hafiz-arman-sheikh/LMS",
    live: "https://lms-three-nu.vercel.app/",
    icon: GraduationCap,
    accent: "from-emerald-400/20 to-teal-500/10"
  },
  {
    name: "Pak Units Poll",
    type: "Interactive web app",
    category: "Frontend",
    description: "An interactive polling project built to practise dynamic interfaces and browser-side data handling.",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/Hafiz-arman-sheikh/-PakUnits-Poll",
    live: "https://pak-units-poll.vercel.app/",
    icon: Workflow,
    accent: "from-green-400/20 to-lime-500/10"
  },
  {
    name: "Huffaz Caterers",
    type: "Business website",
    category: "Frontend",
    description: "A responsive catering website that presents menu information and helps customers explore services.",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/Hafiz-arman-sheikh/HUFFAZ-CATERERS",
    icon: Coffee,
    accent: "from-rose-400/20 to-pink-500/10"
  },
  {
    name: "Coffee Wala",
    type: "Website concept",
    category: "Frontend",
    description: "A coffee shop website concept created to practise responsive layouts and polished product presentation.",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/Hafiz-arman-sheikh/coffee-shop-website",
    icon: Coffee,
    accent: "from-orange-400/20 to-yellow-500/10"
  },
  {
    name: "Weather App",
    type: "API practice",
    category: "Practice",
    description: "A weather interface focused on requesting and displaying data from an external API.",
    stack: ["JavaScript", "Fetch API"],
    code: "https://github.com/Hafiz-arman-sheikh/Weather",
    icon: Sparkles,
    accent: "from-blue-400/20 to-indigo-500/10"
  },
  {
    name: "Expense Tracker",
    type: "Practice project",
    category: "Practice",
    description: "A small project for recording and reviewing expenses through a simple web interface.",
    stack: ["Web fundamentals"],
    code: "https://github.com/Hafiz-arman-sheikh/Expense-Tracker",
    icon: Layers3,
    accent: "from-lime-400/20 to-green-500/10"
  },
  {
    name: "AURA E-commerce",
    type: "Storefront concept",
    category: "Frontend",
    description: "A luxury watch storefront concept built to practise product cards and shopping layouts.",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/Hafiz-arman-sheikh/eCommerce-web",
    icon: Layers3,
    accent: "from-violet-400/20 to-indigo-500/10"
  },
  {
    name: "Beauty Hub",
    type: "Website",
    category: "Frontend",
    description: "A beauty and skincare website interface with product-focused sections and responsive styling.",
    stack: ["HTML", "CSS", "Bootstrap"],
    code: "https://github.com/Hafiz-arman-sheikh/Beauty-Hub-1",
    icon: Sparkles,
    accent: "from-pink-400/20 to-fuchsia-500/10"
  },
  {
    name: "RoyalChat",
    type: "UI practice",
    category: "Practice",
    description: "A messenger-inspired chat interface focused on responsive UI and a bold visual style.",
    stack: ["HTML", "CSS", "JavaScript"],
    code: "https://github.com/Hafiz-arman-sheikh/RoyalChat",
    icon: Code2,
    accent: "from-red-400/20 to-rose-500/10"
  }
];

const skillGroups = [
  {
    title: "Frontend foundations",
    icon: Code2,
    note: "Building and practising",
    skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design", "Bootstrap"]
  },
  {
    title: "Modern frontend",
    icon: Layers3,
    note: "Currently learning",
    skills: ["React", "Tailwind CSS", "TypeScript", "Vite"]
  },
  {
    title: "Data & integrations",
    icon: Database,
    note: "Used in projects",
    skills: ["Firebase", "Supabase", "SQL", "REST APIs", "Fetch API"]
  },
  {
    title: "Developer workflow",
    icon: Wrench,
    note: "Everyday tools",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Netlify"]
  }
];

const navItems = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Journey", "#journey"],
  ["Contact", "#contact"]
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <span className="section-kicker">{eyebrow}</span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-7 text-[var(--muted)]">{description}</p>}
    </div>
  );
}

function App() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredProjects = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((project) => project.category === filter);
    return showAll ? list : list.slice(0, 6);
  }, [filter, showAll]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:" + email;
    }
  };

  return (
    <div className={(light ? "theme-light " : "") + "theme-shell"}>
      <div className="pointer-events-none fixed inset-0 -z-0 soft-grid opacity-30" />
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--page)]/80 backdrop-blur-xl">
        <nav className="section-wrap flex h-[76px] items-center justify-between">
          <a href="#home" className="focus-ring flex items-center gap-2 rounded-lg text-lg font-extrabold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Code2 size={19} /></span>
            <span>HAS<span className="text-[var(--accent)]">.</span></span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="focus-ring text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--accent)]">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setLight((value) => !value)} className="focus-ring grid size-10 place-items-center rounded-xl border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]" aria-label="Toggle colour theme">
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <a href="#contact" className="focus-ring hidden items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 sm:inline-flex">
              Let's talk <ArrowUpRight size={16} />
            </a>
            <button onClick={() => setMenuOpen((value) => !value)} className="focus-ring grid size-10 place-items-center rounded-xl border border-[var(--line)] md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-[var(--line)] bg-[var(--page)] md:hidden">
              <div className="section-wrap flex flex-col py-3">
                {navItems.map(([label, href]) => (
                  <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-2 py-3 text-sm font-semibold text-[var(--muted)] hover:text-[var(--accent)]">{label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <section id="home" className="section-wrap relative flex min-h-[calc(100svh-76px)] items-center py-20 sm:py-24">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: "easeOut" }}>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-4 py-2 text-xs font-semibold text-[var(--accent)]">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                Web development learner · Open to opportunities
              </div>
              <p className="font-mono text-sm text-[var(--muted)]">Hello, world! I'm</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-[-.045em] sm:text-6xl xl:text-7xl">
                Hafiz Arman <span className="gradient-text">Sheikh.</span>
              </h1>
              <h2 className="mt-6 max-w-2xl text-xl font-bold leading-snug sm:text-2xl">
                I build thoughtful, responsive <span className="text-[var(--accent)]">web experiences.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
                I'm a web development student growing my skills in JavaScript, React and Tailwind CSS. I enjoy turning ideas into useful interfaces and learning by building real projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/15">
                  Explore my work <ArrowUpRight size={17} />
                </a>
                <a href="#contact" className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--line)] px-5 py-3.5 text-sm font-bold transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                  Get in touch <Mail size={16} />
                </a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--muted)]">
                <a href={github} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-md hover:text-[var(--accent)]"><svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.68 5.4-5.24 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg> GitHub</a>
                <a href={linkedin} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-md hover:text-[var(--accent)]"><svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.56 20.452h3.558V9H3.56v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg> LinkedIn</a>
                <span className="inline-flex items-center gap-2"><MapPin size={16} /> Karachi, Pakistan</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .94, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .7, delay: .12 }} className="relative mx-auto w-full max-w-[440px]">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/15 via-transparent to-indigo-500/20 blur-2xl" />
              <div className="glass relative overflow-hidden rounded-[2rem] p-5 shadow-2xl shadow-black/20 sm:p-7">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-rose-400" /><span className="size-2.5 rounded-full bg-amber-300" /><span className="size-2.5 rounded-full bg-emerald-400" /></div>
                  <span className="font-mono text-[10px] text-[var(--muted)]">arman / developer.js</span>
                  <Terminal size={15} className="text-[var(--muted)]" />
                </div>
                <div className="space-y-4 py-6 font-mono text-xs leading-6 sm:text-sm">
                  <p><span className="text-violet-400">const</span> <span className="text-[var(--accent)]">developer</span> = {"{"}</p>
                  <p className="pl-5"><span className="text-emerald-400">name</span>: <span className="text-amber-300">"Arman Sheikh"</span>,</p>
                  <p className="pl-5"><span className="text-emerald-400">focus</span>: <span className="text-amber-300">"Frontend Development"</span>,</p>
                  <p className="pl-5"><span className="text-emerald-400">learning</span>: [</p>
                  <p className="pl-10 text-amber-300">"React", "Tailwind CSS",</p>
                  <p className="pl-10 text-amber-300">"TypeScript"</p>
                  <p className="pl-5">],</p>
                  <p className="pl-5"><span className="text-emerald-400">mindset</span>: <span className="text-amber-300">"Learn by building"</span>,</p>
                  <p className="pl-5"><span className="text-emerald-400">location</span>: <span className="text-amber-300">"Karachi, PK"</span></p>
                  <p>{"}"};</p>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--surface-strong)]/80 px-4 py-3">
                  <span className="text-xs text-[var(--muted)]">Always improving, one project at a time.</span>
                  <span className="font-mono text-xs text-emerald-400">● ready</span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-3 shadow-xl sm:flex">
                <span className="grid size-9 place-items-center rounded-xl bg-indigo-400/10 text-indigo-400"><Rocket size={18} /></span>
                <span><strong className="block text-sm">Build. Learn. Improve.</strong><small className="text-xs text-[var(--muted)]">My development loop</small></span>
              </div>
            </motion.div>
          </div>
          <a href="#about" aria-label="Scroll to about section" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-[var(--muted)] transition hover:text-[var(--accent)] lg:block"><ArrowDown size={19} /></a>
        </section>

        <section id="about" className="section-wrap py-20 sm:py-24">
          <SectionHeading eyebrow="A little about me" title="Curious by nature. Practical by approach." description="I'm developing as a frontend developer through structured learning and hands-on projects. My background in e-commerce operations also taught me to value accuracy, clear processes and solving real problems." />
          <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 18 }} viewport={{ once: true }} className="glass rounded-3xl p-7 sm:p-9">
              <div className="mb-5 grid size-12 place-items-center rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)]"><Sparkles size={22} /></div>
              <h3 className="text-xl font-extrabold">From operations to web development</h3>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                Alongside my web development studies, I bring practical experience from e-commerce operations: order processing, inventory checks, cross-border shipment tracking, quality checks, reporting and coordinating day-to-day work. I enjoy applying that process-focused mindset to building useful digital products.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Problem solving", "Process thinking", "Team coordination", "Attention to detail"].map((item) => <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)]">{item}</span>)}
              </div>
            </motion.div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="glass rounded-3xl p-6">
                <span className="section-kicker">Current focus</span>
                <h3 className="mt-3 text-lg font-extrabold">Modern frontend development</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Practising React components, responsive layouts, Tailwind CSS and JavaScript fundamentals.</p>
              </div>
              <div className="glass rounded-3xl p-6">
                <span className="section-kicker">What motivates me</span>
                <h3 className="mt-3 text-lg font-extrabold">Ideas into useful products</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">I like understanding a problem, shaping a clear interface and improving it through feedback.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-y border-[var(--line)] bg-[var(--surface)]/35 py-20 sm:py-24">
          <div className="section-wrap">
            <SectionHeading eyebrow="Tools & technologies" title="My growing toolkit." description="A clear view of what I've used, what I'm practising and the tools that support my workflow." />
            <div className="grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group, index) => {
                const Icon = group.icon;
                return (
                  <motion.div key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]/40">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Icon size={20} /></span><h3 className="font-extrabold">{group.title}</h3></div>
                      <span className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[10px] font-semibold text-[var(--muted)]">{group.note}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => <span key={skill} className="rounded-lg border border-[var(--line)] bg-[var(--surface-strong)] px-3 py-2 text-xs font-semibold text-[var(--muted)]">{skill}</span>)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-5 text-xs leading-6 text-[var(--muted)]">I describe React, Tailwind CSS and TypeScript as current learning areas rather than claiming professional mastery.</p>
          </div>
        </section>

        <section id="projects" className="section-wrap py-20 sm:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Selected work" title="Projects built while learning." description="A mix of practical applications, business websites and experiments. Each project helps me strengthen a different part of web development." />
            <div className="mb-10 flex flex-wrap gap-2">
              {["All", "Apps", "Frontend", "Practice"].map((item) => (
                <button key={item} onClick={() => { setFilter(item); setShowAll(false); }} className={"focus-ring rounded-full border px-4 py-2 text-xs font-bold transition " + (filter === item ? "border-[var(--accent)] bg-[var(--accent)] text-slate-950" : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]")}>{item}</button>
              ))}
            </div>
          </div>
          <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <motion.article key={project.name} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .22 }} className="glass group flex min-h-[300px] flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-[var(--accent)]/40">
                    <div className={"mb-6 flex h-28 items-center justify-between overflow-hidden rounded-xl border border-[var(--line)] bg-gradient-to-br " + project.accent}>
                      <div className="pl-6"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-[var(--muted)]">{project.type}</span><p className="mt-2 text-lg font-extrabold">{project.name}</p></div>
                      <Icon size={54} strokeWidth={1.2} className="mr-6 text-[var(--text)]/50 transition duration-300 group-hover:scale-110 group-hover:text-[var(--accent)]" />
                    </div>
                    <p className="flex-1 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tag) => <span key={tag} className="rounded-md bg-[var(--surface-strong)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--muted)]">{tag}</span>)}</div>
                    <div className="mt-6 flex items-center gap-4 border-t border-[var(--line)] pt-4">
                      <a href={project.code} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold text-[var(--text)] transition hover:text-[var(--accent)]"><svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.68 5.4-5.24 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg> Source code <ArrowUpRight size={13} /></a>
                      {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent)]">Live demo <ExternalLink size={13} /></a>}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
          {projects.filter((project) => filter === "All" || project.category === filter).length > 6 && (
            <div className="mt-9 text-center">
              <button onClick={() => setShowAll((value) => !value)} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--line)] px-5 py-3 text-sm font-bold transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
                {showAll ? "Show fewer projects" : "Show all projects"} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        <section id="journey" className="border-y border-[var(--line)] bg-[var(--surface)]/35 py-20 sm:py-24">
          <div className="section-wrap">
            <SectionHeading eyebrow="Learning & experience" title="The journey so far." description="A combination of formal learning, practical projects and professional experience outside software development." />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="glass rounded-3xl p-7">
                <div className="mb-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-indigo-400/10 text-indigo-400"><GraduationCap size={21} /></span><h3 className="text-lg font-extrabold">Education</h3></div>
                <div className="space-y-6 border-l border-[var(--line)] pl-5">
                  <div className="relative"><span className="absolute -left-[25px] top-1 size-2.5 rounded-full bg-[var(--accent)]" /><span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">In progress</span><h4 className="mt-1 font-bold">Modern Web App Development</h4><p className="mt-1 text-sm text-[var(--muted)]">Saylani Mass IT Training (SMIT)</p></div>
                  <div className="relative"><span className="absolute -left-[25px] top-1 size-2.5 rounded-full bg-[var(--accent-2)]" /><span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">2020</span><h4 className="mt-1 font-bold">Bachelor of Commerce</h4><p className="mt-1 text-sm text-[var(--muted)]">University of Karachi</p></div>
                </div>
              </div>
              <div className="glass rounded-3xl p-7">
                <div className="mb-6 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-emerald-400/10 text-emerald-400"><BriefcaseBusiness size={21} /></span><h3 className="text-lg font-extrabold">Professional background</h3></div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)]">E-commerce operations</span>
                <h4 className="mt-1 text-lg font-bold">Senior Officer · Operations</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Experience across outbound order processing, inventory control, cross-border shipment tracking, quality checks, vendor and courier coordination, Excel reporting and team task allocation.</p>
                <div className="mt-5 flex flex-wrap gap-2">{["Order management", "Inventory", "WMS / OMS", "Excel reports", "Team coordination"].map((item) => <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[11px] font-semibold text-[var(--muted)]">{item}</span>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-wrap py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[2rem] border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/10 via-[var(--surface)] to-[var(--accent-2)]/10 p-8 text-center sm:p-14">
            <div className="absolute -right-20 -top-24 size-64 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="section-kicker">Have an idea?</span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">Let's build something <span className="gradient-text">useful.</span></h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">I'm interested in junior frontend opportunities, collaborative projects and learning from people who build great products. I'd be happy to connect.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={"mailto:" + email} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-1"><Mail size={17} /> Email me <ArrowUpRight size={16} /></a>
                <button onClick={copyEmail} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[var(--line)] px-5 py-3.5 text-sm font-bold transition hover:border-[var(--accent)] hover:text-[var(--accent)]">{copied ? <Check size={16} /> : <FileText size={16} />}{copied ? "Email copied" : "Copy email"}</button>
              </div>
              <div className="mt-8 flex justify-center gap-5 text-[var(--muted)]">
                <a aria-label="GitHub" href={github} target="_blank" rel="noreferrer" className="focus-ring rounded-md hover:text-[var(--accent)]"><svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.68 5.4-5.24 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg></a>
                <a aria-label="LinkedIn" href={linkedin} target="_blank" rel="noreferrer" className="focus-ring rounded-md hover:text-[var(--accent)]"><svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM3.56 20.452h3.558V9H3.56v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg></a>
                <a aria-label="Email" href={"mailto:" + email} className="focus-ring rounded-md hover:text-[var(--accent)]"><Mail size={20} /></a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] py-7">
        <div className="section-wrap flex flex-col items-center justify-between gap-3 text-center text-xs text-[var(--muted)] sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Hafiz Arman Sheikh. Built with React & Tailwind CSS.</p>
          <a href="#home" className="focus-ring inline-flex items-center gap-1 rounded-md font-semibold hover:text-[var(--accent)]">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;