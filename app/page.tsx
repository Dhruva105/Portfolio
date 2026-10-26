import Image from "next/image";
import Link from "next/link";
import { MotionShell } from "@/app/components/motion-shell";
import { SiteNav } from "@/app/components/site-nav";
import { credentialInventory } from "@/app/data/credentials";
import { siteUrl } from "@/app/lib/site-url";
import styles from "./page.module.scss";

type IllustrationKind = "invoice" | "filesystem" | "loan" | "heap" | "bigint" | "heart";

type Project = {
  number: string;
  category: string;
  title: string;
  summary: string;
  detail: string;
  technologies: string[];
  repository?: string;
  illustration: IllustrationKind;
  illustrationLabel: string;
  disclaimer?: string;
};

const projects: Project[] = [
  {
    number: "01",
    category: "APPLIED MACHINE LEARNING · FINANCIAL WORKFLOWS",
    title: "Vendor Invoice Intelligence",
    summary:
      "An end-to-end application for estimating expected freight costs and flagging invoices that may need closer review.",
    detail:
      "SQL aggregation creates invoice-level features. Regression models compare freight estimates, while a separate classification pipeline surfaces risk for manual review. A Streamlit interface brings both workflows together.",
    technologies: ["Python", "SQL", "Scikit-learn", "SQLite", "Streamlit"],
    repository: "https://github.com/Dhruva105/Vendor-Invoice-Intelligence-System",
    illustration: "invoice",
    illustrationLabel:
      "Illustrative model flow showing invoice records moving through feature building, estimation, and review.",
  },
  {
    number: "02",
    category: "SYSTEMS PROGRAMMING · C++17",
    title: "Unix-like File System",
    summary:
      "A virtual file system built to explore storage allocation, consistency, crash recovery, and performance.",
    detail:
      "The simulation combines inode-based structures, bitmap allocation, write-ahead journaling, an LRU block cache, a consistency checker, defragmentation, a command-line interface, and a companion browser dashboard.",
    technologies: ["C++17", "Data Structures", "Journaling", "HTML/CSS/JS"],
    repository: "https://github.com/Dhruva105/file-system-recovery-tool",
    illustration: "filesystem",
    illustrationLabel:
      "Illustrative storage map with allocated blocks and a journal path; not a screenshot of the project dashboard.",
  },
  {
    number: "03",
    category: "MACHINE LEARNING · DECISION SYSTEMS",
    title: "Loan Eligibility & Risk Modeling",
    summary:
      "A cost-sensitive approach to loan eligibility decisions that considers the different consequences of classification errors.",
    detail:
      "The project explores threshold optimization, cost-sensitive model training, SHAP and LIME explainability components, and a Flask prediction API.",
    technologies: ["Python", "Flask", "SHAP", "LIME", "Model Evaluation"],
    repository: "https://github.com/Dhruva105/loan-kiosk-model",
    illustration: "loan",
    illustrationLabel:
      "Illustrative decision-cost matrix distinguishing false approval from false rejection.",
  },
  {
    number: "04",
    category: "SOFTWARE ENGINEERING · ALGORITHMS",
    title: "Intelligent Task Prioritizer",
    summary:
      "A Java desktop application that prioritizes tasks by deadline and importance using a custom Binary Min-Heap.",
    detail:
      "The array-backed heap supports O(log N) insertion and extraction, with O(1) access to the highest-priority item. A Swing interface manages tasks and visualizes the heap array.",
    technologies: ["Java", "Java Swing", "Binary Min-Heap", "OOP"],
    repository: "https://github.com/Dhruva105/Intelligent-Task-Prioritizer",
    illustration: "heap",
    illustrationLabel:
      "Illustrative heap structure with deadline and importance as the two inputs to prioritization.",
  },
  {
    number: "05",
    category: "C++ DEVELOPMENT · ALGORITHMS",
    title: "BigInt C++ Library",
    summary:
      "An arbitrary-precision integer library for arithmetic beyond the limits of standard 64-bit integer types.",
    detail:
      "The implementation explores dynamic memory management, operator overloading, large-integer arithmetic, and factorial and Fibonacci calculations.",
    technologies: ["C++", "Operator Overloading", "Arithmetic"],
    repository: "https://github.com/Dhruva105/BigInt-CPP-Library",
    illustration: "bigint",
    illustrationLabel:
      "Illustrative flow of one-hot feature encoding, standard scaling, and a K-nearest neighbors model.",
  },
  {
    number: "06",
    category: "MACHINE LEARNING · HEALTH DATA EXPLORATION",
    title: "Heart Disease Prediction",
    summary:
      "An educational Streamlit classifier project for exploring a K-nearest neighbors model on a heart disease dataset.",
    detail:
      "The app aligns one-hot encoded inputs to the saved model’s expected columns, applies a saved StandardScaler, and passes the features to a saved KNN model. The repository includes heart.csv with 918 rows, 11 input columns, and a target; it does not document the dataset’s upstream source or model evaluation results.",
    technologies: ["Python", "Streamlit", "scikit-learn", "Pandas", "NumPy", "Plotly", "Joblib"],
    repository: "https://github.com/Dhruva105/heart-disease-prediction",
    illustration: "heart",
    illustrationLabel:
      "Illustrative machine-learning workflow showing one-hot encoding, scaling, and KNN prediction.",
    disclaimer:
      "Educational project only. It is not clinically validated and is not a medical diagnostic tool.",
  },
];

