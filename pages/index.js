import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Home() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [floorQueue, setFloorQueue] = useState([]);
  const [moving, setMoving] = useState(false);
  const [direction, setDirection] = useState('up');
  const [nextFloor, setNextFloor] = useState(null);
  const floors = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (floorQueue.length > 0 && !moving) {
      moveToFloor(floorQueue[0]);
    }
  }, [floorQueue, moving]);

  const moveToFloor = (floor) => {
    setMoving(true);
    setDirection(floor > currentFloor ? 'up' : 'down');
    setNextFloor(floor);
    setTimeout(() => {
      setCurrentFloor(floor);
      setFloorQueue((prevQueue) => prevQueue.slice(1));
      setMoving(false);
    }, 1000);
  };

  const handleFloorRequest = (floor) => {
	  
    if (floor === currentFloor) {
	alert("現在のフロアと同じフロアに移動することはできません");
	return;
	}
    	setFloorQueue((prevQueue) => [...prevQueue, floor]);
    
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>エレベーターシミュレーター</h1>
      <div>
        {floors.map((floor) => (
          <button key={floor} onClick={() => handleFloorRequest(floor)}>
            {floor}階
          </button>
        ))}
      </div>
      <CSSTransition in={moving} timeout={500} classNames="floor">
        <div style={{ marginTop: '20px' }}>
          <h2>現在のフロア: {currentFloor}階</h2>
          <h3>方向: {moving ? `${nextFloor}階へ${direction === 'up' ? '上昇中↑' : '下降中↓'}` : '停止中'}</h3>
        </div>
      </CSSTransition>
      <div>
        <h3>キュー: {floorQueue.join(', ')}</h3>
      </div>
    </div>
  );
}
