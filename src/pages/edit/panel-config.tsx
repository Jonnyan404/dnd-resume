import { BasicInfoForm } from '@/components/widgets/form/basic-info-form.tsx'
import { ExperienceTimeForm } from '@/components/widgets/form/experience-time-form.tsx'
import { ImageSectionForm } from '@/components/widgets/form/image-section-form.tsx'
import { StyleForm } from '@/components/widgets/form/style-form.tsx'
import { TextContentForm } from '@/components/widgets/form/text-content-form.tsx'
import { TitleSectionForm } from '@/components/widgets/form/title-section-form.tsx'
import type { StyleData } from '@/components/widgets/widgets-type'
import { widgetMaterialMap } from '@/components/widgets/widgets-util.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { clsx } from 'clsx'
import { produce } from 'immer'
import invariant from 'tiny-invariant'

const PanelConfig = () => {
  const widgets = useWidgetsStore(state => state.widgets)
  const setWidgets = useWidgetsStore(state => state.setWidgets)

  const selectedWidget = useWidgetsStore(state => state.selectedWidget())
  if (!selectedWidget) return null

  /**
   * widget form
   */
  const widgetMaterialInfo = widgetMaterialMap[selectedWidget.type]
  const onDataChange = (data: any) => {
    const newWidgets = widgets.map(item => {
      if (item.id === selectedWidget.id) {
        return { ...item, data }
      }
      return item
    })
    setWidgets(newWidgets)
  }
  const FormComponent = (() => {
    switch (selectedWidget.type) {
      case 'BasicInfo':
        return (
          <BasicInfoForm
            data={selectedWidget.data}
            onChange={onDataChange}
          />
        )
      case 'TitleSection':
        return (
          <TitleSectionForm
            data={selectedWidget.data}
            onChange={onDataChange}
          />
        )
      case 'ExperienceTime':
        return (
          <ExperienceTimeForm
            data={selectedWidget.data}
            onChange={onDataChange}
          />
        )
      case 'TextContent':
        return (
          <TextContentForm
            data={selectedWidget.data}
            onChange={onDataChange}
          />
        )
      case 'ImageSection':
        return (
          <ImageSectionForm
            data={selectedWidget.data}
            onChange={onDataChange}
          />
        )
    }
  })()

  /**
   * style form
   */
  const onStyleChange = (styleData: StyleData) => {
    const nextState = produce(widgets, draft => {
      const widget = draft.find(item => item.id === selectedWidget.id)
      invariant(widget)
      widget.data.styleData = styleData
    })
    setWidgets(nextState)
  }

  return (
    <div className="p-4">
      <div className="flex items-center">
        <span className={clsx(widgetMaterialInfo.icon, 'h-4 w-4')}></span>
        <span className="ml-2 text-xl font-medium">{widgetMaterialInfo.title}</span>
      </div>
      {FormComponent}

      <div className="mt-4 flex items-center">
        <span className="iconify h-4 w-4 ri--layout-2-fill"></span>
        <span className="ml-2 text-xl font-medium">样式布局</span>
      </div>
      <StyleForm
        styleData={selectedWidget.data.styleData}
        onStyleChange={onStyleChange}
      />
    </div>
  )
}

export { PanelConfig }
