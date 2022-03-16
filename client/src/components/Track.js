import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Track = ({data}) => {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.artist}</Card.Text>
                    <Button className='me-2'>Like</Button>
                    <Button>Dislike</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Track;