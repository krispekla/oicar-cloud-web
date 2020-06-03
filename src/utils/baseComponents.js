import BaseInput from '@/components/BaseComponents/BaseInput'
import BaseButton from '@/components/BaseComponents/BaseButton'
import BaseGrid from '@/components/BaseComponents/BaseGrid'
import BaseModal from '@/components/BaseComponents/BaseModal'
import BaseSelect from '@/components/BaseComponents/BaseSelect'
import BaseDate from '@/components/BaseComponents/BaseDate'
import BaseCheckbox from '@/components/BaseComponents/BaseCheckbox'

const GlobalCompoennts = {
  install(Vue) {
    Vue.component('base-input', BaseInput)
    Vue.component('base-button', BaseButton)
    Vue.component('base-grid', BaseGrid)
    Vue.component('base-modal', BaseModal)
    Vue.component('base-select', BaseSelect)
    Vue.component('base-date', BaseDate)
    Vue.component('base-checkbox', BaseCheckbox)
  },
}

export default GlobalCompoennts
