"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeModalProps {
  checkInCode: string;
  eventTitle: string;
}

export default function QRCodeModal({ checkInCode, eventTitle }: QRCodeModalProps) {
  const [open, setOpen] = useState(false);
  const checkInUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/checkin/${checkInCode}`;

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex items-center gap-1.5 text-xs font-medium text-google-blue hover:text-blue-600 transition-colors bg-google-blue/5 px-2.5 py-1.5 rounded-lg"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
        QR Code
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-google-dark mb-1">
                {eventTitle}
              </h3>
              <p className="text-sm text-google-gray mb-6">
                Scan to check in
              </p>

              <div className="inline-block p-4 bg-white rounded-2xl border border-google-border">
                <QRCodeSVG
                  value={checkInUrl}
                  size={200}
                  level="M"
                  bgColor="#FFFFFF"
                  fgColor="#202124"
                  includeMargin={false}
                />
              </div>

              <p className="text-xs text-google-gray mt-4 break-all">
                {checkInUrl}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(checkInUrl);
                  }}
                  className="flex-1 text-google-blue border border-google-blue/20 px-4 py-2 rounded-xl text-sm font-medium hover:bg-google-blue/5 transition-colors"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 bg-google-dark text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
