import { Inject, Injectable, bind} from 'angular2/angular2';
import {Dispatcher} from 'app/services/dispatcher.service';

var defaultMembershipConfig = {
	defaultPrices: 		{
							membership: 9.99,
							rescueme: 5,
							combo: 9.99 + 5
						}
}

var defaultInitState = {
	actionBar:			{
							title: '',
							visible: false,
							priceEstimateVisible: false,
							states: [
								{title: 'Title',image: '',bkColor: '',intervalColor: ''},
								{title: 'Title2',image: '',bkColor: '',intervalColor: ''},
								{title: 'Title3',image: '',bkColor: '',intervalColor: ''}
							]
						},
	addons: 			false,
	priceEstimate: 		{
							initial: defaultMembershipConfig.defaultPrices.membership
						},
	config: 			defaultMembershipConfig,
	membersCount: 		{
							adults: 1,
							children: 0
						},
	paymentFrequency:	'monthly',
	forms: 				[]
}



export class MembershipForm {
    type		: String;
	index		: Number;
	form		: any;
}


export class MembershipFormDefault {
	email = [''];
	fName = [''];
	lName = [''];
	dob = [''];
	pNumber = [''];
	address1 = [''];
	address2 = [''];
	town = [''];
	county = [''];
	
}


export interface MembershipState {
	actionBar?:			{
							title?: String,
							visible?: Boolean
							priceEstimateVisible?: Boolean
							state?: ActionBarStates
						},
	config?: 			MembershipConfig,
	addons?: 			Boolean,
	priceEstimate?: 	{
							initial?: Number,
							calculated?: Number
						},
	paymentFrequency?:	String,
	paymentDetails?: 	{},
	members?: 			[any],
	membersCount?: 		{
							adults: Number,
							children: Number
						},
	forms?: [MembershipForm]
}

export interface MembershipConfig {
	defaultPrices?: {
						membership?:	Number,
						rescueMe?:		Number,
						combo?: 		Number;
					}
}

export interface ActionBarItem {
	title?: string;
	image?: string;
	bkColor?: string;
	intervalColor?: string;
}

interface ActionBarStates {
	states?: Array<ActionBarItem>
}



@Injectable()
export class MembershipStore {
	
	state: MembershipState;
	
	constructor(public dispatcher: Dispatcher){
		this.activate();
	};
	
	activate() {
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, this.updateState);
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.UPDATE, this.update);
		this.state = defaultInitState;
	};
	
	updateState = (data: MembershipState) => {
		this.state = _.merge(this.state, data);
		this.calculatePriceEstimate();
		this.emitUpdate();
	};
	
	calculatePriceEstimate() {
		let price = 0;
		price = this.state.addons == true ? defaultMembershipConfig.defaultPrices.combo : 9.99;
		this.state.priceEstimate.initial = price;
		price = this.state.paymentFrequency == 'monthly' ? price : price * 12;
		this.state.priceEstimate.calculated = price; 
	}
	
	update = (obj:any) => {
		_.set(this.state, obj.prop, obj.value);
		this.emitUpdate();
	}
	
	get(type?: string) {
		return (type) ? this.state[type] : this.state;
	};
	
	emitUpdate() {
		this.dispatcher.publish(MembershipConsts.STATE, MembershipConsts.ONUPDATESTATE, this.state);
	}
	

};


export class MembershipConsts {
	public static CHANNEL: string = 'Membership';
	public static STATE: string = 'Membership.state';
	public static UPDATE: string = 'update';
	public static UPDATESTATE: string = 'update.state';
	public static ONUPDATE: string = 'is-updated';
	public static ONUPDATESTATE: string = 'is-updated.state';
	
}