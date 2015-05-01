import BaseCtrl from 'Scripts/base/BaseCtrl.js';
const SVC=new WeakMap();
class homeCtrl extends BaseCtrl
{
	constructor(scope, svc){
		super(scope);
		SVC.set(this, svc);
		this.title='home';
      	this.loadData();
      	 this.chartTypes = [
                {"id": "line", "title": "Line"},
                {"id": "spline", "title": "Smooth line"},
                {"id": "area", "title": "Area"},
                {"id": "areaspline", "title": "Smooth area"},
                {"id": "column", "title": "Column"},
                {"id": "bar", "title": "Bar"},
                {"id": "pie", "title": "Pie"},
                {"id": "scatter", "title": "Scatter"}
            ];
        this.chartStack = [
            {"id": '', "title": "No"},
            {"id": "normal", "title": "Normal"},
            {"id": "percent", "title": "Percent"}
          ];
	}
  	loadData(){
      //SVC.get(this).getData().success(data=>{this.list= data;});
      this.chartConfig={
          "options":{
              "chart":{"type":"areaspline"},
              "plotOptions":{"series":{"stacking":"no"}}
              
          },
          "series":[
              {"name":"Some data", "data":[1,2,4,7,3],"id":"series-0"},
              {"name":"Some data 3","data":[3,1,null,5,2],"connectNulls":true,"id":"series-1"},
              {"name":"Some data 2","data":[5,2,2,3,5],"type":"column","id":"series-2"},
              {"name":"My Super Column","data":[1,1,2,3,2],"type":"column","id":"series-3"}],
        "title":{"text":"Sample Charts"},
        "credits":{"enabled":false},
        "loading":false,"size":{}};
    }
}
homeCtrl.$inject=['$scope', 'homeSvc'];
export default homeCtrl;