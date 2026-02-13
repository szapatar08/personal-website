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
      label: "Repositories intro",
    },
    {
      type: "category",
      label: "HTML/CSS",
      items: ["repo/html-css/html-intro"],
    },
  ],
  javascript: [
    {
      type: "category",
      label: "JavaScript",
      items: ["javascript/intro"],
    },
  ],
};

export default sidebars;
