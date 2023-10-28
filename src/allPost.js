const Allpost = (props) => {
  const posts = props.allPost;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="post-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-body">{post.body}</p>
            <div className="post-info">
              <strong className="reaction">Reactions:</strong> {post.reactions}
            </div>
            <div className="post-info">
              <strong className="tags">Tags:</strong>
              <ul className="tag-list">
                <li className="tag">{post.tags[0]}</li>
                <li className="tag">{post.tags[1]}</li>
                <li className="tag">{post.tags[2]}</li>
              </ul>
            </div>
            <div className="post-info">
              <strong className="userId">User ID:</strong> {post.userId}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Allpost;
