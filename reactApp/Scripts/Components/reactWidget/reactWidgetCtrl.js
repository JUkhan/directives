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
		    },
		    columns:[
		        {field:'Name'}, {field:'Country'} ,{field:'Age', style:{color:'red'}}, {field:'spark', displayName:'Spark Line', spark:true, options:{type:'line'}}
		        ]
		};
		this.loadData();
		this.sparkLine();
	}
	loadData(){
	    SVC.get(this).getData().success(res=>{console.log('done'); 
	    this.data=angular.fromJson(res.data);
	    this.data[0].Name='<b style="color:green">'+this.data[0].Name+'</b>';
	   this.person.render=false;
	     //React.render(React.createElement(HelloComponent, {config: this.person}), document.getElementById('mac'));
	    });
	}
	/*
	var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

 //Sort by price high to low
console.table( homes.sort(sort_by('price', true, parseInt)));

// Sort by city, case-insensitive, A-Z
console.table( homes.sort(sort_by('city', false, function(a){return a.toUpperCase()})));
	*/
	sparkLine(){
	    
	    var myvalues = [10,8,5,7,4,4];
	    
        $('#sparkline').sparkline(myvalues, {
            type: 'pie',
            width: '200px',
            height: '200px',
            sliceColors: ['#5d3092', '#4dc9ec', '#9de49d', '#9074b1', '#66aa00', '#dd4477', '#0099c6', '#990099'],
            borderWidth: 7,
            borderColor: '#f5f5f5',
            tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{offset:names}} ({{percent.1}}%)',
            // tooltipFormat: '{{offset:slice}} ({{percent.1}}%)',
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
        });
        
        //$("#sparkline").sparkline([5,6,7,9,9,5,3,2,2,4,6,7], { type: 'line'});
	}
}
reactWidgetCtrl.$inject=['$scope', 'reactWidgetSvc'];
export default reactWidgetCtrl;