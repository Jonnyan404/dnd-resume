import { Button } from '@/components/ui/button.tsx'
import { BasicInfo } from '@/components/widgets/node/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/node/experience-time.tsx'
import { ImageSection } from '@/components/widgets/node/image-section.tsx'
import { TextContent } from '@/components/widgets/node/text-content.tsx'
import { TitleSection } from '@/components/widgets/node/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import type { MouseEvent } from 'react'
import { memo } from 'react'

function DraggableNode({ item }: { item: WidgetNode }) {
  /**
   * click to remove widget
   */
  const removeWidget = useWidgetsStore(state => state.removeWidget)
  const handleClickRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    removeWidget(item.id)
  }

  const WidgetRenderComponent = () => {
    switch (item.type) {
      case 'BasicInfo':
        return <BasicInfo data={item.data.propsData} />
      case 'TitleSection':
        return <TitleSection data={item.data.propsData} />
      case 'ExperienceTime':
        return <ExperienceTime data={item.data.propsData} />
      case 'TextContent':
        return <TextContent data={item.data.propsData} />
      case 'ImageSection':
        return <ImageSection data={item.data.propsData} />
    }
  }

  return (
    <div style={item.data.styleData}>
      {WidgetRenderComponent()}

      <Button
        variant="outline"
        size="icon"
        className="absolute right-1 top-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
        onMouseDown={handleClickRemove}
      >
        <div className="iconify text-lg ri--delete-bin-line"></div>
      </Button>
    </div>
  )
}

const Memorized = memo(DraggableNode)

export { Memorized as DraggableNode }
