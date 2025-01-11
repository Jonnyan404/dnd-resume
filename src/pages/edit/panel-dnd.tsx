import { DraggableNodeWrapper } from '@/pages/edit/draggable-node-wrapper.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core/dist/types'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

const PanelDnd = () => {
  const { widgets, setWidgets, selectedId, setSelectedId } = useWidgetsStore(
    useShallow(state => ({
      widgets: state.widgets,
      setWidgets: state.setWidgets,
      selectedId: state.selectedId,
      setSelectedId: state.setSelectedId,
    })),
  )

  /**
   * dnd logic
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = widgets.findIndex(item => item.id === active.id)
      if (oldIndex === -1) return
      const newIndex = widgets.findIndex(item => item.id === over.id)
      if (newIndex === -1) return
      setWidgets(arrayMove(widgets, oldIndex, newIndex))
      setSelectedId(active.id as string)
    }
  }

  /**
   * auto scroll selected widget into view
   */
  useEffect(() => {
    if (!selectedId) return
    const element = document.getElementById(selectedId)
    if (!element) return

    const rect = element.getBoundingClientRect()
    const inView = rect.top >= 68 && rect.bottom <= window.innerHeight - 16
    if (!inView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selectedId])

  return (
    <ul className="print-wrapper relative rounded-2xl border">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement, restrictToVerticalAxis]}
      >
        <SortableContext
          items={widgets}
          strategy={verticalListSortingStrategy}
        >
          {widgets.map(item => (
            <DraggableNodeWrapper
              key={item.id}
              item={item}
              isSelected={item.id === selectedId}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  )
}

export { PanelDnd }
