import JwtSelectItem from 'Scripts/Modules/jwtComponents/JwtSelectItem.js';
import {cssClass} from 'Scripts/Modules/jwtComponents/JwtUtil.js';
var JwtMultiSelect=React.createClass({displayName: "JwtMultiSelect",
  	getInitialState:function(){
        return {data: this.props.data, isHidden:true, txtSearch:'', dataStorage:this.props.data}
    },
  	getDefaultProps:function(){
      return { width:'200px', height:'150px', data:[], hwidth:'200px', hasError:false}
    }, 
    componentDidMount:function(){
      $(this.refs.mscontent.getDOMNode()).hide();

      $(document.body).click(function(e){
      	var el=$(e.target);
      	if(el.parents('.ms-content').length==0 && !(el.hasClass('header')||el.parents('.header').length)){
            if(this.refs.mscontent && !this.state.isHidden){
            	 	$(this.refs.mscontent.getDOMNode()).hide();
            	 	this.state.isHidden=true;
            }
      	 }
      }.bind(this))
    },
    setData:function(data){    	
    	this.setState({data:data, dataStorage:data});
    },
    onHeaderClick:function(e){    
    	if(this.state.isHidden){
    		this.state.isHidden=false;
    		$(this.refs.mscontent.getDOMNode()).show();
    	}else{
    		this.state.isHidden=true;
    		$(this.refs.mscontent.getDOMNode()).hide();
    	}
    },
    checkAll:function(e){
    	this.state.data.forEach(function(item){
    		 item['_chk_']=e.target.checked;
    	});	  
	  	this.setState({data:this.state.data});
	  	if(e.target.checked){
	  		$(this.refs.selectedText.getDOMNode()).html(this.state.data.length+' Selected');
	  	}
	  	else{
	  		$(this.refs.selectedText.getDOMNode()).html('0 Selected');
	  	}
	  	if(this.props.onChange){
  			this.props.onChange(this.getValue());
  		}
    },
    checkItem:function(){
    	var res=[];  	
  		this.state.dataStorage.forEach(function(item){
    		 if(item['_chk_']){
    		 	res.push(item);
    		 }
    	});	 
    	$(this.refs.selectedText.getDOMNode()).html(res.length+' Selected'); 
  		this.refs.allChk.getDOMNode().checked=res.length===this.state.dataStorage.length;
  		if(this.props.onChange){
  			this.props.onChange(this.getValue());
  		}
    },
    setValue:function(val){
    	var data=this.state.dataStorage, len=data.length, prop=this.props.valueField||this.props.displayField, count=0;

    	data.forEach(function(item){item['_chk_']=false;});
    	if(val){    		
    		val.split(',').forEach(function(val){
    			for(var i=0;i<len; i++){
    				if(val===data[i][prop]){
    					data[i]['_chk_']=true; count++;
    					break;
    				}
    			}
    		});
    	}

    	this.setState({data:data, txtSearch:''});
    	$(this.refs.selectedText.getDOMNode()).html(count+' Selected');
    	this.refs.allChk.getDOMNode().checked=count===len;

    },
    getValue:function(){
    	var res=[],  prop=this.props.valueField||this.props.displayField;  	
  		this.state.dataStorage.forEach(function(item){
    		 if(item['_chk_']){
    		 	res.push(item[prop]);
    		 }
    	});	
    	return res.join(','); 
    },
    getCheckedItems:function(){
    	var res=[];  	
  		this.state.dataStorage.forEach(function(item){
    		 if(item['_chk_']){
    		 	res.push(item);
    		 }
    	});	 
    	return res;
    },
    onSearch:function(){  		
  		var searchText=this.refs.txtSearch.getDOMNode().value;
  		this.state.txtSearch=searchText;
  		
  		if(!searchText){  						
  			this.setState({data:this.state.dataStorage});  			
  			return;
  		}  
  				
  		searchText=searchText.toLowerCase();  		 		
  		var prop=this.props.displayField, temp=[];
  		this.state.dataStorage.forEach(function(item, index){			
				var txt=item[prop].toString().toLowerCase();
				if(txt.indexOf(searchText)>=0){
					temp.push(item);
				}  			
  		});
  		this.setState({data:temp}); 

  		this.checkItem();
  	},
  	onSubmit:function(e){  			
  		this.props.onClick(this.getValue());
  		this.state.isHidden=true;
  		$(this.refs.mscontent.getDOMNode()).hide();
  	},
  	hasError:function(flag){
  		if(flag){
  			$(this.refs.header.getDOMNode()).addClass('has-error');
  		}else{
  			$(this.refs.header.getDOMNode()).removeClass('has-error');
  		}
  	},
  	render: function(){
  		var submit=null, me=this;  		
  		if(this.props.onClick){
  			submit=React.createElement("div", null, React.createElement("input", {type: "button", className: "btn btn-default btn-block", value: "Submit", onClick: this.onSubmit}))
  		}
   		return React.createElement("div", {className: "multiselect", style: {minWidth:this.props.hwidth}}, 			
   			React.createElement("div", {ref: "header", className: cssClass('header', {'has-error': this.props.hasError}), style: {width:this.props.hwidth}, onClick: this.onHeaderClick}, React.createElement("span", {ref: "selectedText"}, "0 selected"), 
   				React.createElement("div", {className: "pull-right"}, React.createElement("span", {className: "glyphicon glyphicon-triangle-top", "aria-hidden": "true"}))
   			), 
   			React.createElement("div", {ref: "mscontent", className: "ms-content", style: {width:this.props.width}}, 
   				React.createElement("div", {className: "tool"}, 
   				React.createElement("input", {ref: "allChk", title: "Select All", onChange: this.checkAll, type: "checkbox"}), 
   				React.createElement("div", {className: "pull-right"}, React.createElement("input", {ref: "txtSearch", value: this.state.txtSearch, onChange: this.onSearch, type: "text", placeholder: "search for..."}))
   				), 
   				React.createElement("div", {className: "item-content", style: {height:this.props.height}}, 
   				
   				me.state.data.map(function(itemData, index){
   					return React.createElement(JwtSelectItem, {key: index, data: itemData, index: index, displayField: me.props.displayField, render: me.props.render, checkItem: me.checkItem})
   				})
   			), 
   			submit
   			)
   		)
  	}
});


export default JwtMultiSelect;