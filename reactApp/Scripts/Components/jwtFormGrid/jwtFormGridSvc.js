import BaseSvc from 'Scripts/Base/BaseSvc.js';
const HTTP=new WeakMap();
class jwtFormGridSvc extends BaseSvc
{
	constructor(http){
		super(http);
		HTTP.set(this, http);
	}
	static jwtFormGridFactory(http)	{
		return new jwtFormGridSvc(http);
	}
}
jwtFormGridSvc.jwtFormGridFactory.$inject=['$http'];
export default jwtFormGridSvc.jwtFormGridFactory;