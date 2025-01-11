import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '@/const/dom.ts'

interface ImageSectionProps {
  data: ImageSectionData['propsData']
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { url, imageSize } = data

  let sizeCls = '100%'
  if (imageSize < MAX_IMAGE_SIZE && imageSize >= MIN_IMAGE_SIZE) {
    sizeCls = `${imageSize}%`
  }

  return (
    <div className="flex-center drop-shadow-lg">
      <img
        style={{ width: sizeCls }}
        src={url}
        alt="image"
        draggable="false"
      />
    </div>
  )
}

export { ImageSection }
