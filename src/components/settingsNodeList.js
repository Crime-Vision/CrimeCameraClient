import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/globalContext';
export default function SettingsnodeList() {
  const [state, dispatch] = useContext(GlobalContext);

  const upDateSelectedCam = (param) =>
    dispatch({
      type: 'UPDATE_SELECTEDCAMERA',
      payload: param,
    });
  return (
    <>
      <br />

      <Card className="text-center">
        <Card.Header as="h3">
          Cameras
          <Card.Text as="h6">45 Online / 2 Problems</Card.Text>
        </Card.Header>

        <Card.Text>
          <ListGroup>
            {state.nodes.map((cam) => (
              <ListGroup.Item onClick={() => upDateSelectedCam(cam.nodeName)}>{cam.nodeName}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
        <Card.Footer className="text-muted">42 Cameras</Card.Footer>
      </Card>
    </>
  );
}
