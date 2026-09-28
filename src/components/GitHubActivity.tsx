import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Github, Star } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../data/profile";

type Repo = {
  name: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  description: string | null;
};

type Activity = {
  publicRepos: number;
  languages: { name: string; count: number }[];
  recent: Repo[];
};

const CACHE_KEY = "gh-activity-v1";
const CACHE_TTL = 1000 * 60 * 30;

const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#663399",
  PHP: "#4F5D95",
  "C#": "#178600",
  Python: "#3572A5",
};

const ui = {
  title: { en: "Live from GitHub", fr: "En direct de GitHub", ar: "مباشرة من GitHub" },
  repos: { en: "public repositories", fr: "dépôts publics", ar: "مستودع عام" },
  languages: { en: "Most used languages", fr: "Langages les plus utilisés", ar: "اللغات الأكثر استخداماً" },
  recent: { en: "Recently pushed", fr: "Mises à jour récentes", ar: "آخر التحديثات" },
  contributions: { en: "Contributions, last 12 months", fr: "Contributions, 12 derniers mois", ar: "المساهمات خلال 12 شهراً" },
  error: {
    en: "GitHub is resting right now. See everything on my profile.",
    fr: "GitHub fait une pause. Tout est sur mon profil.",
    ar: "GitHub غير متاح حالياً. كل شيء موجود في حسابي.",
  },
  profile: { en: "Open profile", fr: "Voir le profil", ar: "فتح الحساب" },
};

const loadActivity = async (): Promise<Activity> => {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null");
    if (cached && Date.now() - cached.at < CACHE_TTL) return cached.data;
  } catch {
    // ignore cache errors
  }

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${profile.handle}`),
    fetch(`https://api.github.com/users/${profile.handle}/repos?per_page=100&sort=pushed`),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API unavailable");
  const user = await userRes.json();
  const repos: Repo[] = (await reposRes.json()).filter((r: Repo) => !r.fork);

  const counts = new Map<string, number>();
  repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
  const languages = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const data: Activity = {
    publicRepos: user.public_repos,
    languages,
    recent: repos.filter((r) => r.name !== profile.handle).slice(0, 4),
  };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // ignore
  }
  return data;
};

const GitHubActivity: React.FC = () => {
  const { tr, language } = useLanguage();
  const [data, setData] = useState<Activity | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadActivity()
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const relative = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  const ago = (iso: string) => {
    const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
    if (Math.abs(days) < 30) return relative.format(days, "day");
    if (Math.abs(days) < 365) return relative.format(Math.round(days / 30), "month");
    return relative.format(Math.round(days / 365), "year");
  };
  const total = data?.languages.reduce((s, l) => s + l.count, 0) ?? 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-16 shell-panel !rounded-2xl p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Github size={20} className="dev-heading" />
        <h3 className="text-lg font-bold dev-heading">{tr(ui.title)}</h3>
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-secondary ping-dot" />
          <span className="relative w-2 h-2 rounded-full bg-secondary" />
        </span>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="ms-auto terminal-title text-xs dev-muted hover:text-primary"
          dir="ltr"
        >
          github.com/{profile.handle} ↗
        </a>
      </div>

      {failed ? (
        <p className="text-sm dev-muted">
          {tr(ui.error)}{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            {tr(ui.profile)}
          </a>
        </p>
      ) : (
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
          <div className="space-y-6">
            <div>
              <div className="text-4xl font-bold text-primary terminal-title">
                {data ? data.publicRepos : "··"}
              </div>
              <p className="text-sm dev-muted">{tr(ui.repos)}</p>
            </div>

            <div>
              <p className="terminal-title text-[11px] uppercase tracking-wider dev-muted mb-3">{tr(ui.languages)}</p>
              <div className="flex h-2.5 rounded-full overflow-hidden bg-surface mb-3">
                {data?.languages.map((l, i) => (
                  <motion.div
                    key={l.name}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(l.count / total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                    style={{ background: languageColor[l.name] ?? "var(--dev-muted)" }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {data?.languages.map((l) => (
                  <span key={l.name} className="inline-flex items-center gap-1.5 text-xs dev-text">
                    <span className="w-2 h-2 rounded-full" style={{ background: languageColor[l.name] ?? "var(--dev-muted)" }} />
                    {l.name} <span className="dev-muted">{Math.round((l.count / total) * 100)}%</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <p className="terminal-title text-[11px] uppercase tracking-wider dev-muted mb-3">{tr(ui.recent)}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {(data?.recent ?? Array.from({ length: 4 }, () => null)).map((r, i) =>
                r ? (
                  <motion.a
                    key={r.name}
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="block rounded-xl border border-line bg-surface/50 p-3.5 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <GitBranch size={13} className="text-primary shrink-0" />
                      <span className="text-sm font-semibold dev-heading truncate" dir="ltr">{r.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] dev-muted">
                      {r.language && (
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ background: languageColor[r.language] ?? "var(--dev-muted)" }} />
                          {r.language}
                        </span>
                      )}
                      {r.stargazers_count > 0 && (
                        <span className="inline-flex items-center gap-0.5">
                          <Star size={11} /> {r.stargazers_count}
                        </span>
                      )}
                      <span className="ms-auto">{ago(r.pushed_at)}</span>
                    </div>
                  </motion.a>
                ) : (
                  <div key={i} className="h-[68px] rounded-xl border border-line bg-surface/40 animate-pulse" />
                ),
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="terminal-title text-[11px] uppercase tracking-wider dev-muted mb-3">{tr(ui.contributions)}</p>
            <div className="overflow-x-auto rounded-xl border border-line bg-white/95 dark:bg-white/[0.92] p-3" dir="ltr">
              <img
                src={`https://ghchart.rshah.org/3fb950/${profile.handle}`}
                alt={tr(ui.contributions)}
                loading="lazy"
                className="min-w-[640px] w-full"
                onError={(e) => (e.currentTarget.parentElement!.parentElement!.style.display = "none")}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubActivity;
