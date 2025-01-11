import type { HeadersFunction, MetaFunction } from "react-router";
import Sheet from "~/components/Sheet";
import CategoryTop from "~/components/layouts/CategoryTop";

export const headers: HeadersFunction = () => {
  return {
    "cache-control": "public, max-age=3600",
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "About Me" },
    {
      name: "description",
      content:
        "I'm a full cycle engineer interested in designing and developing products that perfectly fits users' needs with great UX.",
    },
  ];
};

function Paragraph(props: { children: React.ReactNode }) {
  return <p className="my-6 text-lg text-geb-blue">{props.children}</p>;
}

export default function Page() {
  return (
    <CategoryTop title="About Me">
      <Sheet className="p-12">
        <Paragraph>Hi! I'm Geb.</Paragraph>
        <Paragraph>
          I'm a full cycle engineer interested in designing and developing products that perfectly
          fits users' needs with great UX.
        </Paragraph>
        <Paragraph>
          In line with this interest, I’m supporting the development of SaaS applications for other
          businesses at my company. My job covers everything from roadmap planning to actual
          development. Specifically:
        </Paragraph>
        <Paragraph>
          <ul className="pl-6 list-disc marker:text-geb-blue">
            <li className="my-4 text-lg text-geb-blue">
              I create development roadmaps spanning several months with clients, considering both
              business needs and development procedures and timelines.
            </li>
            <li className="my-4 text-lg text-geb-blue">
              I design UI/UX by considering both user use cases in businesses and the technologies
              that enhance UX.
            </li>
            <li className="my-4 text-lg text-geb-blue">
              I design and develop applications considering scalability, performance, and
              maintainability.
            </li>
          </ul>
        </Paragraph>
        <Paragraph>
          I also design and develop my own products from scratch, managing everything from concept
          to deployment.
        </Paragraph>
      </Sheet>
    </CategoryTop>
  );
}
