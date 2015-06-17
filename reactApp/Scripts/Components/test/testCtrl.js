import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
const SVC=new WeakMap();
class testCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='test';
		this.options={
		   className:'tgrid',
		    filter:true, childListName:'ChildList',
		    columns:[{field:'Name', style:{width:200}, sort:true, onClick:(row, index)=>{ alert(row.Address)} },
		    
		    {field:'Address', style:{width:200}}]
		};
		this.data=[{Name:'Jasim', Address:'Tangail'},
		{Name:'Salim', Address:'Tangail-2', Level:1,
		    ChildList:[{Name:'Salim-1', Address:'Add1',  ChildList:[{Name:'Salim-11', Address:'Add1'},{Name:'Salim-22', Address:'Add2'}]},{Name:'Salim-2', Address:'Add2'}]
		}
		];
		this.initFilter(scope);
	}
}
testCtrl.$inject=['$scope', 'testSvc'];
export default testCtrl;