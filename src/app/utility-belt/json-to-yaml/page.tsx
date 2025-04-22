'use client';

import { useState } from 'react';
import * as yaml from 'js-yaml';

export default function JsonYamlConverter() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [formatted, setFormatted] = useState('');
  const [copied, setCopied] = useState(false);
  const [inputFormat, setInputFormat] = useState<'json' | 'yaml'>('json');

  const convert = (inputString: string) => {
    try {
      if (inputFormat === 'json') {
        // Convert JSON to YAML
        const parsed = JSON.parse(inputString);
        setFormatted(yaml.dump(parsed));
      } else {
        // Convert YAML to JSON
        const parsed = yaml.load(inputString);
        setFormatted(JSON.stringify(parsed, null, 2));
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
      setFormatted('');
    }
  };

  const handleCopy = async () => {
    if (formatted) {
      try {
        await navigator.clipboard.writeText(formatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleClear = () => {
    setInput('');
    setFormatted('');
    setError(null);
  };

  const toggleFormat = () => {
    setInputFormat(inputFormat === 'json' ? 'yaml' : 'json');
    setInput('');
    setFormatted('');
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">JSON/YAML Converter</h1>
      <p className="text-gray-700 mb-8">
        Convert between JSON and YAML formats. Paste your data below and select the input format.
      </p>

      <div className="mb-4">
        <button
          onClick={toggleFormat}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
        >
          Switch to {inputFormat === 'json' ? 'YAML' : 'JSON'} Input
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Input {inputFormat.toUpperCase()}
            </label>
            <button
              onClick={handleClear}
              disabled={!input}
              className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              convert(e.target.value);
            }}
            className="w-full h-150 p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Converted {inputFormat === 'json' ? 'YAML' : 'JSON'}
            </label>
            <button
              onClick={handleCopy}
              disabled={!formatted}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="w-full h-150 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 overflow-auto">
            {error ? (
              <div className="text-red-600">{error}</div>
            ) : formatted ? (
              <pre className="whitespace-pre-wrap text-gray-800">{formatted}</pre>
            ) : (
              <div className="text-gray-500">
                Converted {inputFormat === 'json' ? 'YAML' : 'JSON'} will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}