pragma solidity ^0.5.0;

contract PostAndComment {
    // Struct for storing a single post
    struct Post {
        // The ID of the post
        uint id;
        // The content of the post
        string content;
        // The time the post was created
        uint time;
        // The address of the account that created the post
        address author;
        // The number of likes the post has received
        uint likes;
        // The number of retweets the post has received
        uint retweets;
        // Set of addresses that have liked the post
        mapping(address => bool) likedBy;
        // Set of addresses that have retweeted the post
        mapping(address => bool) retweetedBy;
    }

    // Struct for storing a single comment
    struct Comment {
        // The ID of the comment
        uint id;
        // The content of the comment
        string content;
        // The time the comment was created
        uint time;
        // The address of the account that created the comment
        address author;
        // The ID of the post that the comment is associated with
        uint postId;
    }

    // Mapping from post ID to post struct
    mapping(uint => Post) public posts;
    // Mapping from comment ID to comment struct
    mapping(uint => Comment) public comments;
    // Array of all post IDs
    uint[] public postIds;
    // Array of all comment IDs
    uint[] public commentIds;

    // Counter for generating unique post IDs
    uint public postCounter;
    // Counter for generating unique comment IDs
    uint public commentCounter;

    // Event for logging new posts
    event NewPost(uint id, string content, uint time, address author);
    // Event for logging new comments
    event NewComment(uint id, string content, uint time, address author, uint postId);
    // Event for logging likes
    event Like(uint postId, address liker);
    // Event for logging retweets
    event Retweet(uint postId, address retweeter);

    constructor() public {
        postCounter = 0;
        commentCounter = 0;
    }

    // Function for creating a new post
    function createPost(string memory content) public {
        // Increment the post counter to get a unique ID for the new post
        postCounter++;
        // Create a new post struct and populate it with the provided data
        Post memory newPost = Post({
            id: postCounter,
            content: content,
            time: now,
            author: msg.sender,
            likes: 0,
            retweets: 0
        });
        // Add the new post to the mapping and the post ID array
        posts[postCounter] = newPost;
        postIds.push(postCounter);
        // Emit the NewPost event
        emit NewPost(postCounter, content, now, msg.sender);
    }

    // Function for creating a new comment
    function createComment(uint postId, string memory content) public {
        // Increment the comment counter to get a unique ID for the new comment
        commentCounter++;
        // Create a new comment struct and populate it with the provided data
        Comment memory newComment = Comment({
            id: commentCounter,
            content: content,
            time: now,
            author: msg.sender,
            postId: postId
        });
        // Add the new comment to the mapping and the comment ID array
        comments[commentCounter] = newComment;
        commentIds.push(commentCounter);
        // Emit the NewComment event
        emit NewComment(commentCounter, content, now, msg.sender, postId);
    }

    function likePost(uint postId) public {
        // Get the post from the mapping
        Post storage post = posts[postId];
         // Check if the current account has already liked the post
        require(!post.likedBy[msg.sender], "You have already liked this post.");
        // Increment of post likes
        post.likes++;
        // // Add the current account to the set of accounts that have liked the post
        post.likedBy[msg.sender] = true;
        // Emit the like event
        emit Like(postId, msg.sender);

    }

       function retweetPost(uint postId) public {
        // Get the post from the mapping
        Post storage post = posts[postId];
         // Check if the current account has already liked the post
        require(!post.retweetedBy[msg.sender], "You have already retweeted this post.");
        // Increment of post likes
        post.retweets++;
        // // Add the current account to the set of accounts that have liked the post
        post.retweetedBy[msg.sender] = true;
        // Emit the like event
        emit Retweet(postId, msg.sender);

    }
}
