import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()

    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts()

    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    // Address
    if (SocialNetwork.networks[networkId]) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, SocialNetwork.networks[networkId].address)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      // Load Posts
      await this.loadPosts()
      this.setState({ loading: false })
    }
    else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }
  }

  async loadPosts() {
    const posts = []
    for (var i = 1; i <= this.state.postCount; i++) {
      const post = await this.state.socialNetwork.methods.posts(i).call()
      posts.push(post)
    }
    this.setState({
      posts: posts.sort((a, b) => b.tipAmount - a.tipAmount),
    })
  }

  createPost(content) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.createPost(content).send({ from: this.state.account })
      .once('receipt', async () => {
        await this.loadPosts()
        this.setState({ loading: false })
      })
  }

  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
      .once('receipt', async () => {
        await this.loadPosts()
        this.setState({ loading: false })
      })
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading
          ? <div id="loader" className="text-center mt-5 pt-5"><p>Loading...</p></div>
          : <Main
            posts={this.state.posts}
            createPost={this.createPost.bind(this)}
            tipPost={this.tipPost.bind(this)}
          />
        }
      </div>
    );
  }
}

export default App;
