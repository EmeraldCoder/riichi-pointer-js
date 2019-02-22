import ko from 'knockout'
import AppViewModel from './AppViewModel'

const appViewModel = new AppViewModel()
ko.applyBindings(appViewModel)

window.viewModel = appViewModel // ugly temporary fix because some GUI jQuery code need to reference the view model globally
