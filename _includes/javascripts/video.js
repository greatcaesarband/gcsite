window.n = window.n || {}
n.videos = []
n.EmbeddedVideo = function(link){
  var _video = this;
  this.init = function(){
    this.elem = link
    this.box = link.parentNode
    this.elem.onclick = this.loadAndStream
    return(this)
  }
  this.loadAndStream = function(e){
    e.preventDefault()
    video_url = _video.elem.href
    if (video_url.match(/youtu/i)){
      e.preventDefault()
      regEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      video_id = video_url.match(regEx)[2]
      player_src = "//www.youtube.com/embed/" + video_id + "?autoplay=1"
    } else if (video_url.match(/vimeo/i)){
      e.preventDefault()
      video_id = video_url.match(/vimeo.com\/(\d*)/i)[1]
      player_src = "//player.vimeo.com/video/" + video_id + "?autoplay=1"
    }
    if(!!player_src) {
      player = '<iframe src="' + player_src + '" frameborder=0 webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
      _video.box.innerHTML = player
    }
  }
  return(this.init())
}
n.videoLinks = document.querySelectorAll('a.embedded_video')
for(i=0; i < n.videoLinks.length; i++) {
  n.videos.push(new n.EmbeddedVideo(n.videoLinks[i]))
}
