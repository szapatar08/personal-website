import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Learn, Always Improving",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        I’m a software developer in constant training, focused on building
        strong foundations and improving every day.
      </>
    ),
  },
  {
    title: "Focused on Logic & Problem Solving",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        My approach to development is centered on problem-solving, clean logic,
        and scalable solutions.
      </>
    ),
  },
  {
    title: "Powered by Modern Technologies",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        I work with modern web technologies like React and Node.js, and I’m
        expanding my profile with Data Science and AI engineering studies.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
