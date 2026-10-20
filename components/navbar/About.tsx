import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="about-section">

      {/* ───────────────── Founder ───────────────── */}
      <section className="founder-section">
        <div className="about-container founder-grid">

          <div className="section-title-block">
            <h2>
              A MESSAGE FROM
              <br />
              THE FOUNDER
            </h2>
          </div>

          <div className="founder-message">
            <span className="founder-mark">▸▸</span>

            <p>
              In the spirit of the beaver&apos;s unwavering dedication to each
              dam, we pledge to build with the utmost precision and care.
            </p>

            <p>
              Beaver Builders began with a vision, and we keep evolving:
              taking on new challenges and opportunities and making sure every
              project is completed with integrity and excellence.
            </p>

            <p>
              Thank you for joining us on this journey. Together, we build
              the future.
            </p>

            <div className="founder-signature">
              <strong>MUSTHAQ IBRAHIM</strong>
              <span>FOUNDER, BEAVER BUILDERS</span>
            </div>
          </div>

        </div>
      </section>


      {/* ───────────────── We Care ───────────────── */}
      <section className="care-section" id="about">
        <div className="about-container">

          <div className="care-heading-row">
            <div className="section-title-block">
              <h2>
                WE
                <br />
                CARE
              </h2>
            </div>

            <p className="care-intro">
              We are committed to environmental stewardship and social
              inclusion: building in ways that leave a lasting footprint and
              improve the communities we work in better.
            </p>
          </div>

          <div className="care-grid">

            <div className="care-image">
              <Image
                src="/images/care.jpg"
                alt="Hands holding a young plant"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="care-list">

              <article className="care-item">
                <span className="care-icon">♧</span>
                <div>
                  <h3>SUSTAINABILITY</h3>
                  <p>
                    Our policies and site processes cut waste, favour clean
                    energy and use resources efficiently.
                  </p>
                </div>
              </article>

              <article className="care-item">
                <span className="care-icon">♿</span>
                <div>
                  <h3>PWD SUPPORT</h3>
                  <p>
                    We support persons with disabilities through the Maldives
                    Association of Disability, working for inclusion and
                    empowerment.
                  </p>
                </div>
              </article>

            </div>

          </div>

        </div>
      </section>


      {/* ───────────────── Careers ───────────────── */}
      <section className="team-section">
        <div className="about-container team-card">

          <div className="team-content">

            <div className="section-title-block section-title-light">
              <h2>
                JOIN
                <br />
                TEAM BEAVER
              </h2>
            </div>

            <p>
              Our core team brings qualified experience in construction,
              project management, engineering, logistics, trading and real
              estate. We keep adding to it with capable people who bring their
              own skills and energy.
            </p>

            <div className="team-tags">
              <span>SITE ENGINEERING</span>
              <span>PROJECT MANAGEMENT</span>
              <span>QUANTITY SURVEYING</span>
              <span>LOGISTICS</span>
              <span>PLANT OPERATIONS</span>
              <span>TECHNICAL TRADES</span>
            </div>

            <Link href="/careers" className="team-button">
              SEND US YOUR CV
            </Link>

          </div>

          <div className="team-image">
            <Image
              src="/images/team.jpg"
              alt="Beaver Builders construction team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

        </div>
      </section>


      {/* ───────────────── Contact ───────────────── */}
      <section className="reach-section" id="contact">

        <div className="about-container reach-card">

          <div className="reach-info">

            <div className="section-title-block">
              <h2>
                REACH US
                <br />
                TO BEGIN
              </h2>
            </div>

            <div className="contact-details">
              <p>
                Beaver Builders Pvt Ltd
                <br />
                H. Fusthulhaamaage, 7th Floor
                <br />
                Ameer Ahmed Magu
                <br />
                Malé 20380, Maldives
              </p>

              <a href="tel:+9607783777">
                +960 778 3777
              </a>

              <a href="mailto:info@beaver.mv">
                info@beaver.mv
              </a>
            </div>

          </div>


          <div className="quote-form">

            <h3>REQUEST A QUOTE</h3>

            <form action="/api/enquiry" method="POST">

              <div className="form-field">
                <label htmlFor="name">YOUR NAME</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-field">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">PHONE</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                  />
                </div>

              </div>

              <div className="form-field">
                <label htmlFor="service">SERVICE</label>
                <select id="service" name="service" defaultValue="">
                  <option value="" disabled>
                    Not sure yet
                  </option>
                  <option value="construction">
                    Construction
                  </option>
                  <option value="consultancy">
                    Consultancy
                  </option>
                  <option value="real-estate">
                    Real Estate
                  </option>
                  <option value="equipment">
                    Equipment & Supply
                  </option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="message">ABOUT THE PROJECT</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us briefly about your project..."
                />
              </div>

              <button type="submit" className="quote-submit">
                SEND ENQUIRY
              </button>

            </form>

          </div>

        </div>

      </section>

    </section>
  );
}