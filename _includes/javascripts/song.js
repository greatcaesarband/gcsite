window.n = window.n || {}
n.songs = []
n.Song = function(link){
  var _song = this
  this.init = function(){
    this.index = n.songs.length
    this.elem = link
    this.elem.onclick = this.togglePause
    this.audio = document.createElement('audio')
    this.audio.preload = 'none'
    this.audio.src = this.elem.getAttribute('data-mp3')
    this.audio.addEventListener('timeupdate', this.onTimeUpdate, false)
    this.isPlaying = false
    return(this)
  }
  this.togglePause = function(e){
    e.preventDefault()
    _song.isPlaying ? _song.pause() : _song.play()
  }
  this.play = function(){
    this.stopSiblings()
    this.isPlaying = true
    this.elem.className += " is_playing"
    this.audio.play()
  }
  this.pause = function(){
    this.elem.className = this.elem.className.replace(" is_playing","")
    this.isPlaying = false
    this.audio.pause()
  }
  this.stopSiblings = function(){
    for(i=0;i<n.songs.length;i++){
      if(i != this.index){
        n.songs[i].pause()
        if(!!n.songs[i].audio.currentTime) n.songs[i].audio.currentTime = 0;
      }
    }
  }
  this.onTimeUpdate = function(e){
    if(this.ended){
      _song.onEnd()
    }
  }
  this.onEnd = function(){
    this.pause()
    this.audio.currentTime = 0
    this.next()
  }
  this.next = function(){
    nextSong = n.songs[this.index+1]
    if(nextSong) nextSong.play()
  }
  this.prev = function(){
    prevSong = n.songs[this.index-1]
    if(prevSong) prevSong.play()
  }
  return(this.init())
}
n.testSong = document.createElement('audio')
if(!!document.querySelector && !!n.testSong.canPlayType('audio/mpeg')){
  n.songLinks = document.querySelectorAll("a[data-mp3]")
  for(i=0; i < n.songLinks.length; i++) {
    n.songs.push(new n.Song(n.songLinks[i]))
  }
}
