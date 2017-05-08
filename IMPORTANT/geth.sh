//geth run command
geth --port 3000 --networkid 15 --nodiscover --datadir="ChainData" --maxpeers=0 --rpc --rpcport 8545 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3" --ipcpath "geth.ipc"
