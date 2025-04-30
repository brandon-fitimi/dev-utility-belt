'use client';

import { useState } from 'react';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const handleTransform = (text: string, mode: 'encode' | 'decode') => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(text));
      } else {
        setOutput(atob(text));
      }
    } catch (err) {
      setOutput('Invalid input for the selected mode');
    }
  };

  const handleCopy = async () => {
    if (output) {
      try {
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Base64 Encoder/Decoder</h1>
      <p className="text-gray-700 mb-8">
        Enter your text below to encode or decode it using Base64. Select the desired operation from the dropdown.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <div className="flex gap-2">
              <select
                value={mode}
                onChange={(e) => {
                  setMode(e.target.value as 'encode' | 'decode');
                  handleTransform(input, e.target.value as 'encode' | 'decode');
                }}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <option value="encode">Encode</option>
                <option value="decode">Decode</option>
              </select>
              <button
                onClick={handleClear}
                disabled={!input}
                className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTransform(e.target.value, mode);
            }}
            className="w-full h-150 p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder={`Enter text to ${mode}...`}
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}
            </label>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="w-full h-150 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap text-gray-800">{output}</pre>
            ) : (
              <div className="text-gray-500">
                {mode === 'encode' ? 'Base64 encoded text will appear here...' : 'Decoded text will appear here...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}