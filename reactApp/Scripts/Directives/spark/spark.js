class spark
{
	constructor(){
		this.restrict='A';
		this.scope={data:'='};
	}
  	link(scope, element, attr){ 
      
      attr.type=attr.type||'line';
      scope.$watch('data', function(){        
        element.sparkline(scope.data, attr);
      });
      
    }
	static builder()	{
		return new spark();
	}
}
export default spark;