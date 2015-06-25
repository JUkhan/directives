

import Pager from 'Scripts/Modules/jwtComponents/Pager.js';
import Row from 'Scripts/Modules/jwtComponents/Row.js';


var JwtGrid = React.createClass({displayName: "JwtGrid",
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
            React.createElement("div", {className: "jwt-grid"}, 
            React.createElement("table", {className: options.className}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                    
                        options.columns.map(function(col, index){ return React.createElement("th", {key: index}, col.displayName||col.field)})
                    
                    )
                ), 
                React.createElement("tbody", null, 
                React.createElement("tr", null, React.createElement("td", {style: {textAlign:'center'}, colSpan: options.columns.length}, React.createElement("b", null, options.loadingText||'Data not found.')))
                )
            )			
            )
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
        	React.createElement("span", {style: {width:'220px'}, className: pos}, 
		      React.createElement("input", {type: "text", ref: "txtSearch", onKeyDown: this.onSearchChane, className: "form-control", placeholder: "Search for..."}), 
		      React.createElement("span", {className: "input-group-btn"}, 
		        React.createElement("button", {className: "btn btn-default", onClick: this.onSearch, type: "button"}, React.createElement("span", {className: "glyphicon glyphicon-search"}), " Search")
		      )
		    )		    
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
  			return React.createElement("a", {href: "javascript:;", className: "btn btn-link", title: this.props.options.newItemText||'Add New Record', onClick: this.props.options.newItem}, " ", React.createElement("span", {className: "glyphicon glyphicon-plus-sign"}), " ")
  		}
  		return null
  },
  render: function() {
    var options=this.props.options;     
    if(!(this.props.data|| this.state.data)){
		if(options.columns){
			return this.getDataNotFound();
		}
       return React.createElement("div", null, React.createElement("b", null, options.loadingText||'Data not found.')) 
    }
	var len=0, data, pager=null, limit=options.limit||20;

	if(options.filter && !this.state.isFilter){this.state.dataStorage=this.props.data||this.state.data;}	
	if(!this.state.data)
	{
		len=this.props.data.length
		if(len>limit){		
			pager=React.createElement(Pager, {pos: options.pagerPos||'left', limit: limit, totalRow: len, onPageChange: this.onPageChange})
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
			pager=React.createElement(Pager, {pos: options.pagerPos||'left', limit: limit, totalRow: len, onPageChange: this.onPageChange})
			
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
            React.createElement("div", {className: $class('jwt-grid table-responsive', {hide:this.state.hide})}, 
           	 React.createElement("div", {className: "well"}, pager, " ", this.getNewItem(), "  ", this.getFilter(options)), 
            React.createElement("table", {className: options.className}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                    
                        options.columns.map(function(col, index){
							if(col.sort){
								return  React.createElement("th", {key: index, onClick: that.onSort.bind(that, col), className: "sort"}, 
								col.displayName||col.field, 
								React.createElement("div", {className: "pull-right"}, React.createElement("span", {className: "glyphicon", "aria-hidden": "true"}))
								)
							}
                            return React.createElement("th", {key: index}, col.displayName||col.field)
                        })
                    
                    )
                ), 
                React.createElement("tbody", null, 
                
                     data.map(function(row, index){
                       		return React.createElement(Row, {key: index, options: options, data: row, index: index})
                     })   
                        
                
                )
            )
			
            )
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