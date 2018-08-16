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
    this.state={marks:[-1,-1,-1,-1,-1,-1,-1,-1,-1]};
  }
  componentDidMount(){
    let sourceContainerId = ''

    // Allow multiple draggable items
    let dragSources = document.querySelectorAll('[draggable="true"]')
    dragSources.forEach(dragSource => {
      dragSource.addEventListener('dragstart', dragStart)
    })

    // Allow multiple dropped targets
    let dropTargets = document.querySelectorAll('[data-role="drag-drop-container"]')
    dropTargets.forEach(dropTarget => {
      dropTarget.addEventListener('drop', dropped)
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
      
      console.log(e.target.dataset.id);
     // console.log(randomImages[0]);
      sourceContainerId = this.parentElement.id
      //console.log('sourceContainerId', sourceContainerId)
    }

    function dropped (e) {
      // execute function only when target container is different from source container
        cancelDefault(e)
        let id = e.dataTransfer.getData('text/plain') 
        console.log(e.target) 
        // console.log(id)  //[object HTMLImageElement] String?

        //找到拖拉圖片的src
        e.target.appendChild(document.querySelector('[data-id=\u0022'+id+'\u0022]'));
        // alert(document.querySelector('[data-id=\u0022'+id+'\u0022]').getAttribute('src'));
        alert(document.querySelector('[data-id=\u0022'+id+'\u0022]').getAttribute('src').indexOf("1_part1x1"));
        
        //alert(e.target.querySelector("img").getAttribute('src'));
        alert(e.target.dataset.index);
        if(e.target.dataset.index == 0 && e.target.querySelector("img").getAttribute('src').indexOf("1_part1x1") != -1 ){
          this.setState({marks:0});
        }
    }
    // End of Drag and Drop Basic


   

  }
  render(){
    let blocks= [];
    let blocks2=[];
    for(let i=0;i<=4;i++){
      blocks.push(<div className="p-block" data-role="drag-drop-container"><img className="img"  src={randomImages[i]}  draggable="true" data-id={i} /></div>);
    }
    
    for(let i=5;i<=8;i++){
      blocks2.push(<div className="p-block" data-role="drag-drop-container" ><img className="img" src={randomImages[i]} draggable="true" data-id={i}/></div>);
    }
    

    
    return(
    <div className="blocks">
      <div className="block-1" data-role="drag-drop-container">
        {blocks}
      </div>
      <div className="block-2" data-role="drag-drop-container">
        {blocks2}
      </div>
    </div>
    )}
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
