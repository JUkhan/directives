import SparkLine from 'Scripts/Modules/jwtComponents/SparkLine.js';

var Row=React.createClass({displayName: "Row",
  getInitialState:function(){
    return {data:[], pageNo:1, dataStorage:null, isFilter:false, isExpanded:false}
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
    var that=this, res;
   
          if(!that.state.isExpanded){
         return React.createElement("tr", null, 
              that.props.options.columns.map(that.renderRow)
            
          )
        }
         else {
          return React.createElement("tr", {key: that.props.index}, 
            React.createElement("td", {colSpan: that.props.options.columns.length, style: {paddingLeft:10}}, 
              React.createElement("table", {className: "tgrid"}, 
                React.createElement("tbody", null, 

                       [ React.createElement("tr", null, 
                          that.props.options.columns.map(function(col, id){        
                        if(col.onClick){                    
                          return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: that.expand, style: {cursor:'pointer'}}, "-"), that.getLinks(that.props.data, col, that.props.index))
                        }                         
                         return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: that.expand, style: {cursor:'pointer'}}, "-"), that.props.data[col.field])              
                   
                        })
                       ),
                        that.props.data.data.map(function(row, index){
               
                             return React.createElement(Row, {key: index, options: that.props.options, data: row, index: index})
                        })]
                 
                )
              )
            )
          )
         
         }
     
  },
  renderRow:function(col, id){
   
    var that=this;
    if(id==0 && that.props.data.data && that.props.data.data.length>0){
      if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: that.expand, style: {cursor:'pointer'}}, "+"), that.getLinks(that.props.data, col, that.props.index))
          }
         return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: that.expand, style: {cursor:'pointer'}}, "+"), that.props.data[col.field])
      }else{
        if(col.spark){
            return React.createElement("td", {key: id, style: col.style}, React.createElement(SparkLine, {data: that.props.data[col.field], options: col.options}))
         }
         if(angular.isFunction(col.render)){
            return React.createElement("td", {key: id, dangerouslySetInnerHTML: {__html: col.render(that.props.data,that.props.index)}})
          }
          if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, that.getLinks(that.props.data, col, that.props.index))
          }
          
         return React.createElement("td", {key: id, className: col.className, style: col.style}, that.props.data[col.field])
      }
  }
  
});
export default Row;

