pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    constructor() public {
        name = "HT SocialNetwork";
    }

    function createPost(string memory _content) public {
        // require valid content
        require(bytes(_content).length > 0);
        // incr the post count
        postCount++;
        // create the post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        // trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint256 _id) public payable {
        // Make sure id is valid
        require(_id > 0 && _id <= postCount);
        // Fetch the post
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay author by sending them Ether
        address(_author).transfer(msg.value);
        // Incr tip amount
        // 1 Ether === 1000000000000000000 Wei
        _post.tipAmount += msg.value;
        // Update post
        posts[_id] = _post;
        // Trigger event
        emit PostTipped(_id, _post.content, _post.tipAmount, _author);
    }
}
