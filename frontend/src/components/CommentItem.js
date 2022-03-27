import { useSelector } from 'react-redux'

const CommentItem = ({ comment }) => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div className="note" style={{
            backgroundColor: comment.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
            color: comment.isStaff ? '#fff' : '#000'
        }}>
            <h4>Note from {comment.isStaff ? <span>Staff</span> : <span>{user.name}</span> }</h4>
            <p>{comment.text}</p>
            <div className="note-date">
                {new Date(comment.createdAt).toLocaleString('en-US')}
            </div>
        </div>
    )
}
export default CommentItem