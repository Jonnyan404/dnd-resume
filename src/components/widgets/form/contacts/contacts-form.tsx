import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { IconSelect } from '@/components/widgets/form/contacts/icon-select.tsx'
import { LinkInput } from '@/components/widgets/form/contacts/link-input.tsx'
import type { LinkItemData } from '@/components/widgets/widgets-type.d.ts'
import { createLinkItem } from '@/components/widgets/widgets-util.ts'
import { LINK_LENGTH_LIMIT } from '@/const/dom.ts'
import { produce } from 'immer'

interface LinkGroupProps {
  data: LinkItemData[]
  onChange: (data: LinkItemData[]) => void
}

const ContactsForm = ({ data, onChange }: LinkGroupProps) => {
  const handleChange = (index: number, field: keyof LinkItemData, value: string) => {
    const nextState = produce(data, draft => {
      draft[index][field] = value
    })
    onChange(nextState)
  }
  const handleDelete = (index: number) => {
    const nextState = produce(data, draft => {
      draft.splice(index, 1)
    })
    onChange(nextState)
  }

  const showCreate = data.length < LINK_LENGTH_LIMIT
  const handleCreate = () => {
    onChange([...data, createLinkItem()])
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li
          key={index}
          className="mb-2 flex items-center"
        >
          <IconSelect
            value={item.icon}
            onChange={newIcon => handleChange(index, 'icon', newIcon)}
            className="mr-1 shrink-0"
          />
          <Input
            value={item.content}
            onChange={e => handleChange(index, 'content', e.target.value)}
          />
          <LinkInput
            value={item.href}
            onChange={newHref => handleChange(index, 'href', newHref)}
            className="ml-1 shrink-0"
          />
          <Button
            className="ml-1 shrink-0"
            variant="outline"
            size="icon"
            onClick={() => handleDelete(index)}
          >
            <span className="iconify ri--delete-bin-line"></span>
          </Button>
        </li>
      ))}
      {showCreate && (
        <li className="mb-2 flex items-center">
          <Button
            className="w-full"
            variant="outline"
            size="icon"
            onClick={handleCreate}
          >
            <span className="iconify text-lg ri--add-line"></span>
          </Button>
        </li>
      )}
    </ul>
  )
}

export { ContactsForm }
