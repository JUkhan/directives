

import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
import JwtForm from 'Scripts/Modules/jwtComponents/JwtForm.js';


var JwtFormGrid = React.createClass({
  getInitialState:function(){
    return {Isgrid:true, data:null, message:null, messageDuration:2000, messageLaf:'success'}
  },
   getDefaultProps:function(){
      return {options:{}}
  }, 
  componentDidMount: function(){
   this.refs.form.hide()
  },
  setGridData:function(data){
    this.refs.grid.setData(data)
    return this
  },
  setFormData:function(data){
      this.refs.form.setFormData(data)
      this.showForm()
      return this
  },
  setSelectOptions:function(fieldName, values){
       this.refs.form.setSelectOptions(fieldName, values)
       return this
  },
  formRefresh(){
      this.refs.form.refresh()
      return this
  },
  showFormWithRefresh(){
    this.refs.form.show()
    this.refs.grid.hide()
    this.refs.form.refresh()
    return this
  },
  showForm(){
    this.refs.form.show()
    this.refs.grid.hide()
    return this
  },
  hideForm(){
    this.refs.form.hide()
    this.refs.grid.show()
    return this
  },
  showGrid(){
    this.refs.form.hide()
    this.refs.grid.show()
    return this
  },
  hideGrid(){
    this.refs.form.show()
    this.refs.grid.hide()
    return this
  },
  showMessage:function(msg, msgLaf, duration){
    this.state.messageDuration=duration||this.state.messageDuration
    this.setState({message:msg, messageLaf:msgLaf||this.state.messageLaf})
    var timerId=setTimeout(function(){ this.setState({message:null}); clearTimeout(timerId); }.bind(this), this.state.messageDuration)
  },
  render:function(){
    var msg=null;
      if(this.state.message){
        msg=<div className={"alert alert-"+this.state.messageLaf} role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>            
           &nbsp; {this.state.message}
          </div>
      }
      return <div>
          {msg}
          <JwtGrid ref="grid" options={this.props.gridOptions}  />    
          <JwtForm ref="form" options={this.props.formOptions} />
        </div>
  }
});

export default JwtFormGrid;