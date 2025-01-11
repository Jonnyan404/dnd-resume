import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider'
import { AvatarRoundedSelect } from '@/components/widgets/form/avatar/avatar-rounded-select.tsx'
import { ContactsForm } from '@/components/widgets/form/contacts/contacts-form.tsx'
import type { BasicInfoData, LinkItemData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_AVATAR_SIZE, MIN_AVATAR_SIZE } from '@/const/dom.ts'
import { produce } from 'immer'
import type { ChangeEvent } from 'react'

const BasicInfoForm = ({
  data,
  onChange,
}: {
  data: BasicInfoData
  onChange: (value: BasicInfoData) => void
}) => {
  const { propsData } = data
  const { avatarUrl, avatarSize, avatarRound, name, jobTitle, linksGroup } = propsData

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

  const handleAvatarSizeChange = (value: string | number) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        avatarSize: Number(value),
      },
    })
  }

  const handleAvatarRoundChange = (isRound: boolean) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        avatarRound: isRound,
      },
    })
  }

  const handleLinkGroupChange = (groupIndex: number, linkGroup: LinkItemData[]) => {
    const nextState = produce(linksGroup, draft => {
      draft[groupIndex] = linkGroup
    })
    onChange({
      ...data,
      propsData: {
        ...propsData,
        linksGroup: nextState,
      },
    })
  }

  return (
    <div>
      {/* 头像地址 */}
      <div>
        <div className="form-label">
          <span>头像地址</span>
        </div>
        <div className="flex items-center justify-between">
          <Input
            className="mr-4 w-32"
            name="avatarUrl"
            value={avatarUrl}
            placeholder="输入头像地址"
            onChange={handleChange}
          />
          <AvatarRoundedSelect
            url={avatarUrl}
            rounded={avatarRound}
            onChange={handleAvatarRoundChange}
          />
        </div>
      </div>
      {/* 头像尺寸 */}
      <div>
        <div className="form-label">
          <span>头像尺寸</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-4 w-32 shrink-0"
            name="avatarSize"
            type="number"
            min={MIN_AVATAR_SIZE}
            max={MAX_AVATAR_SIZE}
            value={avatarSize}
            onChange={e => handleAvatarSizeChange(e.target.value)}
          />
          <Slider
            value={[avatarSize]}
            min={MIN_AVATAR_SIZE}
            max={MAX_AVATAR_SIZE}
            step={1}
            onValueChange={val => handleAvatarSizeChange(val[0])}
          />
        </div>
      </div>
      {/* 姓名 */}
      <div>
        <div className="form-label">
          <span>姓名</span>
        </div>
        <Input
          name="name"
          value={name}
          placeholder="输入姓名"
          onChange={handleChange}
        />
      </div>
      {/* 职位 */}
      <div>
        <div className="form-label">
          <span>职位</span>
        </div>
        <Input
          name="jobTitle"
          value={jobTitle}
          placeholder="输入职位"
          onChange={handleChange}
        />
      </div>
      {/* 联系方式 */}
      <div>
        <div className="form-label">
          <span>联系方式（第一行）</span>
        </div>
        <ContactsForm
          data={linksGroup[0]}
          onChange={data => handleLinkGroupChange(0, data)}
        />
        <div className="form-label">
          <span>联系方式（第二行）</span>
        </div>
        <ContactsForm
          data={linksGroup[1]}
          onChange={data => handleLinkGroupChange(1, data)}
        />
        <div className="form-label">
          <span>联系方式（第三行）</span>
        </div>
        <ContactsForm
          data={linksGroup[2]}
          onChange={data => handleLinkGroupChange(2, data)}
        />
      </div>
    </div>
  )
}

export { BasicInfoForm }
