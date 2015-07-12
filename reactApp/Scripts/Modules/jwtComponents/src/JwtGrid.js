

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
  previousTH : null,
  syncSortUI:function(th, col) {
       
        if (this.previousTH && th !=this.previousTH) {
            $(this.previousTH).find('div span').removeClass('glyphicon-triangle-top glyphicon-triangle-bottom');
            $(th).find('div span').addClass('glyphicon-triangle-top');
            this.setState({data:this.state.data.sort(this.sortBy(col.field, false))});
        } else {
            var span = $(th).find('div span');
            if (span.hasClass('glyphicon-triangle-top')) {
                span.removeClass('glyphicon-triangle-top').addClass('glyphicon-triangle-bottom');
                this.setState({data:this.state.data.sort(this.sortBy(col.field, true))});
            }
            else if (span.hasClass('glyphicon-triangle-bottom')) {
                span.removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-top');
                this.setState({data:this.state.data.sort(this.sortBy(col.field, false))});
            }
            else {
                span.addClass('glyphicon-triangle-top');
                this.setState({data:this.state.data.sort(this.sortBy(col.field, false))});
            }
        }
        this.previousTH = th;
    },
  onSort:function(col, e){		
		if($(e.target).hasClass('sort')){
			this.syncSortUI(e.target, col);
		}else{
			this.syncSortUI($(e.target).parents('th')[0], col);
		}
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
  		var columns=this.props.options.columns, temp=[];
  		//ES6
  		this.setState({data:this.state.dataStorage.filter(function(item, index){
  			var flag=false;
  			for(var col of columns){
  				if(col.field && item[col.field]){  					
  					flag =flag || item[col.field].toString().toLowerCase().indexOf(searchText)!==-1;
  				}
  			}
  			return flag;
  		})}); 

		//ES5
		/*this.state.dataStorage.forEach(function(item){
			var flag=false;
			columns.forEach(function(col){
				if(col.field && item[col.field]){  					
  					flag =flag || item[col.field].toString().toLowerCase().indexOf(searchText)!==-1;
  				}
			});
			if(flag){
				temp.push(item);
			}
		});
		this.setState({data:temp});*/
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
  checkAll:function(e){
  	for(var row of this.state.data){
  		 row[this.props.options.checkField]=e.target.checked;
  	}
  	this.props.options.checkList(e.target.checked?this.state.data:[]);
  	this.setState({data:this.state.data});
  },
  rowCheck:function(){
  	var res=[];
  	for(var row of this.state.data){
  		if(!!row[this.props.options.checkField]){
  			res.push(row);
  		}
  	}
  	this.refs.allChk.getDOMNode().checked=res.length===this.state.data.length;
  	this.props.options.checkList(res);
  },
  getButtons:function(){
  		if(!this.props.options.buttons){return null;}
  		return  <div className="btn-group">
        {
        	this.props.options.buttons.map(function(btn, index){

        		if(btn.text && btn.className && btn.icon){
        			return <button key={index} type="button" title={btn.title||'You missed the title'} className={btn.className} onClick={btn.onClick}><span className={btn.icon}></span> {btn.text}</button>
        		}
        		else if(btn.text && btn.className){
        			return <button key={index} type="button" title={btn.title||'You missed the title'} className={btn.className} onClick={btn.onClick}>{btn.text}</button>
        		}
        		else if(btn.icon && btn.className){
        			return <button key={index} type="button" className={btn.className} title={btn.title||'You missed the title'} className={btn.className} onClick={btn.onClick}><span className={btn.icon}></span></button>
        		}
        		else if(btn.icon){
        			return <button key={index} type="button" className="btn btn-default" title={btn.title||'You missed the title'}  onClick={btn.onClick}><span className={btn.icon}></span></button>
        		}
        		else{
        			return <button key={index} type="button" title={btn.title||'You missed the title'} className="btn btn-primary" onClick={btn.onClick}>{btn.text}</button>
        		}
        	})
        }
    	</div>
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
    var that=this, headCheck=null;
    if(options.checkList){
    	options.checkField=options.checkField||'_chk_';
          headCheck=<th style={{width:'20px'}}> <input className="chk-head" ref="allChk" type="checkbox" onChange={this.checkAll} /> </th>  				
    } 
    
    return (
            <div className={$class('jwt-grid table-responsive', {hide:this.state.hide})}>
           	 <div className="well">{pager} {this.getNewItem()} {this.getButtons()} {this.getFilter(options)}</div>
            <table className={options.className}>
                <thead>
                    <tr>
                    {
                    	headCheck 
                    	,
                        options.columns.map(function(col, index){
							if(col.sort){
								return  <th key={index} onClick={that.onSort.bind(that, col)} className="sort">
								{col.displayName||col.field}
								<div className="pull-right"><span className="glyphicon" aria-hidden="true"></span></div>
								</th>
							}
                            return <th key={index}>{col.displayName||col.field}</th>
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {
                     data.map(function(row, index){
                       		return <Row key={index} rowCheck={that.rowCheck} options={options} data={row} index={index}/>
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