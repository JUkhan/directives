import SparkLine from 'Scripts/Modules/jwtComponents/SparkLine.js';
import Pager from 'Scripts/Modules/jwtComponents/Pager.js';

var JwtGrid = React.createClass({
  getDefaultProps:function(){
      return {options:{}}
  }, 
  getInitialState:function(){
		return {data:[], pageNo:1, dataStorage:null, isFilter:false}
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
  },
  onPageChange:function(pageNo){  	
	this.setState({pageNo:pageNo});
  }, 
	onSort:function(col){
		if(col.asc===undefined){col.asc=true;}		
		col.asc=!col.asc;		
		this.setProps({data:this.props.data.sort(this.sortBy(col.field, col.asc))});
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
  getLinks:function(row, col, index){
	  	if(!angular.isArray(col.onClick)){
			col.onClick=[col.onClick];
		}
		var linkText=col.linkText;
		if(!linkText){
			linkText=row[col.field];
		}
		if(!angular.isArray(linkText)){
			linkText=[linkText];
		}
		return  col.onClick.map(function(fx, id){return <a key={id} className="link" onClick={fx.bind(null,row, index)} href="javascript:;">{linkText[id]}</a>})		
  },
  onSearch:function(){  		
  		var searchText=this.refs.txtSearch.getDOMNode().value;
  		if(!searchText){
  			this.state.isFilter=false;
  			this.setProps({data:this.state.dataStorage});  			
  			return;
  		}
  		this.state.isFilter=true;
  		this.state.pageNo=1;
  		searchText=searchText.toLowerCase();  		 		
  		var colimns=this.props.options.columns, temp=[];
  		this.setProps({data:this.props.data.filter(function(item, index){
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
  		if(event.keyCode==13){this.onSearch();}
  },
  getFilter:function(options){
  	if(!options.filter){return null;}
  	return (
  		//<div className="pull-right">
        	<div style={{width:'35%'}} className="input-group">
		      <input type="text" ref="txtSearch" onKeyDown={this.onSearchChane} className="form-control" placeholder="Search for..."/>
		      <span className="input-group-btn">
		        <button className="btn btn-default" onClick={this.onSearch} type="button">Go!</button>
		      </span>
		    </div>   
		//</div>          
  		)
  },
  render: function() {
    var options=this.props.options; 

    if(!this.props.data){
		if(options.columns){
			return this.getDataNotFound();
		}
       return <div><b>{options.loadingText||'Data not found.'}</b></div> 
    }
	var len=this.props.data.length, pager=null, limit=options.limit||20;
	if(options.filter && !this.state.isFilter){this.state.dataStorage=this.props.data;}	
	if(len>limit){
		pager=<Pager limit={limit} totalRow={len} onPageChange={this.onPageChange}  />
		
		this.state.data=this.props.data.slice(((this.state.pageNo-1)*limit),limit*this.state.pageNo);
	}
	else{
		this.state.data=this.props.data;		
	}
    if(!options.columns){
     this.componentWillMount()
    }
    var that=this;
    return (
            <div className="jwt-grid">
           	 <div>{this.getFilter(options)}</div>
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
                     this.state.data.map(function(row, index){
                       return(
                           <tr key={index}>
                            {
                                options.columns.map(function(col, id){
                                    if(col.spark){
                                        return <td key={id} style={col.style}><SparkLine data={row[col.field]} options={col.options}/></td>
                                    }
									if(angular.isFunction(col.render)){
										return <td key={id}  dangerouslySetInnerHTML={{__html: col.render(row,index)}}></td>
									}
									if(col.onClick){										
										return <td key={id} className={col.className} style={col.style}>{that.getLinks(row, col, index)}</td>
									}
                                    return <td key={id} className={col.className} style={col.style}>{row[col.field]}</td>
                                })
                            }
                        </tr> 
                        )
                     })   
                        
                }
                </tbody>
            </table> 
			 <div>{pager}</div>
            </div>
        )
  }
});

//export default JwtGrid;