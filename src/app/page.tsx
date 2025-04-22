import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600/90 backdrop-blur-sm mb-8">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Hero Content */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Essential tools for developers
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Get access to 10+ tools including diff viewer, JSON validator, unix time converter, regex matcher, character counter, and more.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center px-6 py-3 bg-indigo-600/90 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-indigo-700/90 transition-colors"
          >
            Take me to the tools
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Tool Preview Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-[#1C1E24]/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[600px]">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-[#15171B]/95 backdrop-blur-sm border-r border-gray-800/50">
              <nav className="py-4">
                {[
                  "JSON Validator",
                  "String Converter",
                  "Character/Word Counter",
                  "Unix Time Converter",
                  "Base64 Encoder",
                  "URI Parser",
                  "Color Converter",
                  "Hash Generator",
                  "Link Sort And Dedupe",
                  "Regex Checker",
                  "Diff Viewer"
                ].map((tool, index) => (
                  <button
                    key={index}
                    className={`w-full px-4 py-2 text-sm text-left ${
                      index === 0
                        ? 'bg-[#1C1E24]/90 backdrop-blur-sm text-white'
                        : 'text-gray-400 hover:bg-[#1C1E24]/80 hover:text-white'
                    } transition-colors duration-150`}
                  >
                    {tool}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-4 bg-[#1C1E24]/90 backdrop-blur-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-400">Input:</div>
                <button className="px-3 py-1 text-sm bg-[#15171B]/90 backdrop-blur-sm text-gray-400 rounded hover:text-white transition-colors">
                  Clear
                </button>
              </div>
              <div className="h-[500px] rounded-lg bg-[#15171B]/95 backdrop-blur-sm p-4 border border-gray-800/50">
                <pre className="font-mono text-sm text-gray-300">
                  {`{
  "name": "example",
  "version": "1.0.0",
  "description": "Sample JSON"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-sm text-indigo-400 font-medium tracking-wide uppercase mb-4">
          All your essential tools in one place
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-white">
          Did we mention Dev Utility Belt is free to use and open source?
        </h2>
        <div className="flex justify-center gap-8">
          {[
            { icon: '📦', label: 'Install' },
            { icon: '⭐', label: 'Star' },
            { icon: '🔧', label: 'Configure' }
          ].map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-[#15171B]/90 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-800/50"
            >
              <span className="text-2xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
