import React, { Component } from 'react';
import Identicon from 'identicon.js';

export default class Main extends Component {
    render() {
        return (
            <div className="container-fluid mt-5 pt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 d-flex text-center mx-auto" style={{ maxWidth: '500px' }}>
                        <div className="content mr-auto ms-auto">
                            <p>&nbsp;</p>
                            <form className="mb-4" onSubmit={(event) => {
                                event.preventDefault()
                                const content = this.postContent.value
                                this.props.createPost(content)
                            }}>
                                <div className="form-group mr-sm-2">
                                    <input
                                        id="postContent"
                                        type="text"
                                        ref={(input) => { this.postContent = input }}
                                        className="form-control"
                                        placeholder="What's on your mind?"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-2" style={{ width: '100%' }}>Share</button>
                            </form>
                            {this.props.posts.map((post, key) => {
                                return (
                                    <div className="card mb-4" key={key}>
                                        <div className="card-header">
                                            <img
                                                alt="identicon"
                                                className="mr-2"
                                                width="30"
                                                height="30"
                                                src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                                            />
                                            <small className="text-muted">{post.author}</small>
                                        </div>
                                        <ul id="postList" className="list-group list-group-flush">
                                            <li className="list-group-item mt-3">
                                                <p>{post.content}</p>
                                            </li>
                                            <li key={key} className="list-group-item py-2 d-flex justify-content-between">
                                                <small className="mt-1 text-muted">
                                                    TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                                                </small>
                                                <button
                                                    className="btn btn-link btn-sm pt-0"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        this.props.tipPost(post.id, window.web3.utils.toWei('0.1', 'Ether'))
                                                    }}
                                                >
                                                    <span>
                                                        TIP 0.1 ETH
                                                    </span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}