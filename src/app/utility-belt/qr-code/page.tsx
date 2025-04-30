'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';

export default function QRCodeGenerator() {
  const [input, setInput] = useState('');

  const handleDownload = async () => {
    const qrCodeElement = document.getElementById('qr-code');
    if (qrCodeElement) {
      try {
        const dataUrl = await toPng(qrCodeElement);
        const link = document.createElement('a');
        link.download = 'qr-code.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating QR code image:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>

      <div className="max-w-md space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-700">
            Enter text or URL
          </label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter text or URL to generate QR code"
          />
        </div>

        {input && (
          <div className="space-y-4">
            <div id="qr-code" className="flex justify-center p-4 bg-white rounded-lg">
              <QRCodeSVG value={input} size={256} />
            </div>

            <button
              onClick={handleDownload}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
}