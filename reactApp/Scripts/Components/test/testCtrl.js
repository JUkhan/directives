import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtTreeGrid from 'Scripts/Modules/jwtComponents/JwtTreeGrid.js';
import JwtTree from 'Scripts/Modules/jwtComponents/JwtTree.js';
const SVC=new WeakMap();
class testCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='test';
	  var options={
		   className:'tgrid',
		    filter:true, childListName:'ChildList',
		    columns:[{field:'Name', style:{width:200}, sort:true, onClick:(row, index)=>{ alert(row.Address)} },
		    
		    {field:'Address', style:{width:200}, render:row=>row.Address+row.Name}
		    
		    ]
		};
		var data=[{Name:'Jasim', Address:'Tangail'},
		{Name:'Salim', Address:'Tangail-2',
		    ChildList:[{Name:'Salim-1', Address:'Add1',  ChildList:[{Name:'Salim-11', Address:'Add1'},{Name:'Salim-22', Address:'Add2'}]},{Name:'Salim-2', Address:'Add2'}]
		}
		];
		React.render(React.createElement(JwtTreeGrid, {options:options, data:data}), document.getElementById('tgrid'));
		this.initFilter(scope);
		this.setTreeView();
	}
	setTreeView(){
	    //checkList:true|function(data){}
	     var options={
		   displayField:'Name', childrenField:'ChildList', checkList:true, onClick:(d)=>{console.log(d);}
		};
		var data=[{Name:'Jasim', Address:'Tangail'},
		{Name:'Salim', Address:'Tangail-2', Level:1,
		    ChildList:[{Name:'Salim-1', Address:'Add1',  ChildList:[{Name:'Salim-11', Address:'Add1'},{Name:'Salim-22', Address:'Add2'}]},{Name:'Salim-2', Address:'Add2'}]
		}
		];
		React.render(React.createElement(JwtTree, {options:options, data:data}), document.getElementById('grid'));
	}
	
}
testCtrl.$inject=['$scope', 'testSvc'];
export default testCtrl;