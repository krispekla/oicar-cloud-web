import Vue from 'vue'
import { ValidationProvider, extend } from 'vee-validate'
import { required, email, numeric, max } from 'vee-validate/dist/rules'
import { localize } from 'vee-validate'
import hr from 'vee-validate/dist/locale/hr'

extend('required', required)
extend('email', email)
extend('numeric', numeric)
extend('max', max)

// extend('required', {
//   ...required,
//   message: '{_field_} can not be empty'
// })

// extend('min', {
//   ...min,
//   message: '{_field_} must be greater than {length} characters'
// })
// extend('min_value', {
//   ...min_value,
//   message: '{_field_} must be greater than {length}'
// })
// extend('max_value', {
//   ...max_value,
//   message: '{_field_} must be greater than {length}'
// })

// extend('max', {
//   ...max,
//   message: '{_field_} may not be greater than {length} characters'
// })

// extend('email', {
//   ...email,
//   message: 'Email must be valid'
// })

// extend('numeric', {
//   ...numeric,
//   message: 'Only numbers'
// })

extend('password', {
  validate: (value, { other }) => {
    if (value.length < 8) return 'Minimalno 8 znakova'

    const hasUpper = new RegExp('(?=.*?[A-Z])')
    if (!hasUpper.test(value)) return 'Barem jedno veliko slovo'

    const hasLower = new RegExp('(?=.*?[a-z])')
    if (!hasLower.test(value)) return 'Barem jedno malo slovo'

    const hasNumber = new RegExp('(?=.*?[0-9])')
    if (!hasNumber.test(value)) return 'Barem jedan broj'

    const specialCharacter = new RegExp('(?=.*?[#?!@$%^&*-])')
    if (!specialCharacter.test(value)) return 'Barem jedan specijalni znak'

    if (value !== other) return 'Lozinke se ne podudaraju'

    return true
  },
  message: () => 'Email nije ispravan',
  params: [{ name: 'other', isTarget: true }],
})

localize('hr', hr)

localize({
  en: {
    messages: {
      required: 'Required field',
      email: 'Incorrect email format',
      numeric: 'Only numbers allowed',
      max: 'Max number of characters reached',
    },
  },
  hr: {
    messages: {
      required: 'Obavezno polje',
      email: 'Email nije ispravan',
      numeric: 'Dozvoljeni samo brojevi',
      max: 'Dosegnut maksimalan broj znakova',
    },
  },
})

Vue.component('ValidationProvider', ValidationProvider)
