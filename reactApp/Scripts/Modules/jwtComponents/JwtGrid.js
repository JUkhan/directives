var Pager=React.createClass({
    displayName:'Pager',
	getInitialState:function(){
		return {limit:20, pageNo:1, totalRow:0, totalPage:0, firstClass:'disabled', lastClass:''}
	},
    onFirst:function(){
		this.state.pageNo=1;
		this.props.onPageChange(this.state.pageNo);
		this.setState({firstClass:'disabled', lastClass:''});
	},
	onLast:function(){
		this.state.pageNo=this.state.totalPage;
		this.props.onPageChange(this.state.pageNo);	
		this.setState({firstClass:'', lastClass:'disabled'});
	},
	onPrevious:function(){		
		if(this.state.pageNo>1){
			this.state.pageNo--;
			this.props.onPageChange(this.state.pageNo);
			this.setState({firstClass:this.state.pageNo===1?'disabled':'', lastClass:''});
		}else{
			this.setState({firstClass:'disabled', lastClass:''});
		}
	},
	onNext:function(){
		if(this.state.totalPage>this.state.pageNo){
			this.state.pageNo++;
			this.props.onPageChange(this.state.pageNo);	
			this.setState({firstClass:'', lastClass:this.state.totalPage==this.state.pageNo?'disabled':''});
		}else{
			this.setState({firstClass:'', lastClass:'disabled'});
		}
	},
	componentDidMount:function(){
        this.state.limit=this.props.limit;
		this.state.totalRow=this.props.totalRow;
		this.state.totalPage=parseInt(this.props.totalRow/this.props.limit)+((this.props.totalRow%this.props.limit==0)?0:1);
		
    },
    render:function(){
        return(
            React.createElement("ul", {className: "pager"}, 
			 React.createElement("li", {className: this.state.firstClass}, React.createElement("a", {onClick: this.onFirst, href: "javascript:;"}, "First")), 
              React.createElement("li", {className: this.state.firstClass}, React.createElement("a", {onClick: this.onPrevious, href: "javascript:;"}, "Previous")), 
              React.createElement("li", {className: this.state.lastClass}, React.createElement("a", {onClick: this.onNext, href: "javascript:;"}, "Next")), 
			   React.createElement("li", {className: this.state.lastClass}, React.createElement("a", {onClick: this.onLast, href: "javascript:;"}, "Last"))
            )
            )
    }
});
var SparkLine=React.createClass({displayName: "SparkLine",
    componentDidMount:function(){
        this.renderSparkline()
    },
  componentDidUpdate: function(){
    this.renderSparkline()
  },
  render: function(){
   return React.createElement("span", null)
  },
  renderSparkline:function(){
      var data=angular.isArray(this.props.data)?this.props.data:this.props.data.split(',');
      $(this.getDOMNode()).sparkline(data, this.props.options);
  }
});
var JwtGrid = React.createClass({displayName: "JwtGrid",
  getInitialState:function(){
		return {data:[], pageNo:1}
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
  },
  onPageChange:function(pageNo){  	
	this.setState({pageNo:pageNo});
  }, 
	onSort:function(field){
		this.setState({data:this.state.data.sort(this.sortBy(field, true))});
	},
  sortBy:function(field, reverse, primer){
   var key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
   reverse = !reverse ? 1 : -1;
   return function (a, b) {return a = key(a), b = key(b), reverse * ((a > b) - (b > a)); } 
  },
  //Sort by price high to low
  //console.table( homes.sort(sort_by('price', true, parseInt)));
  
  // Sort by city, case-insensitive, A-Z
  //console.table( homes.sort(sort_by('city', false, function(a){return a.toUpperCase()})));
  
  render: function() {
    var options=this.props.options;
     options.className=options.className||'table table-bordered table-striped';
    if(!this.props.data){
       return React.createElement("div", null, React.createElement("b", null, "Data not found.")) 
    }
	var len=this.props.data.length, pager=null, limit=options.limit||20;
	
	if(len>limit){
		pager=React.createElement(Pager, {limit: limit, totalRow: len, onPageChange: this.onPageChange})
		
		this.state.data=this.props.data.slice(((this.state.pageNo-1)*limit),limit*this.state.pageNo);
	}
	else{
		this.state.data=this.props.data;
	}
    if(!options.columns){
     this.componentWillMount()
    }
    return (
            React.createElement("div", {className: "jwt-grid"}, 
            React.createElement("table", {className: options.className}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                    
                        options.columns.map(function(col, index){
							if(col.sort){
								return  React.createElement("th", {key: index}, React.createElement("span", {onClick: this.onSort.bind(this, col.field), style: {cursor:'pointer'}}, col.displayName||col.field))
							}
                            return React.createElement("th", {key: index}, col.displayName||col.field)
                        }.bind(this))
                    
                    )
                ), 
                React.createElement("tbody", null, 
                
                     this.state.data.map(function(row, index){
                       return(
                           React.createElement("tr", {key: index}, 
                            
                                options.columns.map(function(col, id){
                                    if(col.spark){
                                        return React.createElement("td", {key: id, style: col.style}, React.createElement(SparkLine, {data: row[col.field], options: col.options}))
                                    }
									if(angular.isFunction(col.render)){
										return React.createElement("td", {key: id, dangerouslySetInnerHTML: {__html: col.render(row,index)}})
									}
									if(col.link){
										return React.createElement("td", {key: id, style: col.style}, React.createElement("a", {onClick: col.onClick.bind(null,row, index), href: "javascript:;"}, col.linkText?col.linkText:row[col.field]))
									}
                                    return React.createElement("td", {key: id, style: col.style}, row[col.field])
                                })
                            
                        ) 
                        )
                     })   
                        
                
                )
            ), 
			 React.createElement("div", null, pager)
            )
        )
  }
});

export default JwtGrid;