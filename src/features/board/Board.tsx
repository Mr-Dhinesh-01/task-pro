import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { BoardColumn } from './BoardColumn';
import { COLUMNS } from './columns';
import { useBoard } from './useBoard';
import type { TaskStatus } from '@/features/tasks';

const STATUSES: TaskStatus[] = ['todo', 'in-progress', 'done'];

export function Board() {
  const { tasksByStatus, loading, error, moveTaskAndSave } = useBoard();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const overId = String(over.id);
    if (!STATUSES.includes(overId as TaskStatus)) return;
    moveTaskAndSave(String(active.id), overId as TaskStatus);
  }

  if (loading) return <p style={{ color: '#475569' }}>Loading board…</p>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {error && (
        <div style={{ background: '#fef2f2', borderLeft: '3px solid #dc2626', borderRadius: '0 8px 8px 0', padding: '10px 14px', color: '#991b1b', marginBottom: '14px', fontSize: '14px' }}>{error}</div>
      )}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {COLUMNS.map((column) => (
          <BoardColumn key={column.id} id={column.id} label={column.label} tasks={tasksByStatus[column.id]} />
        ))}
      </div>
    </DndContext>
  );
}