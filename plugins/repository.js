import createRepository from '~/api/repository'
import createCalculatorRepository from '~/api/calculatorRepository'
export default (ctx, inject) => {
  // inject the repository in the context (ctx.app.$repository)
  // And in the Vue instances (this.$repository in your components)
  const repositoryWithAxios = createRepository(ctx.$axios)
  const repositoryCalculatorWithAxios = createCalculatorRepository(ctx.$axios)
  inject('cloudNewsRepository', repositoryWithAxios('/CloudNews'))
  inject('calculatorRepository', repositoryCalculatorWithAxios('/Calculator'))
  inject('userRepository', repositoryWithAxios('/User'))
  inject(
    'userCloudConfigurationRepository',
    repositoryWithAxios('/userCloudConfiguration')
  )
}
