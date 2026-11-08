/* =====================================================================
   CONTENT FILE  -  this is the ONLY file you need to edit to update the
   website text, photos, videos, map and projects.
   After editing, save and refresh the page.

   Tips
   - Keep the commas and quotes. Copy an existing block to add a new one.
   - Photos and videos go in the "media" folder; write their path here.
   - Only publish photos and videos approved for public sharing (no customer
     names, serial numbers, proprietary software screens or internal configs).
   ===================================================================== */

const SITE = {
  name: "Andres D. Yance",
  role: "Software Service Engineer",
  company: "A&R Optical Machinery, Inc.",
  location: "United States",
  email: "Davidyance20@gmail.com",
  linkedin: "https://www.linkedin.com/in/andres-yance-788077220/",
  github: "https://github.com/Andresyance20",
  gitlab: "https://gitlab.com/yancea",

  // Add your resume PDF to media/documents and put its path here to show a
  // "Download resume" button. Example: "media/documents/resume.pdf"
  resume: "",

  // Used to calculate "years in role" automatically (YYYY-MM-DD)
  jobStart: "2024-08-20",

  // The background of the top of the page cycles through these machine videos
  // (silent, one after another). Add, remove or reorder scenes freely.
  // Tip: landscape videos work best here.
  heroScenes: [
    { label: "AutoMapper",       src: "media/videos/automapper-working.mp4", poster: "media/videos/posters/automapper-working.jpg" },
    { label: "ProMapper",        src: "media/videos/promapper-working.mp4",  poster: "media/videos/posters/promapper-working.jpg" },
    { label: "Hands-on service", src: "media/videos/working-on-machine.mp4", poster: "media/videos/posters/working-on-machine.jpg" }
  ],

  // Phrases typed after "I work with ..."
  typed: [
    "optical measurement systems",
    "machine integration and commissioning",
    "databases, networks and industrial protocols",
    "customers on three continents"
  ]
};

/* ---------------------------------------------------------------------
   COLORS  -  the whole site follows this one setting
   Pick a preset name, then save and refresh:
     "maroon" (original), "electric-blue", "cyan", "emerald", "violet", "orange", "crimson"
   Want your own color? Set preset to "custom" and edit the three colors below:
     dark   = buttons, borders and fills  (must be dark enough for white text)
     mid    = button hover
     accent = light color for text, icons and highlights (must be readable on black)
   Everything else (glows, tags, card backgrounds, tool illustrations) is
   calculated from these three.
   Quick preview without editing: add ?theme=violet to the page address.
   --------------------------------------------------------------------- */
const THEME = {
  preset: "cyan",
  custom: { dark: "#0b4fd1", mid: "#1f6bff", accent: "#4da8ff" },
  // the two extra highlight colors used inside the tool illustrations
  highlights: ["#5fb8b0", "#e9b44c"]
};

const THEME_PRESETS = {
  "maroon":        { dark: "#703636", mid: "#8a4444", accent: "#e07a76" },
  "electric-blue": { dark: "#0b4fd1", mid: "#1f6bff", accent: "#4da8ff" },
  "cyan":          { dark: "#0a6e86", mid: "#0e8fae", accent: "#38d6ff" },
  "emerald":       { dark: "#0f6b4a", mid: "#158a60", accent: "#3ddc97" },
  "violet":        { dark: "#5b2bb8", mid: "#7440dc", accent: "#a98bff" },
  "orange":        { dark: "#b34a0c", mid: "#d85f14", accent: "#ff9a4d" },
  "crimson":       { dark: "#a3142b", mid: "#c4203a", accent: "#ff5a73" }
};

/* ---------------------------------------------------------------------
   MACHINES & SYSTEMS
   image: optional photo for the card (leave "" for an icon header)
   --------------------------------------------------------------------- */
