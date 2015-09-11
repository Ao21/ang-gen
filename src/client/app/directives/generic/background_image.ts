import { Directive, Attribute, Renderer, ElementRef, OnInit } from 'angular2/angular2';
import {isPresent, isBlank, print, Json } from 'angular2/src/core/facade/lang';
import { KeyValueDiffer, KeyValueDiffers} from 'angular2/angular2';
import {StringMapWrapper} from 'angular2/src/core/facade/collection'

@Directive({
	selector: '[background-image]',
	properties: ['backgroundImage: background-image']
})
export class BackgroundImage implements OnInit {
	_backgroundImage;
	_differ: KeyValueDiffer;
	constructor(private _renderer: Renderer, private _ngEl: ElementRef, private _differs: KeyValueDiffers){
	}
	set backgroundImage(v){
		v = v.replace(/'/g, '"');

		this._backgroundImage = v;
		if(isBlank(this._differ) && isPresent(v)) {
			this._backgroundImage = Json.parse(v);
			this._differ = this._differs.find(this._backgroundImage).create(null);
		}
	}
	
	onInit() {
		if (isPresent(this._differ)) {
			var changes = this._differ.diff(this._backgroundImage);
			if (isPresent(changes)) {
				this._applyChanges(changes);
			}
		}
	}
	
	private _applyChanges(changes: any): void {
		changes.forEachAddedItem((record) => { this._setBackgroundImage(record.key, record.currentValue); });
    	changes.forEachChangedItem((record) => { this._setBackgroundImage(record.key, record.currentValue); });
    	changes.forEachRemovedItem((record) => { this._setBackgroundImage(record.key, null); });

	}
	
	private _setBackgroundImage(name: string, val: string): void {
		this._renderer.setElementStyle(this._ngEl, 'background-'+name, val);
	}
}