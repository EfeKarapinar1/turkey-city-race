import React, { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import TurkeyMap from 'turkey-map-react';
import ChartRace from 'react-chart-race';
import { plakaSehirCevir, getCount, increaseCount, getAll } from './Iller';
import './app.css'

function App() {
  const BreakError = {};
  const socketUrl = 'ws://localhost:8887';

  const [ raceData, setRaceData ] = useState([]);
  const [ selectedCity, setSelectedCity ] = useState(0);
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null && !isNaN(parseInt(lastMessage.data))) {
      const fetchData = async () => {
        await setSelectedCity(parseInt(lastMessage.data));
        await increaseCount(lastMessage.data);

        setRaceData(getAll);
      }

      fetchData();

      console.log(raceData)
    }
  }, [lastMessage]);

  useEffect(() => {
    if(readyState == ReadyState.OPEN)
    {
      setInterval(() => {
        sendMessage('random_lokasyon_ver');
      }, 100);
    }
  }, [readyState])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const renderCity = (cityComponent, city) => {
    cityComponent.props.key = city.id;
    if(city.plateNumber === selectedCity){
      cityComponent.props['data-is-election-city'] = true;
    }
    return (cityComponent);
  };

  return (
    <div>
      <h1 className='font-bold'>The WebSocket is currently {connectionStatus}</h1>

      <div className='flex'>
        <div className="w-screen">
          {selectedCity && <TurkeyMap showTooltip cityWrapper={renderCity}/>}
        </div>

        <div className="w-screen">
          <ChartRace data={raceData}
            backgroundColor="#FFF"
            width={760}
            padding={5}
            itemHeight={10}
            gap={5}
            titleStyle={{ 
              font: "normal 400 10px Arial", 
              color: "#000000" 
            }}
            valueStyle={{
              font: "normal 400 11px Arial",
              color: "#000000"
            }}
          />
        </div>  
      </div>
    </div>
  );
}

export default App;
