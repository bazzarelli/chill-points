'use client';

import Image from 'next/image';


enum CONNECTION_STATUS {
  DISCONNECTED = 'disconnected',
  DISCONNECTING = 'disconnecting',
  CONNECTED = 'connected',
  CONNECTING = 'connecting',
}

type DeviceStatusProps = {
  status: CONNECTION_STATUS,
  timeConnected: string | null,
  handleConnect: () => void,
  handleDisconnect: () => void,
}

function DeviceStatus({status, timeConnected, handleConnect, handleDisconnect, }: DeviceStatusProps) {
  return (
    <div className="flexflex-col mb-2 mt-2">
      <div className="flex w-1/2 mx-auto px-1 text-stone-500" style={{ alignContent: "center"}}>
        <div className={`flex-1 w-1/3 text-left`}>
            <Image className="opacity-50 inline-block" src={`/icons/bluetooth_${status}.svg`} alt={`Bluetooth ${status}`} width="24" height="24" />                    
            <span className={`${status == CONNECTION_STATUS.CONNECTED && "text-blue-500"}`}>
                {status}
            </span>
        </div>
        <div className="flex-1 w-1/3 text-center">
            {status === CONNECTION_STATUS.CONNECTED && timeConnected}
        </div>
        <div className="flex-1 w-1/3 text-right">
          {status === CONNECTION_STATUS.DISCONNECTED &&
              <button className={`btn btn-accent mx-auto shadow-lg`} onClick={handleConnect}>
                  Pair Device
              </button>                    
          }
          {status === CONNECTION_STATUS.CONNECTED &&
              <button className={`btn btn-accent mx-auto shadow-lg`}  onClick={handleDisconnect}>
                  Unpair Device
              </button>
          }
        </div>
      </div>
    </div>
  )
}

export { DeviceStatus, CONNECTION_STATUS }