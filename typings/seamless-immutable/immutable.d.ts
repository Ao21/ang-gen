interface Immutable {
	(any): any;
	flatMap(): any;
	asObject(): any;
	asMutable(): any;
	merge():any;
	without():any;
}

declare var Immutable: Immutable;
declare module "Immutable" {
    export = Immutable;
}