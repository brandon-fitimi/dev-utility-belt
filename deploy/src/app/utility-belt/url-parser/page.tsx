'use client';

import { useState } from 'react';

export default function UrlParser() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [parsedUrl, setParsedUrl] = useState<{
    protocol: string;
    host: string;
    path: string;
    query: string;
    queryParams: Record<string, string>;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const parseUrl = (urlString: string) => {
    try {
      const urlObj = new URL(urlString);
      const queryParams: Record<string, string> = {};
      urlObj.searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      setParsedUrl({
        protocol: urlObj.protocol,
        host: urlObj.host,
        path: urlObj.pathname,
        query: urlObj.search,
        queryParams,
      });
      setError(null);
    } catch (err) {
      setError('Invalid URL format');
      setParsedUrl(null);
    }
  };

  const handleClear = () => {
    setUrl('');
    setParsedUrl(null);
    setError(null);
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderOutputField = (label: string, value: string, fieldName: string) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          onClick={() => handleCopy(value, fieldName)}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
        >
          {copiedField === fieldName ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 overflow-auto">
        {value}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">URL Parser</h1>
      <p className="text-gray-700 mb-8">
        Enter a URL below to parse its components. The parser will extract the protocol, host, path, query string, and query parameters.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <button
              onClick={handleClear}
              disabled={!url}
              className="px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              parseUrl(e.target.value);
            }}
            className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder="Enter URL here..."
          />
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Parsed URL Components
            </label>
          </div>
          <div className="space-y-4">
            {error ? (
              <div className="text-red-600">{error}</div>
            ) : parsedUrl ? (
              <>
                {renderOutputField('Protocol', parsedUrl.protocol, 'protocol')}
                {renderOutputField('Host', parsedUrl.host, 'host')}
                {renderOutputField('Path', parsedUrl.path, 'path')}
                {renderOutputField('Query String', parsedUrl.query, 'query')}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Query Parameters
                    </label>
                    <button
                      onClick={() => handleCopy(JSON.stringify(parsedUrl.queryParams, null, 2), 'queryParams')}
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                    >
                      {copiedField === 'queryParams' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 overflow-auto">
                    <pre className="whitespace-pre-wrap text-gray-800">
                      {JSON.stringify(parsedUrl.queryParams, null, 2)}
                    </pre>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-gray-500">Parsed URL components will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}