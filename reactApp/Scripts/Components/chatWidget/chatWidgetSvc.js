import BaseSvc from 'Scripts/base/BaseSvc.js';
const HTTP=new WeakMap();
class chatWidgetSvc extends BaseSvc
{
	constructor(http){
		super(http);
		HTTP.set(this, http);
	}
	static chatWidgetFactory(http)	{
		return new chatWidgetSvc(http);
	}
}
chatWidgetSvc.chatWidgetFactory.$inject=['$http'];
export default chatWidgetSvc.chatWidgetFactory;