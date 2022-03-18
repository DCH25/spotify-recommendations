import { React, useState } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TuningEdit from './TuningEdit';
import Playlist from './Playlist';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/esm/Collapse';

const Record = ({tuning, tracks, starting}) => {
    const [show, setShow] = useState(false);

    return (
        <Container fluid>
            <div className='d-flex justify-content-center mt-3'>
                <Button className="mb-3 w-25" onClick={() => setShow(!show)}>Edit Tuning</Button>
            </div>
            <Row>
                <Collapse in={show} className="w-50">
                    <Container fluid>
                        <TuningEdit tuning={tuning}/>
                    </Container>
                </Collapse>
            </Row>
            <Row>
                <Playlist title={starting ? "Starting Playlist" : "Recommendations"} tracks={tracks}/>
            </Row>        
        </Container>
    );
}

export default Record;