const MACHINES = [
  {
    name: "ProMapper",
    kicker: "Optical measurement and mapping",
    icon: "fa-ruler-combined",
    image: "",
    points: [
      "Software installation and configuration",
      "Calibration and daily verification",
      "Troubleshooting and system compatibility",
      "Advanced software tools and functionality",
      "Integration with external optical data platforms"
    ]
  },
  {
    name: "FocoServer & FocoVision",
    kicker: "Software and communication",
    icon: "fa-server",
    image: "",
    points: [
      "Software configuration",
      "System communication",
      "Integration with optical equipment",
      "Troubleshooting application and data exchange issues"
    ]
  },
  {
    name: "NeoMapper",
    kicker: "Software, upgrades and monitoring",
    icon: "fa-microchip",
    image: "",
    points: [
      "Software installation and version upgrades",
      "Hardware and software compatibility troubleshooting",
      "Operating system and storage-related troubleshooting",
      "Machine initialization and communication issues",
      "Production monitoring integration"
    ]
  },
  {
    name: "MCVP4 & MCVP8",
    kicker: "Optical measurement systems",
    icon: "fa-crosshairs",
    image: "",
    points: [
      "Optical measurement system support",
      "Software configuration",
      "Data communication and integration",
      "Troubleshooting measurement and data transfer issues"
    ]
  },
  {
    name: "AutoMapper",
    kicker: "Automated measurement and mapping",
    icon: "fa-robot",
    image: "media/machines/automapper-inside-1.jpg",
    imageAlt: "Close-up of an automated optical system with robotic lens handling",
    points: [
      "Installation and configuration support",
      "Software troubleshooting and integration",
      "Automated optical measurement and mapping systems"
    ]
  }
];

const OTHER_SYSTEMS = [
  "DLM systems", "Inkjet systems", "TLS systems", "PPOS", "SPV3",
  "EPaper systems", "Production monitoring and reporting platforms"
];

/* ---------------------------------------------------------------------
   GALLERY  (videos and photos shown in the "In action" section)
   type: "video"   -> your own .mp4 file (src) + poster image
   type: "youtube" -> id is the part after v= in the YouTube link
                      (set the video to "Unlisted"; saves site size)
   type: "image"   -> a photo
   To add something: copy a block, change the paths and text. That's it.
   --------------------------------------------------------------------- */
const GALLERY = [
  {
    type: "video",
    src: "media/videos/automapper-working.mp4",
    poster: "media/videos/posters/automapper-working.jpg",
    title: "AutoMapper in operation",
    caption: "An automated system running through its handling and measurement sequence.",
    duration: "0:13"
  },
  {
    type: "video",
    src: "media/videos/promapper-working.mp4",
    poster: "media/videos/posters/promapper-working.jpg",
    title: "ProMapper measurement stage",
    caption: "The measurement stage of a ProMapper in motion.",
    duration: "0:06"
  },
  {
    type: "video",
    src: "media/videos/automapper-working-2.mp4",
    poster: "media/videos/posters/automapper-working-2.jpg",
    title: "AutoMapper walk-around",
    caption: "A walk-around view of an automated line while it runs.",
    duration: "0:17",
    portrait: true
  },
  {
    type: "video",
    src: "media/videos/working-on-machine.mp4",
    poster: "media/videos/posters/working-on-machine.jpg",
    title: "Hands-on service work",
    caption: "Working inside a machine during service and setup.",
    duration: "0:04"
  },
  {
    type: "image",
    src: "media/profile/me-working-on-machine.jpg",
    title: "Hands-on with a NeoMapper",
    caption: "Working on a NeoMapper with colleagues.",
    alt: "Andres working on a NeoMapper machine while colleagues look on"
  },
  {
    type: "image",
    src: "media/machines/automapper-inside-1.jpg",
    title: "Inside an automated system",
    caption: "Robotic handling, sensors and conveyor on an automated optical system.",
    alt: "Robotic arms moving a lens above a conveyor inside an automated machine"
  },
  {
    type: "image",
    src: "media/machines/automapper-inside-2.jpg",
    title: "Digital inking system",
    caption: "Lens handling on an automated system with an integrated digital inking unit.",
    alt: "Lens being moved by a robotic arm next to a digital inking unit"
  }
];

/* ---------------------------------------------------------------------
   SKILLS
   level: "core"    -> solid dot  (used in my day-to-day work)
   level: "growing" -> hollow dot (building depth)
   Change a skill's level by changing that one word.
   --------------------------------------------------------------------- */
const SKILLS = [
  {
    title: "Programming and software development", icon: "fa-code",
    items: [
      ["Java", "growing"], ["Python", "growing"], ["JavaScript", "growing"],
      ["HTML", "growing"], ["CSS", "growing"], ["SQL", "core"], ["REST APIs", "growing"]
    ]
  },
  {
    title: "Database and data management", icon: "fa-database",
    items: [
      ["PostgreSQL", "core"], ["pgAdmin", "core"], ["Database troubleshooting", "core"],
      ["Data integration", "core"], ["Production data management", "core"]
    ]
  },
  {
    title: "Industrial automation", icon: "fa-cogs",
    items: [
      ["PLC systems", "core"], ["HMI systems", "core"], ["TwinCAT 2 and 3", "core"],
      ["Industrial machine integration", "core"], ["Sensor integration", "core"],
      ["Machine commissioning", "core"], ["Industrial control systems", "core"]
    ]
  },
  {
    title: "Networking and communication", icon: "fa-network-wired",
    items: [
      ["TCP/IP", "core"], ["DNS", "core"], ["Static IP configuration", "core"],
      ["Ethernet networking", "core"], ["Remote connectivity", "core"],
      ["Industrial communication troubleshooting", "core"]
    ]
  },
  {
    title: "Data analytics and monitoring", icon: "fa-chart-line",
    items: [
      ["Microsoft Power BI", "core"], ["KPI monitoring", "core"],
      ["IoT connectivity", "core"], ["Production data collection", "core"]
    ]
  },
  {
    title: "Engineering and support tools", icon: "fa-tools",
    items: [
      ["Visual Studio", "core"], ["Git", "core"], ["VNC", "core"], ["ConnectWise", "core"],
      ["Windows", "core"], ["XML configuration and integration", "core"],
      ["Machine calibration and verification", "core"]
    ]
  }
];

