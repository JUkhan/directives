import JwtSparkLine from 'Scripts/Modules/jwtComponents/JwtSparkLine.js';

var JwtNode=React.createClass({displayName: "JwtNode",
  getInitialState:function(){
    return {data:[], pageNo:1, dataStorage:null, isFilter:false, isExpanded:false}
  },
   getDefaultProps:function(){
      return {options:{}}
  },   
   getLinks:function(row, col, index){

    if(col.onClick && !Array.isArray(col.onClick)){
      col.onClick=[col.onClick];
    }
    var linkText=col.linkText;
    if(!linkText){
      linkText=row[col.field];
    }
    if(!Array.isArray(linkText)){
      linkText=[linkText];
    }
    return  col.onClick.map(function(fx, id){return React.createElement("a", {key: id, className: "link indented", onClick: fx.bind(null,row, index), href: "javascript:;"}, linkText[id])})    
  },
  expand:function(){  
    
    this.setState({isExpanded:!this.state.isExpanded});
    
  },

  render: function(){
     var that=this;       
     if(that.state.isExpanded) {
     	that.icon='minus';
      return React.createElement("tr", null, 
        React.createElement("td", {colSpan: that.props.options.columns.length, className: "child-td"}, 
          React.createElement("table", {className: "tgrid child-table"}, 
            React.createElement("tbody", null, 

                   [React.createElement("tr", {key: that.props.index, className: 'level-'+that.props.level},                       
					
					that.props.options.columns.map(that.renderRow)
                   ),
                    that.props.data[that.props.options.childListName].map(function(row, index){
                        
                         return React.createElement(JwtNode, {key: index+that.props.index+1, level: that.props.level+1, options: that.props.options, data: row, index: index})
                    })]
             
            )
          )
        )
      )
     	
     }
     else{
     	that.icon='plus';          
        return React.createElement("tr", {key: that.props.index, className: 'level-'+that.props.level}, that.props.options.columns.map(that.renderRow))
     }
     
  },
  renderRow:function(col, id){   
   var icon='indented glyphicon glyphicon-'+this.icon+'-sign'
    if(id==0 && this.props.options.childListName && this.props.data[this.props.options.childListName] && this.props.data[this.props.options.childListName].length>0){
          if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: this.expand, className: icon}), " ", this.getLinks(this.props.data, col, this.props.index))
          }
          return React.createElement("td", {key: id, className: col.className, style: col.style}, React.createElement("span", {onClick: this.expand, className: icon}), " ", this.props.data[col.field])
      }
      else{
        if(col.spark){
            return React.createElement("td", {key: id, style: col.style}, React.createElement(JwtSparkLine, {data: this.props.data[col.field], options: col.options}))
        }
        if(col.render){
            return React.createElement("td", {key: id, style: col.style, dangerouslySetInnerHTML: {__html: col.render(this.props.data,this.props.index)}})
        }
        if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, this.getLinks(this.props.data, col, this.props.index))
        }
          
        return React.createElement("td", {key: id, className: col.className, style: col.style}, this.props.data[col.field])
      }
  }
  
});
export default JwtNode;

