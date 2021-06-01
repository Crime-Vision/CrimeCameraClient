import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import { GlobalContext } from '../contexts/globalContext';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import tryValue  from '../helperFunctions' 
let formDataObject = {};
let cameras = []
export default function NodeManagerEditNodeModal() {
  const [state, dispatch] = useContext(GlobalContext);

  const handleSubmit = (event) => {
    let objectKey = Object.keys(event);
    let objectVal = Object.values(event);
    formDataObject[objectKey[0]] = objectVal[0];
    console.log(formDataObject);
  };
  const UpDateFormState = () => {
    //SEND FORM TO SERVER
console.log(formDataObject)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataObject),
    };
    fetch('http://10.10.10.10:3001/api/nodes/' + state.currentNodeInfo.name, requestOptions)
      .then((response) => response.json())
      .then((data) => handleEditNodeModalClose());
  };
  const handleEditNodeModalClose = () =>
    dispatch({
      type: 'SETTINGS_EDIT_NODE_MODAL',
      payload: false,
    });

  return (
    <Modal
      dialogClassName="customModalEditNode"
      show={state.editNodeModal}
      onHide={() => handleEditNodeModalClose()}
      centered
      size="lg"
    >
      
      <Card className="text-center">
        <Card.Header as="h5">Edit Node</Card.Header>
        <CardGroup>
          <Card>
            <Form>
              <CardGroup>
                <Card>
                  <CardGroup>
                    <Card className="text-left">
                      <Card.Title>Node Information</Card.Title>
                      <Card.Body>
                        <Row>
                          <Form.Group as={Col} controlId="formGridHostName">
                            <Form.Label>Host Name</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.hostName})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.hostName': e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridNodeName">
                            <Form.Label>Node Name</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.name})}
                              type="text"
                              onChange={(e) => handleSubmit({ name: e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridZeroTierID">
                            <Form.Label>ZeroTier ID</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.zeroTierNetworkID})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.zeroTierNetworkID': e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridZeroTierIP">
                            <Form.Label>ZeroTier IP</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.zeroTierIP})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.zeroTierIP': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridServerURL">
                            <Form.Label>Server URL</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.serverURL})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.serverURL': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridNodeLat">
                            <Form.Label>Lat</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.locationLat})}
                              type="number"
                              onChange={(e) => handleSubmit({ 'config.locationLat': e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridNodeLng">
                            <Form.Label>Lng</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.locationLong})}
                              type="number"
                              onChange={(e) => handleSubmit({ 'config.locationLong': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </CardGroup>
                  <br />
                  <CardGroup>
                    <Card className="text-left">
                      <Card.Title>Buddy Configuration</Card.Title>
                      <Card.Body>
                        <Row>
                          <Form.Group as={Col} controlId="formGridBuddyDriveDevicePath">
                            <Form.Label>Drive Device Path</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDriveDevicePath})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.buddyDriveDevicePath': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridBuddyDriveMountPath">
                            <Form.Label>Mount Path</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDriveMountPath})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.buddyDriveMountPath': e.target.value })}
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridBuddyDriveEncrytption">
                            <Form.Label>Drive Encrytption</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDriveEncryptionKey})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.buddyDriveEncryptionKey': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridBuddyDrive1HostName">
                            <Form.Label>Buddy 1 Host Name</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDrives[0].hostName})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.BuddyDrive[0].HostName': e.target.value })}
                              size="sm"
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridBuddyDrive1MountPath">
                            <Form.Label>Buddy 1 Mount Path</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDrives[0].sshfsMountPath})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.BuddyDrive[0].MountPath': e.target.value })}
                              size="sm"
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridBuddyDrive2HostName">
                            <Form.Label>Buddy 2 Host Name</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDrives[1].hostName})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.BuddyDrive[1].HostName': e.target.value })}
                              size="sm"
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridBuddyDrive2MountPath">
                            <Form.Label>Buddy 2 Mount Path</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.buddyDrives[1].sshfsMountPath})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.BuddyDrive[1].MountPath': e.target.value })}
                              size="sm"
                            />
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                    <Card className="text-left">
                      <Card.Title>Video Drive</Card.Title>
                      <Card.Body>
                        <Row>
                          <Form.Group as={Col} controlId="formGridVideoDriveDevicePath">
                            <Form.Label>Video Drive Device Path</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.videoDriveDevicePath})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.videoDriveDevicePath': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group as={Col} controlId="formGridVideoDriveMountPath">
                            <Form.Label>Video Drive Mount Path</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.videoDriveMountPath})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.videoDriveMountPath': e.target.value })}
                            />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridVideoDriveEncrytption">
                            <Form.Label>Video Drive Encrytption</Form.Label>
                            <Form.Control
                              placeholder={tryValue( ()=>{ return state.currentNodeInfo.config.videoDriveEncryptionKey})}
                              type="text"
                              onChange={(e) => handleSubmit({ 'config.videoDriveEncryptionKey': e.target.value })}
                            />
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </CardGroup>
                </Card>
              </CardGroup>
              <br />
              
            </Form>
            <Button onClick={UpDateFormState}>Save</Button>
          </Card>
        </CardGroup>
      </Card>

    </Modal>
  );
}
