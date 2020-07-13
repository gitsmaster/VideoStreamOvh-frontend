import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Preloading from './Preloading';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import SvgDefs from '../../components/icons/SvgDefs';
import { flatMap } from 'lodash';

class Watch extends Component {
    constructor(props) {
        super(props);
        this.timeout = null;
        this.state = {
            isLoading: false,
            isActive: false,
            NotificationShow: false,
            ppToggleShow: true,
            isForward: false,

            isVolumePopupActive: false,
            isTrickPlayVisible: false,
            isReportAProblemPopup: false,

            loadedSeconds: 0,
            playedSeconds: 0,
            duration: 0,
            loop: false,
            playing: false,
            volume: 0.35,
            muted: false,

            played: 0,
            loaded: 0,

        };
        this.player = React.createRef();
    }
    onSwitchPlayAndPause = () => {
        console.log(" onSwitchPlayAndPause &&&&&&&&&&&&&&&&");
        this.setState({
            NotificationShow: true,
            ppToggleShow: true,
            playing: !this.state.playing
        });
        setTimeout(() => {
            this.setState({ NotificationShow: false });
        }, 500)
    }
    onClickBack = () => {
        this.setState({
            NotificationShow: true,
            ppToggleShow: false,
            isForward: false
        });
        setTimeout(() => {
            this.setState({ NotificationShow: false });
        }, 500)
    }
    onClickForward = () => {
        this.setState({
            NotificationShow: true,
            ppToggleShow: false,
            isForward: true
        });
        setTimeout(() => {
            this.setState({ NotificationShow: false });
        }, 500)
    }
    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }
    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }
    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }
    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }
    handleDuration = duration => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }
    handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }
    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    handleSeekChange = e => {
        console.log(" ---- handleSeekChange --- e.target : ", e.target);
        console.log(" ---- handleSeekChange --- e.target.value : ", e.target.value);

        this.setState({ played: parseFloat(e.target.value) })
    }
    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        console.log(" ---- handleSeekMouseUp --- e.target : ", e.target);
        console.log(" ---- handleSeekMouseUp --- e.target.value : ", e.target.value);
        this.player.seekTo(parseFloat(e.target.value));
    }

    onMouseMoveCapture = (e) => {
        e.preventDefault();
        this.setState({ isActive: true });
        (() => {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            if(this.state.isActive) this.setState({ isActive: false})
          }, 5000);
        })();

    }
    ref = player => {
        this.player = player;
    }
    render() {
        const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
        const {
            isLoading, isActive, NotificationShow, ppToggleShow, isForward,
            isVolumePopupActive, isTrickPlayVisible, isReportAProblemPopup,
            playedSeconds, duration, playing, volume, muted, played, loaded } = this.state;
        const isDimmed = !playing && !isActive;
        const remaining_time = duration - playedSeconds;

        console.log(" this.state >>> ", this.state);
        return (
            <div className="nf-kb-nav-wrapper">
                <div className="sizing-wrapper"
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1, overflow: 'hidden' }}
                    onMouseMove={e => this.onMouseMoveCapture(e)}
                    onClick={e => this.onMouseMoveCapture(e)}>
                    <div style={{ width: '1em', height: '1em', visibility: 'hidden', fontSize: '1em' }} />
                    <div className="nfp AkiraPlayer">
                        {
                            isLoading ?
                                <Preloading />
                                :
                                    <div className="nfp nf-player-container notranslate NFPlayer originalsBackgroundAutoplayTrailer" tabIndex={0}>
                                    {/* <div className="nfp nf-player-container notranslate active NFPlayer originalsBackgroundAutoplayTrailer" tabIndex={0}> */}
                                    {/* <div className="nfp nf-player-container notranslate inactive NFPlayer originalsBackgroundAutoplayTrailer" tabIndex={0}> */}

                                    {/* Here is control panel symbol definitions */}
                                    <SvgDefs />
                                    {/* Here is VideoContainer */}
                                    <div className="VideoContainer" aria-hidden="true" role="presentation" data-uia="player" data-videoid={287366}>
                                        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                            <div id={287366} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                                                {/* <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" style={{}} /> */}
                                                <ReactPlayer
                                                    ref={this.ref}
                                                    width='100%'
                                                    height='100%'
                                                    url={`${url}`}
                                                    playing={playing}
                                                    controls={false}
                                                    volume={volume}
                                                    muted={muted}
                                                    // progressInterval={1000}
                                                    onReady={() => console.log('onReady')}
                                                    onStart={() => console.log('onStart')}
                                                    onPlay={this.handlePlay}
                                                    onPause={this.handlePause}
                                                    onBuffer={() => console.log('onBuffer')}
                                                    onSeek={e => console.log('onSeek', e)}
                                                    onEnded={this.handleEnded}
                                                    onError={e => console.log('onError', e)}
                                                    onProgress={this.handleProgress}
                                                    onDuration={this.handleDuration}
                                                />
                                                {/* <div className="player-timedtext" style={{ display: 'none', direction: 'ltr' }} /> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Here is KeyboardNotification */}
                                    {
                                        NotificationShow ?
                                            <div className="KeyboardNotification__container">
                                                {
                                                    ppToggleShow ?
                                                        (
                                                            playing ?
                                                                <div className="KeyboardNotification__icon KeyboardNotification--play">
                                                                    <svg className="svg-icon svg-icon-nfplayerPlay" focusable="false">
                                                                        <use filter xlinkHref="#nfplayerPlay" /></svg>
                                                                </div>
                                                                :
                                                                <div className="KeyboardNotification__icon KeyboardNotification--pause">
                                                                    <svg className="svg-icon svg-icon-nfplayerPause" focusable="false">
                                                                        <use filter xlinkHref="#nfplayerPause" />
                                                                    </svg>
                                                                </div>
                                                        ) :
                                                        (
                                                            isForward ?
                                                                <div className="KeyboardNotification__icon KeyboardNotification--seek-forward">
                                                                    <svg className="svg-icon svg-icon-nfplayerFastForward" focusable="false">
                                                                        <use filter xlinkHref="#nfplayerFastForward" />
                                                                    </svg>
                                                                </div> :
                                                                <div className="KeyboardNotification__icon KeyboardNotification--seek-back">
                                                                    <svg className="svg-icon svg-icon-nfplayerBackTen" focusable="false">
                                                                        <use filter xlinkHref="#nfplayerBackTen" />
                                                                    </svg>
                                                                </div>
                                                        )
                                                }
                                            </div>
                                            : null
                                    }

                                    {/* Here is full control panel */}
                                    {/* <div className="PlayerControlsNeo__layout PlayerControlsNeo__layout--active"> */}
                                    {/* <div className="PlayerControlsNeo__layout PlayerControlsNeo__layout--inactive"> */}
                                    <div className={`PlayerControlsNeo__layout PlayerControlsNeo__layout--${isActive ? "active" : "inactive"}${isDimmed ? " PlayerControlsNeo__layout--dimmed" : ""}`}>
                                        <div className="PlayerControlsNeo__all-controls">
                                            <div className="PlayerControlsNeo__gradient-top" />
                                            <div className="PlayerControlsNeo__gradient-bottom" />
                                            {
                                                isDimmed ?
                                                    <div>
                                                        <div className="evidence-overlay nfa-z-idx-1 nfa-pos-abs nfa-d-flex nfa-w-100 nfa-h-100 nfa-flx-dir-col nfa-bs-bb nfa-jc-center">
                                                            <h4 className="nfa-fs-1-6-em nfa-fw-normal nfa-c-gray-80 nfa-m-0 nfa-pb-02-em">Now watching</h4>
                                                            <h2 className="nfa-fs-4-8-em nfa-m-0">Batman: Mask of the Phantasm</h2>
                                                            <h3 className="nfa-fs-2-em nfa-m-0 nfa-pt-02-em nfa-pb-1em nfa-pb-05-em nfa-fw-normal nfa-d-flex">
                                                                <span>1993</span>
                                                                <span className="nfa-pl-1-em nfa-pr-1-em">PG</span>
                                                                <span>1 hr 16 min</span>
                                                            </h3>
                                                            <p className="nfa-fs-1-6-em nfa-c-gray-80 nfa-m-0 nfa-w-60">Batman investigates a mysterious masked vigilante targeting Gotham City's most notorious mobsters as his haunted past and violent present collide.</p>
                                                            <p className="nfa-as-end nfa-fs-1-6-em nfa-c-gray-80 nfa-m-0 nfa-pos-abs nfa-bot-10 nfa-right-10">Paused</p>
                                                        </div>
                                                    </div>
                                                    : null
                                            }

                                            {/* Here is hitzone of full screen which enable user click to switch play and pause */}
                                            <div className="controls-full-hit-zone" 
                                                onClick={this.onSwitchPlayAndPause}
                                                >
                                                {/* <div className="center-controls" /> */}
                                                <div className="center-controls active" />
                                            </div>

                                            {/* core-controls beginning */}
                                            <div className="PlayerControlsNeo__core-controls">
                                                {/* Here is return to Browse button on top left of screen */}
                                                <div className="nfp-control-row top-left-controls">
                                                    <Link to="/pr" className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerBack tooltip-button tooltip-button-pos-center tooltip-button-align-right"
                                                        data-tooltip="Return to Browse" data-uia="nfplayer-exit" tabIndex={0}
                                                        aria-label="Return to Browse">
                                                        <svg className="svg-icon svg-icon-nfplayerBack" focusable="false">
                                                            <use filter xlinkHref="#nfplayerBack" />
                                                        </svg>
                                                    </Link>
                                                </div>

                                                {/* Here is bottom video control group */}
                                                <div data-uia="nfplayer-bottom-controls" className="PlayerControlsNeo__bottom-controls">

                                                    {/* Here is progress control row */}
                                                    <div className="PlayerControlsNeo__progress-control-row PlayerControlsNeo__progress-control-row--row-standard">
                                                        <div className="PlayerControlsNeo__progress-container">
                                                            <div className="PlayerControls--control-element progress-control">
                                                                <div className="scrubber-container">
                                                                    <div className="scrubber-bar">
                                                                        <div className="track">
                                                                            <input
                                                                                style={{
                                                                                    position: "absolute",
                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    zIndex: "1",
                                                                                    opacity: "0"
                                                                                }}
                                                                                onMouseEnter={() => this.setState({ isTrickPlayVisible: true })}
                                                                                onMouseLeave={() => this.setState({ isTrickPlayVisible: false })}
                                                                                type='range'
                                                                                min={0}
                                                                                max={0.999999}
                                                                                step='any'
                                                                                value={played}
                                                                                onMouseDown={this.handleSeekMouseDown}
                                                                                onChange={this.handleSeekChange}
                                                                                onMouseUp={this.handleSeekMouseUp} />
                                                                            <div className="buffered" style={{ width: `${loaded * 100}%` }} />
                                                                            <div className="current-progress" style={{ width: `${played * 100}%` }} />
                                                                            <div className="play-head" style={{ display: "block", width: `${played * 100}%` }} />
                                                                        </div>

                                                                        {/* Here is trick play preview image and text */}
                                                                        {/* <div className={`trickplay${isTrickPlayVisible ? " trickplay-visible" : ""} trickplay-text-and-image`} 
                                                                            style={{ width: "17vw", left: '110.297px' }}>
                                                                            <div className="tp-image">
                                                                                <img src="https://via.placeholder.com/240x91" alt="" /></div>
                                                                            <div className="tp-text">40:44</div>
                                                                        </div> */}

                                                                        <div aria-label="Search time bar"
                                                                            aria-valuemax={4585}
                                                                            aria-valuemin={0} aria-valuenow={206}
                                                                            aria-valuetext="3:26 / 1:16:25"
                                                                            className="scrubber-head"
                                                                            tabIndex={0} style={{ left: `${played * 100}%` }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="PlayerControls--control-element text-control time-remaining--modern">
                                                                <time className="time-remaining__time">{Math.floor(remaining_time / 3600)}:{Math.floor(remaining_time % 3600 / 60)}:{Math.floor(remaining_time % 60)}</time></div>
                                                        </div>
                                                    </div>

                                                    {/* Here is button control group */}
                                                    <div className="PlayerControlsNeo__button-control-row">

                                                        {/* Here is play and pause button  */}
                                                        <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerPlay"
                                                            tabIndex={0} aria-label="Play" onClick={this.onSwitchPlayAndPause}>
                                                            {
                                                                playing ?
                                                                    <svg
                                                                        className="svg-icon svg-icon-nfplayerPause" focusable="false">
                                                                        <use filter xlinkHref="#nfplayerPause" />
                                                                    </svg>
                                                                    :
                                                                    <svg
                                                                        className="svg-icon svg-icon-nfplayerPlay" focusable="false">
                                                                        <use filter xlinkHref="#nfplayerPlay" />
                                                                    </svg>
                                                            }

                                                        </button>

                                                        {/* Here i s back button */}
                                                        <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerBackTen"
                                                            tabIndex={0} aria-label="Back 10 Seconds" onClick={this.onClickBack}>
                                                            <svg
                                                                className="svg-icon svg-icon-nfplayerBackTen" focusable="false">
                                                                <use filter xlinkHref="#nfplayerBackTen" />
                                                            </svg>
                                                        </button>

                                                        {/* Here is forward button  */}
                                                        <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerFastForward"
                                                            tabIndex={0} aria-label="Forward 10 Seconds" onClick={this.onClickForward}>
                                                            <svg className="svg-icon svg-icon-nfplayerFastForward" focusable="false">
                                                                <use filter xlinkHref="#nfplayerFastForward" />
                                                            </svg>
                                                        </button>

                                                        {/* Here is volume container          */}
                                                        <div className="touchable PlayerControls--control-element nfp-popup-control"
                                                            data-uia="volume-container"
                                                            onMouseEnter={() => this.setState({ isVolumePopupActive: true })}
                                                            onMouseLeave={() => this.setState({ isVolumePopupActive: false })}
                                                        >
                                                            {
                                                                muted ?
                                                                    <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-volumeMuted"
                                                                        tabIndex={0} aria-label="Muted">
                                                                        <svg className="svg-icon svg-icon-volumeMuted" focusable="false">
                                                                            <use filter xlinkHref="#volumeMuted" /></svg>
                                                                    </button>
                                                                    : <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-volumeLow"
                                                                        tabIndex={0} aria-label="Volume"
                                                                    >
                                                                        <svg className="svg-icon svg-icon-volumeLow" focusable="false"><use filter xlinkHref="#volumeLow" /></svg>
                                                                    </button>
                                                            }
                                                            {/* <button
                                                                className="touchable PlayerControls--control-element nfp-button-control default-control-button button-volumeMedium"
                                                                tabIndex={0} aria-label="Volume">
                                                                <svg className="svg-icon svg-icon-volumeMedium" focusable="false"><use filter xlinkHref="#volumeMedium" /></svg>
                                                            </button>
                                                            <button
                                                                className="touchable PlayerControls--control-element nfp-button-control default-control-button button-volumeMax"
                                                                tabIndex={0} aria-label="Volume">
                                                                <svg className="svg-icon svg-icon-volumeMax" focusable="false"><use filter xlinkHref="#volumeMax" /></svg>
                                                            </button> */}


                                                            {/* Here is volume popup */}
                                                            <div className={`touchable popup-content-wrapper${isVolumePopupActive ? " active" : ""} popup-content-wrapper--centered-content`}>
                                                                {
                                                                    isVolumePopupActive ?
                                                                        <div className="popup-content volume-controller">
                                                                            <div className="slider-container">
                                                                                <div className="slider-bar-container">
                                                                                    <div className="slider-bar-percentage" style={{ height: `${volume * 100}%` }}></div>
                                                                                    <div className="scrubber-target" style={{ bottom: `${volume * 100}%` }}>
                                                                                        <div className="scrubber-head" tabIndex={0}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="PlayerControls--control-element text-control video-title">
                                                            <h4 className="ellipsize-text">Batman: Mask of the Phantasm</h4>
                                                        </div>

                                                        {/* Here is active/inactive Report container */}
                                                        <div className="touchable ReportAProblemPopupContainer PlayerControls--control-element nfp-popup-control"
                                                            data-uia="report-a-problem-button"
                                                            onMouseEnter={() => this.setState({ isReportAProblemPopup: true })}
                                                            onMouseLeave={() => this.setState({ isReportAProblemPopup: false })}
                                                        >
                                                            {/* Here is active/inactive Report issue button */}
                                                            <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerReportAProblem PlayerControls--control-element--active"
                                                                tabIndex={0}
                                                                aria-label="Report the execution issue to VideoStream.">
                                                                <svg
                                                                    className="svg-icon svg-icon-nfplayerReportAProblem" focusable="false">
                                                                    <use filter xlinkHref="#nfplayerReportAProblem" />
                                                                </svg>
                                                            </button>

                                                            {/* Here is information popup container */}
                                                            <div className={`touchable popup-content-wrapper${isReportAProblemPopup ? " active" : ""} keep-right`}>
                                                                {
                                                                    isReportAProblemPopup ?
                                                                        <div className="ReportAProblem--popup popup-content">
                                                                            <Link to="/pr/contact-us" className="ReportAProblem--popup-text">
                                                                                <span>Report the execution issue to VideoStream.</span>
                                                                            </Link>
                                                                        </div>
                                                                        : null
                                                                }
                                                            </div>
                                                        </div>

                                                        {/* Here is full screen button */}
                                                        <button className="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerFullscreen"
                                                            tabIndex={0} aria-label="Fullscreen"
                                                            onClick={this.handleClickFullscreen}>
                                                            <svg className="svg-icon svg-icon-nfplayerFullscreen" focusable="false">
                                                                <use filter xlinkHref="#nfplayerFullscreen" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* core-controls end */}
                                        </div>
                                    </div>
                                </div>

                        }
                    </div>
                </div >
            </div >)
    }
}

export default Watch;