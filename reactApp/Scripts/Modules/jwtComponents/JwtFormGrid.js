

import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
import JwtForm from 'Scripts/Modules/jwtComponents/JwtForm.js';


var JwtFormGrid = React.createClass({displayName: "JwtFormGrid",
  getInitialState:function(){
    return {Isgrid:true, data:null}
  },
   getDefaultProps:function(){
      return {options:{}}
  }, 
  componentDidMount: function(){
   this.refs.form.hide()
  },
  setGridData:function(data){
    this.refs.grid.setData(data)
  },
  setFormData:function(data){
      this.refs.form.setFormData(data)
      this.showForm()
  },
  setSelectOptions:function(fieldName, values){
       this.refs.form.setSelectOptions(fieldName, values)
  },
  formRefresh:function(){
      this.refs.form.refresh()
  },
  showForm:function(){
    this.refs.form.show()
    this.refs.grid.hide()
  },
  hideForm:function(){
    this.refs.form.hide()
    this.refs.grid.show()
  },
  showGrid:function(){
    this.refs.form.hide()
    this.refs.grid.show()
  },
  hideGrid:function(){
    this.refs.form.show()
    this.refs.grid.hide()
  },
  render:function(){
      
      return React.createElement("div", null, 
          React.createElement(JwtGrid, {ref: "grid", options: this.props.gridOptions}), 
          React.createElement(JwtForm, {ref: "form", options: this.props.formOptions})
        )
  }
});

export default JwtFormGrid;