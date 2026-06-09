"use client";

import React, { useState } from "react";
import { X, Check, Clipboard, AlertCircle } from "lucide-react";
import { createProjectAction } from "@/lib/actions";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const roomOptions = [
    "Living Room",
    "Kitchen",
    "Master Bedroom",
    "Bathroom",
  ];

  const toggleRoom = (room: string) => {
    setSelectedRooms((prev) =>
      prev.includes(room)
        ? prev.filter((r) => r !== room)
        : [...prev, room]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !clientEmail) {
      setError("Project Name and Client Email are required.");
      return;
    }

    setIsPending(true);
    setError(null);

    const result = await createProjectAction({
      projectName,
      clientEmail,
      clientNotes,
      selectedRooms,
    });

    if (result.success && result.shareUrl) {
      // Provide absolute URL for copying
      const fullUrl = `${window.location.origin}${result.shareUrl}`;
      setShareUrl(fullUrl);
    } else {
      setError(result.error || "Failed to create project");
    }

    setIsPending(false);
  };

  const copyToClipboard = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      // Optional: Add a brief toast or indication that it was copied
    }
  };

  const resetAndClose = () => {
    setProjectName("");
    setClientEmail("");
    setClientNotes("");
    setSelectedRooms([]);
    setError(null);
    setShareUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-zinc-200 flex flex-col overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">Create New Project Link</h2>
          <button 
            onClick={resetAndClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <div className="flex flex-col gap-6 p-6 overflow-y-auto max-h-[80vh]">
          {error && (
            <div className="p-3 flex items-start gap-3 bg-red-50 text-red-700 rounded-xl border border-red-100">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {shareUrl ? (
            <div className="flex flex-col gap-4 text-center items-center py-6">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900">Project Created!</h3>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                Share this link with your client so they can upload photos and measurements.
              </p>
              <div className="flex w-full items-center gap-2 mt-4">
                <input 
                  type="text" 
                  readOnly 
                  value={shareUrl}
                  className="flex-1 border border-zinc-200 bg-zinc-50 rounded-xl px-4 py-3 text-sm text-zinc-600 outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-3 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors rounded-xl font-medium text-sm shadow-sm flex-shrink-0"
                >
                  <Clipboard className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
            </div>
          ) : (
            <form id="create-project-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Field 1: Project / Client Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1.5 uppercase">
                  Project / Client Name
                </label>
                <input 
                  type="text" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Milena Jovanovic - Flat 74"
                  required
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
                />
              </div>

              {/* Field 2: Client's Email Address */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1.5 uppercase">
                  Client&apos;s Email Address
                </label>
                <input 
                  type="email" 
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g., milena@email.com"
                  required
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm"
                />
              </div>

              {/* Field 3: Room Selection */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-0.5 uppercase">
                  Select Rooms to Include
                </label>
                <p className="text-sm text-zinc-500 mb-3">
                  Choose which spaces your client needs to measure and photograph.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {roomOptions.map((room) => {
                    const isSelected = selectedRooms.includes(room);
                    return (
                      <div 
                        key={room}
                        onClick={() => toggleRoom(room)}
                        className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer select-none ${
                          isSelected 
                            ? "border-zinc-900 bg-zinc-50 shadow-sm" 
                            : "border-zinc-200 hover:bg-zinc-50"
                        }`}
                      >
                        <div className={`flex items-center justify-center w-5 h-5 rounded-md border transition-colors ${
                          isSelected ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-300 bg-white"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </div>
                        <span className={`text-sm font-medium ${isSelected ? "text-zinc-900" : "text-zinc-700"}`}>
                          {room}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Field 4: Special Instructions */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 tracking-wide mb-1.5 uppercase">
                  Special Instructions for Client (Optional)
                </label>
                <textarea 
                  rows={3}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  placeholder="e.g., Please make sure to photograph the radiator pipes on the main wall..."
                  className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 transition-all shadow-sm resize-none"
                />
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200 bg-zinc-50">
          <button 
            onClick={resetAndClose}
            className="px-5 py-2.5 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900 transition-colors rounded-xl shadow-sm"
          >
            {shareUrl ? "Close" : "Cancel"}
          </button>
          {!shareUrl && (
            <button 
              type="submit"
              form="create-project-form"
              disabled={isPending}
              className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 transition-colors rounded-xl shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Generating..." : "Generate Intake Link"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
