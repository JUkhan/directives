import MultiSelect from 'Scripts/Modules/jwtComponents/MultiSelect.js';

var JwtForm=React.createClass({
    getInitialState:function(){
        return {errors: {},  isHide:false, message:null}
    },
    getDefaultProps:function(){
      return { options:{}}
    },
    handleSubmit:function(){
        if(this.isValid()){           
           if(typeof this.props.options.formSubmit !=='undefined' && typeof this.props.options.formSubmit==='function'){
              this.props.options.formSubmit(this.getFormData(), this);
            }
        }
    },
    refresh:function(){
      this.__formData=null;
       this.props.options.fields.forEach(function(field) {
         switch(field.type.toLowerCase()){
             case 'radio':        
                field.values.forEach(function(value){
                     this.refs[field.name+value].getDOMNode().checked=false               
                  
                }.bind(this))
              break;
              case 'checkbox':
                 this.refs[field.name].getDOMNode().checked = false             
              break;
              case 'checkboxinlines':
                  field.values.forEach(function(value){           
                       this.refs[field.name+value].getDOMNode().checked = false         
                }.bind(this))            
              break;
              case 'multiselect':
                this.refs[field.name].setValue('');
               break;        
              default:
                this.refs[field.name].getDOMNode().value=''
              break;
        }
      }.bind(this))
      this.setState({errors:{}})
    },
    handleCancel:function(){
      this.hide();
      if(typeof this.props.options.formCancel !=='undefined' && typeof this.props.options.formCancel==='function'){
        this.props.options.formCancel(this);
      }
    },
    showMessage:function(msg){
        this.setState({message:msg})
    },
    show:function(){
      this.setState({isHide:false})
    },
    hide:function(){
      this.setState({isHide:true, message:null})
    },
    isValid: function() {     

      var errors = {}
      this.props.options.fields.forEach(function(field) {

        if(field.type.toLowerCase()=='multiselect' && field.required){        
              if (!this.refs[field.name].getValue()) {
                errors[field.name] = 'This field is required'
              }        
        }
        else if(!(field.type.toLowerCase()=='radio' || field.type.toLowerCase()=='checkbox' || field.type.toLowerCase()=='checkboxinlines')){
          if(field.required){
              var value = this.refs[field.name].getDOMNode().value
              if (!value) {
                errors[field.name] = 'This field is required'
              }
         }
      }
      }.bind(this))

     
      var isValid = true
      for (var error in errors) {
        isValid = false        
        break
      }
      this.setState({errors:errors})
     
      return isValid && (this.props.options.validate? this.props.options.validate(this.getFormData(), this):true)
    },
    __formData:null,
    setFormData:function(data){
      this.__formData=data;
      this.props.options.fields.forEach(function(field) {
        switch(field.type.toLowerCase()){
              case 'radio':        
                field.values.forEach(function(value){
                     this.refs[field.name+value].getDOMNode().checked=(data[field.name]===value)                 
                  
                }.bind(this))
              break;
              case 'checkbox':
                 this.refs[field.name].getDOMNode().checked = !!data[field.name]             
              break;
              case 'checkboxInlines':
                  field.values.forEach(function(value){           
                       this.refs[field.name+value].getDOMNode().checked = !!data[value]         
                }.bind(this))            
              break;
              case 'multiSelect':
                 this.refs[field.name].setValue(data[field.name]);             
              break;        
              default:
                this.refs[field.name].getDOMNode().value=data[field.name]||''
              break
        }
      }.bind(this))
      this.isValid()
    },
    setSelectOptions:function(fieldName, values){
      this.props.options.fields.forEach(function(field) {
          if(field.type.toLowerCase()==='select' && field.name===fieldName){
              field.values=values
          }
         })
      this.forceUpdate()
    },
    setMultiSelectData:function(fieldName, values){
        this.refs[fieldName].setData(values);
    },
    getFormData: function() {      
      var data= this.__formData||{}
       this.props.options.fields.forEach(function(field) {
        switch(field.type.toLowerCase()){
           case 'radio':       
              field.values.forEach(function(value){
                if(this.refs[field.name+value].getDOMNode().checked){
                     data[field.name]=value
                }
              }.bind(this))
           break;
           case 'checkbox':
               data[field.name]=this.refs[field.name].getDOMNode().checked              
           break;
           case 'checkboxinlines':
                field.values.forEach(function(value){           
                     data[value]=this.refs[field.name+value].getDOMNode().checked           
              }.bind(this))            
           break;
           case 'multiselect':
              data[field.name]= this.refs[field.name].getValue();             
           break;          
           default:
              data[field.name]=this.refs[field.name].getDOMNode().value
           break;
        }
      }.bind(this))
      return data
    },
    submit:function(options){
        options.type='POST';
        $(this.refs.form.getDOMNode()).ajaxForm(options);
        $(this.refs.form.getDOMNode()).submit();
    },
    render:function(){
      var options=this.props.options, msg;
      options.title=options.title||'Jwt Form';
      options.laf=options.laf||'default';
      if(this.state.message){
        msg=<div className="alert alert-warning" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>            
           &nbsp; {this.state.message}
          </div>
      }
       return <div className={$class('jwt-form',{hide:this.state.isHide})}>
             <div className={'panel panel-'+options.laf}>
                  <div className="panel-heading clearfix">
                       <h3 className="panel-title pull-left">{options.title}</h3>
                  </div>
                   <div className="panel-body">
                      {msg}
                      <form  ref="form" className="form-horizontal" encType={options.fileUpload?'multipart/form-data':null}>
                          {this.getFields(options)}
                      </form>
                   </div>
                   <div className="panel-footer">  
                        <div className="text-center">  
                            <div classNames="btn-group">                                             
                              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>   
                                  &nbsp;        
                              <button type="button"  className="btn btn-info" onClick={this.handleCancel}>Cancel</button>   
                            </div>                   
                        </div>  
                   </div>
                  
             </div>
         </div>
      
    },
    getFields:function(options){
      if(!options.fields) return
      var me=this;
        return options.fields.map((field, index)=>{
          me.__key=index;
           field.hide=field.hide||false;
           switch(field.type.toLowerCase()){
              case 'text':
                return !field.hide && me.renderTextInput(field)
              break;
              case 'textarea':
                return !field.hide && me.renderTextarea(field)
              break;
              case 'select':
                return !field.hide && me.renderSelect(field)
              break;
              case 'radio':
                return !field.hide && me.renderRadioInlines(field)
              break;
              case 'checkbox':
                return !field.hide && me.renderCheckbox(field)
              break;
              case 'checkboxinlines':
                return !field.hide && me.renderCheckboxInlines(field)
              break;              
              case 'file':
                return !field.hide && me.renderFileInput(field)
              break;
              case 'multiselect':
                return !field.hide && me.renderMultiSelectt(field)
              break;
           }   
           return null
        })
    },
    renderMultiSelectt:function(field){
      return this.renderField(field.name, field.label,
        <MultiSelect ref={field.name} data={field.data} displayField={field.displayField} valueField={field.valueField}
        hwidth={field.hwidth} width={field.width} height={field.height} onClick={field.onClick} onChange={field.onChange}/>
      )
    },
    renderFileInput: function(options) {
      return this.renderField(options.name, options.label,
        <input type="file" className="form-control" name={options.name} id={options.name} ref={options.name}/>
      )
    },
    renderTextInput: function(options) {
      return this.renderField(options.name, options.label,
        <input type="text" className="form-control" id={options.name} ref={options.name}/>
      )
    },

    renderTextarea: function(options) {
      return this.renderField(options.name, options.label,
        <textarea className="form-control" id={options.name} ref={options.name}/>
      )
    },
    onChange:function(fieldName, e){
      var fieldObj=this.props.options.fields.find(field=>field.name===fieldName)
      if(fieldObj){
        fieldObj.onChange(e.target.value, e.target)
      }
    },
  renderSelect: function(field) {
    var options=null;
    field.emptyOption= field.emptyOption||'--select--'
    if(field.values && field.values.length>0){
        if(field.valueField && field.displayField){
             options = field.values.map(function(value, index) {
            return <option key={index+1} value={value[field.valueField]}>{value[field.displayField]}</option>
          })
        }
        else{
           options = field.values.map(function(value, index) {
            return <option key={index+1} value={value}>{value}</option>
          })
        }
        options.unshift(<option key="0" value="">{field.emptyOption}</option>)
    }else{
      options=[<option key="0" value="">loading...</option>]
    }
    if(field.onChange){
      return this.renderField(field.name, field.label,
      <select className="form-control" id={field.name} ref={field.name} onChange={this.onChange.bind(this, field.name)}>
        {options}
      </select>)
    }
    return this.renderField(field.name, field.label,
      <select className="form-control" id={field.name} ref={field.name}>
        {options}
      </select>
    )
  },  
  renderRadioInlines: function(options) {
    var radios = options.values.map(function(value, index) {
      var defaultChecked = (value == options.defaultCheckedValue)
      return <label key={index} className="radio-inline">
        <input type="radio" ref={options.name + value} name={options.name} value={value} defaultChecked={defaultChecked}/>
        {options.labelList? options.labelList[index] : capitalize(value)}
      </label>
    })
    return this.renderField(options.name, options.label, radios)
  },
  renderCheckbox: function(options) {
      return this.renderField(options.name, options.label,
        <input type="checkbox" className="form-control" id={options.name} ref={options.name}/>
      )
  },
  renderCheckboxInlines: function(options) {
    var radios = options.values.map(function(value, index) {
      var defaultChecked = (value == options.defaultCheckedValue)
      return <label key={index} className="radio-inline">
        <input type="checkbox" ref={options.name + value} name={options.name+value} value={value} defaultChecked={defaultChecked}/>
        {options.labelList? options.labelList[index] : capitalize(value)}
      </label>
    })
    return this.renderField(options.name, options.label, radios)
  },
  __key:1,
  renderField: function(id, label, field) {
    return <div key={this.__key} className={$class('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className="col-sm-4 control-label">{label}</label>
      <div className="col-sm-6">
        {field}
      </div>
    </div>
  }
})

// Utilsg

var trim = function() {
  var TRIM_RE = /^\s+|\s+$/g
  return function trim(string) {
    return string.replace(TRIM_RE, '')
  }
}()
function capitalize(value){
    return value[0].toUpperCase()+value.substring(1);
}
function $class(staticClassName, conditionalClassNames) {
  var classNames = []
  if (typeof conditionalClassNames == 'undefined') {
    conditionalClassNames = staticClassName
  }
  else {
    classNames.push(staticClassName)
  }
  for (var className in conditionalClassNames) {
    if (!!conditionalClassNames[className]) {
      classNames.push(className)
    }
  }
  return classNames.join(' ')
}

export default JwtForm;
