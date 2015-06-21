import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtFormGrid from 'Scripts/Modules/jwtComponents/JwtFormGrid.js';
const SVC=new WeakMap();
class jwtFormGridCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='jwtFormGrid';
		this.prepareFormGrid()
		this.loadData()
	}
	
	prepareFormGrid(){
	    var me=this
	    var grid={
	         limit:1, loadingText:'loading...', filter:true, newItem:function(){me.formGrid.showForm(); me.formGrid.formRefresh(); },newItemText:'Add New Item',
		    columns:[
		      {field:'Action',  linkText:['Edit','Remove'], onClick:[row=>{ this.formGrid.setFormData(row) },row=>{alert(row.Country+'add');}]}, 
		      {field:'Name', sort:true},
		      {field:'Country', sort:true} ,
		      {field:'Age', sort:true, style:{color:'red'}}
		     
		        ]
	    }
	    var form={
	        formSubmit:function(data){
	          console.log(data)  
	        },
	        formCancel:function(){
	            me.formGrid.showGrid()
	        },
	        fields:[
	            {type:'text', name:'Name', label:'Name', required:true},{type:'text',  label:'Country', name:'Country', required:true},{type:'text',  label:'Age', name:'Age', required:true}
	            ]
	    }
	    this.formGrid=React.render(React.createElement(JwtFormGrid, {gridOptions:grid, formOptions:form}), document.getElementById('jwtFormGrid'))
	}
	
	loadData(){
	    var data=[{Name:'Jasim', Country:'Bangladesh', Age:35}, {Name:'Abdulla', Country:'Turkey', Age:25}]
	    this.formGrid.setGridData(data)
	}
}
jwtFormGridCtrl.$inject=['$scope', 'jwtFormGridSvc'];
export default jwtFormGridCtrl;