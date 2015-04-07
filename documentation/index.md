# AudioRecorder Module

## Description

Android module for record audio in different format like(mp4,3gp) without using intent.

## Permission

This module needs following permissions

    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_INTERNAL_STORAGE" />

Note: These permissions already added in timodule.xml, so no need to add in tiapp.xml

## Features

* Support mp4 and 3gp formats
* Support for different audio encoders
* Support for different sampling rates
* Support for different bitrates
* Option to stop recording process by specifying maxFileSize and maxDuration
* Save files in external storage
* Method to check whether audio recorder
* Success and error callback methods

## Accessing the AudioRecorder Module

To access this module from JavaScript, you would do the following:

    var audioRecorder = require("titutorial.audiorecorder");

The audiorecorder variable is a reference to the Module object.	

## Reference

Based on Android MediaRecorder http://developer.android.com/reference/android/media/MediaRecorder.html

## Methods

### startRecording()

Method to start the audio recording process.

**Parameters**

* **outputFormat** - output file format either `audioRecorder.OutputFormat_MPEG_4` or `audioRecorder.OutputFormat_THREE_GPP`; default = `audioRecorder.OutputFormat_THREE_GPP`
* **audioEncoder** - audio encoder type `audioRecorder.AudioEncoder_AAC`, `audioRecorder.AudioEncoder_AMR_NB`, `audioRecorder.AudioEncoder_AMR_WB`, `audioRecorder.AudioEncoder_DEFAULT`; default = `audioRecorder.AudioEncoder_AMR_NB`
* **audioEncodingBitRate** - audio encoding bit rate in bits per second; default = 16000
* **audioSamplingRate** - sampling rate for audio in samples per second (not all rates are supported by all encoders, consult android MediaRecorder documentation); default = 22050 
* **directoryName** - directory name(directory will be created with this name in SD card); default = `audio_recorder`
* **fileName** - file name; default file name is current timestamp
* **maxFileSize** - filesize (in bytes) of the recording session (optional)
* **maxDuration** - duration (in ms) of the recording session (optional)
* **success** - function to handle success
* **error** - function to handle error response

### isRecording()

Method to check recording process

### getMaxAmplitude()

Method to check amplitude of microphone input

## Usage

    audioRecorder.startRecording({
	    outputFormat : audioRecorder.OutputFormat_THREE_GPP,
	    audioEncoder : audioRecorder.AudioEncoder_AMR_NB,
        audioEncodingBitRate: 128000,
        audioSamplingRate: 44100,
	    directoryName : "testdir",
	    fileName : "testfile",
	    maxFileSize : 7000,
	    success : function(e) {
		    alert("success => " + e.filePath);
		    Ti.API.info("response is => " + JSON.stringify(e));

		    var audioDir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "testdir");
		    var audioFile = Ti.Filesystem.getFile(audioDir.resolve(), e.fileName);
		    Ti.API.info("audioFile.nativePath = " + audioFile.nativePath);
		    audioPlayer.url = audioFile.nativePath;
	    },
	    error : function(d) {
		    alert("error => " + e.message);
		    Ti.API.info("error is => " + JSON.stringify(d));
	    }
    });

refer example/app.js for more info

## Todo

* Local storage option

## Author

Karthi Ponnusamy - karthi.nkl@gmail.com

## License

Copyright (c) 2013 titaniumtutorial.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
