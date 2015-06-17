import BaseSvc from 'Scripts/Base/BaseSvc.js';
const HTTP=new WeakMap();
class testSvc extends BaseSvc
{
	constructor(http){
		super(http);
		HTTP.set(this, http);
	}
	static testFactory(http)	{
		return new testSvc(http);
	}
}
testSvc.testFactory.$inject=['$http'];
export default testSvc.testFactory;