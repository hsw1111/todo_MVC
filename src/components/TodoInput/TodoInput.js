import React from 'react'
import './index.css'
// import TodoLists from '../TodoLists/TodoLists'
import $ from 'jquery'

export default class TodoInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {

      todoNum:0,// 待做
      doNum:0,// 已做
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
      //添加成功后
      this.setState({
        todoNum:this.state.lists.length,
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
    var list = []
    if(type==1){
      list = this.state.lists
    }else if(type==2){
      list = this.state.lists.filter(item=>{
        return !item.isDo
      })
    }else{
      list = this.state.lists.filter(item=>{
        return item.isDo
      })
    }
    this.setState({
      lists:list
    })

 }

 // 点击圆圈选择当前thing是否已完成
 itemCheck(e){
   const index = $(e.target).parent().data("index")
   this.state.lists[index].isDo = !this.state.lists[index].isDo
   console.log(this.state.lists)
   this.public()
}

// 点击删除
delete(e){
 const index = $(e.target).parent().data("index")
  this.state.lists.splice(index,1)
  this.setState({
    lists:this.state.lists
  })
  this.public()
} 

// 清空已完成的thing
clearCompleted(){
  this.state.doNum = 0
  const lists = this.state.lists.filter(item=>{
    return !item.isDo
  })
  this.setState({
    lists:lists
  })
}

//公共
public(){
  const todoNum = this.state.lists.filter(item=>{
    return !item.isDo
  }).length
  const doNum = this.state.lists.filter(item=>{
    return item.isDo
  }).length

  this.setState({
    lists:this.state.lists,
    todoNum,
    doNum
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
            {this.state.todoNum} items left
          </div>
          <div className="center">
            <span className="active" onClick={(e)=>{this.findType(e)}} data-type='1'>All</span>
            <span  onClick={(e)=>{this.findType(e)}} data-type='2'>Active</span>
            <span  onClick={(e)=>{this.findType(e)}} data-type='3'>Completed</span>
          </div>
          <div className="bottom" style={this.state.doNum>0?styles.show:styles.hide} onClick={()=>{this.clearCompleted()}}>
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