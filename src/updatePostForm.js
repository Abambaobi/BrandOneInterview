import { useRef, useState } from "react";

const UpdatePostForm = ({
  setLoadingPost,
  setIsFetchSuccessful,
  setError,
  setAllpost,
  isPostAdded,
  setIsPostAdded,
  doNotRemovePostForm,
  setDoNotRemovePostForm,
  updatePostFormRef,
}) => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const reactionseRef = useRef(null);
  const userIdRef = useRef(null);
  const tagoneRef = useRef(null);
  const tagtwoRef = useRef(null);
  const tagthreeRef = useRef(null);

  const [newTitle, setTitle] = useState();
  const [newBody, setBody] = useState();
  const [newReactions, setReactions] = useState();
  const [newTagOne, setTagOne] = useState();
  const [newTagTwo, setTagTwo] = useState();
  const [newTagThree, setTagThree] = useState();
  const [newUserId, setUserId] = useState();

  const addPost = (event) => {
    event.preventDefault();
    fetch(`https://dummyjson.com/posts/${updatePostFormRef.current.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleRef.current.value,
        body: bodyRef.current.value,
        reactions: reactionseRef.current.value,
        userId: userIdRef.current.value,
        tags: [
          `${tagoneRef.current.value}`,
          `${tagtwoRef.current.value}`,
          `${tagthreeRef.current.value}`,
        ],
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setLoadingPost(false);
          setIsFetchSuccessful(false);
          setError(null);
          setAllpost([]);
          setDoNotRemovePostForm(false);
          setIsPostAdded(true);

          setTitle(titleRef.current.value);
          setBody(bodyRef.current.value);
          setReactions(reactionseRef.current.value);
          setTagOne(tagoneRef.current.value);
          setTagTwo(tagtwoRef.current.value);
          setTagThree(tagthreeRef.current.value);
          setUserId(userIdRef.current.value);
        } else {
          throw Error("Invalid Post");
        }
      })
      .catch((error) => {
        setDoNotRemovePostForm(false);
        setError(error.message);
      });
  };

  return (
    <div>
      {doNotRemovePostForm && (
        <div className="updatePostFormContainer">
          <form id="postForm" className="post-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                ref={titleRef}
                type="text"
                id="title"
                name="title"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body:</label>
              <textarea
                ref={bodyRef}
                id="body"
                name="body"
                className="form-control"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="reactions">Reactions:</label>
              <input
                ref={reactionseRef}
                type="number"
                id="reactions"
                name="reactions"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="userId">User Id:</label>
              <input
                ref={userIdRef}
                type="number"
                id="userId"
                name="userId"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag1">Tag one:</label>
              <input
                ref={tagoneRef}
                type="text"
                id="tag1"
                name="tag1"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag2">Tag two:</label>
              <input
                ref={tagtwoRef}
                type="text"
                id="tag2"
                name="tag2"
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tag3">Tag three:</label>
              <input
                ref={tagthreeRef}
                type="text"
                id="tag3"
                name="tag3"
                className="form-control"
                required
              />
            </div>

            <button className="btn" onClick={(event) => addPost(event)}>
              Update Post
            </button>
          </form>
        </div>
      )}
      {isPostAdded && (
        <div className="postAdded">
          <div className="post-container">
            <h1>This post have been updated</h1>

            <h1 className="post-title">{newTitle}</h1>
            <p className="post-body">{newBody}</p>
            <div className="post-info">
              <strong className="reaction">Reactions:</strong> {newReactions}
            </div>
            <div className="post-info">
              <strong className="tags">Tags:</strong>
              <ul className="tag-list">
                <li className="tag">{newTagOne}</li>
                <li className="tag">{newTagTwo}</li>
                <li className="tag">{newTagThree}</li>
              </ul>
            </div>
            <div className="post-info">
              <strong className="userId">User ID:</strong> {newUserId}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePostForm;
