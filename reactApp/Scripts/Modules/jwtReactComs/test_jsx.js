var HelloComponent = React.createClass({
  propTypes: {
    config : React.PropTypes.object.isRequired
  },
  componentWillMount:function(){
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
  onClick:function(){
  	alert(this.props.fname)
  },
  render: function() {
    var config=this.props.config;
    
    if(!config.data){
       return <div><b>Data not found.</b></div> 
    }
    if(!config.columns){
     this.componentWillMount()
    }
    return (
            <div className="jwt-grid">
            <table className={config.className}>
                <thead>
                    <tr>
                    {
                        config.columns.map(function(col, index){
                            return <th key={index}>{col.displayName||col.field}</th>
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {
                     config.data.map(function(row, index){
                       return(
                           <tr key={index}>
                            {
                                config.columns.map(function(col){
                                    return <td key={col.field}>{row[col.field]}</td>
                                })
                            }
                        </tr> 
                        )
                     })   
                        
                }
                </tbody>
            </table>    
            </div>
        )
  }
})