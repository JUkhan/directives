var Pager=React.createClass({
    displayName:'Pager',
    onFirst:function(){
		console.log('first', arguments);
	},
	onLast:function(){
		
	},
	onPrevious:function(){
		
	},
	onNext:function(){
		
	},
    render:function(){
        return(
            React.createElement("ul", {className: "pager"}, 
			 React.createElement("li", null, React.createElement("a", {onClick: this.onFirst, href: "javascript:;"}, "First")), 
              React.createElement("li", null, React.createElement("a", {onClick: this.onPrevious, href: "javascript:;"}, "Previous")), 
              React.createElement("li", null, React.createElement("a", {onClick: this.onNext, href: "javascript:;"}, "Next")), 
			   React.createElement("li", null, React.createElement("a", {onClick: this.onLast, href: "javascript:;"}, "Last"))
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
  onClick:function(){
  	alert(this.props.fname)
  },
  render: function() {
    var options=this.props.options;
     options.className=options.className||'table table-bordered table-striped';
    if(!this.props.data){
       return React.createElement("div", null, React.createElement("b", null, "Data not found.")) 
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
                            return React.createElement("th", {key: index}, col.displayName||col.field)
                        })
                    
                    )
                ), 
                React.createElement("tbody", null, 
                
                     this.props.data.map(function(row, index){
                       return(
                           React.createElement("tr", {key: index}, 
                            
                                options.columns.map(function(col){
                                    if(col.spark){
                                        return React.createElement("td", {key: col.field, style: col.style}, React.createElement(SparkLine, {data: row[col.field], options: col.options}))
                                    }
                                    return React.createElement("td", {key: col.field, style: col.style}, row[col.field])
                                })
                            
                        ) 
                        )
                     })   
                        
                
                )
            ), 
			 React.createElement("div", null, React.createElement(Pager, null))
            )
        )
  }
});

//export default JwtGrid;