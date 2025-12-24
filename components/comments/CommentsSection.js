"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import styles from "./Comments.module.css";

export default function CommentsSection({ blogId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const res = await fetch(
      `https://green-world-backend-ydlf.onrender.com/api/comments/blog/${blogId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    setComments(data);
  }

  async function submitComment(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    await fetch("https://green-world-backend-ydlf.onrender.com/api/comments", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogId,
        content,
        parentComment: replyTo ? replyTo.id : null,
      }),
    });

    setContent("");
    setReplyTo(null);
    setLoading(false);
    fetchComments();
  }

  return (
    <section className={styles.commentsSection}>
      <h2>Comments</h2>

      {/* Add comment */}
      {user ? (
        <form onSubmit={submitComment} className={styles.commentForm}>
          <textarea
            placeholder={
                replyTo
                ? `Write a reply to ${replyTo.name}...`
                : "Write a comment..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      ) : (
        <p className={styles.loginNote}>Login to comment</p>
      )}

      {/* Render comments */}
      <div className={styles.commentList}>
        {renderComments(comments, null, setReplyTo)}
      </div>
    </section>
  );
}
function renderComments(comments, parentId, setReplyTo, replyTo, level = 0) {
  return comments
    .filter((c) => (c.parentComment ? c.parentComment.toString() : null) === parentId)
    .map((c) => (
      <div key={c._id} style={{ marginLeft: level * 20 }}>
        <div className={styles.comment}>
          <img src={c.user.image} alt={c.user.name} className={styles.avatar} />
          <div className={styles.commentBody}>
            <div className={styles.commentHeader}>
              <strong>{c.user.name}</strong>
              <span className={styles.time}>
                {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>

            <p className={styles.commentText}>{c.content}</p>

            <button
              className={styles.replyBtn}
              onClick={() => setReplyTo({ id: c._id, name: c.user.name })}
            >
              Reply
            </button>

            {replyTo && (
              <p style={{ fontSize: "0.8rem", marginTop: "6px" }}>
                Replying to <strong>{replyTo.name}</strong>{" "}
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    marginLeft: "6px",
                  }}
                >
                  Cancel
                </button>
              </p>
            )}
          </div>
        </div>

        {renderComments(comments, c._id, setReplyTo, replyTo, level + 1)}
      </div>
    ));
}


