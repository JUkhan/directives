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
            <ul className="pager">
			 <li><a onClick={this.onFirst} href="javascript:;">First</a></li>
              <li><a onClick={this.onPrevious} href="javascript:;">Previous</a></li>
              <li><a onClick={this.onNext} href="javascript:;">Next</a></li>
			   <li><a onClick={this.onLast} href="javascript:;">Last</a></li>
            </ul>
            )
    }
});
var SparkLine=React.createClass({
    componentDidMount:function(){
        this.renderSparkline()
    },
  componentDidUpdate: function(){
    this.renderSparkline()
  },
  render: function(){
   return <span/>
  },
  renderSparkline:function(){
      var data=angular.isArray(this.props.data)?this.props.data:this.props.data.split(',');
      $(this.getDOMNode()).sparkline(data, this.props.options);
  }
});
var JwtGrid = React.createClass({
  
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
       return <div><b>Data not found.</b></div> 
    }
    if(!options.columns){
     this.componentWillMount()
    }
    return (
            <div className="jwt-grid">
            <table className={options.className}>
                <thead>
                    <tr>
                    {
                        options.columns.map(function(col, index){
                            return <th key={index}>{col.displayName||col.field}</th>
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                {
                     this.props.data.map(function(row, index){
                       return(
                           <tr key={index}>
                            {
                                options.columns.map(function(col){
                                    if(col.spark){
                                        return <td key={col.field} style={col.style}><SparkLine data={row[col.field]} options={col.options}/></td>
                                    }
                                    return <td key={col.field} style={col.style}>{row[col.field]}</td>
                                })
                            }
                        </tr> 
                        )
                     })   
                        
                }
                </tbody>
            </table> 
			 <div><Pager/></div>
            </div>
        )
  }
});

//export default JwtGrid;