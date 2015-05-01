
var Pager=React.createClass({
    displayName:'Pager',
	getInitialState:function(){
		return {limit:20, pageNo:1, totalRow:0, totalPage:0, firstClass:'disabled', lastClass:''}
	},
    onFirst:function(){
		this.state.pageNo=1;
		this.props.onPageChange(this.state.pageNo);
		this.setState({firstClass:'disabled', lastClass:''});
	},
	onLast:function(){
		this.state.pageNo=this.state.totalPage;
		this.props.onPageChange(this.state.pageNo);	
		this.setState({firstClass:'', lastClass:'disabled'});
	},
	onPrevious:function(){		
		if(this.state.pageNo>1){
			this.state.pageNo--;
			this.props.onPageChange(this.state.pageNo);
			this.setState({firstClass:this.state.pageNo===1?'disabled':'', lastClass:''});
		}else{
			this.setState({firstClass:'disabled', lastClass:''});
		}
	},
	onNext:function(){
		if(this.state.totalPage>this.state.pageNo){
			this.state.pageNo++;
			this.props.onPageChange(this.state.pageNo);	
			this.setState({firstClass:'', lastClass:this.state.totalPage==this.state.pageNo?'disabled':''});
		}else{
			this.setState({firstClass:'', lastClass:'disabled'});
		}
	},
	componentDidMount:function(){
        this.state.limit=this.props.limit;
		this.state.totalRow=this.props.totalRow;
		this.state.totalPage=parseInt(this.props.totalRow/this.props.limit)+((this.props.totalRow%this.props.limit==0)?0:1);
		
    },
    render:function(){
        return(
            React.createElement("ul", {className: "pager"}, 
			 React.createElement("li", {className: this.state.firstClass}, React.createElement("a", {onClick: this.onFirst, href: "javascript:;"}, "First")), 
              React.createElement("li", {className: this.state.firstClass}, React.createElement("a", {onClick: this.onPrevious, href: "javascript:;"}, "Previous")), 
              React.createElement("li", {className: this.state.lastClass}, React.createElement("a", {onClick: this.onNext, href: "javascript:;"}, "Next")), 
			   React.createElement("li", {className: this.state.lastClass}, React.createElement("a", {onClick: this.onLast, href: "javascript:;"}, "Last"))
            )
            )
    }
});

export default Pager;