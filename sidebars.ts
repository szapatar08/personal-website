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
  ],

  activities: [
    {
      type: "doc",
      id: "activities/intro-activities",
      label: "Intro",
    },
    {
      type: "category",
      link: {
        type: "generated-index",
        title: "SQL practice activities",
        description:
          "SQL (Structured Query Language) is a standard language used to store, retrieve, and manage data in relational databases.",
        slug: "/category/activities-sql",
        keywords: ["SQL", "Structured Query Language", "data", "databases"],
      },
      label: "SQL",
      items: ["activities/sql/progressive-sql-activity"],
    },
  ],
};
export default sidebars;
