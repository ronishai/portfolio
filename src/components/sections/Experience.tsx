import { AsciiMorphText } from '../ascii/AsciiMorphText';
import TerminalCard from '../ui/TerminalCard';

function Experience() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-pink-200 neon-glow mb-4">
        <AsciiMorphText
          text="Experience"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={70}
          scrambleSpeed={30}
          trailLength={4}
          startDelay={500}
          showCursor={false}
        />
      </h2>
      <TerminalCard title="roni@portfolio:~/experience/sysadmin">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-pink-300/20 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              IT Infrastructure & System Administrator
            </h3>
            <p className="text-pink-300 text-xs">Unit 8200, Israel Defense Forces</p>
          </div>
          <span className="text-xs text-neutral-400 mt-1 sm:mt-0">August 2024 - August 2026</span>
        </div>

        <ul className="space-y-3 text-sm text-neutral-300">
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Administered and supported mission-critical Microsoft enterprise infrastructure across
              Active Directory, Microsoft 365, Exchange, SCCM, and Intune.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Diagnosed and resolved complex infrastructure, network, and endpoint issues involving
              TCP/IP, DNS, DHCP, ARP, access controls, and system configurations.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Managed and optimized virtual machine environments, endpoint connectivity, and
              operational IT systems under tight, time-sensitive military requirements.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Maintained security-related settings, access management policies, and hardware
              diagnostics to maximize system uptime and operational availability.
            </span>
          </li>
        </ul>
      </TerminalCard>

      <TerminalCard title="roni@portfolio:~/experience/team-lead">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b border-pink-300/20 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">IT Team Lead</h3>
            <p className="text-pink-300 text-xs">Unit 8200, Israel Defense Forces</p>
          </div>
          <span className="text-xs text-neutral-400 mt-1 sm:mt-0">
            February 2025 - February 2026
          </span>
        </div>

        <ul className="space-y-3 text-sm text-neutral-300">
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Led a 4-person technical team responsible for day-to-day infrastructure support,
              network maintenance, endpoint management, and user issue resolution.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Prioritized incoming technical incidents, coordinated task assignments, managed
              escalations, and monitored problem resolution across operational workflows.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Worked directly with operational users to identify system friction points, inspiring
              the architectural design of full-stack technical solutions like{' '}
              <span className="text-pink-300">SwiftSupport</span>.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">$&gt;</span>
            <span>
              Awarded a <strong className="text-white">Certificate of Excellence</strong> for
              exceptional technical performance, leadership dedication, and system contributions.
            </span>
          </li>
        </ul>
      </TerminalCard>
    </section>
  );
}

export default Experience;
