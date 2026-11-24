export type MemoryCategory = 'feeling' | 'commitment' | 'habit' | 'reflection';

export type CommitmentStatus = 'upcoming' | 'completed' | 'snoozed' | 'cancelled';

export interface PersonalMemory {
  id: string;
  category: MemoryCategory;
  content: string;
  createdAt: string; // ISO date string
  updatedAt?: string;
  eventDate?: string; // ISO or YYYY-MM-DD
  status?: CommitmentStatus;
  extractedFromVoice?: boolean;
  tags?: string[];
  contextNote?: string;
}

export interface CreateMemoryInput {
  category: MemoryCategory;
  content: string;
  eventDate?: string;
  status?: CommitmentStatus;
  extractedFromVoice?: boolean;
  tags?: string[];
  contextNote?: string;
}
