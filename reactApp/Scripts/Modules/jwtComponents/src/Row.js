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
    return  col.onClick.map(function(fx, id){return <a key={id} className="link" onClick={fx.bind(null,row, index)} href="javascript:;">{linkText[id]}</a>})    
  },
  expand:function(){  
   
    this.setState({isExpanded:!this.state.isExpanded});
    
  },

  render: function(){  
         return <tr>{this.props.options.columns.map(this.renderRow)}</tr>    
     
  },
  renderRow:function(col, id){ 
           
        if(col.spark){
            return <td key={id} style={col.style}><SparkLine data={this.props.data[col.field]} options={col.options}/></td>
         }
         if(angular.isFunction(col.render)){
            return <td key={id}  dangerouslySetInnerHTML={{__html: col.render(this.props.data,this.props.index)}}></td>
          }
          if(col.onClick){                    
            return <td key={id} className={col.className} style={col.style}>{this.getLinks(this.props.data, col, this.props.index)}</td>
          }
          
         return <td key={id} className={col.className} style={col.style}>{this.props.data[col.field]}</td>      
  }
  
});
export default Row;

