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
  Clock, 
  Download, 
  X,
  ArrowUpRight
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

  const cardFills = [
    'bg-[#55A8F8]', // Sky Blue
    'bg-[#E8C6FF]', // Soft Lilac
    'bg-[#4DE59B]', // Mint Green
    'bg-white',     // Pure White
  ];

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
    <div className="w-full space-y-8 select-none">
      {/* Editorial Header */}
      <div className="pb-6 border-b-[1.5px] border-[#0A0A0A] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full border-[1.5px] border-[#0A0A0A] bg-[#E8C6FF] px-3 py-0.5 text-xs font-black tracking-wider uppercase text-[#0A0A0A]">
              Personal Context Engine
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase italic tracking-tight text-[#0A0A0A] leading-none">
            PERSONAL MEMORY
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#262626] leading-relaxed">
            Your remembered context, reflections, commitments and habits. Stored locally in your browser.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all duration-150 shadow-hard-xs flex items-center gap-2 active:scale-95"
            title="Download personal memories as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] hover:bg-[#FCE354] text-white hover:text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition-all duration-150 shadow-hard-xs flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'commitment', label: 'Commitments' },
            { id: 'feeling', label: 'Feelings' },
            { id: 'habit', label: 'Habits' },
            { id: 'reflection', label: 'Reflections' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-150 whitespace-nowrap border-[1.5px] border-[#0A0A0A] active:scale-95 ${
                filterCategory === cat.id
                  ? 'bg-[#0A0A0A] text-white shadow-hard-xs'
                  : 'bg-white text-[#0A0A0A] hover:bg-[#FCE354]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0A0A0A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full pl-10 pr-4 py-2 rounded-full border-[1.5px] border-[#0A0A0A] bg-white text-xs font-bold text-[#0A0A0A] placeholder-[#525252] shadow-hard-xs focus:outline-none focus:bg-[#FAFAFA]"
          />
        </div>
      </div>

      {/* Memory Cards Grid */}
      {filteredMemories.length === 0 ? (
        <div className="py-16 text-center rounded-3xl border-[1.5px] border-[#0A0A0A] bg-[#FAFAFA] p-8 space-y-3 shadow-hard">
          <Brain className="w-12 h-12 text-[#0A0A0A] mx-auto" />
          <p className="text-sm font-bold text-[#0A0A0A] uppercase">No memories match your selection.</p>
          <button
            onClick={() => { setFilterCategory('all'); setSearchQuery(''); }}
            className="text-xs font-black uppercase text-[#0A0A0A] underline hover:text-[#55A8F8]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMemories.map((mem, idx) => {
            const fillClass = cardFills[idx % cardFills.length];

            return (
              <div
                key={mem.id}
                className={`p-6 sm:p-7 rounded-3xl border-[1.5px] border-[#0A0A0A] ${fillClass} shadow-hard transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hard-lg flex flex-col justify-between space-y-4 group`}
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-center justify-between text-xs font-black uppercase">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full border border-[#0A0A0A] bg-white text-[#0A0A0A] text-[10px]">
                        {mem.category}
                      </span>

                      {mem.extractedFromVoice && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-[#FCE354] text-[#0A0A0A]">
                          <Mic className="w-2.5 h-2.5" />
                          <span>Voice</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => deleteMemory(mem.id)}
                      className="p-1.5 rounded-full border border-transparent hover:border-[#0A0A0A] hover:bg-white text-[#0A0A0A] transition"
                      title="Delete memory"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <p className="font-display font-bold text-xl sm:text-2xl text-[#0A0A0A] leading-snug">
                    "{mem.content}"
                  </p>

                  {/* Context Note if available */}
                  {mem.contextNote && (
                    <p className="text-xs font-semibold text-[#0A0A0A] bg-white p-3 rounded-2xl border-[1.5px] border-[#0A0A0A] shadow-hard-xs">
                      {mem.contextNote}
                    </p>
                  )}
                </div>

                {/* Card Footer: Date & Tags */}
                <div className="pt-3 border-t-[1.5px] border-[#0A0A0A] flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#0A0A0A]">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(mem.createdAt).toLocaleDateString()}</span>
                  </div>

                  {mem.eventDate && (
                    <div className="flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-white">
                      <Calendar className="w-3 h-3" />
                      <span>{mem.eventDate}</span>
                    </div>
                  )}

                  {mem.tags && mem.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      {mem.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-[#0A0A0A] bg-white text-[#0A0A0A] font-bold">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Memory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-3xl border-[2px] border-[#0A0A0A] p-6 sm:p-8 space-y-6 shadow-hard-xl">
            <div className="flex items-center justify-between pb-3 border-b-[1.5px] border-[#0A0A0A]">
              <h2 className="font-display font-black text-2xl uppercase italic tracking-tight text-[#0A0A0A]">
                Create Personal Memory
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full border border-[#0A0A0A] hover:bg-[#FAFAFA] transition"
              >
                <X className="w-4 h-4 text-[#0A0A0A]" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                  className="w-full bg-[#FAFAFA] border-[1.5px] border-[#0A0A0A] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#0A0A0A] focus:outline-none focus:bg-white"
                >
                  <option value="commitment">Commitment / Event</option>
                  <option value="feeling">Feeling / Energy</option>
                  <option value="habit">Habit / Routine</option>
                  <option value="reflection">Personal Reflection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-1.5">
                  Memory Content
                </label>
                <textarea
                  required
                  rows={3}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="e.g. Q4 Executive Product Presentation tomorrow at 2 PM..."
                  className="w-full bg-[#FAFAFA] border-[1.5px] border-[#0A0A0A] rounded-2xl p-4 text-xs font-bold text-[#0A0A0A] placeholder-[#525252] focus:outline-none focus:bg-white"
                />
              </div>

              {newCategory === 'commitment' && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-1.5">
                    Event Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-[#FAFAFA] border-[1.5px] border-[#0A0A0A] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#0A0A0A] focus:outline-none focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#0A0A0A] mb-1.5">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="presentation, work, focus"
                  className="w-full bg-[#FAFAFA] border-[1.5px] border-[#0A0A0A] rounded-2xl px-4 py-2.5 text-xs font-bold text-[#0A0A0A] placeholder-[#525252] focus:outline-none focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t-[1.5px] border-[#0A0A0A]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full border-[1.5px] border-[#0A0A0A] bg-[#0A0A0A] hover:bg-[#FCE354] text-white hover:text-[#0A0A0A] text-xs font-black uppercase tracking-wider transition shadow-hard-xs active:scale-95"
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
