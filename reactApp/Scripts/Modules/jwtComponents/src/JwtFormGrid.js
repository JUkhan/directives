

import JwtGrid from 'Scripts/Modules/jwtComponents/JwtGrid.js';
import JwtForm from 'Scripts/Modules/jwtComponents/JwtForm.js';


var JwtFormGrid = React.createClass({
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
  formRefresh(){
      this.refs.form.refresh()
  },
  showForm(){
    this.refs.form.show()
    this.refs.grid.hide()
  },
  hideForm(){
    this.refs.form.hide()
    this.refs.grid.show()
  },
  showGrid(){
    this.refs.form.hide()
    this.refs.grid.show()
  },
  hideGrid(){
    this.refs.form.show()
    this.refs.grid.hide()
  },
  render:function(){
      
      return <div>
          <JwtGrid ref="grid" options={this.props.gridOptions}  />    
          <JwtForm ref="form" options={this.props.formOptions} />
        </div>
  }
});

export default JwtFormGrid;