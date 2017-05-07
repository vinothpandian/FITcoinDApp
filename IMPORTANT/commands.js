
//Check balance
MetaCoin.deployed().then(function(instance) {
  meta = instance;
  return meta.getBalance.call(ac1, {
    from: ac1
  });
}).then(function(balance) {
  console.log(balance.toNumber())
});

//Check balance
meta.getBalance.call(ac1, {from:ac1}).then(function(balance){console.log(balance.toNumber());});

//Check Value
meta.getValue.call().then(function(value){console.log(value.toNumber());});


//Send coin
MetaCoin.deployed().then(function(instance){meta=instance; return meta.sendCoin(ac2,10,{from:ac1});}).then(function(result){console.log("TX SUX");});


//set meta var
MetaCoin.deployed().then(function(instance){meta=instance});
