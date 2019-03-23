interface Promise<T> {
	readonly status: "pending" | "fulfilled" | "rejected";
	readonly rejected: any;
	readonly fulfilled: T;
}

//@ts-ignore
declare let global: any;
declare let log: (message?: any, ...optionalParams: any[]) => void;

declare const dc: {
	<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) : HTMLElementTagNameMap[K];
	(name: string) : HTMLElement;
};

declare const ce: {
	<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) : HTMLElementTagNameMap[K];
	(name: string) : HTMLElement;
};

declare const loading: Promise<void>;

interface Array<T> {
	/**
	 * True if xrray is attatched
	 */
	readonly xrray: boolean;
	/**
	 * True if empty
	 */
	readonly empty: boolean;
	/**
	 * Last element
	 */
	readonly last: T;
	/**
	 * First element
	 */
	readonly first: T;
	/**
	 * Clears the array of all elements
	 */
	clear(): T[];
	/**
	 * Clears the array of all elements
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Clear(): T[];
	/**
	 * Adds values to the array
	 */
	add(...value: T[]): T[];
	/**
	 * Adds values to the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Add(...value: T[]): T[];
	/**
	 * Sets the array to the given one without chnaging the refernece
	 */
	set(array: T[]): T[];
	/**
	 * Sets the array to the given one without chnaging the refernece
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Set(array: T[]): T[];
	/**
	 * Reverts the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Reverse(): T[];
	/**
	 * Gets all indexes that match the given values
	 */
	index(...values: T[]): number[];
	/**
	 * Cleans the array of all nulls and undefineds
	 */
	clean(): T[];
	/**
	 * Cleans the array of all nulls and undefineds
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Clean(): T[];
	/**
	 * Removes given indexes
	 */
	removeI(...index: number[]): T[];
	/**
	 * Removes given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RemoveI(...index: number[]): T[];
	/**
	 * Removes given values
	 */
	removeV(...index: T[]): T[];
	/**
	 * Removes given values
	 * The inital array stays unchanged; a new one gets inited;
	 */
	RemoveV(...index: T[]): T[];
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	remove(...valueOrIndex: T[] | number[]): T[];
	/**
	 * Removes given values / indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Remove(...valueOrIndex: T[] | number[]): T[];
	/**
	 * Sets the array to given indexes
	 */
	get(...index: number[]): T[];
	/**
	 * Sets the array to given indexes
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Get(...index: number[]): T[];
	/**
	 * Adds given values to the end of the array
	 */
	dda(...value: T[]): T[];
	/**
	 * Adds given values to the end of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Dda(...value: T[]): T[];
	/**
	 * Removes given number of elements from the end of the array
	 */
	rem(amount: number): T[];
	/**
	 * Removes given number of elements from the end of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Rem(amount: number): T[];
	/**
	 * The inital array stays unchanged; a new one gets inited;
	 */
	mer(amount: number): T[];
	/**
	 * Removes given number of elements from the begin of the array
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Mer(amount: number): T[];
	/**
	 * Swaps the two given indexes; the two parameters must have equal length
	 */
	swapI(i1: number, i2: number): T[];
	/**
	 * Swaps the two given indexes; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	SwapI(i1: number | number[], i2: number | number[]): T[];
	/**
	 * Swaps the two given values; the two parameters must have equal length
	 */
	swapV(v1: T | T[], v2: T | T[]): T[];
	/**
	 * Swaps the two given values; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	SwapV(v1: T | T[], v2: T | T[]): T[];
	/**
	 * Swaps the two given indexes or values; the two parameters must have equal length
	 */
	swap(vi1: number | number[] | T | T[], vi2: number | number[] | T | T[]): T[];
	/**
	 * Swaps the two given indexes or values; the two parameters must have equal length
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Swap(vi1: number | number[] | T | T[], vi2: number | number[] | T | T[]): T[];
	/**
	 * Like default flat
	 * The inital array stays unchanged; a new one gets inited;
	 */
	Flat(ammount?: number): T[]

	/**
	 * Alias for forEach.
	 * awaits any promises
	 * when !== undefined gets returned => the the loop stopts and the returned val gets returned
	 */
	 ea(loop: (e?: T, i?: number, ...args: any) => any, thisArg?: any): any;
	/**
	 * Alias for forEach.
	 * awaits any promises
	 * when !== undefined gets returned => the the loop stopts and the returned val gets returned
	 */
	ea(loop: (e?: T, i?: number, ...args: any) => any, thisArg?: any): any;
}

interface IndexOutOfBoundsException extends Exception {
	index: number;
	array: any[];
}

