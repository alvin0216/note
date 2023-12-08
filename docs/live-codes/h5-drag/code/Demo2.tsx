const Demo2 = () => {
  const onDragStart = (e) => {
    // @ts-ignore
    e.dataTransfer.setData('index', e.target.dataset.index);
  };

  const onDragOver = (e) => {
    //
    e.dataTransfer.dropEffect = 'link'; // 修改移动时的光标样式 默认 copy
    e.preventDefault();
  };

  /** 拖拽到该区域 */
  const onDrop = (e) => {
    alert(e.dataTransfer.getData('index'));
  };

  return (
    <div className='demo'>
      <h3>Demo2 - dropEffect 设置移动的光标</h3>
      <div className='flex'>
        <div className='box1' draggable ondragstart={onDragStart} data-index='1'>
          源对象
        </div>
        <div className='box2' ondragover={onDragOver} ondrop={onDrop}>
          目标对象
        </div>
      </div>
    </div>
  );
};

export default Demo2;
