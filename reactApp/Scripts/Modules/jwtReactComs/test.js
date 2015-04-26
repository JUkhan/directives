var HelloComponent = React.createClass({displayName: "HelloComponent",
  propTypes: {
    config : React.PropTypes.object.isRequired
  },
  componentWillMount:function(){
       console.log('component will mount'); 
     var config=this.props.config;
     config.className=config.className||'table table-bordered table-striped';
     if(config.data){
        if(!config.columns){
            config.columns=[];    
          for (var col in config.data[0]) {
              config.columns.push({field:col, displayName:col});
          }
        }
     }  
  },
  componentDidMount:function(){
     console.log('component did mount'); 
  } ,
  onClick:function(){
  	alert(this.props.fname)
  },
  render: function() {
     
    var config=this.props.config;
    
    if(!config.data){
       return React.createElement("div", null, React.createElement("b", null, "Data not found.")) 
    }
     console.log('start rendering');
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
                                    return React.createElement("td", {key: col.field}, row[col.field])
                                })
                            
                        ) 
                        )
                     })   
                        
                
                )
               // console.log('render done....');
            )
            )
        )
  }
})
export default HelloComponent;