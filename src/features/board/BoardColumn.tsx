import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '@/features/tasks';

interface BoardColumnProps {
  id: TaskStatus;
  label: string;
  tasks: Task[];
}

export function BoardColumn({ id, label, tasks }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minWidth: 0,
        minHeight: '340px',
        borderRadius: '16px',
        border: isOver ? '2px solid #61dafb' : '1px solid #e2e8f0',
        background: isOver ? '#eff6ff' : '#f8fafc',
        padding: '14px',
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{label}</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', background: '#f1f5f9', borderRadius: '999px', padding: '2px 10px' }}>{tasks.length}</span>
      </div>

      {tasks.map((task) => (
        <TaskCard key={`${task.id}-${task.status}`} task={task} />
      ))}
      {tasks.length === 0 && (
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '8px 0 0', textAlign: 'center' }}>Drop tasks here</p>
      )}
    </div>
  );
}