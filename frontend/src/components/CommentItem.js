
const CommentItem = ({ comment, onShowComment }) => {
    
    return (
        <div className={(comment.isStaff ? "comment-staff " : "comment ") + "overflow-auto shadow-md rounded-lg"} onClick={() => onShowComment(comment)} style={{
            backgroundColor: comment.isStaff ? '#3730a3' : '#fff',
            color: comment.isStaff ? '#fff' : '#000'
        }}>
            <div className="flex justify-between mb-2">
                <h4>{comment.isStaff ? (<>Staff: <span className='font-semibold whitespace-nowrap'>{comment.user.name}</span> </>)  : (<>Customer: <span className='font-semibold whitespace-nowrap'>{comment.user.name}</span></>)  }</h4>
                <div className="font-thin text-sm">
                    <span className='whitespace-nowrap'>{new Date(comment.createdAt).toLocaleString('en-US')}</span>
                </div>
            </div>
            <p>{comment.text}</p>
        </div>
    )
}
export default CommentItem