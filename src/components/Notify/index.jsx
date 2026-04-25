// src/components/Notify.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NotifyWrapper = styled.div`
    position: fixed;
    top: 6rem;
    right: 1rem;
    background-color: white;
    color: black;
    padding: 1rem;
    border-radius: .5rem;
    z-index: 9999;
    opacity: ${(props) => (props.show ? 1 : 0)};
    transition: all 0.5s ease-in-out;
`;

const Notify = ({ message, setNotifyMessage }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                setNotifyMessage('');
            }, 3000); // A notificação desaparece após 3 segundos
            return () => clearTimeout(timer);
        }
    }, [message, setNotifyMessage]);

    return (
        <NotifyWrapper show={show}>
            {message}
        </NotifyWrapper>
    );
};

export default Notify;
