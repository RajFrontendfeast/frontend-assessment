import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Sparkles, Building2, User, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { bioSound } from '../utils/sound';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAssetCode?: string;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  defaultAssetCode = '',
}) => {
  useBodyScrollLock(isOpen);

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    organization: '',
    partnerType: 'Biopharma / Commercial Co-Dev',
    therapeuticInterest: defaultAssetCode ? `Specific Asset: ${defaultAssetCode}` : 'Oncology & Chromatin Editing',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.workEmail.trim() || !formData.organization.trim()) {
      setErrorMessage('Please complete all required fields.');
      bioSound.playClick(300);
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    bioSound.playClick(600);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      bioSound.playSynthesisSuccess();

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#06B6D4', '#8B5CF6', '#F59E0B'],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      workEmail: '',
      organization: '',
      partnerType: 'Biopharma / Commercial Co-Dev',
      therapeuticInterest: 'Oncology & Chromatin Editing',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain bg-slate-900/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 z-10 text-slate-900"
        >
          {/* Close button */}
          <button
            id="btn-close-partner-modal"
            onClick={() => {
              bioSound.playClick(400);
              onClose();
            }}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold mb-2 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>BIOPHARMA & ACADEMIC ALLIANCES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                  Initiate Strategic Partnership
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Connect with our Business Development and Computational Biology teams to explore pipeline licensing, co-development, or custom target discovery campaigns.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Elena Thorne"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-600" />
                      Institutional / Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="thorne@institution.org"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-violet-600" />
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Genentech / Stanford Medicine"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                      Partnership Model
                    </label>
                    <select
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                    >
                      <option value="Biopharma / Commercial Co-Dev">Biopharma Commercial Co-Development</option>
                      <option value="Clinical Asset Licensing">Asset Licensing / Regional Rights</option>
                      <option value="De Novo Target Discovery Service">De Novo Protein Design Bio-Foundry</option>
                      <option value="Academic Research Consortium">Academic Research Consortium</option>
                      <option value="Investigator-Initiated Trial">Investigator-Initiated Trial (IIT)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5">
                    Area of Primary Scientific Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. KRAS G12D Epigenetics or De Novo Tau Binder"
                    value={formData.therapeuticInterest}
                    onChange={(e) => setFormData({ ...formData, therapeuticInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                    Project Scope / Specific Target Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide context regarding biological target, preferred modality, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white text-sm resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono tracking-wider flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT ALLIANCE DOSSIER</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Partnership Inquiry Dispatched
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-emerald-800">{formData.fullName}</strong>. A confidential NDA and technical dossier regarding <strong className="text-slate-900">{formData.organization}</strong> has been routed to our Chief Scientific Officer.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 max-w-sm mx-auto">
                Reference ID: <span className="text-emerald-800 font-bold">SYNTH-ALLIANCE-2026-X994</span>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold tracking-wider"
                >
                  RETURN TO PLATFORM
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
