import { Button, ListGroup } from 'react-bootstrap'

const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3NzNhOTc2YTY0YjAwMTllZjFiOTQiLCJpYXQiOjE3MTE3MjMyOTAsImV4cCI6MTcxMjkzMjg5MH0.C7AZnyo54rqSR5sh6pRV-KXGFgyYQrw_gmp-vEfH2v8',
          },
        }
      )
      if (response.ok) {
        alert('La recensione è stata elimata!')
      } else {
        throw new Error('La recensione non è stata eliminata!')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <ListGroup.Item data-testid="book-card">
      {comment.comment}
      <Button
        variant="danger"
        className="ms-2"
        onClick={() => deleteComment(comment._id)}
        data-testid="delete-button"
      >
        Elimina
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment
