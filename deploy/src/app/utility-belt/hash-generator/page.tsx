'use client';

import { useState } from 'react';
import { MD5, SHA1, SHA224, SHA256, SHA512 } from 'crypto-js';
import keccak256 from 'keccak256';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = async (hash: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(name);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const hashes = {
    md5: MD5(input).toString(),
    sha1: SHA1(input).toString(),
    sha224: SHA224(input).toString(),
    sha256: SHA256(input).toString(),
    sha512: SHA512(input).toString(),
    keccak256: keccak256(input).toString('hex')
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Hash Generator</h1>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="input" className="block text-sm font-medium text-gray-700">
            Input Text
          </label>
          <button
            onClick={() => setInput('')}
            className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter text to hash..."
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Generated Hashes</h2>
        <div className="grid gap-4">
          {Object.entries(hashes).map(([name, hash]) => (
            <div key={name} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 uppercase">{name}</span>
                <button
                  onClick={() => handleCopy(hash, name)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {copiedHash === name ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="font-mono text-sm break-all">{hash}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}