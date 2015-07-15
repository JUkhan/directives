
var JwtTree = React.createClass({
  getInitialState:function(){
    return {data:null}
  },
  getDefaultProps:function(){
      return {options:{}}
  }, 
  componentWillMount:function(){
    
  },
  
  getDataNotFound:function(){   
    return <b>{this.props.options.loadingText||'Data not found.'}</b>
  }, 
  
  render: function() {
    var options=this.props.options;     
    if(!this.props.data){   
       return <div><b>{options.loadingText||'Data not found.'}</b></div> 
    } 
    if(!this.state.data){
        this.state.data=this.props.data;
    }
    return (
            <div className="jwt-tree">
             
            <ul className="root"> {              
                     this.state.data.map(function(row, index){                     	
                          return <JwtTreeItem key={index} level={1} options={options} data={row} index={index}/>
                     })   
                        
              }</ul>
      
            </div>
        )
  }
});

var JwtTreeItem=React.createClass({
  getInitialState:function(){
    return {isExpanded:false}
  },
  getDefaultProps:function(){
      return {options:{}}
  }, 
  getLinks:function(row){
    console.log(row);
    return <a className="btn btn-link" onClick={this.props.options.onClick.bind(null,row)} href="javascript:;">{row[this.props.options.displayField]}</a>
  },
  expand:function(){  
    
    this.setState({isExpanded:!this.state.isExpanded});
    
  },
  render:function(){    
     var that=this; 
     this.state.data=this.props.data;
     if(that.state.isExpanded) {
      that.icon='bottom';
      return <li>
                   <div key={that.props.index}>{ that.renderRow(that.props.options, that.props.index)}</div>
                   <ul className={'level-'+that.props.level}>{ 
                        that.props.data[that.props.options.childrenField].map(function(row, index){           
                            return <JwtTreeItem key={index+that.props.index+1} level={that.props.level+1} options={that.props.options} data={row} index={index} />
                        })
                   }</ul>
           </li>
      
     }
     else{
      that.icon='right';          
        return <li key={that.props.index} className={'level-'+that.props.level}>{that.renderRow(that.props.options, that.props.index)}</li>
     }
  },
  getCheckbox:function(){
    if(this.props.options.checkList){
       // if(this.props.options.childrenField && this.state.data[this.props.options.childrenField] && this.state.data[this.props.options.childrenField].length>0){
        //   return <span><input type="checkbox" checked={this.state.data['_chk_']} onChange={this.checkItemAll} /></span>
       // }
        return <span><input type="checkbox" checked={this.state.data['_chk_']} onChange={this.checkItem} /></span>
    }
    return null;
  },
  checkItem:function(e){
    this.state.data['_chk_']=e.target.checked;
    if( typeof this.props.checkList  ==='function'){
        this.props.checkList(this.state.data, e.target);
     }
    this.setState({data:this.state.data});
  },
  checkItemAll:function(e){
    this.state.data['_chk_']=e.target.checked;
    this.state.data[this.props.options.childrenField].forEach(function(d){ d['_chk_']=e.target.checked; });
    if( typeof this.props.checkList  ==='function'){
        this.props.checkList(this.state.data, e.target);
     }
    this.setState({data:this.state.data});
  },
  renderRow:function(col, id){   

   var icon='indented glyphicon glyphicon-triangle-'+this.icon;
  
    if(this.props.options.childrenField && this.state.data[this.props.options.childrenField] && this.state.data[this.props.options.childrenField].length>0){
          if(col.onClick){                    
            return <span key={id} className="item"><span style={{cursor:'pointer'}} onClick={this.expand} className={icon}></span>  {this.getCheckbox()} {this.getLinks(this.state.data)}</span>
          }
          return <span key={id} className="item"><span style={{cursor:'pointer'}} onClick={this.expand} className={icon}></span> {this.getCheckbox()} <span className="item-text">{this.state.data[col.displayField]}</span></span>
      }
      else{
       
        if(col.render){
            return <span key={id}  dangerouslySetInnerHTML={{__html: col.render(this.state.data)}}></span>
        }
        if(col.onClick){                    
            return <span key={id} className="item"> {this.getCheckbox()} {this.getLinks(this.state.data)}</span>
        }
          
        return <span key={id} className="item"> {this.getCheckbox()} <span className="item-text">{this.state.data[col.displayField]}</span></span>
      }
  }
});
export default JwtTree;