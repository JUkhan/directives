import BaseCtrl from 'Scripts/Base/BaseCtrl.js';

const SVC=new WeakMap();
class reactWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='reactWidget';
		this.person={fname:'jasim khan', lname:'khan',
		    onClick:function(name){
		        alert(name+'cv');
		    }
		};
		this.loadData();
	}
	loadData(){
	    SVC.get(this).getData().success(res=>{console.log('done'); 
	    this.data=angular.fromJson(res.data);
	    this.person.render=false;
	     //React.render(React.createElement(HelloComponent, {config: this.person}), document.getElementById('mac'));
	    });
	}
}
reactWidgetCtrl.$inject=['$scope', 'reactWidgetSvc'];
export default reactWidgetCtrl;