const skillGroups = [
  {
    label: "01 / Languages",
    items: ["Python", "C++17", "Java", "JavaScript", "SQL", "PHP"],
  },
  {
    label: "02 / Machine learning & data",
    items: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Regression",
      "Classification",
      "Model evaluation",
    ],
  },
  {
    label: "03 / Building applications",
    items: [
      "Flask",
      "REST APIs",
      "SQLite",
      "Streamlit",
      "React",
      "TypeScript",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "04 / Engineering foundations",
    items: [
      "Object-oriented programming",
      "Data structures",
      "Algorithms",
      "Complexity analysis",
      "Software design",
    ],
  },
  {
    label: "05 / Tools & platforms",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Linux",
      "Shell scripting",
      "Docker",
      "Microsoft Azure",
      "AWS",
    ],
  },
];

const credentials = [
  {
    title: "Azure Data Scientist Associate",
    issuer: "Microsoft Certified",
    date: "June 2025",
  },
  {
    title: "Fabric Data Engineer Associate",
    issuer: "Microsoft Certified",
    date: "January 2026",
  },
  {
    title: "5-Day AI Agents Intensive Course",
    issuer: "Google & Kaggle",
    date: "December 2025",
  },
  {
    title: "API Fundamentals Student Expert",
    issuer: "Postman",
    date: "2025",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
  },
  {
    title: "Linux Commands and Shell Scripting",
    issuer: "Skillera",
  },
];

