import BaseSvc from 'Scripts/base/BaseSvc.js';
const HTTP=new WeakMap();
class homeSvc extends BaseSvc
{
	constructor(http, ngAuthSettings){
		super(http);
		HTTP.set(this, http);
      	this.baseUrl=ngAuthSettings.apiServiceBaseUri;
	}
  	getData(){
       
        return HTTP.get(this).get(this.baseUrl+'api/orders');
  
    }
	static homeFactory(http, ngAuthSettings)	{
		return new homeSvc(http, ngAuthSettings);
	}
}
homeSvc.homeFactory.$inject=['$http','ngAuthSettings'];
export default homeSvc.homeFactory;