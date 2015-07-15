
var JwtTree = React.createClass({displayName: "JwtTree",
  getInitialState:function(){
    return {data:null}
  },
  getDefaultProps:function(){
      return {options:{}}
  }, 
  componentWillMount:function(){
    
  },
  
  getDataNotFound:function(){   
    return React.createElement("b", null, this.props.options.loadingText||'Data not found.')
  }, 
  
  render: function() {
    var options=this.props.options;     
    if(!this.props.data){   
       return React.createElement("div", null, React.createElement("b", null, options.loadingText||'Data not found.')) 
    } 
    if(!this.state.data){
        this.state.data=this.props.data;
    }
    return (
            React.createElement("div", {className: "jwt-tree"}, 
             
            React.createElement("ul", {className: "root"}, " ",               
                     this.state.data.map(function(row, index){                     	
                          return React.createElement(JwtTreeItem, {key: index, level: 1, options: options, data: row, index: index})
                     })   
                        
              )
      
            )
        )
  }
});

var JwtTreeItem=React.createClass({displayName: "JwtTreeItem",
  getInitialState:function(){
    return {isExpanded:false}
  },
  getDefaultProps:function(){
      return {options:{}}
  }, 
  getLinks:function(row){
    console.log(row);
    return React.createElement("a", {className: "btn btn-link", onClick: this.props.options.onClick.bind(null,row), href: "javascript:;"}, row[this.props.options.displayField])
  },
  expand:function(){  
    
    this.setState({isExpanded:!this.state.isExpanded});
    
  },
  render:function(){    
     var that=this; 
     this.state.data=this.props.data;
     if(that.state.isExpanded) {
      that.icon='bottom';
      return React.createElement("li", null, 
                   React.createElement("div", {key: that.props.index},  that.renderRow(that.props.options, that.props.index)), 
                   React.createElement("ul", {className: 'level-'+that.props.level},  
                        that.props.data[that.props.options.childrenField].map(function(row, index){           
                            return React.createElement(JwtTreeItem, {key: index+that.props.index+1, level: that.props.level+1, options: that.props.options, data: row, index: index})
                        })
                   )
           )
      
     }
     else{
      that.icon='right';          
        return React.createElement("li", {key: that.props.index, className: 'level-'+that.props.level}, that.renderRow(that.props.options, that.props.index))
     }
  },
  getCheckbox:function(){
    if(this.props.options.checkList){
       // if(this.props.options.childrenField && this.state.data[this.props.options.childrenField] && this.state.data[this.props.options.childrenField].length>0){
        //   return <span><input type="checkbox" checked={this.state.data['_chk_']} onChange={this.checkItemAll} /></span>
       // }
        return React.createElement("span", null, React.createElement("input", {type: "checkbox", checked: this.state.data['_chk_'], onChange: this.checkItem}))
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
            return React.createElement("span", {key: id, className: "item"}, React.createElement("span", {style: {cursor:'pointer'}, onClick: this.expand, className: icon}), "  ", this.getCheckbox(), " ", this.getLinks(this.state.data))
          }
          return React.createElement("span", {key: id, className: "item"}, React.createElement("span", {style: {cursor:'pointer'}, onClick: this.expand, className: icon}), " ", this.getCheckbox(), " ", React.createElement("span", {className: "item-text"}, this.state.data[col.displayField]))
      }
      else{
       
        if(col.render){
            return React.createElement("span", {key: id, dangerouslySetInnerHTML: {__html: col.render(this.state.data)}})
        }
        if(col.onClick){                    
            return React.createElement("span", {key: id, className: "item"}, " ", this.getCheckbox(), " ", this.getLinks(this.state.data))
        }
          
        return React.createElement("span", {key: id, className: "item"}, " ", this.getCheckbox(), " ", React.createElement("span", {className: "item-text"}, this.state.data[col.displayField]))
      }
  }
});
export default JwtTree;