interface InvalidIntegerException extends Exception {

}

interface InvalidInputException extends Exception {

}

interface InvalidConstructorException extends Exception {

}

interface InvalidValueException extends Exception {
	value: any;
	array: any[];
}

interface Exception extends Error {
	message: string;
}

interface HTMLElement {
  /**
   * Animates this element using the waapi (https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
   * @param frame the state this element should become on finish (simular to jquery.animate)
	 * @param options options altering the development (ger: Ablauf) of the animation | following options are available: {duration; iteration; easing; fill}
   */
	anim(frame_frames: object | object[], options?: WAAPIOptions): Promise<void>;
	/**
	 * addEventListener alias
 	 */
	 on<K extends keyof HTMLElementEventMap>(type: K, listener: (e?: any) => any, options?: boolean | AddEventListenerOptions): void;
	/**
	 * removeEventListener alias
	 * TODO: corect types
 	 */
	off(...a: any): void;
	/**
	 * JQuery like implementation
 	 */
	css: cssFucntion;
	/**
	 * Adds cssClass
 	 */
	addClass(...className: string[]): this;
	/**
	 * Removes cssClass
 	 */
	removeClass(...className: string[]): this;
	//JQuerylike
	hasClass(...classNames: string[]): boolean;
	//JQuerylike
	toggleClass(...classNames: string[]): this;

	/**
	 * Appends given elems
 	 */
	apd(...elems: Array<HTMLElement | string>): this;
	/**
	 * Empties the node so that no elements are inside
 	 */
	emptyNodes(): this;
	/**
	 * Hides elem
 	 */
	hide(): this;
	/**
	 * Shows elem
 	 */
	show(): this;
	/**
	 * Gets children matching given css-selector
	 * @param selector css-selector filter (defaults to "*")
 	 */
	childs(selector?: string): GenericNodeLs<HTMLElement>;
	/**
	 * Computed height of elem
 	 */
	readonly height: number;
	/**
	 * Computed width of elem
 	 */
	readonly width: number;
	/**
	 * offset of elem
 	 */
	readonly offset: {width: number, height: number, top: number, bottom: number, left: number, right: number};
	/**
	 * Width including padding and border
 	 */
	readonly outerWidth: number;
	/**
	 * Height including padding and border
 	 */
	readonly outerHeight: number;
	/**
	 * Width including padding
 	 */
	readonly innerWidth: number;
	/**
	 * Height including padding
 	 */
	readonly innerHeight: number;
	/**
	 * ParentNode node
 	 */
	readonly parent: this;
	/**
	 * alias for innerHTML
 	 */
	html: string;
	inner: string | HTMLElement;
}

/** Always applies or gets given action to all elements included in this list */
interface GenericNodeLs<T extends HTMLElement = HTMLElement> extends Array<T> {
	/**
	 * Animates this element using the waapi (https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
	 * @param frame the state this element should become on finish (simular to jquery.animate)
	 * @param options options altering the development (ger: Ablauf) of the animation | following options are available: {duration; iteration; easing; fill}
	 */
	anim(frame: object, options?: WAAPIOptions): Promise<void>;
	/**
	 * addEventListener alias
 	 */
	 on<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	/**
	 * removeEventListener alias
 	 */
	off(...a: any): this;
	/**
	 * JQuery like implementation
 	 */
	css(key_css: string | object, val?: string): this;
	/**
	 * Adds cssClass
 	 */
	addClass(...className: string[]): this;
	/**
	 * Removes cssClass
	 */
	removeClass(...className: string[]): this;
	//JQuerylike
	hasClass(...classNames: string[]): boolean;
	//JQuerylike
	toggleClass(...classNames: string[]): this;
	/**
 	 * Appends given elems
   */
	apd(...elems: Array<HTMLElement | string>): this;
	/**
	 * Empties the node so that no elements are inside
 	 */
	emptyNodes(): this;
	/**
	 * Hides elem
 	 */
	hide(): this;
	/**
	 * Shows elem
 	 */
	show(): this;
	/**
	 * Gets children matching given css-selector
	 * @param selector css-selector filter (defaults to "*")
 	 */
	childs(selector?: string): GenericNodeLs<HTMLElement>;
	/**
	 * alias for innerHTML
 	 */
	html: string;
	inner: string | HTMLElement;
}

interface cssFucntion {
	(key: string): string;
	(key: string, val: string | number): void;
	(css: object): void;
}


interface WAAPIOptions {
  duration?: number,
  iterations?: number,
  easing?: string,
  fill?: boolean,
}
