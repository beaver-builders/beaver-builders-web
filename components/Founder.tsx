
import Brand from '@/components/Brand';
export default function Founder() {
  return (
    <section className="founder-wrap" aria-labelledby="founder-h">
  <div className="founder-card">

    {/* Header */}
    <header className="founder-header">

      <div className="founder-brand">
          <Brand onDark={false} />
        <img
          src="/brand/logo.png"
          alt="Beaver Builders"
        />
      </div>

      <address className="founder-address">
        H. Fushthulhaamage, 7th Floor<br />
        Ameeru Ahmed Magu, Malé 20030
      </address>

    </header>

    {/* Header divider */}
    <div className="founder-divider" />

    {/* Founder content */}
    <div className="founder">

      <div className="founder-heading">
        <h2 className="blocks sm" id="founder-h">
          <span>A message from</span>
          <span>the founder</span>
        </h2>
      </div>

      <div className="founder-content">

        <p className="founder-lead">
          In the spirit of the beaver’s unwavering dedication to each dam,
          we pledge to build with the utmost precision and care.
        </p>

        <p>
          Beaver Builders began with a vision, and we keep evolving: taking on
          new challenges and opportunities, and making sure every project is
          completed with integrity and excellence.
        </p>

        <p>
          Thank you for joining us on this journey. Together, we build the future.
        </p>

        <div className="founder-signature">
          <strong>Mushthaq Ibrahim</strong>
          <span>Founder, Beaver Builders</span>
        </div>

      </div>

    </div>

  </div>
</section>

  );
}
