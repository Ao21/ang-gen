import { Inject, Injectable, bind} from 'angular2/angular2';
import {Dispatcher, StoreActions} from 'app/services/dispatcher_service';


var monkey = Baobab.monkey;


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
							initial: defaultMembershipConfig.defaultPrices.membership,
							calculated: monkey(
								['priceEstimate','initial'],
								['paymentFrequency'],
								['addons'],
								['membersCount','adults'],
								['membersCount','children'],
								function(price, frequency, addons, adults, children) {
									if(addons) {
										price = defaultMembershipConfig.defaultPrices.combo;
									}
									if (frequency == 'monthly') {
										return price
									}
									else {
										return price * 12
									}
								}
							)
						},
	config: 			defaultMembershipConfig,
	membersCount: 		{
							adults: 1,
							children: 0
						},
	paymentFrequency:	'monthly',
	forms: 				[]
}



export interface MembershipForm {
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
	forms?: [any] []
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
export class MembershipStoreActions extends StoreActions {
	channel: string;
	
	constructor(dispatcher: Dispatcher) {
		super(dispatcher);
		this.channel = 'Membership';
	}
	
}

@Injectable()
export class MembershipStore {
	tmp;
	private _state;
	lastObj;
	
	constructor(public dispatcher: Dispatcher){
		this._state = new Baobab(defaultInitState);
		this.activate();
		
	};
	
	activate() {
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, this.onUpdateState);
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.UPDATE, this.onUpdate);
		
		//this._state.on('update', () => this.emitUpdate());
	};
	
	
	onUpdate = (obj:any) => {	
		var path = obj.prop.split('.');
		this._state.set(path, obj.value);
		this.emitUpdate();
	}
	
	onUpdateState = (data: MembershipState) => {
		this._state.deepMerge(data);
	};
	
	get(type?) {
		return this._state.get();
	}
	
	get state() {
        return this._state.get();
    }
	
	emitUpdate() {
		this.dispatcher.publish(MembershipConsts.STATE, MembershipConsts.ONUPDATESTATE, this._state.get());
	}
	

};


export class MembershipConsts {
	public static CHANNEL: string = 'Membership';
	public static STATE: string = 'Membership.store';
	public static UPDATE: string = 'update';
	public static UPDATESTATE: string = 'update.state';
	public static ONUPDATE: string = 'is-updated';
	public static ONUPDATESTATE: string = 'is-updated.state';
	
}