import { useSelector } from 'react-redux'

const CommentItem = ({ comment }) => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div className="note overflow-auto shadow-md rounded-lg" style={{
            backgroundColor: comment.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
            color: comment.isStaff ? '#fff' : '#000'
        }}>
            <div className="flex justify-between mb-2">
                <h4>{comment.isStaff ? (<>Staff: <span className='font-semibold whitespace-nowrap'>Staff</span> </>)  : (<>Customer: <span className='font-semibold whitespace-nowrap'>{user.name}</span></>)  }</h4>
                <div className="font-thin text-sm">
                    <span className='whitespace-nowrap'>{new Date(comment.createdAt).toLocaleString('en-US')}</span>
                </div>
            </div>
            <p>{comment.text}</p>
        </div>
    )
}
export default CommentItem