import { useState, useEffect, useRef } from 'react';
import TerminalCard from '../ui/TerminalCard';
import { AsciiMorphText } from '../ascii';

function SkillsTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const skillsJson = [
    '{',
    '  "languages": [',
    '    "JavaScript",',
    '    "TypeScript",',
    '    "C#",',
    '    "SQL"',
    '  ],',
    '  "frameworks_tools": [',
    '    "React",',
    '    "Node.js",',
    '    "NestJS",',
    '    ".NET",',
    '    "ASP.NET Core",',
    '    "Nx",',
    '    "Git",',
    '    "Firebase",',
    '    "Docker"',
    '  ],',
    '  "it_security": [',
    '    "Active Directory",',
    '    "Microsoft 365",',
    '    "Exchange",',
    '    "SCCM",',
    '    "Intune",',
    '    "TCP/IP",',
    '    "DNS",',
    '    "DHCP",',
    '    "Virtualization",',
    '    "Network Security",',
    '    "Endpoint Management",',
    '    "System Administration"',
    '  ]',
    '}',
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && currentLine < skillsJson.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, skillsJson.length, isVisible]);

  return (
    <div ref={terminalRef} className="w-full">
      <TerminalCard title="roni@portfolio:~/skills">
        <div className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed overflow-x-auto">
          <p className="text-pink-300 mb-2 focus:outline-none cursor-pointer block border-b border-pink-300/20 pb-3">
            $&gt; cat skills.json
          </p>

          <div className="text-pink-200/90 flex flex-col space-y-1">
            {skillsJson.slice(0, currentLine).map((line, index) => (
              <div>
                <AsciiMorphText
                  key={index}
                  text={line}
                  revealMode="type"
                  charset="@#$%&*+-01"
                  typeSpeed={50}
                  scrambleSpeed={20}
                  trailLength={3}
                  startDelay={0}
                  showCursor={false}
                />
              </div>
            ))}
          </div>
        </div>
      </TerminalCard>
    </div>
  );
}

export default SkillsTerminal;
