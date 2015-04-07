var win = Ti.UI.createWindow({
	backgroundColor : 'white',
	layout : 'vertical'
});
win.open();

var audioPlayer;
var audioRecorder = require('titutorial.audiorecorder');

var statusButton = Ti.UI.createButton({
	title : 'Status',
	height : '40dp',
	width : '200dp',
	top : '50dp'
});
win.add(statusButton);

statusButton.addEventListener('click', function() {
	alert("isRecording " + audioRecorder.isRecording());
});

var recordButton = Ti.UI.createButton({
	title : 'Record',
	height : '40dp',
	width : '200dp',
	top : '50dp'
});
win.add(recordButton);

recordButton.addEventListener('click', function() {
	audioRecorder.startRecording({
		outputFormat : audioRecorder.OutputFormat_THREE_GPP,
		audioEncoder : audioRecorder.AudioEncoder_AMR_NB,
		audioEncodingBitRate: 64000,
		audioSamplingRate: 44100,
		directoryName : "testdir",
		fileName : "testfile",
		//maxDuration : 2000,
		//maxFileSize : 7000,
		success : function(e) {
			alert("success => " + JSON.stringify(e));
			Ti.API.info("@@## response is => " + JSON.stringify(e));

			var audioDir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "testdir");
			if (audioDir.exists) {
				Ti.API.info('@@## audioDir exists');
			} else {
				Ti.API.info('@@## audioDir not exists!');
			}

			var audioFile = Ti.Filesystem.getFile(audioDir.resolve(), e.fileName);
			Ti.API.info("@@## audioFile.nativePath = " + audioFile.nativePath);
			if (audioFile.exists) {
				Ti.API.info('@@## audioFile exists');
			} else {
				Ti.API.info('@@## audioFile not exists!');
			}

			audioPlayer.url = audioFile.nativePath;
		},
		error : function(e) {
			alert("error => " + e.message);
			Ti.API.info("@@## error is => " + JSON.stringify(e));
		}
	});
});

var stopButton = Ti.UI.createButton({
	title : 'Stop',
	height : '40dp',
	width : '200dp',
	top : '20dp'
});
win.add(stopButton);

stopButton.addEventListener('click', function() {
	audioRecorder.stopRecording();
});

var startStopButton = Titanium.UI.createButton({
	title : 'Start/Stop Streaming',
	top : '50dp',
	width : '200dp',
	height : '40dp'
});

var pauseResumeButton = Titanium.UI.createButton({
	title : 'Pause/Resume Streaming',
	top : '20dp',
	width : '200dp',
	height : '40dp',
	enabled : false
});

win.add(startStopButton);
win.add(pauseResumeButton);

audioPlayer = Ti.Media.createAudioPlayer({
	allowBackground : true
});

startStopButton.addEventListener('click', function() {
	if (audioPlayer.playing || audioPlayer.paused) {
		audioPlayer.stop();
		pauseResumeButton.enabled = false;
		if (Ti.Platform.name === 'android') {
			audioPlayer.release();
		}
	} else {
		audioPlayer.start();
		pauseResumeButton.enabled = true;
	}
});

pauseResumeButton.addEventListener('click', function() {
	if (audioPlayer.paused) {
		audioPlayer.start();
	} else {
		audioPlayer.pause();
	}
});
