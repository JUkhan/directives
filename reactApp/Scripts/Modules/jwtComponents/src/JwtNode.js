import JwtSparkLine from 'Scripts/Modules/jwtComponents/JwtSparkLine.js';

var JwtNode=React.createClass({
  getInitialState:function(){
    return {data:[], pageNo:1, dataStorage:null, isFilter:false, isExpanded:false}
  },
   getDefaultProps:function(){
      return {options:{}}
  },   
   getLinks:function(row, col, index){

    if(col.onClick && !(col.onClick instanceof Array)){
      col.onClick=[col.onClick];
    }
    var linkText=col.linkText;
    if(!linkText){
      linkText=row[col.field];
    }
    if(!(linkText instanceof Array)){
      linkText=[linkText];
    }
    return  col.onClick.map(function(fx, id){return <a key={id} className="link indented" onClick={fx.bind(null,row, index)} href="javascript:;">{linkText[id]}</a>})    
  },
  expand:function(){  
    
    this.setState({isExpanded:!this.state.isExpanded});
    
  },

  render: function(){
     var that=this;       
     if(that.state.isExpanded) {
     	that.icon='minus';
      return <tr>
        <td colSpan={that.props.options.columns.length} className="child-td">
          <table className="tgrid">
            <tbody>{

                   [<tr key={that.props.index} className={'level-'+that.props.level}>{                      
					
					that.props.options.columns.map(that.renderRow)
                   }</tr>,
                    that.props.data[that.props.options.childListName].map(function(row, index){
           
                         return <JwtNode key={index+that.props.index+1} level={that.props.level+1} options={that.props.options} data={row} index={index} />
                    })]
             }       
            </tbody>
          </table>
        </td>
      </tr>
     
     }
     else{
     	that.icon='plus';          
        return <tr key={that.props.index} className={'level-'+that.props.level}>{that.props.options.columns.map(that.renderRow)}</tr>
     }
     
  },
  renderRow:function(col, id){   
   var icon='indented glyphicon glyphicon-'+this.icon+'-sign'
    if(id==0 && this.props.options.childListName && this.props.data[this.props.options.childListName] && this.props.data[this.props.options.childListName].length>0){
          if(col.onClick){                    
            return <td key={id} className={col.className} style={col.style}><span onClick={this.expand} className={icon}></span> {this.getLinks(this.props.data, col, this.props.index)}</td>
          }
          return <td key={id} className={col.className} style={col.style}><span onClick={this.expand} className={icon}></span> {this.props.data[col.field]}</td>
      }
      else{
        if(col.spark){
            return <td key={id} style={col.style}><JwtSparkLine data={this.props.data[col.field]} options={col.options}/></td>
        }
        if(col.render){
            return <td key={id}  dangerouslySetInnerHTML={{__html: col.render(this.props.data,this.props.index)}}></td>
        }
        if(col.onClick){                    
            return <td key={id} className={col.className} style={col.style}>{this.getLinks(this.props.data, col, this.props.index)}</td>
        }
          
        return <td key={id} className={col.className} style={col.style}>{this.props.data[col.field]}</td>
      }
  }
  
});
export default JwtNode;