/* ---------------------------------------------------------------------
   COUNTRIES (shown in the About section)
   Each group describes a different kind of work, so nothing implies that
   every country involved the same thing.
   --------------------------------------------------------------------- */
const COUNTRY_GROUPS = [
  { label: "Technical training",   icon: "fa-graduation-cap", countries: ["Belgium (about a month at the company's location)"] },
  { label: "Machine installations", icon: "fa-tools",          countries: ["Hungary", "Mexico", "Jamaica", "Chile"] },
  { label: "Work on machinery",     icon: "fa-cogs",           countries: ["France", "Canada (multiple machines at customer facilities)"] },
  { label: "Professional travel",   icon: "fa-plane",          countries: ["Germany", "Italy", "Netherlands"] }
];

/* ---------------------------------------------------------------------
   TOOLS I USE  (illustrated gallery in the Skills section)
   art:   name of a built-in illustration (they follow your theme colors)
   image: OPTIONAL path to your own picture (photo, AI-generated art,
          screenshot). If set, it is shown instead of the built-in art.
          Put your files in media/tools/ and write the path here.
   --------------------------------------------------------------------- */
const TOOLS = [
  { title: "Databases",                    detail: "PostgreSQL, pgAdmin, SQL",                         art: "databases",   image: "", alt: "Illustration of a database stack feeding a data table" },
  { title: "Analytics and KPIs",           detail: "Microsoft Power BI, KPI monitoring",               art: "analytics",   image: "", alt: "Illustration of a dashboard with bar chart, line chart and gauge" },
  { title: "Industrial automation",        detail: "PLCs, HMI, TwinCAT 2 and 3, sensors",              art: "automation",  image: "", alt: "Illustration of a PLC rack, an HMI screen, a sensor and a robot arm" },
  { title: "Networking",                   detail: "TCP/IP, DNS, static IPs, Ethernet",                art: "networking",  image: "", alt: "Illustration of a network switch connecting a computer, server, cloud and machine" },
  { title: "Code and version control",     detail: "Visual Studio, Git, Java, Python, JavaScript",     art: "code",        image: "", alt: "Illustration of a code editor next to a Git branch graph" },
  { title: "Remote support",               detail: "VNC, ConnectWise",                                 art: "remote",      image: "", alt: "Illustration of a laptop connected remotely to a machine" },
  { title: "XML and system integration",   detail: "XML configuration, data exchange between systems", art: "xml",         image: "", alt: "Illustration of two systems exchanging data through an XML document" },
  { title: "Calibration and verification", detail: "Machine calibration and daily verification",       art: "calibration", image: "", alt: "Illustration of a lens with crosshair and a measuring ruler" },
  { title: "IoT connectivity",             detail: "IoT agents, production data collection",           art: "iot",         image: "", alt: "Illustration of sensors sending data through a gateway to a database" }
];

