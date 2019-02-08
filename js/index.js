(function () {
  //开始按钮
  var startBtn = document.querySelector('.start');
  //雷区
  var box = document.querySelector('.box');
  //雷数显示
  var num = document.querySelector('.num');
  //难度区
  var difficultyBox = document.querySelector('.difficulty');
  //雷区大小
  var boxWidth = box.offsetWidth;
  //雷数
  var leiNum;
  //行,列
  var row,col;
  //难度
  var difficulty = '简单';
  //待添加雷数
  var addNum = null;
  //存雷
  var allNum = {};
  //雷区小方块
  var itemAll = null;
  //弹窗
  var alertBox = document.querySelector('.alertBox');
  //游戏状态
  var key = true;
  //总体
  var wrapper = document.querySelector('.wrapper');

  bindEvent();
 
  //绑定事件
  function bindEvent () {

    //开始按钮点击事件
    startBtn.addEventListener('click',startClick);
    
    //雷区mousedown事件
    box.addEventListener('mousedown',boxDown);

    //取消右键默认点击事件
    box.oncontextmenu = function () {
      return false;
    }

    //difficulty难度绑定事件
    difficultyBox.addEventListener('click',difficultyClick)

  }
   //判断游戏难度
   function difficultyNum(difficulty) {
    switch(difficulty){
      case '简单':
      row = 10,col = 10,leiNum = 10 , addNum = 10;
      break;
      case '普通':
      row = 10,col = 10,leiNum = 20, addNum = 20;
      break;
      case '困难':
      row = 10,col = 10,leiNum = 30, addNum = 30;
      break;
    }
  }

  //start点击事件
  function startClick(e) {
   var e = e || window.event;
   //点击重新
   if(e.target.innerText === 'Reast'){
     box.innerHTML='';
     num.innerText = '0';
     alertBox.style.display = 'none';
     key = true;
   }
    //生成文档碎片
    var wrapper = document.createDocumentFragment();
    //执行难度判断,得到行,列,总雷数,待添加雷数
    difficultyNum(difficulty)
    for(var i = 0; i < row; i++){
      for(var j = 0; j < col; j++){
        var item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id',i + '-' + j);
        item.style.width = Math.floor(boxWidth / row) + 'px';
        item.style.height = Math.floor(boxWidth / row) + 'px';
        wrapper.appendChild(item)
      }
    }

    //插入雷区
    box.appendChild(wrapper);
    //插入雷数
    num.innerText = leiNum;
    startBtn.innerText = 'Reast';

    itemAll = box.querySelectorAll('.item');
    
    //添加雷
    while(addNum){
      var index = Math.floor(Math.random()*(row * col));
      //判断下所有雷对象里面的key值里面是否有值
      if(!allNum[index]){
        allNum[index] = true;
        itemAll[index].classList.add('islei');
        var lei = document.createElement('div');
        itemAll[index].appendChild(lei);
        lei.classList.add('lei');
        lei.style.backgroundSize = Math.floor(boxWidth / row) * 3 + 'px';
        addNum--;
      }
    }
  }

  //雷数mousedown
  function boxDown(e) {
   if(key){
      //左键1 右键3
    if(e.which === 1){
      leftClick(e.target)
    }else if(e.which === 3){
      rightClick(e.target)
    }
   }
  }

  //左键点击
  function leftClick(dom) {
    if(dom && dom.classList.contains('islei')){
      var allLei = box.querySelectorAll('.islei');
      var len = allLei.length;
      for(var i = 0; i < len; i++){
        allLei[i].children[0].style.display = 'block';
      }
      alert('Game Over !!!')
    }else{
      if(dom !==box){
        look(dom)
      }
    }
  }

  //扩散检查
  function look(dom) {
    var id = dom.getAttribute('id').split('-');
    var row = id && +id[0], col = id && +id[1];
    var n = 0;
    for(var i = row -1; i <= row +1; i++){
      for(var j = col -1; j <= col +1; j++){
        var id = i + '-' + j;
        var item = document.getElementById(id);
        if(item && item.classList.contains('islei')){
          item.classList.add('check');
          n++;
        }
      }
    }
    
    if(dom){
      dom.innerText = n;
      dom.style.fontSize = Math.floor(dom.offsetWidth / 2) + 'px';
      dom.style.lineHeight = dom.offsetWidth +'px';
    }
    
    if(n === 0){
      for(var i = row -1; i <= row + 1; i++){
        for(var j = col -1; j <= col + 1; j++){
          var id = i + '-' + j;
          var item = document.getElementById(id);
          if(item && item.length != 0){
            if(!item.classList.contains('check')){
              item.classList.add('check')
              look(item)
            }
          }
        }
      }
    }
  }

  //右键点击
  function rightClick(dom) {
    dom.classList.toggle('qizhi');
    if(dom.classList.contains('islei')){
      //查看下是否有标记,有标记的就是已经找出来的雷
      if(!dom.classList.contains('right')){
        num.innerText = --leiNum;
        dom.classList.add('right')
      }
    
    }
   if(leiNum === 0){
     alert('Good Job !!!')
   }
  }

  //弹窗
  function alert(text) {
    alertBox.innerText = text;
    alertBox.style.display = 'block';
    key = false;
  }
  
  //difficultyClick难度选择
  function difficultyClick(e) {
    //属性重置
    var e = e || window.event;
    startBtn.innerText = 'Start';
    box.innerHTML='';
    num.innerText = '0';
    difficulty = e.target && e.target.innerText;
  }
} ())