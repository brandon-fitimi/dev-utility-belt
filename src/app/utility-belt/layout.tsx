'use client';

import Link from 'next/link';

const tools = [
  { name: 'JSON Validator', path: '/utility-belt/json-validator' },
  { name: 'Unix Time Converter', path: '/utility-belt/unix-time' },
  { name: 'Base64 Encoder', path: '/utility-belt/base64' },
  { name: 'Regex Checker', path: '/utility-belt/regex' },
  { name: 'JSON to YAML', path: '/utility-belt/json-to-yaml' },
];

export default function UtilityBeltLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="mb-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Dev Utility Belt
          </Link>
        </div>
        <nav>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.path}>
                <Link
                  href={tool.path}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}