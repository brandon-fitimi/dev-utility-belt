import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Dev Utility Belt
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your all-in-one toolkit for common development tasks. Fast, reliable, and easy to use.
          </p>
          <Link
            href="/utility-belt"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Open Utility Belt
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Available Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "JSON Validator",
                description: "Validate and format JSON data with ease",
                icon: "🔍"
              },
              {
                title: "Unix Time Converter",
                description: "Convert between Unix timestamps and human-readable dates",
                icon: "⏰"
              },
              {
                title: "Base64 Encoder",
                description: "Encode and decode Base64 strings",
                icon: "🔐"
              },
              {
                title: "Regex Checker",
                description: "Test and validate regular expressions",
                icon: "✨"
              },
              {
                title: "JSON to YAML",
                description: "Convert JSON data to YAML format",
                icon: "🔄"
              }
            ].map((tool, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
