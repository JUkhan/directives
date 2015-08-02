import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtFormGrid from 'Scripts/Modules/jwtComponents/JwtFormGrid.js';
import JwtMultiSelect from 'Scripts/Modules/jwtComponents/JwtMultiSelect.js';

const SVC=new WeakMap();
class jwtFormGridCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='jwtFormGrid';
		this.prepareFormGrid()
		this.loadData()
		
		
		var data=[
		    {name:'ripon'}, {name:'jasim'}, {name:'rakib'}, {name:'fatema'}, {name:'jhura'}, {name:'Salma'}, {name:'Nipa'}
		    ];
		this.ms=React.render(React.createElement(JwtMultiSelect, {data:data,  render:function(d, i){ return d.name+' '+i; }, displayField:'name', valueField:'name' }), document.getElementById('ms'))
	}
	
	prepareFormGrid(){
	    var me=this
	    var grid={
	        headTpl:['<th colspan=3>test</th><th colspan=2>test</th>','<th colspan=3>test2</th><th colspan=2>test2</th>'],
	        checkList:(data)=>{ console.log(data); },
	       buttons:[
	           {text:'Hello', onClick:()=>{alert('i am hello')}},
	            {text:'Bangladesh', className:'btn btn-success', onClick:()=>{alert('i am bangladesh')}},
	            {icon:'glyphicon glyphicon-plus-sign', onClick:()=>{me.formGrid.showFormWithRefresh(); me.ms.setValue('ripon,rakib,Salma'); }},
	            { text:'Droon', className:'btn btn-primary', title:'Droon attack on israil', icon:'glyphicon glyphicon-plus-sign', onClick:()=>{alert('i am plus sign')}}
	           ],
	         limit:1, loadingText:'loading...', filter:true, newItem:function(){me.formGrid.showFormWithRefresh(); },newItemText:'Add New Item',
		    columns:[
		      {field:'Action', style:{width:'70px'},  icon:['glyphicon glyphicon-ok','glyphicon glyphicon-remove'],  linkText:['Edit','Remove'], onClick:[row=>{ this.formGrid.setFormData(row) },row=>{alert(row.Country+'add');}]}, 
		      {field:'Name', sort:true},
		      {field:'Country', sort:true} ,
		      {field:'Age', sort:true, style:{color:'red'}}
		     
		        ]
	    }
	    var form={
	        fileUpload:true,col:3,
	        buttons:[
	           {text:'Hello', onClick:()=>{alert('i am hello')}},
	            {text:'Bangladesh', className:'btn btn-success', onClick:()=>{alert('i am bangladesh')}},
	            {icon:'glyphicon glyphicon-plus-sign', onClick:()=>{me.formGrid.showFormWithRefresh(); me.ms.setValue('ripon,rakib,Salma'); }},
	            { text:'Droon', className:'btn btn-primary', title:'Droon attack on israil', icon:'glyphicon glyphicon-plus-sign', onClick:()=>{alert('i am plus sign')}}
	           ],
	        formSubmit:function(data){
	          console.log(data)  
	        },
	        formCancel:function(){
	            me.formGrid.showGrid()
	            me.formGrid.showMessage('Form has been closed successfully!.')
	        },
	        fields:[
	            //{type:'text', name:'Name', label:'Name', icon:'glyphicon glyphicon-plus-sign', onClick:()=>{alert('NAme check');}},
	            {type:'timepicker',  name:'Name', label:'Name', required:true},
	            {type:'colorpicker',  label:'Country', name:'Country', required:true},
	            //{type:'info', message:'Non Member', laf:'success'},
	            {type:'datepicker',  label:'Age', name:'Age', required:true, options:{format:'dd-mm-yyyy'}, buttonText:'Check' ,onClick:()=>{alert(123);}},
	            {type:'multiSelect',  label:'Multi Select', name:'ms', required:true, render:function(d, i){ return d.name+' '+i; }, displayField:'name',valueField:'name',data:[{name:'Rana'},{name:'Motiur Mamma'}]},
	            {type:'multiSelect',  label:'Multi Select2', name:'ms2', hwidth:'200px', onClick:function(val){console.log(val);}, width:'300px', required:true, displayField:'name',valueField:'name',data:[{name:'Rana'},{name:'Motiur'}]}
	            ]
	    }
	    this.formGrid=React.render(React.createElement(JwtFormGrid, {gridOptions:grid, formOptions:form}), document.getElementById('jwtFormGrid'))
	}
	
	loadData(){
	    var data=[{Name:'Jasim', Country:'Bangladesh', Age:35}, {Name:'Abdulla', Country:'Turkey', Age:25}]
	    this.formGrid.setGridData(data)
	    this.formGrid.showMessage('Grid data has been loaded.')
	}
}
jwtFormGridCtrl.$inject=['$scope', 'jwtFormGridSvc'];
export default jwtFormGridCtrl;