import React, { useState, useEffect } from 'react';
import { Camera, Plus, X, Maximize2, Sparkles, Image as ImageIcon, Link as LinkIcon, Check, Download } from 'lucide-react';
import { INITIAL_GALLERY, GalleryPhoto } from '../data/portfolioData';

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // New photo form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Poster' | 'Portrait' | 'Concept' | 'Community'>('Portrait');
  const [newSrc, setNewSrc] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shreyas_portfolio_gallery');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_GALLERY.length) {
          setPhotos(parsed);
        }
      }
    } catch {
      // fallback
    }
  }, []);

  const savePhotos = (updated: GalleryPhoto[]) => {
    setPhotos(updated);
    try {
      localStorage.setItem('shreyas_portfolio_gallery', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopyLink = (src: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const fullUrl = window.location.origin + src;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(src);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSrc.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'Community Showcase',
      src: newSrc.trim(),
      category: newCategory,
      description: newDescription.trim() || 'Added to Shreyas Chaturvedi gallery.',
      aspectRatio: '4:3',
    };

    const updated = [newPhoto, ...photos];
    savePhotos(updated);
    setShowAddModal(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewSrc('');
    setNewDescription('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['All', 'Poster', 'Portrait', 'Concept'];
  const filteredPhotos = filter === 'All' ? photos : photos.filter((p) => p.category === filter);

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>High-Resolution Photo Archive</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-400 to-cyan-400 gold-text-glow">
            Photograph Gallery
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto mt-4 mb-6" />

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Direct showcase of all uploaded photographs and styled concepts. Every photograph link is generated and directly copyable.
          </p>
        </div>

        {/* Direct Photo Links Bar */}
        <div className="p-4 rounded-2xl bg-black border border-amber-500/30 mb-10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-amber-400 font-semibold">
            <LinkIcon className="w-4 h-4 text-amber-400" />
            <span>Generated Direct Photo Links:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { name: 'Opening Poster', src: '/shreyas-opening-poster.png' },
              { name: 'Cinematic Dhurandhar', src: '/shreyas-cinematic-portrait.png' },
              { name: 'Original Portrait', src: '/shreyas-original-portrait.png' },
              { name: 'Hair Concept', src: '/shreyas-hairstyle-edited-concept.png' },
            ].map((item) => (
              <button
                key={item.src}
                onClick={(e) => handleCopyLink(item.src, e)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-mono text-[11px]"
              >
                {copiedLink === item.src ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-3 h-3 text-cyan-400" />
                    <span>{item.name}</span>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar & Add Photo Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase font-medium tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-md shadow-pink-500/30'
                    : 'bg-zinc-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add More Photos</span>
          </button>
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => {
            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-black border border-slate-800/80 hover:border-amber-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 flex items-center justify-center p-2">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to Enlarge</span>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono uppercase tracking-wider text-amber-400">
                    {photo.category}
                  </div>
                </div>

                {/* Caption Card with Copy Link Button */}
                <div className="p-4 bg-zinc-950 border-t border-slate-800/80 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-1 line-clamp-2">
                      {photo.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between">
                    <button
                      onClick={(e) => handleCopyLink(photo.src, e)}
                      className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                    >
                      {copiedLink === photo.src ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-3 h-3" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={photo.src}
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded text-slate-400 hover:text-amber-400"
                      title="Download image"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl bg-zinc-950 border border-amber-500/40 p-4 sm:p-6 overflow-hidden flex flex-col md:flex-row gap-6 shadow-2xl shadow-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 border border-slate-700 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Display */}
              <div className="md:w-3/5 flex items-center justify-center bg-black/80 rounded-xl p-2 max-h-[60vh] md:max-h-[75vh] overflow-hidden border border-slate-800">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Details Pane */}
              <div className="md:w-2/5 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-3">
                    {selectedPhoto.category} Showcase
                  </div>

                  <h3 className="font-cinzel text-2xl font-bold text-slate-100 mb-1">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-400 mb-4 font-mono">
                    {selectedPhoto.subtitle}
                  </p>

                  <div className="p-4 rounded-xl bg-black/50 border border-slate-800/80 mb-4">
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  </div>

                  {selectedPhoto.category === 'Concept' && (
                    <div className="p-3 rounded-lg bg-pink-950/20 border border-pink-500/30 text-[11px] text-pink-300 leading-relaxed font-light">
                      <strong>Note:</strong> Exploratory aesthetic concept respecting Shreyas's original facial identity and features.
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleCopyLink(selectedPhoto.src)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    {copiedLink === selectedPhoto.src ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>Copy Direct Link</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Photograph Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-black">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-cinzel text-lg font-bold text-slate-100">Add New Photograph</h3>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Photograph Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Science Fair Presentation"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Subtitle / Context
                  </label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="e.g. Lab Session Prototype"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Portrait">Portrait</option>
                    <option value="Poster">Poster</option>
                    <option value="Concept">Concept</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Image Source (URL or Upload File) *
                  </label>
                  <input
                    type="text"
                    value={newSrc}
                    onChange={(e) => setNewSrc(e.target.value)}
                    placeholder="Enter image URL or select file below"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Brief description of the photo..."
                    className="w-full px-3.5 py-2 rounded-xl bg-black border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:opacity-95"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
