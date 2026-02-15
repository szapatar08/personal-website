import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Repository side bar
  repo: [
    {
      type: "doc",
      id: "repo/intro",
      label: "Intro",
    },
    {
      type: "category",
      link: {
        type: "generated-index",
        title: "Python Projects Guides",
        description: "See all my projects made with python!",
        slug: "/category/python",
        keywords: ["python"],
      },
      label: "Python",
      items: ["repo/python/intro"],
    },
    {
      type: "category",
      link: {
        type: "generated-index",
        title: "HTML/CSS Projects Guides",
        description: "See all my projects made with HTML/CSS only!",
        slug: "/category/html-css",
        keywords: ["html", "css"],
      },
      label: "HTML/CSS",
      items: ["repo/html-css/intro"],
    },
  ],

  activities: [
    {
      type: "doc",
      id: "activities/intro",
      label: "Intro",
    },
  ],
};
export default sidebars;
