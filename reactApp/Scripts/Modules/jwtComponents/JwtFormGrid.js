

import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
import JwtForm from 'Scripts/Modules/jwtComponents/JwtForm.js';


var JwtFormGrid = React.createClass({displayName: "JwtFormGrid",
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
  formRefresh:function(){
      this.refs.form.refresh()
      return this
  },
  showFormWithRefresh:function(){
    this.refs.form.show()
    this.refs.grid.hide()
    this.refs.form.refresh()
    return this
  },
  showForm:function(){
    this.refs.form.show()
    this.refs.grid.hide()
    return this
  },
  hideForm:function(){
    this.refs.form.hide()
    this.refs.grid.show()
    return this
  },
  showGrid:function(){
    this.refs.form.hide()
    this.refs.grid.show()
    return this
  },
  hideGrid:function(){
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
        msg=React.createElement("div", {className: "alert alert-"+this.state.messageLaf, role: "alert"}, 
            React.createElement("span", {className: "glyphicon glyphicon-exclamation-sign", "aria-hidden": "true"}), 
           "  ", this.state.message
          )
      }
      return React.createElement("div", null, 
          msg, 
          React.createElement(JwtGrid, {ref: "grid", options: this.props.gridOptions}), 
          React.createElement(JwtForm, {ref: "form", options: this.props.formOptions})
        )
  }
});

export default JwtFormGrid;