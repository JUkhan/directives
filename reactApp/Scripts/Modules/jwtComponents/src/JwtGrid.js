var Pager=React.createClass({
    displayName:'Pager',
	getInitialState:function(){
		return {limit:20, pageNo:1, totalRow:0, totalPage:0}
	},
    onFirst:function(){
		console.log('first', arguments);
	},
	onLast:function(){
		
	},
	onPrevious:function(){		
		if(this.state.pageNo>1){
			this.state.pageNo--;
			this.props.onPageChange(this.state.pageNo);
		}
	},
	onNext:function(){
		if(this.state.totalPage>this.state.pageNo){
			this.state.pageNo++;
			this.props.onPageChange(this.state.pageNo);
		}
	},
	componentDidMount:function(){
        this.state.limit=this.props.limit;
		this.state.totalRow=this.props.totalRow;
		this.state.totalPage=(this.props.totalRow/this.props.limit)+((this.props.totalRow%this.props.limit)?0:1);
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
  	//this.state.pageNo=pageNo;
	this.setState({pageNo:pageNo});
  },  
  render: function() {
    var options=this.props.options;
     options.className=options.className||'table table-bordered table-striped';
    if(!this.props.data){
       return <div><b>Data not found.</b></div> 
    }
	var len=this.props.data.length, pager=null, limit=options.limit||5;
	
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
                     this.state.data.map(function(row, index){
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
			 <div>{pager}</div>
            </div>
        )
  }
});

//export default JwtGrid;