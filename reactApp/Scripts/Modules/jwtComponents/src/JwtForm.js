import JwtMultiSelect from 'Scripts/Modules/jwtComponents/JwtMultiSelect.js';
import {cssClass, capitalize} from 'Scripts/Modules/jwtComponents/JwtUtil.js';

var JwtForm=React.createClass({
    getInitialState:function(){
        return {errors: {},  isHide:false, message:null, col:1, labelCol:4, inputCol:6}
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
               case 'info': break;        
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
                errors[field.name] = 'This field is required';                
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
                     this.refs[field.name+value].getDOMNode().checked=(data[field.name]===value);                 
                  
                }.bind(this))
              break;
              case 'checkbox':
                 this.refs[field.name].getDOMNode().checked = !!data[field.name] ;            
              break;
              case 'checkboxInlines':
                  field.values.forEach(function(value){           
                       this.refs[field.name+value].getDOMNode().checked = !!data[value] ;        
                }.bind(this))            
              break;
              case 'multiSelect':
                 this.refs[field.name].setValue(data[field.name]);             
              break; 
              case 'info': break;        
              default:
                $(this.refs[field.name].getDOMNode()).val(data[field.name]||'');
              break
        }
      }.bind(this))
      //this.isValid()
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
      var data= this.__formData||{};
       this.props.options.fields.forEach(function(field) {
        switch(field.type.toLowerCase()){
           case 'radio':       
              field.values.forEach(function(value){
                if(this.refs[field.name+value].getDOMNode().checked){
                     data[field.name]=value;
                }
              }.bind(this))
           break;
           case 'checkbox':
               data[field.name]=this.refs[field.name].getDOMNode().checked ;             
           break;
           case 'checkboxinlines':
                field.values.forEach(function(value){           
                     data[value]=this.refs[field.name+value].getDOMNode().checked ;          
              }.bind(this))            
           break;
           case 'multiselect':
              data[field.name]= this.refs[field.name].getValue();             
           break; 
           case 'info': break;         
           default:
              data[field.name]=$(this.refs[field.name].getDOMNode()).val();
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
       return <div className={cssClass('jwt-form',{hide:this.state.isHide})}>
             <div className={'panel panel-'+options.laf}>
                  <div className="panel-heading clearfix">
                       <h3 className="panel-title pull-left">{options.title}</h3>
                  </div>
                   <div className="panel-body">
                      {msg}
                      <form  ref="form" className="form-horizontal" encType={options.fileUpload?'multipart/form-data':null}>
                          {this.__getFormFields(options)}
                      </form>
                   </div>
                   <div className="panel-footer">  
                        <div className="text-center">  
                              {this.getActionButtons()}                 
                        </div>  
                   </div>
                  
             </div>
         </div>
      
    },
    getActionButtons:function(){
      if(!this.props.options.buttons){
        return <div className="btn-group">                                             
                              <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>  
                                 
                              <button type="button"  className="btn btn-info" onClick={this.handleCancel}>Cancel</button>   
                            </div>
      }
      return  <div className="btn-group">
        {
          this.props.options.buttons.map(function(btn, index){

            if(btn.text && btn.className && btn.icon){
              return <button key={index} type="button" title={btn.title||'You missed the title'} className={btn.className} onClick={btn.onClick}><span className={btn.icon}></span> {btn.text}</button>
            }
            else if(btn.text && btn.className){
              return <button key={index} type="button" title={btn.title||'You missed the title'} className={btn.className} onClick={btn.onClick}>{btn.text}</button>
            }
            else if(btn.icon && btn.className){
              return <button key={index} type="button" className={btn.className} title={btn.title||'You missed the title'} className={btn.className} onClick={btn.onClick}><span className={btn.icon}></span></button>
            }
            else if(btn.icon){
              return <button key={index} type="button" className="btn btn-default" title={btn.title||'You missed the title'}  onClick={btn.onClick}><span className={btn.icon}></span></button>
            }
            else{
              return <button key={index} type="button" title={btn.title||'You missed the title'} className="btn btn-primary" onClick={btn.onClick}>{btn.text}</button>
            }
          })
        }
      </div>
  },
    __getFormFields(options){
      var colSpan=0;
       for(var i=0,l=options.fields.length;i<l; i++){
          if(options.fields[i].colSpan){
            colSpan +=options.fields[i].colSpan-1;
          }
       }

        if(this.state.col==1){return this.getFields(options);}
        var rows= parseInt(options.fields.length/this.state.col) + ((options.fields.length%this.state.col)>0?1:0)+colSpan;
        var res=[], col=parseInt(12/this.state.col);
        for (var i = 0; i < rows; i++) {
          var item=<div key={i} className="row">{this.__getCols(options, i, col) } </div>
          
          res.push(item);
        }
        return res;
    },
    __getCols(options, row, colNumber){
      var col=colNumber, res=[], index;
      
      for (var ic = 0; ic < this.state.col; ic++) {
        index=(row*this.state.col)+ic;
        if(index>=options.fields.length){continue;}
           if(options.fields[index].colSpan){
              col=colNumber*options.fields[index].colSpan;
              ic+=options.fields[index].colSpan-1;
           }

           res.push(<div key={index} className={'col-sm-'+col}>{this.getField(options.fields[index])}</div>);
           col=colNumber;
      }
      return res;
    },
    getField(field){
      switch(field.type.toLowerCase()){
              case 'text':
                return !field.hide && this.renderTextInput(field)
              break;
              case 'textarea':
                return !field.hide && this.renderTextarea(field)
              break;
              case 'select':
                return !field.hide && this.renderSelect(field)
              break;
              case 'radio':
                return !field.hide && this.renderRadioInlines(field)
              break;
              case 'checkbox':
                return !field.hide && this.renderCheckbox(field)
              break;
              case 'checkboxinlines':
                return !field.hide && this.renderCheckboxInlines(field)
              break;              
              case 'file':
                return !field.hide && this.renderFileInput(field)
              break;
              case 'multiselect':
                return !field.hide && this.renderMultiSelectt(field)
              break;
              case 'timepicker':
                return !field.hide && this.renderTimepicker(field)
              break;
              case 'colorpicker':
                return !field.hide && this.renderColorpicker(field)
              break;
               case 'datepicker':
                return !field.hide && this.renderDatepicker(field)
              break;
              case 'info':
                return !field.hide && this.renderInfo(field)
              break;
           } 
          return null;  
    },
    getFields:function(options){
      if(!options.fields) return
      var me=this;
        return options.fields.map((field, index)=>{
          me.__key=index;
           field.hide=field.hide||false;
           return this.getField(field);
           
        })
    },
    componentDidMount:function(){
      if(this.props.options.col){this.state.col=this.props.options.col;}
      if(this.props.options.labelCol){this.state.labelCol=this.props.options.labelCol;}
      if(this.props.options.inputCol){this.state.inputCol=this.props.options.inputCol;}
      if(this.state.col>1 && !this.props.options.inputCol){
        this.state.inputCol=8;
      }
    var tid=  setTimeout(function(){
       this.props.options.fields.forEach(function(field) {
        switch(field.type.toLowerCase()){
           case 'timepicker':               
               $(this.refs[field.name].getDOMNode()).timepicker(field.options||{});
           break;
           case 'colorpicker':       
               $(this.refs[field.name+'009'].getDOMNode()).colorpicker(field.options||{});               
           break;
            case 'datepicker':       
               $(this.refs[field.name+'009'].getDOMNode()).datepicker(field.options||{});               
           break;
        }
      }.bind(this));
       clearTimeout(tid);
}.bind(this), 0);
       if(this.props.options.componentDidMount){
          this.props.options.componentDidMount(this);
       }
    },
    renderInfo:function(options){
      //label label-success
      return this.renderField(options.name, options.label,
       <h3 className="message"> <span className={"label label-" +(options.laf||'info')}>{options.message}</span></h3>
      )
    },
     renderTimepicker: function(options) {
      return this.renderField(options.name, options.label,
        <div className="input-group bootstrap-timepicker">
            <input type="text" className="form-control" id={options.name} ref={options.name}/>
            <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
        </div>
      )
    },  
    
    renderDatepicker: function(options) {      
      return this.renderField(options.name, options.label,
        <div ref={options.name+'009'} className="input-group date">
            <input type="text" className="form-control" id={options.name} ref={options.name}/>            
            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
            {this.getButtons(options)}
        </div>
      )
    },
     renderColorpicker: function(options) {
      return this.renderField(options.name, options.label,
        <div ref={options.name+'009'} className="input-group colorpicker-component">
            <input type="text" className="form-control" id={options.name} ref={options.name}/>
            <span className="input-group-addon"><i></i></span>
        </div>
      )
    },
    renderMultiSelectt:function(field){
      return this.renderField(field.name, field.label,
        <JwtMultiSelect ref={field.name} data={field.data} hasError={field.name in this.state.errors} displayField={field.displayField} valueField={field.valueField}
        hwidth={field.hwidth} width={field.width} height={field.height} render={field.render} onClick={field.onClick} onChange={field.onChange}/>
      )
    },
    renderFileInput: function(options) {
      return this.renderField(options.name, options.label,
        <input type="file" className="form-control" name={options.name} id={options.name} ref={options.name}/>
      )
    },
     getButtons:function(field){
          if(!field.onClick){return null;}
          if(!Array.isArray(field.onClick)){
            field.onClick=[field.onClick];
          }
          var linkText=field.buttonText;
          if(!linkText){
            linkText=':::';
          }
          if(!Array.isArray(linkText)){
            linkText=[linkText];
          }
          var icons=field.icon;
          if(field.icon && !Array.isArray(icons)){
            icons=[icons];      
          }    

          return  field.onClick.map(function(fx, id){
            if(icons){
              return <span  key={id} className="input-group-addon" title={linkText[id]} onClick={fx.bind(null)} ><i className={icons[id]}></i></span>
            }
            return <span key={id} style={{cursor:'pointer'}} className="input-group-addon" onClick={fx.bind(null)} >{linkText[id]} </span>
          })    
  },
    renderTextInput: function(options) {
      var input=null;
      if(options.onClick){
        input=<div className="input-group date">
           <input type="text" className="form-control" id={options.name} ref={options.name}/>
            {this.getButtons(options)}
         </div>
      }else{
        input= <input type="text" className="form-control" id={options.name} ref={options.name}/>
      }
      return this.renderField(options.name, options.label,input);
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
    
    return <div key={this.__key} className={cssClass('form-group', {'has-error': id in this.state.errors})}>
      <label htmlFor={id} className={"col-sm-"+(this.state.labelCol)+" control-label"}>{label}</label>
      <div className={"col-sm-"+this.state.inputCol}>
        {field}
      </div>
    </div>
  }
})

// Utilsg

export default JwtForm;
