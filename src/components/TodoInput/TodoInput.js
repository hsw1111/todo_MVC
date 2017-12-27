import React from 'react'
import './index.css'
// import TodoLists from '../TodoLists/TodoLists'
import $ from 'jquery'

export default class TodoInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      itemLists:[],
      thing:"",
      todoLists:[],
      doLists:[]
    }
  }
  componentWillReceiveProps(nextState){
    if(nextState.itemLists.length>0){
      $(".footer").css("display","block")
    }else{
      $(".footer").css("display","none")
    }
    console.log(11)
  }
  // enter事件
  enterEvent(e){
    if(e.keyCode==13){
      console.log(this.state.thing)

      const item = this.state.thing
      this.state.itemLists.push(item)
      this.state.todoLists.push(item)
      //添加成功后
      this.setState({
        itemLists:this.state.itemLists,
        todoLists:this.state.todoLists,
        thing:''
      })
    }
  }
 // 文本框内容改变
 handleChange(e){
    this.setState({
      thing:e.target.value
    })
 }

 // 底部选择类型
 findType(e){
    $(e.target).addClass("active").siblings().removeClass("active")
 }

 // 点击圆圈选择当前thing是否已完成
 itemCheck(e){
  const index = $(e.target).parent().attr("index")
  if(e.target.classList.contains("checked")){
    e.target.classList.remove("checked")
    $(e.target).siblings("span").removeClass("isChecked")


  }else{
    e.target.classList.add("checked")
    $(e.target).siblings("span").addClass("isChecked")
  }
}

// 点击删除
delete(index){
 
  this.state.itemLists.splice(index,1)
  this.setState({
    itemLists:this.state.itemLists
  })
  console.log(index)
  $(".list_item").eq(index).find("i").removeClass("checked")
  $(".list_item").eq(index).find("span").removeClass("isChecked")
  
} 

// 清空已完成的thing
clearCompleted(){
 
}

//渲染
  render(){
    return (
      <div>
        <div className="todo_input">
          <span><i className="iconfont">&#xe661;</i></span>
          <input type="text" placeholder="What needs to be done?" value={this.state.thing} onChange={(e)=>{this.handleChange(e)}} onKeyDown={(e)=>{this.enterEvent(e)}}/>
        </div>
        {/* <TodoLists itemLists={this.state.itemLists}/> */}
        <div className="todo_lists">
          <ul>
            {this.state.itemLists.length==0?'':this.state.itemLists.map((item,index)=>{
              return (
                <li key={index} className="list_item">
                  <i onClick={(e,index)=>{this.itemCheck(e,index)}}></i>
                  <span>{item}</span>
                  <b onClick={(index)=>{this.delete(index)}}>×</b>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="footer clearfix" style={ this.state.itemLists.length>0?styles.show:styles.hide }>
          <div className="left">
            {this.state.itemLists.length-this.state.doLists.length} items left
          </div>
          <div className="center">
            <span className="active" onClick={(e)=>{this.findType(e)}}>All</span>
            <span  onClick={(e)=>{this.findType(e)}}>Active</span>
            <span  onClick={(e)=>{this.findType(e)}}>Completed</span>
          </div>
          <div className="bottom" style={this.state.doLists.length>0?styles.show:styles.hide} onClick={()=>{this.clearCompleted()}}>
            Clear completed
          </div>
        </div>
      </div>
    )
  }
}
const styles = {
  show:{
    display:"block"
  },
  hide:{
    display:"none"
  }
}