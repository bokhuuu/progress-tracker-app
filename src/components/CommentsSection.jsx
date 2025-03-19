import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchTaskComments, createTaskComment } from "../services/api";

const CommentsSection = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const replyBoxRef = useRef(null);

  const token = import.meta.env.VITE_API_TOKEN;

  useEffect(() => {
    fetchTaskComments(token, id)
      .then((data) => {
        setComments(data.reverse());
      })
      .catch((error) => console.error("Error fetching task comments:", error));
  }, [id, token]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      const commentData = { text: newComment };
      const createdComment = await createTaskComment(token, id, commentData);
      setComments((prevComments) => [createdComment, ...prevComments]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating task comment:", error);
    }
  };

  const handleReply = async (parentId) => {
    if (replyText.trim() === "") return;

    const replyData = { text: replyText, parent_id: parentId };

    try {
      const createdReply = await createTaskComment(token, id, replyData);

      setComments((prevComments) => {
        const updatedComments = prevComments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                sub_comments: [...comment.sub_comments, createdReply],
              }
            : comment
        );
        return updatedComments;
      });

      setReplyingTo(null);
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (replyBoxRef.current && !replyBoxRef.current.contains(event.target)) {
        setReplyingTo(null);
      }
    };

    if (replyingTo) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [replyingTo]);

  return (
    <div>
      <div className="relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="დაწერე კომენტარი"
          className="w-[651px] h-[135px] rounded-[10px] border border-[#ADB5BD] pt-[18px] pr-[20px] pb-[15px] pl-[20px] bg-white resize-none"
        />
        <button
          onClick={handleAddComment}
          className="absolute bottom-5 right-5 w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] text-white flex items-center justify-center cursor-pointer"
        >
          დააკომენტარე
        </button>
      </div>

      <div className="mt-[40px] flex items-center">
        <span className="font-bold text-[20px] text-black mr-3">
          კომენტარები
        </span>
        <span className="w-[40px] h-[35px] rounded-[30px] bg-[#8338EC] flex items-center justify-center p-[5px]">
          <span className="font-bold text-[17px] text-white">
            {comments.length +
              comments.reduce(
                (sum, comment) => sum + comment.sub_comments.length,
                0
              )}
          </span>
        </span>
      </div>

      <div className="w-[598px] mt-4">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mt-[50px] mb-[50px]">
              <div className="flex items-center gap-[10px]">
                <img
                  src={comment.author_avatar}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <span className="w-[152px] h-[22px] font-[500] text-[18px] text-[#212529] leading-[100%] tracking-[0%]">
                  {comment.author_nickname}
                </span>
              </div>

              <p className="w-[548px] text-[16px] text-[#343A40] mt-1 ml-[45px]">
                {comment.text}
              </p>

              <div className="flex items-center gap-[10px] ml-[45px] mt-[10px]">
                <img src="/assets/left.png" />
                {!comment.parent_id && (
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="w-[45px] h-[14px] font-semibold text-[12px] text-[#8338EC] cursor-pointer"
                  >
                    უპასუხე
                  </button>
                )}
              </div>

              {replyingTo === comment.id && (
                <div ref={replyBoxRef} className="relative mt-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="თქვენი პასუხი"
                    className="w-[651px] h-[135px] rounded-[10px] border border-[#ADB5BD] pt-[18px] pr-[20px] pb-[15px] pl-[20px] bg-white resize-none"
                  />
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="absolute bottom-5 left-[450px] w-[155px] h-[35px] rounded-[20px] bg-[#8338EC] text-white flex items-center justify-center cursor-pointer"
                  >
                    დააკომენტარე
                  </button>
                </div>
              )}

              {comment.sub_comments && comment.sub_comments.length > 0 && (
                <ul className="ml-[60px] mt-4 border-l-2 border-gray-300 pl-4">
                  {comment.sub_comments.map((reply) => (
                    <li key={reply.id} className="mt-4">
                      <div className="flex items-center gap-[10px]">
                        <img
                          src={reply.author_avatar}
                          className="w-[30px] h-[30px] rounded-full"
                        />
                        <span className="text-[16px] text-[#212529]">
                          {reply.author_nickname}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#343A40] ml-[40px]">
                        {reply.text}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsSection;
