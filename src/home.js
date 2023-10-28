import LoadingPost from "./loadingPost";
import FetchError from "./fetchError";
import Allpost from "./allPost";
import AddPostForm from "./addPostForm";
import UpdatePostForm from "./updatePostForm";
import SinglePost from "./singlePost";
import { useRef, useState } from "react";
import DeletePost from "./deletePost";

const Home = () => {
  // GENERAL
  const [fetchLoading, setLoadingPost] = useState(false);
  const [error, setError] = useState(null);

  // FOR ADDING ALL POST
  const [fetchSuccessful, setAllpost] = useState();
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);

  // FOR ADDING ONE POST
  const [doNotRemovePostForm, setDoNotRemovePostForm] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [isPostAdded, setIsPostAdded] = useState(false);
  const abortFetch = new AbortController();

  // SHOW SINGLE POST
  const [showSinglePost, setShowSinglePost] = useState(false);
  const [singlePostData, setSinglePostData] = useState();
  const singlePostRef = useRef(null);

  // UPDATE POST
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const updatePostFormRef = useRef(null);

  // SHOW DELETED POST
  const [showDeletedPost, setShowDeletedPost] = useState(false);
  const [deletedPostData, setDeletedPostData] = useState();
  let deletePostRef = useRef(null);

  // SHOW ALL POST//
  const allPost = () => {
    setError(null);
    setShowSinglePost(false);
    setShowDeletedPost(false);
    setDoNotRemovePostForm(true);
    setShowPostForm(false);
    setShowUpdateForm(false);
    fetch("https://dummyjson.com/posts")
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            const post = data.posts;
            setLoadingPost(false);
            setIsFetchSuccessful(true);
            setError(null);
            setAllpost(post);
          });
        } else {
          throw Error("Error loading page");
        }
      })
      .catch((error) => {
        setLoadingPost(false);
        setError(error.message);
      });
  };

  // SHOW SINGLE POST
  const singlePost = () => {
    setLoadingPost(true);
    setShowPostForm(false);
    setShowUpdateForm(false);
    fetch(`https://dummyjson.com/posts/${singlePostRef.current.value}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((single) => {
            setLoadingPost(false);
            setLoadingPost(false);
            setIsFetchSuccessful(false);
            setError(null);
            setShowDeletedPost(false);
            setShowSinglePost(true);
            setSinglePostData(single);
          });
        } else {
          throw Error("Error loading post");
        }
      })
      .catch((error) => {
        setLoadingPost(false);
        setError(error.message);
      });
  };

  // DELETE POST
  const deletePost = () => {
    setError(null);
    setLoadingPost(true);
    setShowPostForm(false);
    setShowUpdateForm(false);
    fetch(`https://dummyjson.com/posts/${deletePostRef.current.value}`)
      .then((res) => {
        if (res.status === 200) {
          res.json().then((deleted) => {
            setLoadingPost(false);
            setLoadingPost(false);
            setIsFetchSuccessful(false);
            setError(null);
            setShowSinglePost(false);
            setShowDeletedPost(true);
            setDeletedPostData(deleted);
          });
        } else {
          throw Error("Error deleting post");
        }
      })
      .catch((error) => {
        setLoadingPost(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="nav">
        {/* GET ALL POST */}
        <div className="showPost">
          <button
            className="btn"
            onClick={() => {
              setLoadingPost(true);
              setIsFetchSuccessful(false);
              allPost();
            }}
          >
            Click here to see all Post
          </button>
        </div>

        {/* ADD A POST */}
        <div className="addPost">
          <button
            className="btn"
            onClick={() => {
              setShowSinglePost(false);
              setShowDeletedPost(false);
              setDoNotRemovePostForm(true);
              setIsPostAdded(false);
              setLoadingPost(false);
              setError(null);
              setIsFetchSuccessful(false);
              setShowUpdateForm(false);
              setShowPostForm(true);
            }}
          >
            Click here to add Post
          </button>
        </div>

        {/* GET SINGLE */}
        <div className="singlePost">
          <div>Enter post ID to get a single post:</div>
          <input ref={singlePostRef} type="number" name="" id="" />
          <button
            className="singlePostBotton"
            onClick={() => {
                setShowDeletedPost(false);
                setIsFetchSuccessful(false);
                setShowPostForm(false);
                setShowUpdateForm(false);
                setShowSinglePost(false);
              if (singlePostRef.current.value === "") {
                setError("Please enter a valid post Id to get a single post");
                return;
              }
              singlePost();
            }}
          >
            Get single Post
          </button>
        </div>

        {/* UPDATE */}
        <div className="updatePost">
          <div>Enter post ID to update a post:</div>
          <input ref={updatePostFormRef} type="number" name="" id="" />
          <button
            className="updatePostBotton"
            onClick={() => {
              setShowSinglePost(false);
              setShowDeletedPost(false);
              setDoNotRemovePostForm(true);
              setIsPostAdded(false);
              setLoadingPost(false);
              setError(null);
              setIsFetchSuccessful(false);
              setShowPostForm(false);
              setShowUpdateForm(true);
            }}
          >
            Update Post
          </button>
        </div>

        {/* DELETE */}
        <div className="deletePost">
          <div>Enter post ID to delete a single post:</div>
          <input ref={deletePostRef} type="number" name="" id="" />
          <button
            className="deletePostBotton"
            onClick={() => {
                setShowSinglePost(false);
                setIsFetchSuccessful(false);
                setShowPostForm(false);
                setShowUpdateForm(false);
                setShowDeletedPost(false);
              if (deletePostRef.current.value === "") {
                setError("Please enter a valid post Id to delete post");
                return;
              }
              deletePost();
            }}
          >
            Delete Post
          </button>
        </div>
      </div>

      <div>
        {fetchLoading && <LoadingPost />}
        {error && <FetchError errorMessage={error} />}
        {isFetchSuccessful && <Allpost allPost={fetchSuccessful} />}
        {showPostForm && (
          <AddPostForm
            {...{
              setLoadingPost,
              setIsFetchSuccessful,
              setError,
              setAllpost,
              isPostAdded,
              setIsPostAdded,
              doNotRemovePostForm,
              setDoNotRemovePostForm,
            }}
          />
        )}
        {showUpdateForm && (
          <UpdatePostForm
            {...{
              setLoadingPost,
              setIsFetchSuccessful,
              setError,
              setAllpost,
              isPostAdded,
              setIsPostAdded,
              doNotRemovePostForm,
              setDoNotRemovePostForm,
              updatePostFormRef,
            }}
          />
        )}
        {showSinglePost && <SinglePost {...{ singlePostData }} />}
        {showDeletedPost && <DeletePost {...{ deletedPostData }} />}
      </div>
    </div>
  );
};

export default Home;
