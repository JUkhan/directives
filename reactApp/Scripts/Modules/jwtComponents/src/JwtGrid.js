

import Pager from 'Scripts/Modules/jwtComponents/Pager.js';
import Row from 'Scripts/Modules/jwtComponents/Row.js';


var JwtGrid = React.createClass({
  getInitialState:function(){
		return {data:null, pageNo:1, dataStorage:null, isFilter:false, hide:false}
	},
	 getDefaultProps:function(){
      return {options:{}}
  }, 
  componentWillMount:function(){
     var options=this.props.options;    
     if(this.props.data){
        if(!options.columns){
            options.columns=[];    
          for (var col in this.props.data[0]) {
              options.columns.push({field:col, displayName:col});
          }
        }
     } 
	//do other stuff
	options.className=options.className||'table table-bordered table-striped';	
	if(options.onKeypressFilter===undefined){
	        options.onKeypressFilter=true;
	}  
  },
  onPageChange:function(pageNo){  	
	this.setState({pageNo:pageNo});
  }, 
	onSort:function(col){
		if(col.asc===undefined){col.asc=true;}		
		col.asc=!col.asc;		
		this.setState({data:this.state.data.sort(this.sortBy(col.field, col.asc))});
		//this.forceUpdate();
	},
  sortBy:function(field, reverse, primer){
   var key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
   reverse = !reverse ? 1 : -1;
   return function (a, b) {return a = key(a), b = key(b), reverse * ((a > b) - (b > a)); } 
  },  
  getDataNotFound:function(){
	 var options=this.props.options;
	return (
            <div className="jwt-grid">
            <table className={options.className}>
                <thead>
                    <tr>
                    {
                        options.columns.map(function(col, index){ return <th key={index}>{col.displayName||col.field}</th>})
                    }
                    </tr>
                </thead>
                <tbody>
                <tr><td style={{textAlign:'center'}} colSpan={options.columns.length}><b>{options.loadingText||'Data not found.'}</b></td></tr>
                </tbody>
            </table> 			
            </div>
        )
  },
 
  onSearch:function(){  		
  		var searchText=this.refs.txtSearch.getDOMNode().value;
  		if(!searchText){
  			this.state.isFilter=false;  			
  			this.setState({data:this.props.data||this.state.dataStorage});  			
  			return;
  		}
  		this.state.isFilter=true;
  		this.state.pageNo=1;
  		searchText=searchText.toLowerCase();  		 		
  		var colimns=this.props.options.columns, temp=[];

  		this.setState({data:this.state.dataStorage.filter(function(item, index){
  			var flag=false;
  			for(var col of colimns){
  				if(col.field && item[col.field]){
  					var txt=item[col.field].toString().toLowerCase();
  					flag =flag || txt.indexOf(searchText)!==-1;
  				}
  			}
  			return flag;
  		})}); 
  },
  onSearchChane:function(event){
  		if(event.keyCode==13){this.onSearch();return;}
      if(this.props.options.onKeypressFilter){
         setTimeout(this.onSearch, 0);
      }
  },
  getFilter:function(options){
  	if(!options.filter){return null;}
  	var pos='input-group pull-'+(this.props.options.filterPos||'right');
  	return (  		
        	<span style={{width:'220px'}} className={pos}>
		      <input type="text" ref="txtSearch" onKeyDown={this.onSearchChane} className="form-control" placeholder="Search for..."/>
		      <span className="input-group-btn">
		        <button className="btn btn-default" onClick={this.onSearch} type="button"><span className="glyphicon glyphicon-search"></span> Search</button>
		      </span>
		    </span>		    
  		)
  },
  setData:function(data){  		
  		this.setState({data:data})
  },
  show:function(){
  	this.setState({hide:false})
  },
  hide:function(){
  	this.setState({hide:true})
  },
  getNewItem:function(){
  		if(this.props.options.newItem){
  			return <a href="javascript:;" className="btn btn-link" title={this.props.options.newItemText||'Add New Record'} onClick={this.props.options.newItem}> <span className="glyphicon glyphicon-plus-sign"></span> </a>
  		}
  		return null
  },
  render: function() {
    var options=this.props.options;     
    if(!(this.props.data|| this.state.data)){
		if(options.columns){
			return this.getDataNotFound();
		}
       return <div><b>{options.loadingText||'Data not found.'}</b></div> 
    }
	var len=0, data, pager=null, limit=options.limit||20;

	if(options.filter && !this.state.isFilter){this.state.dataStorage=this.props.data||this.state.data;}	
	if(!this.state.data)
	{
		len=this.props.data.length
		if(len>limit){		
			pager=<Pager pos={options.pagerPos||'left'} limit={limit} totalRow={len} onPageChange={this.onPageChange}  />
			this.state.data=this.props.data;
			data=this.props.data.slice(((this.state.pageNo-1)*limit),limit*this.state.pageNo);

		}
		else {
			this.state.data=this.props.data;	
			data=this.state.data	
		}
	}else{
		len=this.state.data.length
		if(len>limit){		
			pager=<Pager pos={options.pagerPos||'left'} limit={limit} totalRow={len} onPageChange={this.onPageChange}  />
			
			data=this.state.data.slice(((this.state.pageNo-1)*limit),limit*this.state.pageNo);
		}
		else{
			data=this.state.data;
		}		
	}

    if(!options.columns){
     this.componentWillMount()
    }
    var that=this;
    return (
            <div className={$class('jwt-grid table-responsive', {hide:this.state.hide})}>
           	 <div className="well">{pager} {this.getNewItem()}  {this.getFilter(options)}</div>
            <table className={options.className}>
                <thead>
                    <tr>
                    {
                        options.columns.map(function(col, index){
							if(col.sort){
								return  <th key={index}><span onClick={that.onSort.bind(that, col)} style={{cursor:'pointer'}}>{col.displayName||col.field}</span></th>
							}
                            return <th key={index}>{col.displayName||col.field}</th>
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {
                     data.map(function(row, index){
                       		return <Row key={index} options={options} data={row} index={index}/>
                     })   
                        
                }
                </tbody>
            </table> 
			
            </div>
        )
  }
});

function $class(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}

export default JwtGrid;