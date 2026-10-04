import Image from "next/image";

const GITHUB_ORG = "https://github.com/Filament-Platform-Inc";
const FOUNDERS_URL = "https://hasnain.filamentplatform.com";
const CONTACT_EMAIL = "hello@filamentplatform.com";
const SENSOR_URL = "https://sensor.filamentplatform.com";

type Status = "working" | "active testing";

type Project = {
  name: string;
  tagline: string;
  status: Status;
  body: string;
  /** Shell commands shown in the install block. Omit for hosted / not-yet-released work. */
  install?: string[];
  /** Shown under the install block — prerequisites, caveats, honest warnings. */
  note?: string;
  repo?: string;
  /** Hosted home for the project, when it has one of its own. */
  site?: string;
  /** Unused today. Present so a paid tier is a data change, not a redesign. */
  pricing?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Sensor",
    tagline: "Linux voice dictation. Hold a key, speak, text appears.",
    status: "working",
    body:
      "Transcription is a solved problem and the category is crowded. Packaging is not. Every competitor ships as git clone plus Python plus manual sudo steps, and none of them work properly on GNOME Wayland. Sensor reads the key below the compositor, so it works on GNOME, KDE, X11, and a bare tty alike. One command to install, one command to remove it completely — this app reads every keystroke, and reversibility is what makes it safe to try.",
    note: "Written in Rust. Install instructions are on the Sensor site.",
    site: SENSOR_URL,
    repo: `${GITHUB_ORG}/sensor`,
  },
  {
    name: "Leonhard",
    tagline: "An automated theorem prover for Lean 4.",
    status: "working",
    body:
      "An LLM proposes a proof, the Lean compiler checks it, and every failure is fed back as a written lesson so the next attempt is better informed. AlphaProof is a 30B fine-tuned model trained for roughly 80,000 TPU-days. Leonhard is an off-the-shelf model, a while loop, and a text file of notes. It proves considerably less — but it proves things, and every part of it is legible.",
    install: ["uv venv && uv pip install -e .", "uv run leonhard prove Theorems/Arithmetic.lean:add_zero"],
    note: "Also needs Lean 4 via elan, and an API key for DeepSeek, Moonshot, or OpenAI. Full setup is in the README.",
    repo: `${GITHUB_ORG}/leonhard`,
  },
  {
    name: "Let's Meet",
    tagline: "A meeting invitation worth the recipient's time.",
    status: "working",
    body:
      "Write the note, offer real times and real places, and send one person a link. It reveals itself a line at a time instead of arriving as another paragraph asking for fifteen minutes. Built for the message you only send once, to someone whose attention you would rather earn than request.",
    note: "A hosted web app rather than something you install. Not released yet.",
  },
  {
    name: "Luminous",
    tagline: "Goal-directed web research.",
    status: "active testing",
    body:
      "Describe what you are looking for in plain language. Luminous searches, reads real pages, and hands back a spreadsheet where every row quotes the source it came from and links to it. Not a chatbot and not a search engine — it answers questions shaped like a list, where the answer is scattered across fifty pages nobody wants to open.",
    install: ["git clone https://github.com/Filament-Platform-Inc/luminous.git"],
    note: "Bring your own API key. Honestly: this one is rough, the hosted version is down, and it is under active repair. The code is public if you want to look.",
    repo: `${GITHUB_ORG}/luminous`,
  },
];

const STATUS_STYLES: Record<Status, string> = {
  working: "bg-[#0d7d7d]/10 text-[#0a6060] ring-1 ring-[#0d7d7d]/20",
  "active testing": "bg-[#e07b2a]/10 text-[#a85512] ring-1 ring-[#e07b2a]/25",
};

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { name, tagline, status, body, install, note, repo, site } = project;

  return (
    <article className="border-t border-slate-200 py-10 md:py-12">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3
          className="text-2xl font-bold text-[#0f2244] md:text-3xl"
          style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
        >
          {name}
        </h3>
        <StatusPill status={status} />
      </div>

      <p className="mt-2 text-lg text-[#0f2244]/70">{tagline}</p>
      <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{body}</p>

      {install && (
        <div className="mt-6 overflow-x-auto rounded-lg bg-[#0f2244] px-4 py-3">
          <pre className="text-sm leading-relaxed text-slate-100">
            <code>
              {install.map((line) => (
                <span key={line} className="block whitespace-pre">
                  <span className="select-none text-[#e07b2a]">$ </span>
                  {line}
                </span>
              ))}
            </code>
          </pre>
        </div>
      )}

      {note && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500">{note}</p>}

      <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        {site && (
          <a
            href={site}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0d7d7d] underline-offset-4 transition-colors hover:text-[#0a6060] hover:underline"
          >
            Install it →
          </a>
        )}
        {repo ? (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0d7d7d] underline-offset-4 transition-colors hover:text-[#0a6060] hover:underline"
          >
            Source on GitHub →
          </a>
        ) : (
          <span className="text-slate-400">Source coming soon</span>
        )}
      </p>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Image
          src="/FilamentLogo.png"
          alt="Filament"
          width={96}
          height={29}
          priority
          className="object-contain"
        />
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#0f2244]"
          >
            GitHub
          </a>
          <a
            href={FOUNDERS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#0f2244]"
          >
            Who builds this
          </a>
        </nav>
      </header>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="px-6 pb-4 pt-10 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <h1
            className="max-w-3xl font-bold leading-tight text-[#0f2244]"
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            }}
          >
            Small tools, built in the open.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Filament builds software for problems that are annoying enough to be worth
            solving properly. Everything here is free, most of it is open source, and the
            status labels are honest — including the one that says a project still needs
            work.
          </p>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────── */}
      <section className="px-6 pb-16 pt-8 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Projects
          </h2>
          <div className="mt-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="bg-[#0f2244] px-6 py-14 text-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <Image
            src="/FilamentLogo.png"
            alt="Filament"
            width={110}
            height={33}
            className="object-contain opacity-70"
          />
          <p className="max-w-md leading-relaxed text-slate-300">
            If you use something here and it breaks, tell me. That is the most useful thing
            you can do.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a
              href={GITHUB_ORG}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href={FOUNDERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 transition-colors hover:text-white"
            >
              Who builds this
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-slate-300 transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
