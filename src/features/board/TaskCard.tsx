import { memo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Task } from '@/features/tasks';

const priorityStyles: Record<Task['priority'], { background: string; color: string }> = {
  high: { background: '#fef2f2', color: '#dc2626' },
  medium: { background: '#fef3c7', color: '#92400e' },
  low: { background: '#f0fdf4', color: '#16a34a' },
};

export const TaskCard = memo(function TaskCard({ task }: { task: Task }) {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({ id: String(task.id) });

  const pill = priorityStyles[task.priority];

  const style: React.CSSProperties = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '14px 16px',
    marginBottom: '10px',
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{task.title}</span>
        <span style={{ fontSize: '11px', fontWeight: 700, background: pill.background, color: pill.color, borderRadius: '999px', padding: '3px 10px' }}>{task.priority}</span>
      </div>
    </div>
  );
});