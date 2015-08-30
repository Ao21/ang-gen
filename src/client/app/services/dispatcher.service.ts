/// <reference path="../../../../typings/tsd.d.ts" />


import { Component } from 'angular2/angular2';
import { Inject, Injectable, bind } from 'angular2/angular2';
import * as Postal from 'postal';

@Injectable()
export class Dispatcher {

	constructor() {
	}

	subscribe(
		channel: string,
		topic: string,
		callback: (data: any, msg: any) => any) {
			postal.subscribe({
				channel: channel,
				topic: topic,
				callback: callback
			});
	}

	publish(
		channel: string,
		topic: string,
		data: any): void {
		postal.publish({
			channel: channel,
			topic: topic,
			data: data
		});
	}

	subscriptions(): void {
		let results: any = postal.getSubscribersFor();
	}

	unsubscribeAll(): void {
		postal.unsubscribeFor();
	}

	unsubscribe(channel: string, topic: string): void {
		postal.unsubscribeFor({
			channel: channel,
			topic: topic
		});
		
	}


}


