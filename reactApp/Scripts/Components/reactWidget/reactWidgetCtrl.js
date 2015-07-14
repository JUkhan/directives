import BaseCtrl from 'Scripts/Base/BaseCtrl.js';
import JwtForm from 'Scripts/Modules/jwtComponents/JwtForm.js';
import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
import JwtSparkLine from 'Scripts/Modules/jwtComponents/JwtSparkLine.js';

const SVC=new WeakMap();
class reactWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='reactWidget';
		this.options={
		    checkList:(data)=>{
		        console.log(data);
		    },
		   limit:10, loadingText:'loading...', filter:true,
		    columns:[
		      {field:'Action',  linkText:['Edit','Add'], onClick:[row=>{alert(row.Country+'edit');},row=>{alert(row.Country+'add');}]}, 
		      {field:'Name', sort:true, render:(row, inddex)=>'<b style="color:green">'+row.Name+'</b>'},
		      {field:'Country', sort:true, onClick:row=>{alert(row.Country)}} ,
		      {field:'Age', sort:true, style:{color:'red'}},
		      {field:'spark', displayName:'Spark Line', spark:true, options:{type:'line'}}
		        ]
		};
		
	    this.grid=React.render(React.createElement(JwtGrid,{options:this.options}), document.getElementById('grid'));
		
		this.loadData();
		this.sparkLine();
		var fornOptions={
		    laf:'primary',
		   formSubmit:function(data){
		       console.log(data)
		   },
		   formCancel:function(){
		     alert('form canceled!')  
		   },
		   validate:data=>{
		       //this.form.showMessage('Test error!')
		       return true;
		   },
		    fields:[
		        {type:'text', name:'name', label:'Full Name' , required:true},
		        {type:'textarea', name:'address', label:'Address', required:true},
		         {type:'select', name:'country', label:'Countries',  required:true , displayField:'name', valueField:'id', onChange:(val, obj)=>{console.log(val, obj)}},
		         {type:'radio', name:'gender', label:'Gender', labelList:['MALE','FEMALE'], values:['male','Female'], defaultCheckedValue:'male', required:true},
		         {type:'checkbox', name:'namex', label:'Gender'},
		        ]
		};
	   this.form= React.render(React.createElement(JwtForm, { options:fornOptions}), document.getElementById('contactform'));
	  
	}
	setFormData(){
	    this.form.setFormData({name: "sdfsd", address: "sdfsdf", country: "Pakisthan", gender: 'Female',  namex: true});
	    this.form.refresh()
	    this.form.setSelectOptions('country',[{id:1, name:'Ban'},{id:2, name:'NAK'}])
	    this.form.show()
	}

	loadData(){
	    SVC.get(this).getData().success(res=>{console.log('done'); 
	    this.grid.setData(angular.fromJson(res.data));
	   
	    });
	}
	
	sparkLine(){
	    
	    this.stprkData = [10,8,5,7,4,4];
        this.sparkOptions ={
            type: 'pie',
            width: '200px',
            height: '200px',
            //sliceColors: ['#5d3092', '#4dc9ec', '#9de49d', '#9074b1', '#66aa00', '#dd4477', '#0099c6', '#990099'],
            borderWidth: 7,
            borderColor: '#f5f5f5',
            tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{offset:names}} ({{percent.1}}%)',
            tooltipValueLookups: {
                names: {
                    0: 'Automotive',
                    1: 'Locomotive',
                    2: 'Unmotivated',
                    3: 'Three',
                    4: 'Four',
                    5: 'Five'
                    // Add more here
                }
            }
        };
        
        React.render(React.createElement(JwtSparkLine, { options:this.sparkOptions, data:this.stprkData}), document.getElementById('sparkLine'));
	}
}
reactWidgetCtrl.$inject=['$scope', 'reactWidgetSvc'];
export default reactWidgetCtrl;