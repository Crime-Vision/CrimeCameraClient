import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Moment from 'react-moment';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NodeManagerEditNodeModal from './nodeManagerEditNodeModal';
import NodeManagerNewNodeModal from './nodeManagerNewNodeModal';
import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import SettingsSysInfoCard from './settingsModalSySInfoCard';
import SettingsSysInfoEditCard from './settingsModalSySInfoEditCard';
import Table from 'react-bootstrap/Table';
import tryValue from '../../helperFunctions';
import { Container } from 'semantic-ui-react';
import { GlobalContext } from '../../contexts/globalContext';

export default function Settings() {
  const [state, dispatch] = useContext(GlobalContext);

  const handleEditNodeModal = (node) => {
    upDateSelectedNode(node);
    dispatch({
      type: 'updateState',
      payload: { editNodeModal: true },
    });
  };

  const handleSystemInfoNodeModal = () =>
    dispatch({
      type: 'updateState',
      payload: { systemInfoModal: true },
    });

  let perfMonTimerJob = null;

  const getPerfmonData = (node) =>
    fetch('http://10.10.10.10:3001/api/perfmons/' + node)
      .then((response) => response.json())
      .then((json) => {
        const rowLen = json.length;
        // eslint-disable-next-line
        json.map((perfmon, i) => {
          if (rowLen === 0) {
            dispatch({
              type: 'updateState',
              payload: { currentNodePerfmon: perfmon, currentNodePerfmonAdded: true },
            });
          }
        });
      });

  const getNodeInfo = (node) => {
    fetch('http://10.10.10.10:3001/api/nodes/' + node)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: 'updateState',
          payload: { previousNode: state.currentNodeInfo.name, currentNodeInfo: json },
        });
      });

    getPerfmonData(node);

    perfMonTimerJob = setInterval(() => {
      getPerfmonData(node);
    }, 60000);
  };

  const handleNewNodeModalOpen = () =>
    dispatch({
      type: 'updateState',
      payload: { newNodeModal: true },
    });

  const upDateSelectedNode = (param) => {
    getNodeInfo(param);
    clearInterval(perfMonTimerJob);

    dispatch({
      type: 'updateState',
      payload: {
        selectedNode: param,
        nodeSelected: true,
        nodeSettingsCameraComponent: false,
      },
    });
  };

  return (
    <Container fluid className="settingsDIV bg-dark">
      <br />
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => handleNewNodeModalOpen()}>Add Node</Nav.Link>
            <Nav.Link>UpDate Nodes</Nav.Link>
            <Nav.Link>Reboot Nodes</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Table striped bordered hover variant="dark" responsive>
              <tbody>
                <tr>
                  <td>Nodes: 45/50</td>
                  <td>Live Feeds: 6</td>
                  <td>More Info: 6</td>
                </tr>
              </tbody>
            </Table>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row className="justify-content-md-center">
        <Col>
          <Card bg="dark" text="light">
            <div className="nodeTableOverflow">
              <Table striped bordered hover variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Node Name</th>
                    <th>CPU</th>
                    <th>Memory</th>
                    <th>Temp</th>
                    <th>Cameras</th>
                    <tr>Drives</tr>
                    <th>Actions</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {state.nodes.map((node, i) =>
                    node.nodeStatus === true ? (
                      <tr>
                        <td onClick={() => upDateSelectedNode(node.name)}>{node.name}</td>
                        <td>
                          {tryValue(() => {
                            return node.perfmon.currentLoad.currentLoad.toFixed(2) > 50 ? (
                              <h5 style={{ color: 'red' }}>
                                {tryValue(() => {
                                  return node.perfmon.currentLoad.currentLoad.toFixed(2);
                                }) + ` %`}
                              </h5>
                            ) : (
                              <h5 style={{ color: 'green' }}>
                                {tryValue(() => {
                                  return node.perfmon.currentLoad.currentLoad.toFixed(2);
                                }) + ` %`}
                              </h5>
                            );
                          })}
                        </td>
                        <td>
                          {tryValue(() => {
                            return ((node.perfmon.mem.used / node.perfmon.mem.total) * 100).toFixed(2) > 50 ? (
                              <h5 style={{ color: 'red' }}>
                                {tryValue(() => {
                                  return ((node.perfmon.mem.used / node.perfmon.mem.total) * 100).toFixed(2);
                                }) + ` %`}
                              </h5>
                            ) : (
                              <h5 style={{ color: 'green' }}>
                                {tryValue(() => {
                                  return ((node.perfmon.mem.used / node.perfmon.mem.total) * 100).toFixed(2);
                                }) + ` %`}
                              </h5>
                            );
                          })}
                        </td>
                        <td>
                          {tryValue(() => {
                            return (node.perfmon.cpuTemperature.main * 1.8 + 32).toFixed(0) > 150 ? (
                              <h5 style={{ color: 'red' }}>
                                {tryValue(() => {
                                  return (node.perfmon.cpuTemperature.main * 1.8 + 32).toFixed(0);
                                })}{' '}
                                F
                              </h5>
                            ) : (
                              <h5 style={{ color: 'green' }}>
                                {tryValue(() => {
                                  return (node.perfmon.cpuTemperature.main * 1.8 + 32).toFixed(0);
                                })}{' '}
                                F
                              </h5>
                            );
                          })}
                        </td>
                        <td>
                          {tryValue(() => {
                            return node.perfmon.cameraStatus.camera1 ? (
                              <Button variant="outline-success" size="sm">
                                Camera 1
                              </Button>
                            ) : (
                              <Button variant="outline-danger" size="sm">
                                Camera 1
                              </Button>
                            );
                          })}
                          {tryValue(() => {
                            return node.perfmon.cameraStatus.camera2 ? (
                              <Button variant="outline-success" size="sm">
                                Camera 2
                              </Button>
                            ) : (
                              <Button variant="outline-danger" size="sm">
                                Camera 2
                              </Button>
                            );
                          })}
                          {tryValue(() => {
                            return node.perfmon.cameraStatus.camera3 ? (
                              <Button variant="outline-success" size="sm">
                                Camera 3
                              </Button>
                            ) : (
                              <Button variant="outline-danger" size="sm">
                                Camera 3
                              </Button>
                            );
                          })}
                        </td>
                        <td>
                          <td>
                            {tryValue(() => {
                              return (node.perfmon.fsSize[0].used / node.perfmon.fsSize[0].size).toFixed(2) * 100 >
                                70 ? (
                                <h5 style={{ color: 'red' }}>
                                  {' '}
                                  Root:
                                  {tryValue(() => {
                                    return (node.perfmon.fsSize[0].used / node.perfmon.fsSize[0].size).toFixed(2) * 100;
                                  })}
                                  %{' '}
                                </h5>
                              ) : (
                                <h5 style={{ color: 'green' }}>
                                  {' '}
                                  Root:
                                  {tryValue(() => {
                                    return (node.perfmon.fsSize[0].used / node.perfmon.fsSize[0].size).toFixed(2) * 100;
                                  })}
                                  %{' '}
                                </h5>
                              );
                            })}
                          </td>{' '}
                          <td>
                            {tryValue(() => {
                              return (node.perfmon.fsSize[3].used / node.perfmon.fsSize[3].size).toFixed(2) * 100 >
                                70 ? (
                                <h5 style={{ color: 'red' }}>
                                  {'    --    '}
                                  Video:
                                  {tryValue(() => {
                                    return (node.perfmon.fsSize[3].used / node.perfmon.fsSize[3].size).toFixed(2) * 100;
                                  })}
                                  %{' '}
                                </h5>
                              ) : (
                                <h5 style={{ color: 'green' }}>
                                  {'    --    '}
                                  Video:
                                  {tryValue(() => {
                                    return (node.perfmon.fsSize[3].used / node.perfmon.fsSize[3].size).toFixed(2) * 100;
                                  })}
                                  %
                                </h5>
                              );
                            })}
                          </td>
                          {'     '}
                          <td>
                            {tryValue(() => {
                              return (node.perfmon.fsSize[2].used / node.perfmon.fsSize[3].size).toFixed(2) * 100 >
                                70 ? (
                                <h5 style={{ color: 'red' }}>
                                  {'    --    '}
                                  Buddy:
                                  {tryValue(() => {
                                    return (node.perfmon.fsSize[2].used / node.perfmon.fsSize[3].size).toFixed(2) * 100;
                                  })}
                                  %{' '}
                                </h5>
                              ) : (
                                <h5 style={{ color: 'green' }}>
                                  {'    --    '}
                                  Buddy:
                                  {tryValue(() => {
                                    return (node.perfmon.fsSize[2].used / node.perfmon.fsSize[3].size).toFixed(2) * 100;
                                  })}
                                  %
                                </h5>
                              );
                            })}
                          </td>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" onClick={() => handleEditNodeModal(node.name)}>
                            Configure
                          </Button>{' '}
                          <Button variant="outline-primary" size="sm" onClick={() => handleSystemInfoNodeModal()}>
                            Information
                          </Button>{' '}
                          <Button variant="outline-primary" size="sm">
                            Reboot
                          </Button>{' '}
                        </td>
                        <td>
                          <Moment fromNow>{node.perfmon.createdAt}</Moment>
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
        {state.currentNodeInfo.name === ' ' ? (
          <div></div>
        ) : (
          <Col xs={2}>
            <systemInformation />
            <Card bg="dark" text="light">
              <Card.Header>System Information</Card.Header>
              <Card.Text></Card.Text>
              <Card.Body>
                {state.cameraSettingsComponent ? <SettingsSysInfoEditCard /> : <SettingsSysInfoCard />}
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      <NodeManagerNewNodeModal />
      <NodeManagerEditNodeModal />
    </Container>
  );
}
