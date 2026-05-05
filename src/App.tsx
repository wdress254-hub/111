/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode, ChangeEvent } from 'react';
import { 
  Cpu, 
  Monitor, 
  Database, 
  Terminal, 
  ShieldCheck, 
  RefreshCcw, 
  Github, 
  Save, 
  UserCircle,
  HardDrive,
  Activity,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HardwareProfile, DEFAULT_PROFILES } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'profiles' | 'spoof' | 'github'>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<HardwareProfile>(DEFAULT_PROFILES[0]);
  const [isSpoofing, setIsSpoofing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startSpoofing = () => {
    setIsSpoofing(true);
    setLogs([]);
    const lines = [
      `[PROCESS] Initializing GhostSpec Engine v4.2.0...`,
      `[AUTH] Bypassing user mode checks... SUCCESS`,
      `[KERNEL] Hooking Ntoskrnl.exe... SUCCESS`,
      `[SPOOF] Starting Hardware Identity Transformation...`,
      `[CPU] Rebranding: ${selectedProfile.cpu}`,
      `[GPU] Mapping VBIOS Table: ${selectedProfile.gpu}`,
      `[DISK] Serializing Drive Controllers: 0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
      `[NIC] Randomizing MAC Address: ${selectedProfile.mac}`,
      `[HWID] Generating unique footprint: ${selectedProfile.hwid}`,
      `[SUCCESS] Identity: ${selectedProfile.name} is now ACTIVE.`,
      `[ALERT] System is now invisible to standard trackers.`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setLogs(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsSpoofing(false), 2000);
      }
    }, 400);
  };

  return (
    <div className="flex h-screen bg-terminal-bg selection:bg-terminal-ink selection:text-black overflow-hidden font-sans">
      {/* Sidebar */}
      <div className="w-64 border-r border-terminal-border flex flex-col p-6 space-y-8 bg-black/50">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-terminal-ink rounded-lg shadow-[0_0_15px_rgba(0,255,65,0.3)]">
            <ShieldCheck className="w-6 h-6 text-black" />
          </div>
          <h1 className="text-xl font-bold tracking-tighter terminal-glow text-terminal-ink uppercase">GhostSpec</h1>
        </div>

        <nav className="flex-1 space-y-2">
          <NavButton 
            active={activeTab === 'profiles'} 
            onClick={() => setActiveTab('profiles')}
            icon={<UserCircle className="w-5 h-5" />}
            label="Hardware Profiles"
          />
          <NavButton 
            active={activeTab === 'spoof'} 
            onClick={() => setActiveTab('spoof')}
            icon={<Terminal className="w-5 h-5" />}
            label="Live Spoofing"
          />
          <NavButton 
            active={activeTab === 'github'} 
            onClick={() => setActiveTab('github')}
            icon={<Github className="w-5 h-5" />}
            label="GitHub & EXE"
          />
        </nav>

        <div className="pt-6 border-t border-terminal-border">
          <div className="flex items-center justify-between text-[10px] text-terminal-ink opacity-40 uppercase tracking-widest font-mono">
            <span>Status</span>
            <span className="flex items-center gap-1">
              <span className="w-1 h-1 bg-terminal-ink rounded-full animate-pulse" />
              Connected
            </span>
          </div>
          <div className="mt-2 text-[10px] text-terminal-ink opacity-40 font-mono">
            V4.2.0-STABLE
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'profiles' && (
            <motion.div 
              key="profiles"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 h-full overflow-y-auto"
            >
              <header className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Hardware Identities</h2>
                <p className="text-zinc-500 max-w-2xl">Select a pre-configured identity or create a custom one to spoof your system footprint for funny demonstrations.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {DEFAULT_PROFILES.map((profile) => (
                  <button 
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      selectedProfile.id === profile.id 
                        ? 'border-terminal-ink bg-terminal-ink/5' 
                        : 'border-terminal-border hover:border-zinc-700'
                    }`}
                  >
                    <h3 className={`font-bold mb-1 ${selectedProfile.id === profile.id ? 'text-terminal-ink' : 'text-white'}`}>
                      {profile.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono line-clamp-1">{profile.cpu}</p>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-400">
                    <Activity className="w-4 h-4" /> Core Specifications
                  </h4>
                  <div className="space-y-4">
                    <InfoInput 
                      label="Processor (CPU)" 
                      value={selectedProfile.cpu} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, cpu: e.target.value})}
                      icon={<Cpu className="w-4 h-4" />}
                    />
                    <InfoInput 
                      label="Graphics Card (GPU)" 
                      value={selectedProfile.gpu} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, gpu: e.target.value})}
                      icon={<Monitor className="w-4 h-4" />}
                    />
                    <InfoInput 
                      label="Memory (RAM)" 
                      value={selectedProfile.ram} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, ram: e.target.value})}
                      icon={<Database className="w-4 h-4" />}
                    />
                    <InfoInput 
                      label="Storage Controller" 
                      value={selectedProfile.disk} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, disk: e.target.value})}
                      icon={<HardDrive className="w-4 h-4" />}
                    />
                  </div>
                </section>

                <section className="space-y-6">
                  <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-400">
                    <ShieldCheck className="w-4 h-4" /> Hardware IDs
                  </h4>
                  <div className="space-y-4">
                    <InfoInput 
                      label="Motherboard SN" 
                      value={selectedProfile.motherboard} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, motherboard: e.target.value})}
                      icon={<Activity className="w-4 h-4" />}
                    />
                    <InfoInput 
                      label="MAC Address" 
                      value={selectedProfile.mac} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, mac: e.target.value})}
                      icon={<RefreshCcw className="w-4 h-4" />}
                    />
                    <InfoInput 
                      label="Hardware ID (HWID)" 
                      value={selectedProfile.hwid} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, hwid: e.target.value})}
                      icon={<Database className="w-4 h-4" />}
                    />
                    <InfoInput 
                      label="Operating System" 
                      value={selectedProfile.os} 
                      onChange={(e) => setSelectedProfile({...selectedProfile, os: e.target.value})}
                      icon={<ChevronRight className="w-4 h-4" />}
                    />
                  </div>
                </section>
              </div>

              <div className="mt-12 flex justify-end gap-4">
                <button className="px-6 py-2 border border-terminal-border rounded hover:bg-zinc-900 transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Profile
                </button>
                <button 
                  onClick={() => setActiveTab('spoof')}
                  className="terminal-button flex items-center gap-2"
                >
                  <RefreshCcw className={`w-4 h-4 ${isSpoofing ? 'animate-spin' : ''}`} />
                  Engage Spoofer
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'spoof' && (
            <motion.div 
              key="spoof"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Terminal Console</h2>
                {!isSpoofing && (
                  <button onClick={startSpoofing} className="terminal-button">
                    Run Identity Sync
                  </button>
                )}
              </div>

              <div className="flex-1 bg-black rounded-lg border border-zinc-800 p-6 font-mono text-sm overflow-hidden flex flex-col shadow-2xl">
                <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-2 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-[10px] uppercase tracking-widest">GhostSpec_Terminal_v4.2</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                  {logs.length === 0 && !isSpoofing && (
                    <div className="text-terminal-ink/30 animate-pulse">
                      Ready for instruction. Select "Run Identity Sync" to begin...
                    </div>
                  )}
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-terminal-ink/50 w-4">{i+1}</span>
                      <span className={log.includes('[SUCCESS]') ? 'text-terminal-ink font-bold' : log.includes('[ALERT]') ? 'text-yellow-500' : 'text-zinc-300'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
                
                {isSpoofing && (
                  <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-1 w-32 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-terminal-ink"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5 }}
                        />
                      </div>
                      <span className="text-xs text-terminal-ink uppercase tracking-wider animate-pulse">Processing...</span>
                    </div>
                    <span className="text-xs text-zinc-500">Kernel Hook Active</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'github' && (
            <motion.div 
              key="github"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="p-8 h-full overflow-y-auto"
            >
              <header className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Auto-Build & Terminal Dashboard</h2>
                <p className="text-zinc-500 max-w-2xl">This project is fully automated. When exported to GitHub, it builds a professional TUI (Terminal User Interface) dashboard similar to OPNsense or BIOS menus.</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-terminal-ink/10 border border-terminal-ink/30 rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Terminal className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-terminal-ink mb-4 flex items-center gap-2">
                       TUI EXE Dashboard
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                      Your generated EXE doesn't just run a script—it launches a full <b>Spectre.Console</b> dashboard with real-time progress bars, tables, and formatted status reports.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                      <span className="w-2 h-2 rounded-full bg-terminal-ink animate-pulse" /> Retro Terminal Aesthetic
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-white" /> Deployment Steps
                    </h3>
                    <ul className="space-y-3 text-xs text-zinc-500">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-terminal-ink shrink-0" />
                        <span>Go to <b>Settings &gt; Export to GitHub</b> to create your private repository.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-terminal-ink shrink-0" />
                        <span>The <b>GitHub Action</b> will automatically fetch dependencies and compile the TUI.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-terminal-ink shrink-0" />
                        <span>Download the artifact from the <b>Actions</b> tab of your repo.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="font-bold mb-4">Project Structure</h3>
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <ChevronRight className="w-3 h-3" /> .github/workflows/build.yml <span className="text-[9px] bg-zinc-800 px-1 rounded text-zinc-500">CI/CD</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <ChevronRight className="w-3 h-3" /> spoofer/Program.cs <span className="text-[9px] bg-zinc-800 px-1 rounded text-zinc-500">C# SOURCE</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <ChevronRight className="w-3 h-3" /> spoofer/GhostSpec.csproj <span className="text-[9px] bg-zinc-800 px-1 rounded text-zinc-500">CONFIG</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-panel p-6">
                    <h4 className="font-bold text-sm mb-2">Customizing the Build</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      You can edit the hardware strings directly in <code className="text-terminal-ink">spoofer/Program.cs</code>. Every time you commit and push a change to GitHub, a new EXE will be generated automatically.
                    </p>
                  </div>

                  <button 
                    onClick={() => window.open('https://github.com/features/actions', '_blank')}
                    className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
                  >
                    <div className="text-left">
                      <div className="font-bold text-sm">Advanced Driver Info</div>
                      <div className="text-[10px] text-zinc-500">Learn about IOCTL & Kernel Hooks</div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
        active 
          ? 'bg-terminal-ink text-black font-bold shadow-[0_0_15px_rgba(0,255,65,0.2)]' 
          : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
      }`}
    >
      {icon}
      <span className="text-sm uppercase tracking-wider">{label}</span>
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function InfoInput({ label, value, onChange, icon }: { label: string, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, icon: ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange}
        className="terminal-input w-full"
      />
    </div>
  );
}

function ResourceCard({ title, desc, url }: { title: string, desc: string, url: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-4 border border-terminal-border rounded-lg hover:border-zinc-700 hover:bg-zinc-900 transition-all group"
    >
      <h5 className="font-bold text-xs mb-1 flex items-center justify-between">
        {title} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h5>
      <p className="text-[10px] text-zinc-500">{desc}</p>
    </a>
  );
}
