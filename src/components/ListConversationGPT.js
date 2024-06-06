import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllConversations } from '../store/slice/sliceGPT';
import { Table, Container, Alert } from 'react-bootstrap';

const ListConversationGPT = () => {
  const dispatch = useDispatch();
  const { conversations, status, error } = useSelector((state) => state.chatgtpSlice);

  useEffect(() => {
    // if (status === 'idle') {
      dispatch(getAllConversations());
    // }
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Conversations</h1>
      {/* {status === 'loading' && <Alert variant="info">Loading...</Alert>} */}
      {/* {status === 'failed' && <Alert variant="danger">{error}</Alert>} */}
      {/* {status === 'succeeded' && ( */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Group</th>
              <th>Question</th>
              <th>User Email</th>
              <th>Answer</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conversation) => (
              <tr key={conversation.id}>
                <td>{conversation.userGroup}</td>
                <td>{conversation.question}</td>
                <td>{conversation.userEmail}</td>
                <td>{conversation.answer}</td>
                <td>{new Date(conversation.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      {/* )} */}
    </Container>
  );
};

export default ListConversationGPT;
