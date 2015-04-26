// editor = React.createElement(NoteEditor, {note: selectedNote, onChange: this.props.onChangeNote})
var sparkLine=React.createClass({displayName: "sparkLine",
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
})
var HelloComponent = React.createClass({displayName: "HelloComponent",
  propTypes: {
    config : React.PropTypes.object.isRequired
  },
  componentWillMount:function(){
     var config=this.props.config;
    
     if(config.data){
        if(!config.columns){
            config.columns=[];    
          for (var col in config.data[0]) {
              config.columns.push({field:col, displayName:col});
          }
        }
     }  
  },
  onClick:function(){
  	alert(this.props.fname)
  },
  render: function() {
    var config=this.props.config;
     config.className=config.className||'table table-bordered table-striped';
    if(!config.data){
       return React.createElement("div", null, React.createElement("b", null, "Data not found.")) 
    }
    if(!config.columns){
     this.componentWillMount()
    }
    return (
            React.createElement("div", {className: "jwt-grid"}, 
            React.createElement("table", {className: config.className}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                    
                        config.columns.map(function(col, index){
                            return React.createElement("th", {key: index}, col.displayName||col.field)
                        })
                    
                    )
                ), 
                React.createElement("tbody", null, 
                
                     config.data.map(function(row, index){
                       return(
                           React.createElement("tr", {key: index}, 
                            
                                config.columns.map(function(col){
                                    if(col.spark){
                                        return React.createElement("td", {key: col.field}, React.createElement(sparkLine, {data: row[col.field], options: col.options}))
                                    }
                                    return React.createElement("td", {key: col.field}, row[col.field])
                                })
                            
                        ) 
                        )
                     })   
                        
                
                )
            )
            )
        )
  }
})
export default HelloComponent;