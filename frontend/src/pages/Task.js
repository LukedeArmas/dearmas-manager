import CommentItem from '../components/CommentItem.js'
import CommentModal from '../components/CommentModal.js'
import EditCommentModal from '../components/EditCommentModal.js'
import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTask, closeTask } from '../features/tasks/taskSlice.js'
import { createComment, getComments, updateComment, deleteComment, reset, resetSuccess } from '../features/comments/commentSlice.js'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaRegCommentAlt, FaRegTrashAlt } from 'react-icons/fa'
import Back from '../components/Back.js'


const override = css`
display: block;
margin: 0 auto;
margin-top: 5rem;
`

const Task = () => {
    const [commentText, setCommentText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState({
        _id: '',
        user: null,
        text: '',
        isStaff: false,
        createdAt: '',
        updatedAt: ''
    })

    const { user } = useSelector((state) => state.auth)

    const { task, isLoading, isError, message } =
        useSelector((state) => state.tasks)

    const { comments, isLoading: commentsIsLoading, updateCommentIsSuccess, createCommentIsSuccess, deleteCommentIsSuccess } =
        useSelector((state) => state.comments)

    const { _id, text } = comment

    const dispatch = useDispatch()
    const { taskId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { prevUrl } = location.state

    useEffect(() => {
        if (isError) {
        toast.error(message)
        }        
        if (createCommentIsSuccess || updateCommentIsSuccess || deleteCommentIsSuccess) {
            toast.success('Success!')
            dispatch(resetSuccess())
        }
        dispatch(getTask(taskId))
        dispatch(getComments(taskId))

        return () => {
            if (updateCommentIsSuccess || createCommentIsSuccess || deleteCommentIsSuccess) {
                dispatch(reset())
            }
        }
        // eslint-disable-next-line
    }, [taskId, isError, message, updateCommentIsSuccess, createCommentIsSuccess, deleteCommentIsSuccess])

    const onTicketClose = () => {
        if (window.confirm("Are you sure you want to close this ticket?")) {
            dispatch(closeTask(taskId))
            toast.success('Ticket successfully closed')
            navigate('/tasks')
        }
    }

    // This is for creating a new comment

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const updateCommentText = (e) => setCommentText(e.target.value)

    const onCommentSubmit = (e) => {
        e.preventDefault()
        dispatch(createComment({commentText, taskId}))
        setCommentText('')
        setShowModal(false)
    }

    // This is for editing a comment

    const onShowComment = (comment) => {
        setComment(comment)
        setShowComment(true)
    }

    const onCloseComment = () => {
        setShowComment(false)
        setComment({
            _id: '',
            user: null,
            text: '',
            isStaff: false,
            createdAt: '',
            updatedAt: ''
        })
    }

    const updateEditComment = (e) => {
        setComment((prevState) => {
            return {
                ...prevState,
                text: e.target.value
            }
        })
    }

    const onEditCommentSubmit = (e) => {
        e.preventDefault()
        // text is commentText and _id is comment id
        // Both are destructured from the comment state above
        dispatch(updateComment({ commentText: text, taskId, commentId: _id }))
        setComment({
            _id: '',
            user: null,
            text: '',
            isStaff: false,
            createdAt: '',
            updatedAt: ''
        })
        setShowComment(false)
    }

    const deleteCommentSubmit = () => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            dispatch(deleteComment({ taskId, commentId: _id }))
            setComment({
                _id: '',
                user: null,
                text: '',
                isStaff: false,
                createdAt: '',
                updatedAt: ''
            })
            setShowComment(false)
        }
    }

    if (isLoading || commentsIsLoading) {
        return <ClipLoader color='#3730a3' css={override} size={250} />
    }

    if (isError) {
        return <h3>Something went wrong</h3>
    }

    return (
        <>
        <div className='ticket-page max-w-[900px] mx-auto mt-3'>
            <Back url={prevUrl} />
            <header className='ticket-head mt-3'>
            <h2>
                <span>Ticket ID Number: <span className='font-normal'>{task._id}</span></span>
                <div className="flex justify-center items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 mt-0.5 rounded-full bg-black status-${task.status}`}></div> <span>{ task.status && task.status.charAt(0).toUpperCase() + task.status.substring(1,task.status.length)}</span>
                </div>
            </h2>
            <h3 className='font-semibold'>
                Date/Time Recorded:{' '}
                <span className='font-normal whitespace-nowrap'>{new Date(task.createdAt).toLocaleString('en-US')}</span>
            </h3>
            {task.status !== 'closed' ? (
                <div className="flex justify-between mb-4 gap-4">
                <h3 className='font-semibold'>Product Type: <span className='font-normal'>{task.product}</span></h3>
                <button onClick={onTicketClose} className='btn whitespace-nowrap flex justify-center items-center font-semibold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white status-closed h-[44px] self-center'>
                    <FaRegTrashAlt size={19} /> Close Ticket
                </button>
            </div>
            ) : (
                <h3 className='font-semibold'>Product Type: <span className='font-normal'>{task.product}</span></h3>
            )}
            
            <hr />
            <div className='ticket-desc shadow-md rounded-lg'>
                <h3 className='font-semibold'>Issue Description</h3>
                <p>{task.description}</p>
            </div>
            </header>

            <div className="flex justify-between items-center mb-5 mt-8">
                <h2 className='text-xl'>Comments</h2>
                {task.status !== 'closed' && (
                <>
                    <button
                    className="flex justify-center btn status-open text-white font-semibold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={openModal}
                    >
                        <FaRegCommentAlt className='mt-0.5' size={19} /> Add Comment
                    </button>
                    <CommentModal showModal={showModal} closeModal={closeModal} onCommentSubmit={onCommentSubmit} commentText={commentText} updateCommentText={updateCommentText} />

                    <EditCommentModal showComment={showComment} closeComment={onCloseComment} onEditCommentSubmit={onEditCommentSubmit} comment={comment} updateEditComment={updateEditComment} deleteComment={deleteCommentSubmit} user={user} />
                    </>
                )}
            </div>
            {!comments.length && ( <p className='text-lg'>No comments</p> )}
            {comments.map((comment) => (
                    <CommentItem
                    key={comment._id}
                    comment={comment}
                    commentId={comment._id}
                    onShowComment={onShowComment}
                    />
            ))}
            <br />
            <br />
        </div>
        </>
    )
}
export default Task
