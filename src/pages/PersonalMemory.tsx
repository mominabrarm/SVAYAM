import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MemoryCategory, PersonalMemory } from '../types/memory';
import { 
  Brain, 
  Plus, 
  Trash2, 
  Calendar, 
  Tag, 
  Search, 
  Mic, 
  CheckCircle2, 
  Clock, 
  Download, 
  X,
  FileText
} from 'lucide-react';

export const PersonalMemoryPage: React.FC = () => {
  const { memories, addMemory, deleteMemory, updateMemory, clearAllData } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryCategory>('commitment');
  const [newEventDate, setNewEventDate] = useState('');
  const [newTags, setNewTags] = useState('');

  const filteredMemories = memories.filter(m => {
    const matchesCat = filterCategory === 'all' || m.category === filterCategory;
    const matchesQuery = !searchQuery.trim() || 
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    addMemory({
      content: newContent.trim(),
      category: newCategory,
      eventDate: newEventDate || undefined,
      tags: newTags ? newTags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
      status: 'upcoming'
    });

    setNewContent('');
    setNewEventDate('');
    setNewTags('');
    setIsModalOpen(false);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(memories, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `svayam_memories_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Brain className="w-6 h-6 text-svayam-violet-light" />
            <span>Personal Memory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Your remembered context, reflections, commitments and habits. Stored locally in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3 py-2 rounded-lg bg-surface-100 hover:bg-surface-subtle border border-white/[0.06] text-slate-300 hover:text-white text-xs font-medium transition flex items-center gap-1.5"
            title="Download personal memories as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-svayam-violet hover:bg-svayam-violet-dark text-white text-xs font-medium transition shadow-md shadow-svayam-violet/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Memories' },
            { id: 'commitment', label: 'Commitments' },
            { id: 'feeling', label: 'Feelings' },
            { id: 'habit', label: 'Habits' },
            { id: 'reflection', label: 'Reflections' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                filterCategory === cat.id
                  ? 'bg-svayam-violet/20 text-svayam-violet-light border border-svayam-violet/30'
                  : 'bg-surface-100 text-slate-400 hover:text-slate-200 border border-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-100 border border-white/[0.06] text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-svayam-violet/50"
          />
        </div>
      </div>

      {/* Memory Cards Grid */}
      {filteredMemories.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-surface-100/60 border border-white/[0.04] p-6 space-y-3">
          <Brain className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-400">No memories match your selection.</p>
          <button
            onClick={() => { setFilterCategory('all'); setSearchQuery(''); }}
            className="text-xs text-svayam-violet-light underline hover:text-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMemories.map(mem => (
            <div
              key={mem.id}
              className="p-5 rounded-xl bg-surface-100 border border-white/[0.06] hover:border-white/10 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Card Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      mem.category === 'commitment' ? 'bg-svayam-violet/15 text-svayam-violet-light border border-svayam-violet/30' :
                      mem.category === 'feeling' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
                      mem.category === 'habit' ? 'bg-svayam-emerald/10 text-svayam-emerald border border-svayam-emerald/20' :
                      'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                    }`}>
                      {mem.category}
                    </span>

                    {mem.extractedFromVoice && (
                      <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400">
                        <Mic className="w-2.5 h-2.5 text-svayam-violet-light" />
                        <span>Voice Captured</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteMemory(mem.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                    title="Delete memory"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {mem.content}
                </p>

                {/* Context Note if available */}
                {mem.contextNote && (
                  <p className="text-xs text-slate-400 italic bg-surface-200/60 p-2 rounded-lg border border-white/[0.03]">
                    {mem.contextNote}
                  </p>
                )}
              </div>

              {/* Card Footer: Date & Tags */}
              <div className="pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(mem.createdAt).toLocaleDateString()}</span>
                </div>

                {mem.eventDate && (
                  <div className="flex items-center gap-1 text-svayam-violet-light text-[11px] font-mono">
                    <Calendar className="w-3 h-3" />
                    <span>Target: {mem.eventDate}</span>
                  </div>
                )}

                {mem.tags && mem.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    {mem.tags.map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.03] text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-surface-100 rounded-2xl border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h2 className="text-base font-semibold text-white">Create Personal Memory</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                  className="w-full bg-surface-200 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-svayam-violet/50"
                >
                  <option value="commitment">Commitment / Event</option>
                  <option value="feeling">Feeling / Energy</option>
                  <option value="habit">Habit / Routine</option>
                  <option value="reflection">Personal Reflection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Memory Content
                </label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="e.g. Q4 Executive Product Presentation tomorrow at 2 PM..."
                  className="w-full bg-surface-200 border border-white/10 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-svayam-violet/50"
                />
              </div>

              {newCategory === 'commitment' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Event Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-surface-200 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-svayam-violet/50"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="presentation, work, focus"
                  className="w-full bg-surface-200 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-svayam-violet/50"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-200 hover:bg-surface-subtle text-slate-400 hover:text-white text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-svayam-violet hover:bg-svayam-violet-dark text-white text-xs font-medium transition shadow-md shadow-svayam-violet/20"
                >
                  Save to Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
