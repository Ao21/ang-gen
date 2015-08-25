import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef, CSSClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/Dispatcher';


@Component({
	selector: 'grid-addon-item',
	properties: ['addon']

})

@View({
	templateUrl: 'app/directives/grid__addon/grid__addon__item.html',
	styleUrls: ['app/directives/grid__addon/grid__addon__item.css'],
	directives: [CSSClass]
})

export class GridAddonItem {
	// Object Events
	open(value) {
		const dispatcher = Dispatcher.getInstance();
		dispatcher.publish('addons', 'open.modal', value);
	}
}