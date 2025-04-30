'use client';

import { useState } from 'react';
import { diffLines, Change } from 'diff';

export default function DiffView() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const differences = diffLines(text1, text2);
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');

  // Create a mapping of line numbers to changes
  const lineChanges = new Map<number, { type: 'added' | 'removed' | 'unchanged', line1?: string, line2?: string }>();
  let lineNumber = 0;
  let line1Index = 0;
  let line2Index = 0;

  differences.forEach((part) => {
    const lines = part.value.split('\n');
    lines.forEach((line, i) => {
      if (i < lines.length - 1 || (i === lines.length - 1 && line)) {
        if (part.added) {
          lineChanges.set(lineNumber, { type: 'added', line2: line });
          line2Index++;
        } else if (part.removed) {
          lineChanges.set(lineNumber, { type: 'removed', line1: line });
          line1Index++;
        } else {
          lineChanges.set(lineNumber, { type: 'unchanged', line1: line, line2: line });
          line1Index++;
          line2Index++;
        }
        lineNumber++;
      }
    });
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Diff View</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="text1" className="block text-sm font-medium text-gray-700 mb-2">
            First Text
          </label>
          <textarea
            id="text1"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter first text here..."
          />
        </div>

        <div>
          <label htmlFor="text2" className="block text-sm font-medium text-gray-700 mb-2">
            Second Text
          </label>
          <textarea
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter second text here..."
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Differences</h2>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-12 px-2 py-1 text-left text-xs font-medium text-gray-500">Line</th>
                <th className="w-1/2 px-2 py-1 text-left text-xs font-medium text-gray-500">Original</th>
                <th className="w-1/2 px-2 py-1 text-left text-xs font-medium text-gray-500">Modified</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {Array.from(lineChanges.entries()).map(([lineNumber, change]) => (
                <tr key={lineNumber} className="border-t border-gray-200">
                  <td className="px-2 py-1 text-gray-500">{lineNumber + 1}</td>
                  <td className={`px-2 py-1 ${change.type === 'removed' ? 'bg-red-100' : ''}`}>
                    {change.line1}
                  </td>
                  <td className={`px-2 py-1 ${change.type === 'added' ? 'bg-green-100' : ''}`}>
                    {change.line2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}