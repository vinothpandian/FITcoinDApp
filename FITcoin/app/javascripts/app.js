// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
var url = require("file-loader!./../images/fit.png");

// Import libraries we need.
import {
  default as Web3
} from 'web3';
import {
  default as contract
} from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import fitcoin_artifacts from '../../build/contracts/FITcoin.json'

// FITcoin is our usable abstraction, which we'll use through the code below.
var FITcoin = contract(fitcoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var balance;


window.App = {

  start: function() {
    document.getElementById("logo").innerHTML = "<img src=\"" + url + "\" alt=\"logo\">"
    var self = this;

    // Bootstrap the FITcoin abstraction for Use.
    FITcoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;

    var meta;
    FITcoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {
        from: account
      });
    }).then(function(value) {
      var balance_element = document.getElementById("balance");
      balance_element.innerHTML = value.valueOf();
      balance = value.toNumber();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  transfer: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    var receiver = document.getElementById("receiver").value;

    if (amount == null || receiver == null || receiver == '' || amount == NaN) {
      this.setStatus("Please enter all fields in the form before initiating transfer.");
    } else {
      this.setStatus("Initiating transaction... (please wait)");

      var meta;
      FITcoin.deployed().then(function(instance) {
        meta = instance

        if (balance < amount) {
          self.setStatus("Insufficient Balance!");
        } else {
          return meta.transfer(receiver, amount, {
            from: account
          });
        }
      }).then(function() {
        if (balance < amount) {
          self.setStatus("Insufficient Balance!");
        } else {
          self.setStatus("Transaction to !"+ receiver +" complete");
          self.refreshBalance();
        }
      }).catch(function(e) {
        console.log(e);
        self.setStatus("Error sending coin; see log.");
      });
    }
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 FITcoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
