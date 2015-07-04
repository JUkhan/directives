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
    var icons=col.icon;
    if(col.icon && !angular.isArray(icons)){
    	icons=[icons];    	
    }    

    return  col.onClick.map(function(fx, id){
    	if(icons){
    		return React.createElement("a", {key: id, className: "btn btn-link", title: linkText[id], onClick: fx.bind(null,row, index), href: "javascript:;"}, React.createElement("span", {className: icons[id]}))
    	}
    	return React.createElement("a", {key: id, className: "btn btn-link", onClick: fx.bind(null,row, index), href: "javascript:;"}, linkText[id], " ")
    })    
  },
  expand:function(){  
   
    this.setState({isExpanded:!this.state.isExpanded});
    
  },
  checkRow:function(e){    	
  	this.state.data[this.props.options.checkField]=e.target.checked;
  	this.props.rowCheck();
  	this.setState({data:this.state.data});
  	
  },
  render: function(){  
  	this.state.data=this.props.data;
  	var headCheck=null;
    if(this.props.options.checkList){
          headCheck=React.createElement("td", null, " ", React.createElement("input", {type: "checkbox", checked: this.state.data[this.props.options.checkField], className: "chk-row", onChange: this.checkRow}), " ")  				
    }  
    return React.createElement("tr", null, headCheck,this.props.options.columns.map(this.renderRow))    
     
  },
  renderRow:function(col, id){ 
           
        if(col.spark){
            return React.createElement("td", {key: id, style: col.style}, React.createElement(SparkLine, {data: this.state.data[col.field], options: col.options}))
         }
         if(angular.isFunction(col.render)){
            return React.createElement("td", {key: id, dangerouslySetInnerHTML: {__html: col.render(this.state.data,this.props.index)}})
          }
          if(col.onClick){                    
            return React.createElement("td", {key: id, className: col.className, style: col.style}, this.getLinks(this.state.data, col, this.props.index))
          }
          
         return React.createElement("td", {key: id, className: col.className, style: col.style}, this.state.data[col.field])      
  }
  
});
export default Row;

