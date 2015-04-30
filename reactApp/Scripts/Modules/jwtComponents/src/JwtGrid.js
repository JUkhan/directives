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
            <ul className="pager">
			 <li className={this.state.firstClass}><a onClick={this.onFirst} href="javascript:;">First</a></li>
              <li className={this.state.firstClass}><a onClick={this.onPrevious} href="javascript:;">Previous</a></li>
              <li className={this.state.lastClass}><a onClick={this.onNext} href="javascript:;">Next</a></li>
			   <li className={this.state.lastClass}><a onClick={this.onLast} href="javascript:;">Last</a></li>
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
	//do other stuff
	options.className=options.className||'table table-bordered table-striped';	
  },
  onPageChange:function(pageNo){  	
	this.setState({pageNo:pageNo});
  }, 
	onSort:function(field){
	this.setProps({data:this.props.data.sort(this.sortBy(field, true))});
		//this.forceUpdate();
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
                <tr><td style={{textAlign:'center'}} colSpan={options.columns.length}><b>Data not found.</b></td></tr>
                </tbody>
            </table> 			
            </div>
        )
  },
  render: function() {
    var options=this.props.options;     
    if(!this.props.data){
		if(options.columns){
			return this.getDataNotFound();
		}
       return <div><b>Data not found.</b></div> 
    }
	var len=this.props.data.length, pager=null, limit=options.limit||20;
	
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
							if(col.sort){
								return  <th key={index}><span onClick={this.onSort.bind(this, col.field)} style={{cursor:'pointer'}}>{col.displayName||col.field}</span></th>
							}
                            return <th key={index}>{col.displayName||col.field}</th>
                        }.bind(this))
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
									if(col.link){
										return <td key={id} style={col.style}><a onClick={col.onClick.bind(null,row, index)} href="javascript:;">{col.linkText?col.linkText:row[col.field]}</a></td>
									}
                                    return <td key={id} style={col.style}>{row[col.field]}</td>
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