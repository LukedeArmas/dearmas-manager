import { useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import Modal from 'react-modal'
const customStyles = {
content: {
    background: null,
    border: 'none'
},
}

Modal.setAppElement('#root')

const EditCommentModal = ({ showComment, closeComment, onEditCommentSubmit, comment, updateEditComment, deleteComment, user }) => {
  const [allowCommentEdit, setAllowCommentEdit] = useState(false)
  
  return (
  <Modal
          isOpen={showComment}
          onRequestClose={closeComment}
          style={customStyles}
          contentLabel='Add Comment'>
          <div
              className="modal-container justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-full my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-full">
                  <div className="comment-modal-header flex flex-col items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t max-w-full flex-wrap">
                    <h3 className="text-3xl font-semibold mb-2">
                      <span className='whitespace-nowrap'>{ allowCommentEdit ? 'Edit' : 'View' } Comment</span>
                    </h3>
                    {/* Hide edit and delete buttons for customer if the comment is not theirs */}
                    <div className={ (comment.user?._id !== user._id && !user.isStaff ? 'hide ' : '') + 'flex items-center max-w-xs'}>
                      {allowCommentEdit ? (
                      <>
                      <button
                      className="btn status-open text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mr-4"
                      type="button"
                      onClick={() => setAllowCommentEdit(false)}
                    >
                      <span className='whitespace-nowrap'>Disable Edit</span>
                    </button>
                    </>
                    ) : (
                      <button
                      className="btn status-open text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mr-4"
                      type="button"
                      onClick={() => setAllowCommentEdit(true)}
                    >
                      Edit
                    </button>
                    )}
                    <button onClick={deleteComment} className='btn whitespace-nowrap flex justify-center items-center font-semibold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-white status-closed h-[44px] self-center'>
                    <FaRegTrashAlt size={19} /> Delete
                    </button>
                    </div>
                  </div>
                  <form onSubmit={onEditCommentSubmit} className="relative p-6 flex-auto min-h-[200px]">
                      <textarea
                          name='commentText'
                          id='commentText'
                          className='w-full h-[200px] rounded-md p-2 pl-3'
                          placeholder='Comment text'
                          value={comment?.text}
                          onChange={(e) => updateEditComment(e)
                          } disabled={!allowCommentEdit} ></textarea>
                  </form>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-600 background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setAllowCommentEdit(false)
                        closeComment()
                      }}
                    >
                      Close
                    </button>
                    {/* Hide save button for customer if the comment is not theirs */}
                    <button
                      className={(comment.user?._id !== user._id && !user.isStaff ? 'hide ' : '') + "btn status-open text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}
                      type="button"
                      onClick={(e) => {
                        setAllowCommentEdit(false)
                        onEditCommentSubmit(e)
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </Modal>
  )
}
export default EditCommentModal