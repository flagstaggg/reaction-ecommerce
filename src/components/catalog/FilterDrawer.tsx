import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import type { FilterState } from '@/types'
import { FilterSidebar } from './FilterSidebar'

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
  filters: FilterState
  onChange: (next: FilterState) => void
  /** Quantidade já filtrada — mostra no botão de confirmação. */
  resultCount: number
}

/** Folha inferior com os filtros — substitui a sidebar no mobile. */
export function FilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
}: FilterDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="bottom"
      title="Filtros"
      footer={
        <div className="px-5 py-4">
          <Button fullWidth onClick={onClose}>
            Ver {resultCount} {resultCount === 1 ? 'produto' : 'produtos'}
          </Button>
        </div>
      }
    >
      <div className="px-5 pt-4">
        <FilterSidebar filters={filters} onChange={onChange} variant="drawer" />
      </div>
    </Drawer>
  )
}