function ProjectIllustration({
  kind,
  label,
}: {
  kind: IllustrationKind;
  label: string;
}) {
  return (
    <figure className={styles.projectArt} role="img" aria-label={label}>
      <div className={styles.artTopline} aria-hidden="true">
        <span>VISUAL SUMMARY / ILLUSTRATION</span>
        <span className={styles.artSignal}>
          <i /> SYSTEM MAP
        </span>
      </div>

      {kind === "invoice" && (
        <div className={styles.invoiceSketch} aria-hidden="true">
          <div className={styles.sketchSideNote}>
            <span>INPUT</span>
            <b>Invoice<br />records</b>
            <small>SQL aggregation</small>
          </div>
          <div className={styles.sketchTrack}>
            <span className={styles.trackLine} />
            <div className={styles.modelNode}>
              <span>01</span>
              <b>Feature<br />building</b>
              <small>Freight · vendor · invoice</small>
            </div>
            <div className={styles.modelNode}>
              <span>02</span>
              <b>Model<br />paths</b>
              <small>Regression / classification</small>
            </div>
            <div className={styles.outcomeRow}>
              <span>ESTIMATE FREIGHT</span>
              <span>REVIEW SIGNAL</span>
            </div>
          </div>
        </div>
      )}

      {kind === "filesystem" && (
        <div className={styles.filesystemSketch} aria-hidden="true">
          <div className={styles.diskReadout}>
            <span>VIRTUAL DISK / BLOCK ALLOCATION</span>
            <span>bitmap → journal → cache</span>
          </div>
          <div className={styles.blockGrid}>
            {Array.from({ length: 32 }, (_, index) => (
              <span
                className={[
                  styles.diskBlock,
                  [1, 2, 5, 8, 9, 10, 14, 17, 18, 22, 25, 26, 29].includes(
                    index,
                  )
                    ? styles.diskBlockActive
                    : "",
                ].join(" ")}
                key={index}
              />
            ))}
          </div>
          <div className={styles.diskLegend}>
            <span><i /> allocated</span>
            <span><i /> available</span>
            <span className={styles.journalTag}>JOURNAL / RECOVERY</span>
          </div>
        </div>
      )}

      {kind === "loan" && (
        <div className={styles.costSketch} aria-hidden="true">
          <div className={styles.costCaption}>
            <span>DECISION DESIGN</span>
            <b>Errors carry<br />different costs.</b>
          </div>
          <div className={styles.costMatrix}>
            <span className={styles.matrixCorner}>ACTUAL ↓ / MODEL →</span>
            <span>APPROVE</span>
            <span>DECLINE</span>
            <span>APPROVED</span>
            <b>Correct<br />approval</b>
            <b>False<br />rejection</b>
            <span>REJECTED</span>
            <b className={styles.costHigh}>False<br />approval</b>
            <b>Correct<br />rejection</b>
          </div>
        </div>
      )}

      {kind === "heap" && (
        <div className={styles.heapSketch} aria-hidden="true">
          <div className={styles.heapCaption}>
            <span>PRIORITY = (DAYS REMAINING × 2) − IMPORTANCE</span>
            <b>Lower score<br />moves forward.</b>
          </div>
          <div className={styles.heapTree}>
            <span className={styles.heapBranchTop} />
            <span className={styles.heapBranchLeft} />
            <span className={styles.heapBranchRight} />
            <b className={styles.heapNodeRoot}>NEXT</b>
            <b className={styles.heapNodeLeft}>TODAY</b>
            <b className={styles.heapNodeRight}>LATER</b>
          </div>
          <div className={styles.heapComplexity}>
            <span>INSERT <b>O(log N)</b></span>
            <span>ROOT <b>O(1)</b></span>
            <span>EXTRACT <b>O(log N)</b></span>
          </div>
        </div>
      )}

      {kind === "bigint" && (
        <div className={styles.bigIntSketch} aria-hidden="true">
          <span className={styles.digitLabel}>ARBITRARY PRECISION</span>
          <div className={styles.digitSequence}>
            <b>834</b><i>+</i><b>2,506</b><i>=</i><b>3,340</b>
          </div>
          <div className={styles.digitRule} />
          <span className={styles.digitFoot}>DIGIT GROUPS / OPERATOR OVERLOADS</span>
        </div>
      )}

      {kind === "heart" && (
        <div className={styles.bigIntSketch} aria-hidden="true">
          <span className={styles.digitLabel}>MODEL PIPELINE / EDUCATIONAL PROJECT</span>
          <div className={styles.digitSequence}>
            <b>INPUT</b><i>→</i><b>ENCODE</b><i>→</i><b>KNN</b>
          </div>
          <div className={styles.digitRule} />
          <span className={styles.digitFoot}>ONE-HOT FEATURES / STANDARD SCALER</span>
        </div>
      )}
    </figure>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.sectionLabel}>
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dhruv Pal",
    ...(siteUrl ? { url: siteUrl } : {}),
    email: "dhruvpal105@gmail.com",
    description:
      "Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning at Lovely Professional University.",
    image: siteUrl ? siteUrl + "/images/dhruv-cinematic.png" : undefined,
    affiliation: {
      "@type": "EducationalOrganization",
      name: "Lovely Professional University",
    },
    sameAs: [
      "https://www.linkedin.com/in/dhruv-pal-521120311/",
      "https://github.com/Dhruva105",
    ],
    knowsAbout: [
      "Artificial intelligence",
      "Machine learning",
      "Software engineering",
      "Systems programming",
      "Applied research",
      "Data structures and algorithms",
    ],
  };

  return (
    <MotionShell>
      <div className={styles.page} id="top">
        <SiteNav page="home" />

        <main id="main-content">
          <section className={styles.hero} aria-labelledby="hero-title">
            <div className={styles.heroGrid} aria-hidden="true" />
            <div className={styles.heroHalo} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className={styles.heroMedia}>
              <Image
                src="/images/dhruv-cinematic.webp"
                alt="Dhruv Pal in a softly lit, cinematic portrait"
                fill
                priority
                sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 62vw"
                className={styles.heroImage}
              />
              <span className={styles.photoIndex}>PORTRAIT / 01</span>
            </div>

            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>
                <span className={styles.liveDot} />
                COMPUTER SCIENCE × ARTIFICIAL INTELLIGENCE
              </p>
              <p className={styles.heroName}>DHRUV PAL <span>— 2026 / PUNJAB, INDIA</span></p>
              <h1 id="hero-title" className={styles.heroTitle}>
                <span>Building <em>intelligent</em></span>
                <span>systems.</span>
                <span>Engineering practical</span>
                <span>solutions.</span>
              </h1>
              <p className={styles.heroSubline}>
                Exploring what comes next.
              </p>
              <p className={styles.heroIntro}>
                I study how ideas become useful systems — through applied
                machine learning, software engineering, and research.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#work">
                  Explore selected work <span aria-hidden="true">↓</span>
                </a>
                <a className={styles.secondaryAction} href="mailto:dhruvpal105@gmail.com">
                  Get in touch <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <div className={styles.heroFooter} aria-label="Education and interests">
              <span>B.TECH CSE · AI & ML</span>
              <span>LOVELY PROFESSIONAL UNIVERSITY</span>
              <span>EXPECTED AUGUST 2028</span>
            </div>
            <a className={styles.scrollCue} href="#questions">
              <span>SCROLL TO EXPLORE</span>
              <i aria-hidden="true" />
            </a>
          </section>

          <div className={styles.ticker} aria-label="Areas of focus">
            <span>APPLIED AI</span><i />
            <span>SOFTWARE SYSTEMS</span><i />
            <span>RESEARCH</span><i />
            <span>PRODUCT THINKING</span><i />
            <span className={styles.tickerLast}>APPLIED AI</span>
          </div>

          <section
            className={styles.questionsSection}
            id="questions"
            aria-labelledby="questions-title"
          >
            <SectionLabel number="02">THE QUESTIONS</SectionLabel>
            <div className={styles.questionsLayout}>
              <div className={styles.questionsHeadline} data-reveal>
                <h2 id="questions-title">
                  A working system
                  <span>begins with a</span>
                  <em>better question.</em>
                </h2>
                <p>
                  What makes a model useful to the person making a decision?
                  How should software behave when something goes wrong? And
                  what does it take to turn a technical idea into a tool people
                  can understand?
                </p>
              </div>
              <div className={styles.questionsAside} data-reveal>
                <div className={styles.questionRule} />
                <p className={styles.asideNumber}>A PRACTICE IN PROGRESS</p>
                <p className={styles.asideText}>
                  These questions pull me across disciplines: from machine
                  learning and data to algorithms, systems programming, and the
                  experience around the software.
                </p>
                <a href="#about" className={styles.textLink}>
                  A little more about me <span aria-hidden="true">↘</span>
                </a>
              </div>
            </div>
            <div className={styles.focusGrid}>
              <article className={styles.focusItem} data-reveal>
                <span>01 / APPLIED AI</span>
                <h3>Useful predictions</h3>
                <p>
                  Exploring models, data preparation, and evaluation through
                  applications with a clear decision or task in view.
                </p>
              </article>
              <article className={styles.focusItem} data-reveal>
                <span>02 / SOFTWARE</span>
                <h3>Systems that hold up</h3>
                <p>
                  Working from algorithms and data structures toward software
                  that is understandable, maintainable, and practical.
                </p>
              </article>
              <article className={styles.focusItem} data-reveal>
                <span>03 / RESEARCH</span>
                <h3>Questions with context</h3>
                <p>
                  Learning to examine technical ideas carefully, connect
                  disciplines, and communicate what the evidence supports.
                </p>
              </article>
              <article className={styles.focusItem} data-reveal>
                <span>04 / PRODUCT THINKING</span>
                <h3>Technology for a need</h3>
                <p>
                  Considering the problem, the people using a tool, and how
                  technical decisions shape their experience.
                </p>
              </article>
            </div>
          </section>

          <section
            className={styles.workSection}
            id="work"
            aria-labelledby="work-title"
          >
            <SectionLabel number="03">THE WORK</SectionLabel>
            <div className={styles.workHeading} data-reveal>
              <h2 id="work-title">
                Ideas, followed
                <span>through to <em>implementation.</em></span>
              </h2>
              <p>
                Independent and academic projects across applied ML, systems,
                and software engineering. Where source code is available, entries link to their repository.
              </p>
            </div>

            <div className={styles.featuredProjects}>
              {projects.slice(0, 2).map((project, index) => (
                <article
                  className={[
                    styles.featuredProject,
                    index === 1 ? styles.featuredReverse : "",
                  ].join(" ")}
                  key={project.number}
                  data-reveal
                >
                  <ProjectIllustration
                    kind={project.illustration}
                    label={project.illustrationLabel}
                  />
                  <div className={styles.projectCopy}>
                    <div className={styles.projectMeta}>
                      <span>{project.number}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p className={styles.projectSummary}>{project.summary}</p>
                    <p className={styles.projectDetail}>{project.detail}</p>
                    {project.disclaimer && <p className={styles.projectDisclaimer}>{project.disclaimer}</p>}
                    <ul className={styles.techList} aria-label="Technologies">
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                    {project.repository && (
                      <a
                        className={styles.repoLink}
                        href={project.repository}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={"View the " + project.title + " repository on GitHub"}
                      >
                        View repository <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.projectGrid}>
              {projects.slice(2).map((project) => (
                <article className={styles.projectTile} key={project.number} data-reveal>
                  <ProjectIllustration
                    kind={project.illustration}
                    label={project.illustrationLabel}
                  />
                  <div className={styles.projectMeta}>
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className={styles.projectSummary}>{project.summary}</p>
                  <p className={styles.projectDetail}>{project.detail}</p>
                  {project.disclaimer && <p className={styles.projectDisclaimer}>{project.disclaimer}</p>}
                  <ul className={styles.techList} aria-label="Technologies">
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {project.repository && (
                    <a
                      className={styles.repoLink}
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={"View the " + project.title + " repository on GitHub"}
                    >
                      View repository <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
            <p className={styles.projectNote}>
              Project visuals are editorial illustrations of the documented
              systems, not application screenshots or performance results.
            </p>
          </section>

          <section className={styles.practiceBand} aria-label="How I approach projects">
            <div className={styles.practiceImage}>
              <Image
                src="/images/dhruv-at-work.png"
                alt="Dhruv working at a desk beside a window"
                fill
                sizes="(max-width: 720px) 100vw, 52vw"
                className={styles.workImage}
              />
            </div>
            <div className={styles.practiceCopy} data-reveal>
              <SectionLabel number="04">A WAY OF WORKING</SectionLabel>
              <h2>From the first question to a working result.</h2>
              <p>
                I start by understanding the problem, then choose an approach
                that fits it. I build the pieces, evaluate how they behave, and
                document the decisions so the work can be understood and
                improved.
              </p>
              <div className={styles.practiceSteps}>
                <span>01 / FRAME THE PROBLEM</span>
                <span>02 / BUILD THE SYSTEM</span>
                <span>03 / EVALUATE & EXPLAIN</span>
              </div>
            </div>
          </section>

          <section
            className={styles.researchSection}
            id="research"
            aria-labelledby="research-title"
          >
            <SectionLabel number="05">RESEARCH & PUBLICATION</SectionLabel>
            <div className={styles.researchLayout}>
              <div className={styles.researchIntro} data-reveal>
                <p className={styles.monoLabel}>A CONTRIBUTION TO ADAPTIVE LEARNING</p>
                <h2 id="research-title">
                  Technology that
                  <span>responds to the</span>
                  <em>learner.</em>
                </h2>
                <p>
                  I co-authored a paper exploring how artificial intelligence
                  and cloud computing can support more personalized and
                  accessible learning experiences.
                </p>
              </div>
              <article className={styles.paperCard} data-reveal>
                <div className={styles.paperTop}>
                  <span>PEER-REVIEWED JOURNAL ARTICLE</span>
                  <span>2025</span>
                </div>
                <h3>
                  Adaptive Learning in the Cloud: AI-Driven Personalization and
                  Accessibility in Modern Education
                </h3>
                <div className={styles.paperRule} />
                <dl className={styles.paperDetails}>
                  <div>
                    <dt>AUTHORS</dt>
                    <dd>Suvankar Dey, Dhruv Pal, and Tanya Pal</dd>
                  </div>
                  <div>
                    <dt>PUBLICATION</dt>
                    <dd>International Journal of Multidisciplinary Educational Research</dd>
                  </div>
                  <div>
                    <dt>ISSUE / PAGES</dt>
                    <dd>Volume 14 · Issue 10(4) · pp. 62–68</dd>
                  </div>
                </dl>
                <a
                  href="https://doi.org/10.5281/zenodo.17501410"
                  className={styles.paperLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read the publication <span aria-hidden="true">↗</span>
                </a>
              </article>
            </div>
          </section>

          <section
            className={styles.aboutSection}
            id="about"
            aria-labelledby="about-title"
          >
            <SectionLabel number="06">ABOUT / TOOLKIT</SectionLabel>
            <div className={styles.aboutIntro}>
              <div className={styles.aboutImageWrap} data-reveal>
                <Image
                  src="/images/dhruv-portrait.png"
                  alt="Dhruv Pal in a navy suit and white shirt"
                  fill
                  sizes="(max-width: 720px) 80vw, 340px"
                  className={styles.aboutImage}
                />
                <span>DHRUV PAL / PROFILE</span>
              </div>
              <div className={styles.aboutText} data-reveal>
                <h2 id="about-title">
                  Curious about
                  <span>what happens</span>
                  <em>under the surface.</em>
                </h2>
                <p>
                  I’m a Computer Science and Engineering undergraduate
                  specializing in Artificial Intelligence and Machine Learning
                  at Lovely Professional University. I build practical
                  software systems, explore machine learning applications, and
                  learn by working through the engineering behind an idea.
                </p>
                <p>
                  My work spans predictive analytics, backend development,
                  systems programming, algorithms, and research. I’m especially
                  interested in the space where intelligent behavior meets
                  reliable software and thoughtful product decisions.
                </p>
                <div className={styles.aboutMeta}>
                  <span>PUNJAB, INDIA</span>
                  <span>B.TECH · EXPECTED AUGUST 2028</span>
                </div>
              </div>
            </div>

            <div className={styles.skillsHeading} data-reveal>
              <p className={styles.monoLabel}>TOOLS I HAVE WORKED WITH</p>
              <p>
                A working toolkit across projects. My experience varies by
                technology, and I’m continuing to deepen it.
              </p>
            </div>
            <div className={styles.skillGroups}>
              {skillGroups.map((group) => (
                <div className={styles.skillGroup} key={group.label}>
                  <h3>{group.label}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.educationCredentials}>
              <article className={styles.educationBlock} data-reveal>
                <p className={styles.monoLabel}>EDUCATION / 01</p>
                <h3>Lovely Professional University</h3>
                <p>
                  Bachelor of Technology in Computer Science and Engineering,
                  specializing in Artificial Intelligence and Machine Learning.
                </p>
                <span>Punjab, India · August 2024 — August 2028 (expected)</span>
              </article>
              <div className={styles.credentialsBlock} data-reveal>
                <p className={styles.monoLabel}>CERTIFICATIONS & TECHNICAL LEARNING</p>
                <ul>
                  {credentials.map((credential) => (
                    <li key={credential.title}>
                      <div>
                        <b>{credential.title}</b>
                        <span>{credential.issuer}</span>
                      </div>
                      {credential.date && <time>{credential.date}</time>}
                    </li>
                  ))}
                </ul>
                <Link className={styles.credentialsCta} href="/certifications">
                  Browse all {credentialInventory.length} certifications &amp; badges
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
            <p className={styles.communityNote}>
              COMMUNITY / Participated in the WNS Cares Foundation CyberSmart
              Awareness initiative in 2025, supporting digital-safety education.
            </p>
          </section>

          <section
            className={styles.contactSection}
            id="contact"
            aria-labelledby="contact-title"
          >
            <SectionLabel number="07">CONTACT & COLLABORATION</SectionLabel>
            <div className={styles.contactGrid}>
              <div className={styles.contactHeading} data-reveal>
                <p className={styles.monoLabel}>OPEN TO INTERNSHIPS · RESEARCH · COLLABORATION</p>
                <h2 id="contact-title">
                  Let’s make
                  <span>something</span>
                  <em>useful.</em>
                </h2>
              </div>
              <div className={styles.contactDetails} data-reveal>
                <p>
                  I’m interested in opportunities across AI/ML engineering,
                  software development, applied research, and technical product
                  work. If you’re building or investigating something in those
                  spaces, I’d be glad to connect.
                </p>
                <a className={styles.emailLink} href="mailto:dhruvpal105@gmail.com">
                  dhruvpal105@gmail.com <span aria-hidden="true">↗</span>
                </a>
                <div className={styles.socialLinks}>
                  <a
                    href="https://www.linkedin.com/in/dhruv-pal-521120311/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    href="https://github.com/Dhruva105"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                  <a href="mailto:dhruvpal105@gmail.com">
                    Email <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} DHRUV PAL</p>
          <p>BUILT AROUND QUESTIONS, SYSTEMS & USEFUL IDEAS</p>
          <a href="#top">BACK TO TOP <span aria-hidden="true">↑</span></a>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </MotionShell>
  );
}

