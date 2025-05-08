import { FileText } from 'lucide-react';

interface EmptyStateProps {
  onCreateNote: () => void;
}

export default function EmptyState({ onCreateNote }: EmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <div className="flex justify-center mb-4">
          <FileText size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Note Selected</h2>
        <p className="text-muted-foreground mb-6">
          Select a note from the sidebar to view or edit it, or create a new one to get started.
        </p>
        <button
          onClick={onCreateNote}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Create New Note
        </button>
      </div>
    </div>
  );
}