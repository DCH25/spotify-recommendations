import React, { useState, useEffect } from 'react';
import { api } from '../api';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Heart, HeartFill, DashCircle, DashCircleFill } from 'react-bootstrap-icons';

const Track = ({data, liked, disliked, rp_id}) => {

    const [like, setLike] = useState();
    const [dislike, setDislike] = useState();

    useEffect(() => {
        setLike(liked);
        setDislike(disliked);
    }, [liked, disliked]);

    function addLikedTrack() {
        setLike(true);
        setDislike(false);
        api.addLikedTrack(rp_id, data.id, (error, rp) => {
            if (error) return;
        });
    }

    function removeLikedTrack() {
        setLike(false);
        api.removeLikedTrack(rp_id, data.id, (error, rp) => {
            if (error) return;
        });
    }

    function addDislikedTrack() {
        setDislike(true);
        setLike(false);
        api.addDislikedTrack(rp_id, data.id, (error, rp) => {
            if (error) return;
        });
    }

    function removeDislikedTrack() {
        setDislike(false);
        api.removeDislikedTrack(rp_id, data.id, (error, rp) => {
            if (error) return;
        });
    }

    const Rating = (props) => {
        if (props.liked) return (
            <>
                <HeartFill onClick={removeLikedTrack}/>
                <DashCircle onClick={addDislikedTrack}/>
            </>
        );
        else if (props.disliked) return (
            <>
                <Heart onClick={addLikedTrack}/>
                <DashCircleFill onClick={removeDislikedTrack}/>
            </>
        );
        else return (
            <>
                <Heart onClick={addLikedTrack}/>
                <DashCircle onClick={addDislikedTrack}/>
            </>
        );
    };

    let addedTrack = false;
    function showPlayer() {
        const body = document.querySelector('#body' + data.id);
        if (body.className === 'collapse-show') {
            body.className = 'collapse';
        } else {
            if (!addedTrack) {
                addedTrack = true;
                const iframe = document.createElement('iframe');
                iframe.src = "https://open.spotify.com/embed/track/" + data.id;
                iframe.width = '100%';
                iframe.height = 80;
                iframe.className = 'd-block'

                body.prepend(iframe)
            }
            body.className = 'collapse-show'
        }
    }

    return (
        <Container className='mb-3'>
            <Card>
                <Card.Header>
                    <Row>
                        <Col>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                                {data.artists.map((artist) => {
                                    return artist.name  
                                }).join(', ')}
                            </Card.Text>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-between' md="1">
                            <Rating liked={like} disliked={dislike}/>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-end' md="auto" onClick={showPlayer}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body id={"body" + data.id} className='collapse'>

                </Card.Body>
            </Card>
        </Container>
    );
}

export default Track;
