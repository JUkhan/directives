var Pager=React.createClass({
    displayName:'Pager',
    
    render:function(){
        return(
            React.createElement("ul", {className: "pager"}, 
              React.createElement("li", null, React.createElement("a", {href: "#"}, "Previous")), 
              React.createElement("li", null, React.createElement("a", {href: "#"}, "Next"))
            )
            )
    }
});
//export default Pager;