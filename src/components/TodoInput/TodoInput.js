import React from 'react'
import './index.css'
// import TodoLists from '../TodoLists/TodoLists'
import $ from 'jquery'

export default class TodoInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {

      todoLists:[],// 待做
      doLists:[],// 已做
      lists:[],// 显示
      thing:"",
    }
  }
  componentWillReceiveProps(nextState){
    if(nextState.lists.length>0){
      $(".footer").css("display","block")
    }else{
      $(".footer").css("display","none")
    }

  }
  // enter事件
  enterEvent(e){
    if(e.keyCode==13&&e.target.value.trim()!=""){

      const item = {
        isDo:false,
        thing:this.state.thing
      }
      this.state.lists.push(item)
      this.state.todoLists.push(item)
      //添加成功后
      this.setState({
        todoLists:this.state.todoLists,
        lists:this.state.lists,
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
  
    const type = $(e.target).data("type")

    if(type==1){
      this.state.lists = this.state.lists
      this.setState({
        lists:this.state.lists
      })
    }else if(type==2){
      this.state.lists = this.state.todoLists
      this.setState({
        lists:this.state.lists
      })
    }else{
      this.state.lists = this.state.doLists
      this.setState({
        lists:this.state.lists
      })
    }

 }

 // 点击圆圈选择当前thing是否已完成
 itemCheck(e){
   const index = $(e.target).parent().data("index")
  this.state.lists[index].isDo = !this.state.lists[index].isDo
  const todoLists = this.state.lists.filter(item=>{
    return !item.isDo
  })
  const doLists = this.state.lists.filter(item=>{
    return item.isDo
  })

  this.setState({
    lists:this.state.lists,
    todoLists:todoLists,
    doLists:doLists
  })
}

// 点击删除
delete(e){
 const index = $(e.target).parent().data("index")
  this.state.lists.splice(index,1)
  this.setState({
    lists:this.state.lists
  })

   
} 

// 清空已完成的thing
clearCompleted(){
  this.state.doLists.length=0
  this.setState({
    doLists:this.state.doLists
  })
}

//渲染
  render(){
    return (
      <div>
        <div className="todo_input">
          <span><i className="iconfont">&#xe661;</i></span>
          <input type="text" placeholder="What needs to be done?" value={this.state.thing} onChange={(e)=>{this.handleChange(e)}} onKeyDown={(e)=>{this.enterEvent(e)}}/>
        </div>
        <div className="todo_lists">
          <ul>
            {this.state.lists.length==0?'':this.state.lists.map((item,index)=>{
              return (
                <li key={index} className="list_item" data-index={index}>
                  <i onClick={(e)=>{this.itemCheck(e)}} className={item.isDo==false?"":'checked'}></i>
                  <span className={item.isDo==false?"":'isChecked'}>{item.thing}</span>
                  <b onClick={(e)=>{this.delete(e)}}>×</b>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="footer clearfix" style={ this.state.lists.length>0?styles.show:styles.hide }>
          <div className="left">
            {this.state.todoLists.length} items left
          </div>
          <div className="center">
            <span className="active" onClick={(e)=>{this.findType(e)}} data-type='1'>All</span>
            <span  onClick={(e)=>{this.findType(e)}} data-type='2'>Active</span>
            <span  onClick={(e)=>{this.findType(e)}} data-type='3'>Completed</span>
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