import SparkLine from 'Scripts/Modules/jwtComponents/SparkLine.js';
import Pager from 'Scripts/Modules/jwtComponents/Pager.js';


var JwtGrid = React.createClass({displayName: "JwtGrid",
 getDefaultProps:function(){
      return {options:{}}
  }, 
  getInitialState:function(){
    return {data:[], pageNo:1, dataStorage:null, isFilter:false}
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
  if(options.onKeypressFilter===undefined){
        options.onKeypressFilter=true;
  }

  },
  onPageChange:function(pageNo){    
  this.setState({pageNo:pageNo});
  }, 
  onSort:function(col){
    if(col.asc===undefined){col.asc=true;}    
    col.asc=!col.asc;   
    this.setProps({data:this.props.data.sort(this.sortBy(col.field, col.asc))});
    //this.forceUpdate();
  },
  sortBy:function(field, reverse, primer){
   var key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
   reverse = !reverse ? 1 : -1;
   return function (a, b) {return a = key(a), b = key(b), reverse * ((a > b) - (b > a)); } 
  },  
  getDataNotFound:function(){
   var options=this.props.options;
  return (
            React.createElement("div", {className: "jwt-grid"}, 
            React.createElement("table", {className: options.className}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                    
                        options.columns.map(function(col, index){ return React.createElement("th", {key: index}, col.displayName||col.field)})
                    
                    )
                ), 
                React.createElement("tbody", null, 
                React.createElement("tr", null, React.createElement("td", {style: {textAlign:'center'}, colSpan: options.columns.length}, React.createElement("b", null, options.loadingText||'Data not found.')))
                )
            )     
            )
        )
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
  onSearch:function(){      
      var searchText=this.refs.txtSearch.getDOMNode().value;
      if(!searchText){
        this.state.isFilter=false;
        this.setProps({data:this.state.dataStorage});       
        return;
      }
      this.state.isFilter=true;
      this.state.pageNo=1;
      searchText=searchText.toLowerCase();          
      var colimns=this.props.options.columns, temp=[];
      this.setProps({data:this.state.dataStorage.filter(function(item, index){
        var flag=false;
        for(var col of colimns){
          if(col.field && item[col.field]){
            var txt=item[col.field].toString().toLowerCase();
            flag =flag || txt.indexOf(searchText)!==-1;
          }
        }
        return flag;
      })}); 
      
  },
  onSearchChane:function(event){
      if(event.keyCode==13){this.onSearch();return;}
      if(this.props.options.onKeypressFilter){
         setTimeout(this.onSearch, 0);
      }
  },
  getFilter:function(options){
    if(!options.filter){return null;}
    return (
      //<div className="pull-right">
          React.createElement("div", {style: {width:'35%'}, className: "input-group"}, 
          React.createElement("input", {type: "text", ref: "txtSearch", onKeyDown: this.onSearchChane, className: "form-control", placeholder: "Search for..."}), 
          React.createElement("span", {className: "input-group-btn"}, 
            React.createElement("button", {className: "btn btn-default", onClick: this.onSearch, type: "button"}, "Go!")
          )
        )   
    //</div>          
      )
  },
  render: function() {
    var options=this.props.options; 

    if(!this.props.data){
    if(options.columns){
      return this.getDataNotFound();
    }
       return React.createElement("div", null, React.createElement("b", null, options.loadingText||'Data not found.')) 
    }
  var len=this.props.data.length, pager=null, limit=options.limit||20;
  if(options.filter && !this.state.isFilter){this.state.dataStorage=this.props.data;} 
  if(len>limit){
    pager=React.createElement(Pager, {limit: limit, totalRow: len, onPageChange: this.onPageChange})
    
    this.state.data=this.props.data.slice(((this.state.pageNo-1)*limit),limit*this.state.pageNo);
  }
  else{
    this.state.data=this.props.data;    
  }
    if(!options.columns){
     this.componentWillMount()
    }
    var that=this;
    return (
            React.createElement("div", {className: "jwt-grid"}, 
             React.createElement("div", null, this.getFilter(options)), 
            React.createElement("table", {className: options.className}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                    
                        options.columns.map(function(col, index){
              if(col.sort){
                return  React.createElement("th", {key: index}, React.createElement("span", {onClick: that.onSort.bind(that, col), style: {cursor:'pointer'}}, col.displayName||col.field))
              }
                            return React.createElement("th", {key: index}, col.displayName||col.field)
                        })
                    
                    )
                ), 
                React.createElement("tbody", null, 
                
                     this.state.data.map(function(row, index){
                       return(
                           React.createElement("tr", {key: index}, 
                            
                                options.columns.map(function(col, id){
                                    if(col.spark){
                                        return React.createElement("td", {key: id, style: col.style}, React.createElement(SparkLine, {data: row[col.field], options: col.options}))
                                    }
                  if(angular.isFunction(col.render)){
                    return React.createElement("td", {key: id, dangerouslySetInnerHTML: {__html: col.render(row,index)}})
                  }
                  if(col.onClick){                    
                    return React.createElement("td", {key: id, className: col.className, style: col.style}, that.getLinks(row, col, index))
                  }
                                    return React.createElement("td", {key: id, className: col.className, style: col.style}, row[col.field])
                                })
                            
                        ) 
                        )
                     })   
                        
                
                )
            ), 
       React.createElement("div", null, pager)
            )
        )
  }
});

//export default JwtGrid;