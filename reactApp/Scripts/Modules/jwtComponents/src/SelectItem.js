var SelectItem=React.createClass({
  getInitialState:function(){
      return {data: []}
  },
  checkItem:function(e){
    this.state.data['_chk_']=e.target.checked;
    this.props.checkItem();
    this.setState({data:this.state.data});
  },
  render: function(){
    var item=this.props.data;
    this.state.data=item;
    if(this.props.render){
          return <div className="item"><label><input checked={item['_chk_']} type="checkbox"/> <span dangerouslySetInnerHTML={{__html: this.props.render(item,index)}}></span></label></div>
    }
    if(this.props.displayField){
          return <div className="item"><label><input checked={item['_chk_']} onChange={this.checkItem} type="checkbox"/> {item[this.props.displayField]}</label></div>
    }    
  }
  
});
export default SelectItem;