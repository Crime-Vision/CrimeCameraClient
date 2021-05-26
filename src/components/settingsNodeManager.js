import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import { Container } from 'semantic-ui-react';
import { GlobalContext } from '../contexts/globalContext';
import HorizontalBarChart from './barChart2';
import HorizontalBarChart2 from './barChart';
import LineChart from './lineChart';
import SettingsNodeCard from './settingsModalNodeCard';
import SettingsSysInfoCard from './settingsModalSySInfoCard';
import SettingsSysInfoEditCard from './settingsModalSySInfoEditCard';
import SettingsNodesSettingsCard from './settingsModalNodesSettingsCard';
import NodeManagerNewNodeModal from "./nodeManagerNewNodeModal"
import NodeManagerEditNodeModal from './nodeManagerEditNodeModal'

export default function Settings() {
  const [state, dispatch] = useContext(GlobalContext);
  
 

  const getCameraInfo = (node) => {
    fetch('https://crime-camera-system-api.shreveport-it.org/api/nodes/' + node+'/?token=IgyJtHFsZbQdLY5Cy26HRkn7HOqcJx5')
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: 'UPDATE_CURRENT_NODE_INFO',
          payload: json,
        });
      });
  };

  const handleNewNodeModalOpen = () =>
    dispatch({
      type: 'SETTINGS_NEW_NODE_MODAL',
      payload: true,
    });
  const upDateSelectedNode = (param) => {
    getCameraInfo(param);

    dispatch({
      type: 'UPDATE_SELECTEDNODE',
      payload: param,
    });
  };
  return (
    <Container fluid className="settingsDIV">
      <br />
      <Row className="justify-content-md-center">
        <Col xs={2}>
          <Button onClick={() => handleNewNodeModalOpen()}>Add  Node</Button>
          <Card>
            <Card.Header as="h3">
              Nodes
              <Card.Text as="h6">45 Online / 2 Problems</Card.Text>
            </Card.Header>
            <ListGroup>
              {state.nodes.map((node) => (
                <ListGroup.Item onClick={() => upDateSelectedNode(node.name)}>{node.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col>
          <Card.Header as="h4">{state.selectedCamera}</Card.Header>
          <CardGroup>
            <Card>
              <Card.Header>System Information</Card.Header>
              <Card.Text></Card.Text>
              <Card.Body>
                {state.cameraSettingsComponent ? <SettingsSysInfoEditCard /> : <SettingsSysInfoCard />}
              </Card.Body>
            </Card>
            <Card>
              <CardGroup>
                <Card>
                  <Card.Header>System</Card.Header>
                  <HorizontalBarChart />
                </Card>
                <Card>
                  <Card.Header>Drives</Card.Header>
                  <HorizontalBarChart2 />
                </Card>
              </CardGroup>
            </Card>
          </CardGroup>
          <CardGroup>
            <Card>
              <Card.Header>Cameras</Card.Header>
              <Card.Header></Card.Header>
              <Card.Body>
                {state.nodeSettingsCameraComponent ? <SettingsNodesSettingsCard />: <SettingsNodeCard /> }
              </Card.Body>
            </Card>
            <Card>
              <LineChart />
            </Card>
          </CardGroup>
          <Card.Footer className="text-muted"></Card.Footer>
        </Col>
      </Row>
         <NodeManagerNewNodeModal/>
         <NodeManagerEditNodeModal/>
            </Container>
    
      );
    }
