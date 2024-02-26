import React from "react"
import { Modal } from 'react-bootstrap';

export default function Model(props)
{
    const showModal = props.showModal;
    const handleCloseModal = props.handleCloseModal;
    const modelContent = props.modelContent;

    return(
        <React.Fragment>
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton />
                <Modal.Body>
                    {modelContent}
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}