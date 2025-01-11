import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { DraggableNode } from '@/pages/edit/draggable-node.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'

interface ReorderItemProps {
  item: WidgetNode
  isSelected: boolean
}

function DraggableNodeWrapper({ item, isSelected }: ReorderItemProps) {
  /**
   * dnd logic
   */
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  const getCls: () => string = () => {
    if (isDragging) return 'z-20 shadow-[0_4px_18px_2px_rgba(219,99,39,0.8)]'
    if (isSelected) return 'z-10 shadow-[0_4px_12px_2px_rgba(219,99,39,0.6)]'
    return ''
  }

  /**
   * click to setSelectedId
   */
  const setSelectedId = useWidgetsStore(state => state.setSelectedId)
  const handleClickItem = () => setSelectedId(item.id)

  return (
    <li
      id={item.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={handleClickItem}
      className={clsx('group relative flow-root cursor-move bg-white transition-shadow', getCls())}
    >
      <DraggableNode item={item} />
    </li>
  )
}

export { DraggableNodeWrapper }
