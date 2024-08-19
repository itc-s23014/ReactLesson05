import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function Home() {
  // 現在のフロアを保持するやつ
  const [currentFloor, setCurrentFloor] = useState(1);
  // フロアのリクエストを格納するキューを保持するやつ
  const [floorQueue, setFloorQueue] = useState([]);
  // エレベーターが移動中かどうかを保持するやつ
  const [moving, setMoving] = useState(false);
   // エレベーターの方向を保持する ('up' または 'down')
  const [direction, setDirection] = useState('up');
  //　移動階層保持するやつ
  const [nextFloor, setNextFloor] = useState(null);


  

  // 利用可能なフロアのリスㇳ
  const floors = [1, 2, 3, 4, 5];

  // フロアキューに変更があり、エレベーターが移動中でない場合、次のフロアに移動を開始
  useEffect(() => {
    if (floorQueue.length > 0 && !moving) {
      moveToFloor(floorQueue[0]);
    }
  }, [floorQueue, moving]);

  // エレベーターを指定されたフロアに移動させる関数
  const moveToFloor = (floor) => {
    setMoving(true);
    // 現在のフロアとリクエストされたフロアを比較し、上昇か下降かを設定
    setDirection(floor > currentFloor ? 'up' : 'down');
    
    setNextFloor(floor);

    setTimeout(() => {
      setCurrentFloor(floor);
      // フロアキューの先頭から2つのリクエストを削除 (修正ポイント)
      setFloorQueue((prevQueue) => prevQueue.slice(1));
      // 移動完了と設定し、方向をリセット
      setMoving(false);
      setDirection(null); 
    }, 1000);
  };

  // フロアのリクエストを受け付ける関数
  const handleFloorRequest = (floor) => {
  // エラーメッセージ追加
	  
    if (floor === currentFloor) {
	alert("現在のフロアと同じフロアに移動することはできません");
	return;
	}
   
    // リクエストされたフロアをキューに追加
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
      //エラーメッセージ追加
          <h3>方向: {moving ? `${nextFloor}階へ${direction === 'up' ? '上昇中' : '下降中'}` : '停止中'}</h3>
       	 </div>
        </CSSTransition>

          {moving && (
            <h3>方向: {direction === 'up' ? `${floorQueue[0]}階へ上昇中` : `${floorQueue[0]}階へ下降中`}</h3>
          )}
        </div>
      </CSSTransition>


      <div>
        <h3>キュー: {floorQueue.join(', ')}</h3>
      </div>
    </div>
  );
}


