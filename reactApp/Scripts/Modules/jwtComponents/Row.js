import SparkLine from 'Scripts/Modules/jwtComponents/SparkLine.js';

var Row=React.createClass({displayName: "Row",
  getInitialState:function(){
    return {data:[], pageNo:1, dataStorage:null, isFilter:false}
  },
   getDefaultProps:function(){
      return {options:{}}
  },   
   getLinks:function(row, col, index){
      if(!angular.isArray(col.onClick)){
      col.onClick=[col.onClick];
    }
    var linkText=col.linkText;
    if(!linkText){
      linkText=row[col.field];
    }
    if(!angular.isArray(linkText)){
      linkText=[linkText];
    }
    return  col.onClick.map(function(fx, id){return React.createElement("a", {key: id, className: "link", onClick: fx.bind(null,row, index), href: "javascript:;"}, linkText[id])})    
  },
  expand:function(){  
   
    this.setState({isExpanded:!this.state.isExpanded});
    
  },

  render: function(){  
         return React.createElement("tr", null, this.props.options.columns.map(this.renderRow))    
     
  },
  renderRow:function(col, id){ 
           
        if(col.spark){
            return React.createElement("td", {key: id, style: col.style}, React.createElement(SparkLine, {data: this.props.data[col.field], options: col.options}))
         }
         if(angular.isFunction(col.render)){
            return React.createElement("td", {key: id, dangerouslySetInnerHTML: {__html: col.render(this.props.data,this.props.index)}})
          }
          if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, this.getLinks(this.props.data, col, this.props.index))
          }
          
         return React.createElement("td", {key: id, className: col.className, style: col.style}, this.props.data[col.field])      
  }
  
});
export default Row;

