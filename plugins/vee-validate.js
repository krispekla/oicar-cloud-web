/* eslint-disable camelcase */
import { extend } from 'vee-validate'
import {
  required,
  email,
  numeric,
  min_value,
  max_value,
  min,
  max
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('min', {
  ...min,
  message: '{_field_} must be greater than {length} characters'
})
extend('min_value', {
  ...min_value,
  message: '{_field_} must be greater than {length}'
})
extend('max_value', {
  ...max_value,
  message: '{_field_} must be greater than {length}'
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

extend('numeric', {
  ...numeric,
  message: 'Only numbers'
})
