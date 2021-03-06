import { environment } from "../../../environments/environment";

export class ServiceUrlBuilder {

	static get(urlType: UrlType, path: string): string {
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
		return environment.apiUrl + UrlProductWin.product + type + path;
	}
}

export enum UrlType {
	person, contact
}

/**
 *  If the API is implemented in a LINUX environment, use 'UrlProductLinux'
 *  If the API is implemented in a WINDOWS environment, use 'UrlProductWIN'
 * 
 *  OR configure the php.ini where is the API
 */

const UrlProductWin = { environment: 'WIN', product: 'public/api/v1'};
const UrlProductLinux = { environment: 'LINUX', product: 'api/v1'};

