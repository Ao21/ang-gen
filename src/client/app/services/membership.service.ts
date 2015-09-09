import { Inject, Injectable, bind} from 'angular2/angular2';
import {Dispatcher} from 'app/services/dispatcher.service';


export interface MembershipState {
	membersCount?: {
		adults: Number,
		children: Number
	},
	priceEstimate?: String,
	members?: [any],
	paymentDetails?: {},
	addons?: boolean
}



@Injectable()
export class MembershipStore {
	
	state: MembershipState;
	
	constructor(public dispatcher: Dispatcher){
		this.dispatcher.subscribe('Membership.state','update.state', this.updateState);
		this.state = {
			membersCount: {
				adults: 0,
				children: 0
			}
		};
		
	}
	
	updateState = (data: MembershipState) => {
		this.state = _.merge(this.state, data);
		console.log(this.state);
	}
	
	get(type?: string) {
		return (type) ? this.state[type] : this.state;
	}
	
}

export interface MembershipConfig {
	defaultPrices: {},
}

var defaultMembershipConfig = {
	defaultPrices: {
		membership: 9.99,
		rescueme: 5
	}
}

@Injectable()
export class MembershipService {
	config: MembershipConfig;
	
	constructor() {
		this.config = defaultMembershipConfig
	}
	
	get() {
		return this.config;
	}
}