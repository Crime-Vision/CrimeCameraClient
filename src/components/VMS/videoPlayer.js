import { FaPlay } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa';
import { FaFastForward } from 'react-icons/fa';
import { FaFastBackward } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Calendar from 'react-calendar';
import { Player } from 'video-react';
import Map from '../Home/map';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import NavDropdown from 'react-bootstrap/NavDropdown';

const sources = {
  sintelTrailer: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
  bunnyTrailer: 'http://media.w3.org/2010/05/bunny/trailer.mp4',
  bunnyMovie: 'http://media.w3.org/2010/05/bunny/movie.mp4',
  test: 'http://media.w3.org/2010/05/video/movie_300.webm',
};

export default class PlayerControlExample extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: sources.test,
      modalOpen: false,
      modalCameraOpen: false,
      cameras: [],
      videos: [],
      camButtonSelected: '',
      selectedCam1: '',
      selectedCam2: '',
      selectedCam3: '',
      selectedVMSTimeMin: '00',
      selectedVMSTimeHour: '12',
      vmsTimePM: false,
      selectedVMSDate: new Date(),
    };

    fetch('http://10.10.200.10:3001/api/nodes')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ nodes: json });
        this.setState({ nodesReceived: true });
      });

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.load = this.load.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.seek = this.seek.bind(this);
    this.changePlaybackRateRate = this.changePlaybackRateRate.bind(this);
    this.setMuted = this.setMuted.bind(this);
  }

  componentDidMount() {
    this.player1.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player2.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player3.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player4.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player5.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player6.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player7.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player8.subscribeToStateChange(this.handleStateChange.bind(this));
    this.player9.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  async fetchVideos() {
    fetch(`http://10.10.200.10:3001/api/videos/CrimeCamera001/1613248535/1623248535`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ videos: json });
      });
  }

  setMuted(muted) {
    return () => {
      this.player1.muted = muted;
    };
  }

  handleStateChange(state) {
    this.setState({
      player1: state,
      player2: state,
      player3: state,
      player4: state,
      player5: state,
      player6: state,
      player7: state,
      player8: state,
      player9: state,
    });
  }

  play() {
    this.player1.play();
    this.player2.play();
    this.player3.play();
    this.player4.play();
    this.player5.play();
    this.player6.play();
    this.player7.play();
    this.player8.play();
    this.player9.play();
  }

  pause() {
    this.player1.pause();
    this.player2.pause();
    this.player3.pause();
    this.player4.pause();
    this.player5.pause();
    this.player6.pause();
    this.player7.pause();
    this.player8.pause();
    this.player9.pause();
  }

  load() {
    this.player1.load();
    this.player2.load();
    this.player3.load();
    this.player4.load();
    this.player5.load();
    this.player6.load();
    this.player7.load();
    this.player8.load();
    this.player9.load();
  }

  changeCurrentTime(seconds) {
    return () => {
      const { player } = this.player1.getState();
      this.player1.seek(player.currentTime + seconds);
      this.player2.seek(player.currentTime + seconds);
      this.player3.seek(player.currentTime + seconds);
      this.player4.seek(player.currentTime + seconds);
      this.player5.seek(player.currentTime + seconds);
      this.player6.seek(player.currentTime + seconds);
      this.player7.seek(player.currentTime + seconds);
      this.player8.seek(player.currentTime + seconds);
      this.player9.seek(player.currentTime + seconds);
    };
  }

  seek(seconds) {
    return () => {
      this.player1.seek(seconds);
      this.player2.seek(seconds);
      this.player3.seek(seconds);
      this.player4.seek(seconds);
      this.player5.seek(seconds);
      this.player6.seek(seconds);
      this.player7.seek(seconds);
      this.player8.seek(seconds);
      this.player9.seek(seconds);
    };
  }

  changePlaybackRateRate(steps) {
    return () => {
      const { player1 } = this.player1.getState();
      this.player1.playbackRate = player1.playbackRate + steps;
      this.player2.playbackRate = player1.playbackRate + steps;
      this.player3.playbackRate = player1.playbackRate + steps;
      this.player4.playbackRate = player1.playbackRate + steps;
      this.player5.playbackRate = player1.playbackRate + steps;
      this.player6.playbackRate = player1.playbackRate + steps;
      this.player7.playbackRate = player1.playbackRate + steps;
      this.player8.playbackRate = player1.playbackRate + steps;
      this.player9.playbackRate = player1.playbackRate + steps;
    };
  }

  changeSource(name) {
    return () => {
      this.setState({
        source1: sources[name],
        source2: sources[name],
        source3: sources[name],
      });

      this.player1.load();
      this.player2.load();
      this.player3.load();
      this.player4.load();
      this.player5.load();
      this.player6.load();
      this.player7.load();
      this.player8.load();
      this.player9.load();
    };
  }

  render() {
    const upDateSelectedCam = (param) => {
      let buttonSelected = this.state.camButtonSelected;
      switch (buttonSelected) {
        case 'selectedCam1':
          this.setState({ selectedCam1: param });
          break;
        case 'selectedCam2':
          this.setState({ selectedCam2: param });
          break;
        case 'selectedCam3':
          this.setState({ selectedCam3: param });
          break;
        default:
          break;
      }
    };
    const updateHomeVideoDate = (e) => {};

    const updateHomeTimeHour = (e) => {};

    const updateHomeTimeMin = (e) => {};

    const updateHomeTimeAMPM = (e) => {};

    return (
      <Container fluid className="homeContainer bg-dark">
        <Card className="text-center" bg="dark" text="light">
          <Nav className="justify-content-center" activeKey="/home">
            <FaFastBackward size="28" className="amber-text pr-3" onClick={this.changeCurrentTime(-10)} />{' '}
            <FaPlay size="28" className="amber-text pr-3" onClick={this.play} />{' '}
            <FaStop size="28" className="amber-text pr-3" onClick={this.pause} />{' '}
            <FaFastForward size="28" className="amber-text pr-3" onClick={this.changeCurrentTime(10)} />{' '}
          </Nav>
        </Card>
        <Row className="justify-content-md-center">
          <Col sm={14}>
            <Card className="text-center" bg="dark" text="light">
              <Card.Body>
                <Row>
                  <Col xs={3}>
                    <Player
                      ref={(player1) => {
                        this.player1 = player1;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                  <Col xs={3}>
                    <Player
                      ref={(player2) => {
                        this.player2 = player2;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                  <Col xs={3}>
                    <Player
                      ref={(player3) => {
                        this.player3 = player3;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                  <Col xs={3}>
                    <Player
                      ref={(player12) => {
                        this.player12 = player12;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={3}>
                    <Player
                      ref={(player4) => {
                        this.player4 = player4;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>

                  <Col xs={3}>
                    <Player
                      ref={(player5) => {
                        this.player5 = player5;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                  <Col xs={3}>
                    <Player
                      ref={(player6) => {
                        this.player6 = player6;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                  <Col xs={3}>
                    <Player
                      ref={(player11) => {
                        this.player11 = player11;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs={3}>
                    <Player
                      ref={(player7) => {
                        this.player7 = player7;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>

                  <Col xs={3}>
                    <Player
                      ref={(player8) => {
                        this.player8 = player8;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>

                  <Col xs={3}>
                    <Player
                      ref={(player9) => {
                        this.player9 = player9;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                  <Col xs={3}>
                    <Player
                      ref={(player10) => {
                        this.player10 = player10;
                      }}
                    >
                      <source src={this.state.source} />
                    </Player>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-muted"></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
