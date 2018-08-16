import React, { Component } from 'react';
import './App.css';

const images = [ require('./image/image_1/1_part1x1.jpg'),require("./image/image_1/1_part1x2.jpg"),require("./image/image_1/1_part1x3.jpg"),
                require("./image/image_1/1_part2x1.jpg"),require("./image/image_1/1_part2x2.jpg"),require("./image/image_1/1_part2x3.jpg"),
                require("./image/image_1/1_part3x1.jpg"),require("./image/image_1/1_part3x2.jpg"),require("./image/image_1/1_part3x3.jpg")];
const randomImages = images;
console.log(randomImages);
randomImages.sort(function(a, b) {
    return 0.5 - Math.random();
});
//亂數排序 images 
// const randomImages= images.sort(function(a, b) {
//     return 0.5 - Math.random();
// });
console.log(images)
console.log(randomImages);

class Blocks extends Component{
  constructor(props){
    super(props);
    this.state={winner: -1}; // -1 沒成功 0 成功
  }
  componentDidMount(){
    let sourceContainer = '';
    let sourceImg ='';

    // Allow multiple draggable items
    let dragSources = document.querySelectorAll('[draggable="true"]')
    dragSources.forEach(dragSource => {
      dragSource.addEventListener('dragstart', dragStart)
    })

    // Allow multiple dropped targets
    let dropTargets = document.querySelectorAll('[data-role="drag-drop-container"]')
    dropTargets.forEach(dropTarget => {
      dropTarget.addEventListener('drop', dropped.bind(this)) // why bind(this)??????
      dropTarget.addEventListener('dragenter', cancelDefault)
      dropTarget.addEventListener('dragover', cancelDefault)
    })

    function cancelDefault (e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    function dragStart (e) {
      //let A = e.target.setAttribute("id", "img001");
      e.dataTransfer.setData('text/plain', e.target.dataset.id);
      sourceContainer = this.parentElement;
      sourceImg = e.target;
      console.log(sourceContainer);
     // console.log(randomImages[0]);
     
      //console.log('sourceContainerId', sourceContainerId)
    }

    function dropped (e) {
        // execute function only when target container is different from source container
        let id = e.dataTransfer.getData('text/plain') 

        //找到拖拉圖片的src
        if (e.target !== sourceContainer && e.target !== sourceImg) {
          console.log(e.target)
          cancelDefault(e)
          e.target.appendChild(document.querySelector('[data-id=\u0022'+id+'\u0022]'));
        }
        //檢查圖片是否在正確位置
        if( document.querySelector('[data-index="0"]> img') != null && document.querySelector('[data-index="1"]> img') != null &&
            document.querySelector('[data-index="2"]> img') != null && document.querySelector('[data-index="3"]> img') != null &&
            document.querySelector('[data-index="4"]> img') != null && document.querySelector('[data-index="5"]> img') != null &&
            document.querySelector('[data-index="6"]> img') != null && document.querySelector('[data-index="7"]> img') != null &&
            document.querySelector('[data-index="8"]> img') != null ){
            if(document.querySelector('[data-index="0"]> img').getAttribute('src').indexOf("1_part1x1") != -1 &&
              document.querySelector('[data-index="1"]> img').getAttribute('src').indexOf("1_part1x2") != -1 &&
              document.querySelector('[data-index="2"]> img').getAttribute('src').indexOf("1_part1x3") != -1 &&
              document.querySelector('[data-index="3"]> img').getAttribute('src').indexOf("1_part2x1") != -1 &&
              document.querySelector('[data-index="4"]> img').getAttribute('src').indexOf("1_part2x2") != -1 &&
              document.querySelector('[data-index="5"]> img').getAttribute('src').indexOf("1_part2x3") != -1 &&
              document.querySelector('[data-index="6"]> img').getAttribute('src').indexOf("1_part3x1") != -1 &&
              document.querySelector('[data-index="7"]> img').getAttribute('src').indexOf("1_part3x2") != -1 &&
              document.querySelector('[data-index="8"]> img').getAttribute('src').indexOf("1_part3x3") != -1 ){
                this.setState({winner:0});
            }
        }
    // End of Drag and Drop Basic
    }

  }

  render(){
   
    let blocks= [];
    let blocks2=[];
    let winner=[];
    for(let i=0;i<=4;i++){
      blocks.push(<div className="p-block" data-role="drag-drop-container"><img src={randomImages[i]}  draggable="true" data-id={i} /></div>);
    }
    
    for(let i=5;i<=8;i++){
      blocks2.push(<div className="p-block" data-role="drag-drop-container" ><img src={randomImages[i]} draggable="true" data-id={i}/></div>);
    }
    
    if(this.state.winner == 0){
      winner.push(<Winner />);
    }
        
    return(
    <div className="blocks">
      <div className="block-1" data-role="drag-drop-container">
        {blocks}
      </div>
      <div className="block-2" data-role="drag-drop-container">
        {blocks2}
      </div>
      
      {winner}
    </div>
    )
  }
}
class Winner extends Component{
  render(){
    return (
    <div className="winner">
      <div className="winner-block">
        <p>Success !!</p>
        <div className="close" onClick={this.click}>Clsoe</div>
      </div>
    
    </div>)
  }
  click(){
    document.querySelector('.winner').style.display='none';
  }
}

class App extends Component {
  componentDidMount(){
  }
  render() {
    let puzzle=[];
    for(let i=0;i<=images.length-1;i++){
      puzzle.push( <div className="puzzle" data-index={i} data-role="drag-drop-container" ></div>)
    }
    
    return (
      <div className="wrap">
        <div className="puzzles">
         {puzzle}
        </div>
        <Blocks/>
        
      </div>
    );
  }
 
}

export default App;
