// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract YouTube {
  // Struct for a video, with its ID, title, and number of likes/dislikes
  struct Video {
    uint id;
    string title;
    string url;
    string description;
    uint likes;
    uint dislikes;
  }

  // Struct for a comment, with its ID, content, and timestamp
  struct Comment {
    uint id;
    string content;
    uint timestamp;
  }

  // Mapping from video IDs to videos
  mapping (uint => Video) public videos;
  
  // Mapping from video IDs to arrays of comments on the video
  mapping (uint => Comment[]) public comments;

  // Add a new video
  function addVideo(uint _id, string memory _title, string memory _url, string memory _description) public {
    videos[_id] = Video(_id, _title, _url, _description, 0, 0);
  }

  // Add a like to a video
  function like(uint _id) public {
    videos[_id].likes++;
  }

  // Add a dislike to a video
  function dislike(uint _id) public {
    videos[_id].dislikes++;
  }

  // Add a comment to a video
  function comment(uint _videoId, string memory _content) public {
    Comment memory c = Comment(comments[_videoId].length, _content, now);
    comments[_videoId].push(c);
  }
}
