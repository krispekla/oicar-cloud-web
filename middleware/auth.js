export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.localStorage.isAuthenticated) {
    return redirect('/forbidden-access')
  }
}
