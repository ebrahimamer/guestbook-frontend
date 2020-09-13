import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./MessageItem.css";

const MessageItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showReplyFormModal, setShowReplyFormModal] = useState(false);

  const showEditingFormHandler = () => {
    setShowEditFormModal(true);
  };
  const cancelEditHandler = () => {
    setShowEditFormModal(false);
  };
  const confirmEditHandler = async () => {
    setShowEditFormModal(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmDeleteModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmDeleteModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmDeleteModal(false);
  };

  const showReplyingFormHandler = () => {
    setShowReplyFormModal(true);
  };
  const cancelReplyHandler = () => {
    setShowReplyFormModal(false);
  };
  const confirmReplyHandler = async () => {
    setShowReplyFormModal(false);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showEditFormModal}
        onCancel={cancelEditHandler}
        header={`Editing....`}
        footerClass="message-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelEditHandler}>
              CANCEL
            </Button>
            <Button onClick={confirmEditHandler}>EDIT</Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and edit this message?</p>
      </Modal>
      <Modal
        show={showConfirmDeleteModal}
        onCancel={cancelDeleteHandler}
        header={`Are you sure you want to delete`}
        footerClass="message-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this message? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Modal
        show={showReplyFormModal}
        onCancel={cancelReplyHandler}
        header={`Replying.....`}
        footerClass="message-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelReplyHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmReplyHandler}>
              REPLY
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and reply to this message?</p>
      </Modal>
      <li className="message-item">
        <Card className="message-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="message-item__info">
            <p>{props.msgBody}</p>
            {auth.userId === props.ownerId && (
              <Button onClick={showReplyingFormHandler}>REPLY</Button>
            )}
          </div>
          {auth.userId === props.creatorId && (
            <div className="message-item__actions">
              <Button onClick={showEditingFormHandler}>EDIT</Button>
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            </div>
          )}
        </Card>
      </li>
    </React.Fragment>
  );
};

export default MessageItem;
