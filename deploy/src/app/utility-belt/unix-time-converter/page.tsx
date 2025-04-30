'use client';

import { useState, useEffect } from 'react';

export default function UnixTimeConverter() {
  const [unixTime, setUnixTime] = useState('');
  const [localTime, setLocalTime] = useState<string | null>(null);
  const [utcTime, setUtcTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [localCopied, setLocalCopied] = useState(false);
  const [utcCopied, setUtcCopied] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const convertUnixTime = (timestamp: string) => {
    try {
      const num = parseInt(timestamp);
      if (isNaN(num)) {
        throw new Error('Please enter a valid number');
      }

      const date = new Date(num * 1000);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid Unix timestamp');
      }

      setLocalTime(formatDate(date));
      setUtcTime(formatDate(new Date(date.toUTCString())));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid input');
      setLocalTime(null);
      setUtcTime(null);
    }
  };

  const handleClear = () => {
    setUnixTime('');
    setLocalTime(null);
    setUtcTime(null);
    setError(null);
  };

  const handleNow = () => {
    const currentUnixTime = Math.floor(Date.now() / 1000).toString();
    setUnixTime(currentUnixTime);
    convertUnixTime(currentUnixTime);
  };

  const handleCopy = async (text: string, setCopied: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Unix Time Converter</h1>
      <p className="text-gray-700 mb-8">
        Enter a Unix timestamp (seconds since January 1, 1970) to convert it to local and UTC time.
      </p>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Unix Timestamp
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleNow}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                Now
              </button>
              <button
                onClick={handleClear}
                disabled={!unixTime}
                className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </div>
          <input
            type="text"
            value={unixTime}
            onChange={(e) => {
              setUnixTime(e.target.value);
              convertUnixTime(e.target.value);
            }}
            className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Enter Unix timestamp..."
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Local Time
                </label>
                <button
                  onClick={() => localTime && handleCopy(localTime, setLocalCopied)}
                  disabled={!localTime}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {localCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50">
                {error ? (
                  <div className="text-red-600">{error}</div>
                ) : localTime ? (
                  <div className="text-gray-800">{localTime}</div>
                ) : (
                  <div className="text-gray-500">Local time will appear here...</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  UTC Time
                </label>
                <button
                  onClick={() => utcTime && handleCopy(utcTime, setUtcCopied)}
                  disabled={!utcTime}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {utcCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50">
                {error ? (
                  <div className="text-red-600">{error}</div>
                ) : utcTime ? (
                  <div className="text-gray-800">{utcTime}</div>
                ) : (
                  <div className="text-gray-500">UTC time will appear here...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}