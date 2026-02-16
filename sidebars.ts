import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

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
        title: "SQL Practice Activities",
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
