import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '@/const/dom.ts'
import type { ChangeEvent } from 'react'

const ImageSectionForm = ({
  data,
  onChange,
}: {
  data: ImageSectionData
  onChange: (value: ImageSectionData) => void
}) => {
  const { propsData } = data
  const { url, imageSize } = propsData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: value,
      },
    })
  }

  const handleImageSizeChange = (value: string | number) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        imageSize: Number(value),
      },
    })
  }

  return (
    <div>
      {/* 图片 */}
      <div>
        <div className="form-label">
          <span>图片地址</span>
        </div>
        <Input
          name="url"
          value={url}
          placeholder="输入图片地址"
          onChange={handleChange}
        />
      </div>
      {/* 图片大小 */}
      <div>
        <div className="form-label">
          <span>图片大小（百分比）</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="avatarSize"
            type="number"
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            value={imageSize}
            onChange={e => handleImageSizeChange(e.target.value)}
          />
          <Slider
            value={[imageSize]}
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            step={1}
            onValueChange={val => handleImageSizeChange(val[0])}
          />
        </div>
      </div>
    </div>
  )
}

export { ImageSectionForm }
