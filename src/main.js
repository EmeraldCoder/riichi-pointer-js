import ko from 'knockout'
import AppViewModel from './AppViewModel'

const appViewModel = new AppViewModel()
ko.applyBindings(appViewModel)
