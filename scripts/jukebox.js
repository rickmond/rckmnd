
	// the playlist is just a JSON-style object.
	var playlist = [
		{
			url : "audio/i.mp3",
			title : "i"
		},
		{
			url : "audio/ii.mp3",
			title : "ii"
		}
	];

	$(document).ready(function() {
	
	    var aud = $('#jukebox .aud').get(0);
	    aud.pos = -1;
	
		$('#jukebox .play').bind('click', function(evt) {
			evt.preventDefault();
			if (aud.pos < 0) {
				$('#jukebox .next').trigger('click');
			} else {
				aud.play();
			}
		});
		
		$('#jukebox .pause').bind('click', function(evt) {
			evt.preventDefault();
			aud.pause();
		});
		
		$('#jukebox .next').bind('click', function(evt) {
			evt.preventDefault();
			aud.pause();
			aud.pos++;
			if (aud.pos == playlist.length) aud.pos = 0;
			aud.setAttribute('src', playlist[aud.pos].url);
                        $('#jukebox .info').html(playlist[aud.pos].title);
			aud.load();
		});
		
		$('#jukebox .prev').bind('click', function(evt) {
			evt.preventDefault();
			aud.pause();
			aud.pos--;
			if (aud.pos < 0) aud.pos = playlist.length - 1;
			aud.setAttribute('src', playlist[aud.pos].url);
                        $('#jukebox .info').html(playlist[aud.pos].title);
			aud.load();
		});
		
		// JQuery doesn't seem to like binding to these HTML 5
		// media events, but addEventListener does just fine
		
		aud.addEventListener('progress', function(evt) {
			var width = parseInt($('#jukebox').css('width'));
			var percentLoaded = Math.round(evt.loaded / evt.total * 100);
			var barWidth = Math.ceil(percentLoaded * (width / 100));
			$('#jukebox .load-progress').css( 'width', barWidth );
			
		});
		
		aud.addEventListener('timeupdate', function(evt) {
		    var width = parseInt($('#jukebox').css('width'));
			var percentPlayed = Math.round(aud.currentTime / aud.duration * 100);
			var barWidth = Math.ceil(percentPlayed * (width / 100));
			$('#jukebox .play-progress').css( 'width', barWidth);
		});
		
		aud.addEventListener('canplay', function(evt) {
			$('#jukebox .play').trigger('click');
		});
		
		aud.addEventListener('ended', function(evt) {
			$('#jukebox .next').trigger('click');
		});
		
	
		$('#jukebox .info').html(playlist[0].title);
	
	});