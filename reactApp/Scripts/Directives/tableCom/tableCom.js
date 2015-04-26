const COMPILE=new WeakMap();
class tableCom
{
	constructor(compile){
      	COMPILE.set(this, compile);
		this.restrict='A';		
      	this.scope={
          data:'=', columnDef:'='
        };
	}
  
  	link(scope, iElement, attr){      
      	
      	scope.$watch('data', function(){
          tableCom.instance.render(scope, iElement);
        });      	
      
      	tableCom.instance.render(scope, iElement);
    }
  	render(scope, element){
      element.empty().append(COMPILE.get(this)(this.getTemplate(scope))(scope));
    }
  	getTemplate(scope){
      var tpl=[], data=scope.data;
      if(angular.isArray(data) && data.length>0){
          
          	tpl.push('<table class="table table-bordered table-striped">');
            //thead         
            tpl.push('<thead><tr>');
        	tpl.push(this.getHead(scope));
          	tpl.push('</tr></thead>');
          	//tbody
          	tpl.push('<tbody><tr ng-animate="\'animate\'" ng-repeat="row in data">');
        	tpl.push(this.getBody(scope));
          	tpl.push('</tr></tbody>');
          
            tpl.push('</table>');         
        }
      	else{
          tpl.push('<b>Data not found.<b>')
        }
      	return tpl.join('');
    }
  	
  	getHead(scope){
      	var tpl=[], data=scope.data, cold=scope.columnDef;
      	if(angular.isArray(cold) && cold.length>0){
          	for(let i=0,len=cold.length;i<len;i++){
              	 tpl.push('<th>'+(cold[i].displayName||cold[i].field)+'</th>');
            }
        }else{
          for(var prop in data[0]){
              tpl.push('<th>'+prop+'</th>');
            }
        }
      	return tpl.join('');
    }
  	
  	getBody(scope){
      	var tpl=[], data=scope.data, cold=scope.columnDef;
      	if(angular.isArray(cold) && cold.length>0){
          	for(let i=0,len=cold.length;i<len;i++){
              	if(angular.isDefined(cold[i].template)){
                   tpl.push('<td>'+cold[i].template+'</td>');
                }               
                else{
                   tpl.push('<td ng-bind="row[\''+cold[i].field+'\']"></td>');
                }
            }
        }else{
          for(var prop in data[0]){
              tpl.push('<td ng-bind="row[\''+prop+'\']"></td>');
            }
        }
      	return tpl.join('');
    }
	static builder(compile){
      	tableCom.instance=new tableCom(compile);
		return tableCom.instance;
	}
}
tableCom.builder.$inject=['$compile'];
export default tableCom;