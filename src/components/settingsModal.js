import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import HorizontalBarChart from './barChart2'
import HorizontalBarChart2 from './barChart'
import LineChart from './lineChart'
import SettingsCamerasCard from './settingsModalCamerasCard'
import SettingsSysInfoCard from './settingsModalSySInfoCard'
import SettingsSysInfoEditCard from './settingsModalSySInfoEditCard'

import { GlobalContext } from '../contexts/globalContext';


export default function SettingsModal() {
    const [state, dispatch] = useContext(GlobalContext);
    const handleClose = () =>  dispatch({
        type: 'UPDATE_SETTINGSMODAL',
        payload: false,
    });
    return (
        <>
            <Modal show={state.settingsModal} onHide={handleClose} dialogClassName="custom-modal">
                 <Card.Header as='h5'>{state.selectedCamera}</Card.Header>
                    <CardGroup>
                        <Card>
                            <Card.Header>System Information</Card.Header>
                            <Card.Text>
                            </Card.Text>
                            <Card.Text>
                                {state.cameraSettingsComponent ?  <SettingsSysInfoEditCard/>:<SettingsSysInfoCard/> }
                            </Card.Text>
                        </Card>
                        <Card >
                            <CardGroup>
                                <Card >
                                    <Card.Header>System</Card.Header>
                                    <HorizontalBarChart/>
                                </Card>
                                <Card>
                                    <Card.Header>Drives</Card.Header>
                                    <HorizontalBarChart2/>
                                </Card>
                            </CardGroup>
                        </Card>
                    </CardGroup>
                    <CardGroup>
                        <Card>
                            <Card.Header>Cameras</Card.Header>
                            <Card.Header>
                                <Button variant="primary" size="sm">Configure</Button>
                            </Card.Header>
                            <Card.Body>
                                <SettingsCamerasCard/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <LineChart/>
                        </Card>
                    </CardGroup>
                    <Card.Footer className="text-muted">
                    </Card.Footer>
            </Modal>
        </>
    );
}