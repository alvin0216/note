const Demo1 = () => {
  const onDragStart = (e) => {
    // @ts-ignore
    e.dataTransfer.setData('index', e.target.dataset.index);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  /** 拖拽到该区域 */
  const onDrop = (e) => {
    alert(e.dataTransfer.getData('index'));
  };

  return (
    <div className='demo'>
      <h3>Demo1 - 基础拖拽</h3>
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

export default Demo1;
