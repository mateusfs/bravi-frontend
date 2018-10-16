export class ServiceUrlBuilder {

	static get(urlType: UrlType, path: string): string {
		let product = 'http://localhost/api/v1';
		let type = '';
		switch (urlType) {
			case UrlType.person:
				type = '/person/';
				break;
			case UrlType.contact:
				type = '/contact/';
				break;
			default:
				type = null;
		}
		return product + type + path;
	}
}

export enum UrlType {
	person, contact
}