/* ---------------------------------------------------------------------
   PROJECTS
   type: "Professional" | "Software"   (used by the filter buttons)
   images: optional list of screenshots/photos (opens in the viewer)
   --------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "International Industrial Machine Deployment",
    type: "Professional", icon: "fa-globe-americas",
    tech: ["Commissioning", "PLC and sensors", "Field service"],
    summary: "A six-machine customer deployment: two tabletop and four automated optical systems.",
    description:
      "Participated in a major customer deployment involving six machines: two tabletop systems and four automated systems. " +
      "My responsibilities included software installation, system configuration, sensor and PLC-related integration support, " +
      "commissioning, troubleshooting and technical coordination, working across multiple technical components to help ensure " +
      "successful equipment deployment and operational readiness.",
    images: [], links: []
  },
  {
    title: "Optical Measurement Software Integration",
    type: "Professional", icon: "fa-project-diagram",
    tech: ["XML interfaces", "Data exchange", "Optical platforms"],
    summary: "Reliable data exchange between optical measurement systems and external data platforms.",
    description:
      "Worked with optical measurement systems, external data platforms, XML-based interfaces and software communication to " +
      "support accurate and reliable data exchange. Troubleshooting covered communication failures, incomplete data transfers " +
      "and configuration files.",
    images: [], links: []
  },
  {
    title: "Advanced Machine Troubleshooting",
    type: "Professional", icon: "fa-search",
    tech: ["Compatibility", "Networking", "Hardware interfaces"],
    summary: "Diagnosing complex problems across software, networks and hardware.",
    description:
      "Diagnosed and supported complex technical problems involving software compatibility, machine initialization, network " +
      "communication, hardware interfaces and system configuration, including differences between machine software versions.",
    images: [], links: []
  },
  {
    title: "Production Monitoring and IoT Integration",
    type: "Professional", icon: "fa-chart-line",
    tech: ["IoT", "PostgreSQL", "Power BI"],
    summary: "Connecting machines to production data for KPI visibility.",
    description:
      "Worked on initiatives involving IoT connectivity, machine data collection, IoT agent configuration, PostgreSQL and " +
      "Power BI to support production monitoring and KPI visibility. The goal is to improve production visibility and provide " +
      "useful operational information through connected systems and data analysis.",
    images: [], links: []
  },
  {
    title: "International Technical Training",
    type: "Professional", icon: "fa-graduation-cap",
    tech: ["Belgium", "Optical machinery", "Training"],
    summary: "About one month of technical training at the company's location in Belgium.",
    description:
      "Completed approximately one month of technical training in Belgium, expanding my knowledge of industrial optical " +
      "equipment, machine functionality and software, and supporting international technical operations.",
    images: [], links: []
  },
  {
    title: "Software Upgrades and Machine Modernization",
    type: "Professional", icon: "fa-sync-alt",
    tech: ["Upgrades", "Migration", "Verification"],
    summary: "Upgrading software across different generations of optical equipment.",
    description:
      "Supported software version upgrades, configuration migration, compatibility verification, calibration verification " +
      "and functionality testing across different generations of optical equipment, validating machine functionality after changes.",
    images: [], links: []
  },

  /* ---- Software projects (university and personal) ---- */
  {
    title: "Library Database Management System",
    type: "Software", icon: "fa-book",
    tech: ["SQL", "Desktop app", "Database"],
    summary: "A desktop library system with separate admin and user views, backed by an SQL database.",
    description:
      "A basic library database management system with two views. In the admin view, users can search, add and remove users " +
      "and books and view checkouts. In the general user view, users can search for books by title, ISBN, author and genre, " +
      "and check out books. The application runs as a desktop application connected to an SQL database where all the " +
      "information is stored.",
    images: [
      { src: "Imagenes/library_App1.png", alt: "Library app: first screenshot" },
      { src: "Imagenes/library_App2.png", alt: "Library app: second screenshot" }
    ],
    links: []   // e.g. { label: "GitHub", url: "https://github.com/Andresyance20/..." }
  },
  {
    title: "Turn-Based Fighting Game",
    type: "Software", icon: "fa-gamepad",
    tech: ["Game dev", "AI opponent"],
    summary: "A turn-based fighting game prototype with selectable characters, difficulty levels and an in-game store.",
    description:
      "A prototype of a turn-based fighting game. Difficulty is adjustable for casual and experienced players. Players choose " +
      "from a roster of characters with unique abilities and face an AI-controlled enemy with customizable difficulty. " +
      "Backgrounds can be changed, and an in-game store sells super potions and other power-ups to add strategy to the fights.",
    images: [
      { src: "Imagenes/fighting_game1.png", alt: "Fighting game: first screenshot" },
      { src: "Imagenes/fighting_game2.png", alt: "Fighting game: second screenshot" }
    ],
    links: []
  },
  {
    title: "Mars Explorer",
    type: "Software", icon: "fa-rocket",
    tech: ["JavaScript", "NASA API", "HTML/CSS"],
    summary: "A website that pulls rover photos and mission data from NASA's API.",
    description:
      "A website that uses NASA's API to get firsthand images from the Mars rovers, along with each camera view name, the " +
      "rover's name, its status and its landing and launch dates.",
    images: [
      { src: "Imagenes/Nasapp_1.png", alt: "Mars Explorer: first screenshot" },
      { src: "Imagenes/Nasapp_2.png", alt: "Mars Explorer: second screenshot" }
    ],
    links: []
  }
];
