export default function UtilityBeltPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Dev Utility Belt</h1>
      <p className="text-gray-700 mb-8">
        Select a tool from the sidebar to get started. Each tool is designed to help you with common development tasks.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "JSON Validator",
            description: "Validate and format your JSON data with real-time feedback",
          },
          {
            title: "Unix Time Converter",
            description: "Convert between Unix timestamps and human-readable dates",
          },
          {
            title: "Base64 Encoder",
            description: "Encode and decode Base64 strings with ease",
          },
          {
            title: "Regex Checker",
            description: "Test and validate your regular expressions in real-time",
          },
          {
            title: "JSON to YAML",
            description: "Convert JSON data to YAML format instantly",
          }
        ].map((tool, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
            <p className="text-gray-700">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}