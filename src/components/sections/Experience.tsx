import { AsciiMorphText } from '../ascii/AsciiMorphText';

function About() {
  return (
    <section>
      <h2 className="text-3xl font-bold text-pink-200 neon-glow mb-4">
        <AsciiMorphText
          text="Experience"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={70}
          scrambleSpeed={30}
          trailLength={4}
          startDelay={500}
          showCursor
          cursorCharacter="_"
        />
      </h2>
      <div className="flex flex-col gap-6">
        <div className="glass-panel  sm:gap-8 p-4 sm:p-6">
          <h3 className="text-xl font-semibold text-pink-200 neon-glow mb-2">
            IT Infrastructure & Network Administrator
          </h3>
          <h4 className="text-lg font-medium text-pink-200 neon-glow mb-2">
            Unit 8200, Israel Defense Forces
          </h4>
          <p className="text-md text-pink-200 mb-2 neon-glow">August 2024 - August 2026</p>
          <p className="text-md text-pink-200">
            <b>System & Endpoint Management:</b> Supported endpoints, users, networks, virtual
            machines, and operational systems across Microsoft enterprise environments including
            Microsoft 365, Active Directory, Exchange, SCCM, and Intune in a time-sensitive military
            setting.
          </p>
          <p className="text-md text-pink-200">
            <b>Network & Security Operations:</b> Diagnosed and resolved complex network, system,
            and security-related issues involving TCP/IP, DNS, DHCP, ARP, access control, and
            endpoint configuration.
          </p>
          <p className="text-md text-pink-200">
            <b>Maintenance & Support:</b> Performed hardware diagnostics, endpoint maintenance, and
            technical troubleshooting to restore service availability and maintain system
            performance.
          </p>
          <p className="text-md text-pink-200">
            <b>User-Focused Solutions:</b> Worked directly with operational users and requirements,
            developing practical troubleshooting workflows that inspired full-stack technical
            projects
          </p>
        </div>
        <div className="glass-panel sm:gap-8 p-4 sm:p-6">
          <h3 className="text-xl font-semibold text-pink-200 neon-glow mb-2">IT Team Lead</h3>
          <h4 className="text-lg font-medium text-pink-200 neon-glow mb-2">
            Unit 8200, Israel Defense Forces
          </h4>
          <p className="text-md text-pink-200 mb-2 neon-glow">February 2025 - February 2026</p>
          <p className="text-md text-pink-200">
            <b>Operational Leadership:</b> Led a 4-person technical team responsible for network
            support, endpoint maintenance, user support, hardware diagnostics, and daily IT
            operations.
          </p>
          <p className="text-md text-pink-200">
            <b>Workflow & Incident Prioritization:</b> Prioritized incoming technical issues,
            coordinated daily support tasks, assigned work, and ensured timely incident resolution
            across the unit.
          </p>
          <p className="text-md text-pink-200">
            <b>Recognition:</b> Awarded a Certificate of Excellence for performance, dedication, and
            technical contribution.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
