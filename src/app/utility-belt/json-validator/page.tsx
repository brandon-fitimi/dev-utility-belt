'use client';

import { useState } from 'react';

export default function JsonValidator() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [formatted, setFormatted] = useState('');

  const validateAndFormat = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setFormatted(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setFormatted('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">JSON Validator</h1>
      <p className="text-gray-700 mb-8">
        Paste your JSON data below to validate and format it. Invalid JSON will be highlighted with an error message.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              validateAndFormat(e.target.value);
            }}
            className="w-full h-150 p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Paste your JSON here..."
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Formatted JSON
          </label>
          <div className="w-full h-150 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 overflow-auto">
            {error ? (
              <div className="text-red-600">{error}</div>
            ) : formatted ? (
              <pre className="whitespace-pre-wrap text-gray-800">{formatted}</pre>
            ) : (
              <div className="text-gray-500">Formatted JSON will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}