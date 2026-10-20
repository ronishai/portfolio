import TerminalCard from '../ui/TerminalCard';
import { AsciiMorphText } from '../ascii';
import { FaGithub, FaLink } from 'react-icons/fa';

export function Projects() {
  return (
    <section className="flex flex-col gap-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-pink-200 neon-glow mb-4">
        <AsciiMorphText
          text="Projects"
          revealMode="type"
          charset="@#$%&*+-01"
          typeSpeed={70}
          scrambleSpeed={30}
          trailLength={4}
          startDelay={500}
          showCursor={false}
        />
      </h2>

      <TerminalCard title="roni@portfolio:~/projects/skylens">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 border-b border-pink-300/20 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">SkyLens</h3>
            <p className="text-pink-300 text-xs">TypeScript, React, NestJS, Nx</p>
          </div>
          <div>
            <span className="text-xs text-neutral-400 mt-1 sm:mt-0 font-mono">
              [Full-Stack App]
            </span>
            <div className="flex justify-around gap-2 mt-1 sm:mt-0">
              <a
                href="https://github.com/ronishai/skylens"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-pink-300 hover:text-pink-200 transition-colors p-2"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://ronishai.github.io/SkyLens/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website Link"
                className="text-pink-300 hover:text-pink-200 transition-colors p-2"
              >
                <FaLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-300 mb-4">
          <span className="text-pink-300">$&gt;</span> Built and published a full-stack application
          that evaluates stargazing conditions for a selected location and date.
        </p>

        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Integrated SunCalc and Nominatim APIs to transform location and astronomical data into
              observing-condition ratings based on sun altitude, moon altitude, and moon
              illumination.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Implemented city search, manual coordinate input, date selection, and conditional
              night-planning reports.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Developed a responsive telescope-themed interface featuring animated backgrounds,
              pixel-art styling, and optimized media assets.
            </span>
          </li>
        </ul>
      </TerminalCard>

      <TerminalCard title="roni@portfolio:~/projects/swiftsupport">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 border-b border-pink-300/20 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">SwiftSupport</h3>
            <p className="text-pink-300 text-xs">TypeScript, React, NestJS, Nx, Firebase</p>
          </div>
          <div className="flex flex-col items-center gap-2 mt-1 sm:mt-0">
            <span className="text-xs text-neutral-400 mt-1 sm:mt-0 font-mono">
              [Ticketing System]
            </span>
            <a
              href="https://github.com/ronishai/swiftsupport"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-pink-300 hover:text-pink-200 transition-colors p-2"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>

        <p className="text-sm text-neutral-300 mb-4">
          <span className="text-pink-300">$&gt;</span> Developed a full-stack ticketing system
          directly inspired by real IT support workflows and operational team requirements from my
          military service.
        </p>

        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Built end-to-end workflows for support-request submission, issue status tracking, and
              structured technical task organization.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Designed the platform to improve visibility into open incidents, providing support
              teams with a streamlined and transparent tracking pipeline.
            </span>
          </li>
        </ul>
      </TerminalCard>

      <TerminalCard title="roni@portfolio:~/projects/task-manager-api">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 border-b border-pink-300/20 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Team Task Manager API</h3>
            <p className="text-pink-300 text-xs">C#, ASP.NET Core, .NET, MSSQL</p>
          </div>
          <span className="text-xs text-neutral-400 mt-1 sm:mt-0 font-mono">
            [Backend REST API]
          </span>
        </div>

        <p className="text-sm text-neutral-300 mb-4">
          <span className="text-pink-300">$&gt;</span> Developing a robust task management REST API
          handling users, projects, and tasks with comprehensive data handling.
        </p>

        <ul className="space-y-2 text-sm text-neutral-300">
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Implemented full CRUD operations, task assignment workflows, status tracking, and
              filtered query execution.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-pink-300 mr-2">▪</span>
            <span>
              Leveraged ASP.NET Core, dependency injection, and a clean layered
              controller/service/repository architecture.
            </span>
          </li>
        </ul>
      </TerminalCard>
    </section>
  );
}
