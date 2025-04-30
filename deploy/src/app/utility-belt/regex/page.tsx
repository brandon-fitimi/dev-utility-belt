'use client';

import { useState } from 'react';

export default function RegexChecker() {
  const [regex, setRegex] = useState('');
  const [text, setText] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const testRegex = (pattern: string, inputText: string) => {
    try {
      const regexObj = new RegExp(pattern, 'g');
      const result = inputText.match(regexObj);
      setMatches(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regular expression');
      setMatches(null);
    }
  };

  const handleCopy = async () => {
    if (matches) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(matches, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleClear = () => {
    setRegex('');
    setText('');
    setMatches(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Regex Checker</h1>
      <p className="text-gray-700 mb-8">
        Enter a regular expression and test text to see the matches. Invalid regex patterns will be highlighted with an error message.
      </p>

      <div className="space-y-6">
        {/* Regex Input */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Regular Expression
            </label>
            <button
              onClick={handleClear}
              disabled={!regex && !text}
              className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
          </div>
          <input
            type="text"
            value={regex}
            onChange={(e) => {
              setRegex(e.target.value);
              testRegex(e.target.value, text);
            }}
            className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Enter your regular expression..."
          />
        </div>

        {/* Test Text Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Test Text
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              testRegex(regex, e.target.value);
            }}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Enter text to test against the regex..."
          />
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Matches
            </label>
            <button
              onClick={handleCopy}
              disabled={!matches}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="w-full h-32 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 overflow-auto">
            {error ? (
              <div className="text-red-600">{error}</div>
            ) : matches ? (
              <pre className="whitespace-pre-wrap text-gray-800">
                {JSON.stringify(matches, null, 2)}
              </pre>
            ) : (
              <div className="text-gray-500">Matches will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}