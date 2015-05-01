import BaseCtrl from 'Scripts/Base/BaseCtrl.js';

const SVC=new WeakMap();
class reactWidgetCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='reactWidget';
		this.options={
		   limit:10, loadingText:'loading...', filter:true,
		    columns:[
		      {field:'Action',  linkText:['Edit','Add'], onClick:[row=>{alert(row.Country+'edit');},row=>{alert(row.Country+'add');}]}, 
		      {field:'Name', sort:true, render:(row, inddex)=>'<b style="color:green">'+row.Name+'</b>'},
		      {field:'Country', sort:true, onClick:row=>{alert(row.Country)}} ,
		      {field:'Age', sort:true, style:{color:'red'}},
		      {field:'spark', displayName:'Spark Line', spark:true, options:{type:'line'}}
		        ]
		};
		this.loadData();
		this.sparkLine();
	
	}
	loadData(){
	    SVC.get(this).getData().success(res=>{console.log('done'); 
	    this.data=angular.fromJson(res.data);
	    this.options.loadingText=null;
	     //React.render(React.createElement(HelloComponent, {config: this.person}), document.getElementById('mac'));
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
        
        
	}
}
reactWidgetCtrl.$inject=['$scope', 'reactWidgetSvc'];
export default reactWidgetCtrl;