import SparkLine from 'Scripts/Modules/jwtComponents/SparkLine.js';

var Row=React.createClass({
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
    		return <a key={id} className="btn btn-link" title={linkText[id]} onClick={fx.bind(null,row, index)} href="javascript:;"><span className={icons[id]}></span></a>
    	}
    	return <a key={id} className="btn btn-link" onClick={fx.bind(null,row, index)} href="javascript:;">{linkText[id]} </a>
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
          headCheck=<td> <input type="checkbox" checked={this.state.data[this.props.options.checkField]} className="chk-row" onChange={this.checkRow} /> </td>  				
    }  
    return <tr>{headCheck,this.props.options.columns.map(this.renderRow)}</tr>    
     
  },
  renderRow:function(col, id){ 
           
        if(col.spark){
            return <td key={id} style={col.style}><SparkLine data={this.state.data[col.field]} options={col.options}/></td>
         }
         if(angular.isFunction(col.render)){
            return <td key={id}  dangerouslySetInnerHTML={{__html: col.render(this.state.data,this.props.index)}}></td>
          }
          if(col.onClick){                    
            return <td key={id} className={col.className} style={col.style}>{this.getLinks(this.state.data, col, this.props.index)}</td>
          }
          
         return <td key={id} className={col.className} style={col.style}>{this.state.data[col.field]}</td>      
  }
  
});
export default Row;

