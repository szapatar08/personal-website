import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Santiago Zapata",
  tagline: "Take it easy. A good coder always is gonna make it easy.",
  favicon: "img/logo.png",

  future: {
    v4: true,
  },
  url: "https://szapatar-dev.web.app/",
  baseUrl: "/",

  organizationName: "szapatar08",
  projectName: "personal-website",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeConfigs: {
      en: {
        htmlLang: "en",
      },
      es: {
        htmlLang: "es",
      },
    },
  },

  plugins: [
    [
      "@docusaurus/plugin-pwa",
      {
        debug: true,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/logo.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json", // your PWA manifest
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#334155",
          },
        ],
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Santiago Zapata",
      logo: {
        alt: "Picture of Santiago",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "repo",
          position: "left",
          label: "Repository",
        },
        {
          type: "docSidebar",
          sidebarId: "activities",
          position: "left",
          label: "Activities",
        },
        { to: "/blog", label: "Blog", position: "right" },
        {
          href: "https://www.linkedin.com/in/szapatar/",
          label: "LinkedIn",
          position: "right",
          className: "nav-linkedin nav-icon",
          "aria-label": "LinkedIn repository",
        },
        {
          href: "https://github.com/szapatar08",
          label: "GitHub",
          position: "right",
          className: "nav-github nav-icon",
          "aria-label": "GitHub repository",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
