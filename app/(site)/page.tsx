import HeroBuild from "@/components/hero/HeroBuild";
import Navbar from "../../components/Navbar";
import Ticker from "../../components/navbar/Ticker";
import Services from "../../components/navbar/Services";
import Projects from "../../components/navbar/Projects";
import History from "../../components/History";
import { projects } from "../../lib/site-data";
import Intro from "@/components/Intro";
import Values from "@/components/Values";
import Founder from "@/components/Founder";
import Care from "@/components/Care";
import Careers from "@/components/Careers";
import Contact from "@/components/navbar/Contact";

export default function Home() {
  const featured = projects[0];

  return (
    <>
      <Navbar variant="bar" />

      <HeroBuild
        nav={<Navbar variant="hero" />}
        title={
          <>
            Build <em>green,</em>
            <br />
           craft dreams.
          </>
        }
        description="Beaver Builders is a Maldivian construction company. From water villas set on a 3.5-metre lagoon to 200 social housing units in Addu, we build, manage, equip and supply projects across the atolls."
        ctaLabel="View our projects"
        ctaHref="/#projects"
        handover={{
          kicker: `${featured.statusLabel} · ${featured.place}`,
          title: featured.title,
          text: "The block above is drawn after this project, under construction now for the Ministry of Finance.",
          ctaLabel: "View our project",
          ctaHref: "/#projects",
        }}
      />

      <div id="after" className="hb-after">
        <Ticker />
        <Intro /> 
        <Services />
        <Projects />
        <History /> 
        <Values />
        <Founder />
        <Care />
        <Careers />
        <Contact />
      </div>
    </>
  );
}